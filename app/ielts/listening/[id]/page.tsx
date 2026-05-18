"use client";

import React, { useEffect, useMemo, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Headphones, CheckCircle2, Sparkles } from "lucide-react";
import { apiService, ListeningTest } from "@/services/api";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {listeningBandTable, ListeningQuestion, listeningSections} from "@/app/ielts/data/ielts-listening";

function normalizeAnswer(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ");
}

function isAnswerCorrect(input: string, acceptedAnswers: string[]) {
    const normalizedInput = normalizeAnswer(input);
    return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput);
}

function getEstimatedBand(rawScore: number) {
    const table = [
        { min: 39, max: 40, band: "9" },
        { min: 37, max: 38, band: "8.5" },
        { min: 35, max: 36, band: "8" },
        { min: 32, max: 34, band: "7.5" },
        { min: 30, max: 31, band: "7" },
        { min: 26, max: 29, band: "6.5" },
        { min: 23, max: 25, band: "6" },
        { min: 18, max: 22, band: "5.5" },
        { min: 16, max: 17, band: "5" },
        { min: 13, max: 15, band: "4.5" },
        { min: 11, max: 12, band: "4" },
        { min: 8, max: 10, band: "3.5" },
        { min: 6, max: 7, band: "3" },
        { min: 4, max: 5, band: "2.5" },
    ];

    const match = table.find((row) => rawScore >= row.min && rawScore <= row.max);
    return match?.band || "Below 2.5";
}

export default function IELTSListeningSectionPage() {
    const params = useParams();
    const id = String(params.id);

    const [audioData, setAudioData] = useState<ListeningTest | null>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [rawScore, setRawScore] = useState(0);
    const [aiFeedback, setAiFeedback] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStatus, setAnalysisStatus] = useState<
        "idle" | "processing" | "completed" | "error"
    >("idle");
    const [analysisError, setAnalysisError] = useState("");

    const sectionData = useMemo(
        () => listeningSections.find((section) => section.id === id),
        [id]
    );

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const sectionIndex = useMemo(
        () => listeningSections.findIndex((section) => section.id === id),
        [id]
    );

    const progress = sectionIndex >= 0 ? ((sectionIndex + 1) / 4) * 100 : 0;

    useEffect(() => {
        const loadAudio = async () => {
            try {
                const data = await apiService.getListeningTestById(id);
                setAudioData(data);
            } catch (error) {
                console.error("Error cargando section listening:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAudio();
    }, [id]);

    if (!sectionData) {
        return (
            <SidebarLayout>
                <div className="p-10 text-center text-zinc-700">Sección no encontrada.</div>
            </SidebarLayout>
        );
    }

    const handleAnswerChange = (questionNumber: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionNumber]: value,
        }));
    };

    const handleSubmit = async () => {
        let correctCount = 0;

        sectionData.questions.forEach((question) => {
            const userAnswer = answers[question.number] || "";
            if (isAnswerCorrect(userAnswer, question.acceptedAnswers)) {
                correctCount += 1;
            }
        });

        setRawScore(correctCount);
        setSubmitted(true);
        setAiFeedback("");
        setAnalysisError("");
        setAnalysisStatus("processing");
        setAnalyzing(true);

        const formattedQuestions = sectionData.questions
            .map((question) => {
                const userAnswer = answers[question.number] || "(sin respuesta)";
                return `Question ${question.number}: ${question.prompt}
Context: ${question.context || "N/A"}
User answer: ${userAnswer}
Accepted answer(s): ${question.acceptedAnswers.join(" / ")}`;
            })
            .join("\n\n");

        const prompt = `
Eres un experto en evaluación pedagógica de IELTS Listening.
Analiza el desempeño del estudiante en una sola sección del examen.

Sección: ${sectionData.title}
Puntaje obtenido en esta sección: ${correctCount}/10
Progreso del examen: ${progress}%

Preguntas, respuestas del usuario y respuestas correctas:
${formattedQuestions}

Tabla de referencia IELTS Listening global:
${listeningBandTable.map((row) => `Band ${row.band}: ${row.raw}`).join("\n")}

Tu tarea:
1. Resume el desempeño del estudiante.
2. Explica claramente cuáles respuestas fueron incorrectas y por qué.
3. Identifica patrones de error si existen.
4. Sugiere mejoras concretas para IELTS Listening.
5. Da observaciones pedagógicas breves, claras y motivadoras.
6. No inventes respuestas del usuario; usa únicamente la información proporcionada.
7. Escribe la respuesta en español con formato markdown.
`;

        try {
            const taskResponse = await apiService.analyzeListeningSection(prompt);
            const taskId = taskResponse?.task_id;

            if (!taskId) {
                throw new Error("No se recibió el identificador de la tarea de análisis.");
            }

            const maxAttempts = 20;

            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                const statusResponse = await apiService.checkStatus(taskId);

                if (statusResponse?.status === "finalizado") {
                    setAiFeedback(statusResponse.result || "No se recibió retroalimentación de la IA.");
                    setAnalysisStatus("completed");
                    setAnalyzing(false);
                    return;
                }

                if (statusResponse?.status === "error") {
                    throw new Error(statusResponse.error || "La IA no pudo completar el análisis.");
                }

                await sleep(2500);
            }

            throw new Error("La IA tardó demasiado en responder. Intenta nuevamente.");
        } catch (error) {
            console.error("Error analizando con IA:", error);
            setAnalysisStatus("error");
            setAnalysisError(
                error instanceof Error
                    ? error.message
                    : "No se pudo generar la retroalimentación con IA."
            );
            setAiFeedback("No se pudo generar la retroalimentación con IA.");
            setAnalyzing(false);
        }
    };
    const estimatedBand = getEstimatedBand(rawScore * 4);

    return (
        <SidebarLayout>
            <div className="w-full min-h-full bg-gradient-to-br from-violet-100 via-fuchsia-50 to-indigo-100 pt-12 px-4 md:px-8 pb-10">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/ielts/listening"
                        className="inline-flex items-center gap-2 text-zinc-600 font-bold hover:text-zinc-900 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} /> Volver a Listening
                    </Link>

                    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/70 shadow-xl mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-white p-4 rounded-3xl shadow-sm">
                                        <Headphones className="text-purple-600" size={28} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                    Section {sectionIndex + 1}
                  </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-black text-zinc-900">
                                    {audioData?.title || sectionData.title}
                                </h1>
                                <p className="text-zinc-600 font-medium mt-2">
                                    {audioData?.description || "Listening practice section"}
                                </p>
                            </div>

                            <div className="min-w-[220px]">
                                <p className="text-sm font-bold text-zinc-500 mb-2">
                                    Progreso del examen
                                </p>
                                <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-zinc-600 mt-2 font-bold">{progress}% completado</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="animate-spin text-purple-600" size={32} />
                            </div>
                        ) : (
                            <div className="mt-8">
                                <audio controls className="w-full">
                                    <source src={audioData?.audio_url} type="audio/mpeg" />
                                    Tu navegador no soporta audio HTML5.
                                </audio>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/70 shadow-lg mb-8">
                        <h2 className="text-2xl font-black text-zinc-900 mb-3">Instrucciones</h2>
                        <p className="text-zinc-700 font-medium">{sectionData.instructions}</p>
                    </div>

                    <div className="space-y-6">
                        {sectionData.questions.map((question: ListeningQuestion) => (
                            <div
                                key={question.number}
                                className="bg-white/70 backdrop-blur-md rounded-[2rem] p-6 border border-white/70 shadow-lg"
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-lg font-black text-zinc-900">
                                            Question {question.number}
                                        </h3>
                                        {question.context && (
                                            <p className="text-sm font-bold text-purple-600 mt-1">
                                                {question.context}
                                            </p>
                                        )}
                                    </div>

                                    {submitted && (
                                        <div
                                            className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                                                isAnswerCorrect(answers[question.number] || "", question.acceptedAnswers)
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {isAnswerCorrect(answers[question.number] || "", question.acceptedAnswers)
                                                ? "Correcta"
                                                : "Incorrecta"}
                                        </div>
                                    )}
                                </div>

                                <p className="text-zinc-800 font-semibold text-lg mb-2">{question.prompt}</p>

                                {question.answerFormat && (
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide mb-4">
                                        {question.answerFormat}
                                    </p>
                                )}

                                <p className="text-zinc-700 font-medium mb-4">{question.prompt}</p>

                                {question.type === "text" ? (
                                    <input
                                        type="text"
                                        value={answers[question.number] || ""}
                                        onChange={(e) => handleAnswerChange(question.number, e.target.value)}
                                        className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-4 text-zinc-800 outline-none focus:ring-2 focus:ring-purple-300"
                                        placeholder={question.placeholder || "Escribe tu respuesta..."}
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        {question.options.map((option) => (
                                            <label
                                                key={option.label}
                                                className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-zinc-200 cursor-pointer hover:border-purple-300 transition-colors"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${question.number}`}
                                                    value={option.label}
                                                    checked={answers[question.number] === option.label}
                                                    onChange={(e) =>
                                                        handleAnswerChange(question.number, e.target.value)
                                                    }
                                                    className="mt-1"
                                                />
                                                <div>
                          <span className="font-black text-zinc-800 mr-2">
                            {option.label}
                          </span>
                                                    <span className="text-zinc-700">{option.text}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {submitted && !isAnswerCorrect(answers[question.number] || "", question.acceptedAnswers) && (
                                    <p className="mt-3 text-sm font-bold text-red-600">
                                        Respuesta esperada: {question.acceptedAnswers.join(" / ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- SECCIÓN DEL BOTÓN DE ACCIÓN (CORREGIDA) --- */}
                    {!submitted && (
                        <div className="mt-8 flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={analyzing}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Procesando respuestas...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Enviar y Analizar con IA
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* --- ESTADOS DE CARGA O ERROR DEL ANÁLISIS --- */}
                    {analyzing && analysisStatus === "processing" && (
                        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-2xl flex items-center gap-3 text-purple-900 font-bold shadow-sm animate-pulse">
                            <Loader2 className="animate-spin text-purple-600" size={24} />
                            <span>La IA está analizando tu desempeño. Esto puede tardar unos segundos...</span>
                        </div>
                    )}

                    {analysisStatus === "error" && (
                        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 font-bold shadow-sm flex items-center gap-2">
                            <span>⚠️ {analysisError || "No se pudo generar la retroalimentación con IA."}</span>
                        </div>
                    )}

                    {/* --- RESULTADOS Y RETROALIMENTACIÓN (Solo se muestra al enviar) --- */}
                    {submitted && (
                        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/70 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle2 className="text-green-600" size={28} />
                                <h2 className="text-2xl font-black text-zinc-900">Resultado de la sección</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                                    <p className="text-sm font-bold text-green-700">Aciertos</p>
                                    <p className="text-3xl font-black text-green-900">{rawScore}/10</p>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                                    <p className="text-sm font-bold text-purple-700">Score estimado global</p>
                                    <p className="text-3xl font-black text-purple-900">{rawScore * 4}/40</p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                                    <p className="text-sm font-bold text-blue-700">Band estimado</p>
                                    <p className="text-3xl font-black text-blue-900">{estimatedBand}</p>
                                </div>
                            </div>

                            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200">
                                <h3 className="text-xl font-black text-zinc-900 mb-4 flex items-center gap-2">
                                    <Sparkles className="text-purple-600" size={20} />
                                    Retroalimentación de IA
                                </h3>

                                {aiFeedback ? (
                                    <div className="prose prose-zinc max-w-none text-zinc-800 font-medium">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {aiFeedback}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-zinc-600 font-medium">
                                        <Loader2 className="animate-spin text-purple-600" size={20} />
                                        Esperando respuesta final del agente...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}