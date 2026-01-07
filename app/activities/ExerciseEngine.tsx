// app/activities/components/ExerciseEngine.tsx
"use client"
import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { Loader2, CheckCircle2, ArrowLeft, BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { ExerciseData } from "./data/exercises";

interface Props {
    data: ExerciseData;
    token: string | null;
    onBack: () => void;
}

export default function ExerciseEngine({ data, token, onBack }: Props) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [taskId, setTaskId] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);

    const colorMap: Record<string, { bg: string, text: string, border: string }> = {
        orange: {
            bg: "bg-orange-600",
            text: "text-orange-600",
            border: "focus:border-orange-400"
        },
        blue: {
            bg: "bg-blue-600",
            text: "text-blue-600",
            border: "focus:border-blue-400"
        },
        red: {
            bg: "bg-red-600",
            text: "text-red-600",
            border: "focus:border-red-400"
        },
        purple: {
            bg: "bg-purple-600",
            text: "text-purple-600",
            border: "focus:border-purple-400"
        },
        zinc: {
            bg: "bg-zinc-900",
            text: "text-zinc-900",
            border: "focus:border-zinc-400"
        },
        green: {
            bg: "bg-green-600",
            text: "text-green-600",
            border: "focus:border-green-400"
        },
        yellow: {
            bg: "bg-yellow-500",
            text: "text-yellow-500",
            border: "focus:border-yellow-400",
        },
        teal: {
            bg: "bg-teal-600",
            text: "text-teal-600",
            border: "focus:border-teal-400",
        },
        cyan: {
            bg: "bg-cyan-600",
            text: "text-cyan-600",
            border: "focus:border-cyan-400",
        },
        indigo: {
            bg: "bg-indigo-600",
            text: "text-indigo-600",
            border: "focus:border-indigo-400",
        },
        pink: {
            bg: "bg-pink-600",
            text: "text-pink-600",
            border: "focus:border-pink-400",
        },
        rose: {
            bg: "bg-rose-600",
            text: "text-rose-600",
            border: "focus:border-rose-400",
        },
        amber: {
            bg: "bg-amber-600",
            text: "text-amber-600",
            border: "focus:border-amber-400",
        },
        slate: {
            bg: "bg-slate-700",
            text: "text-slate-700",
            border: "focus:border-slate-400",
        },
    };

    // Mapeo de colores dinámicos para Tailwind
    const theme = colorMap[data.colorTheme] || colorMap.zinc;

    const handleInputChange = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (taskId && (status === "pendiente" || status === "en_proceso")) {
            interval = setInterval(async () => {
                try {
                    if (!token) return;
                    const res = await apiService.checkStatus(taskId, token);
                    setStatus(res.status);
                    if (res.status === "finalizado") {
                        setResult(res.result);
                        clearInterval(interval);
                    }
                } catch (err) {
                    setStatus("error");
                    clearInterval(interval);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [taskId, status, token]);

    const handleEvaluate = async () => {
        setStatus("pendiente");
        setResult(null);

        const fullSentencesWithAnswers = data.sentences.map((s) => {
            const userAnswer = answers[s.id] || "_______"; // Si no contestó, enviamos espacio en blanco
            return `Sentence ${s.id}: ${s.textBefore} [${userAnswer}] ${s.textAfter} (Verb to use: ${s.hint})`;
        }).join("\n");

        //const userResponses = Object.entries(answers).map(([id, val]) => `Space ${id}: ${val}`).join(", ");

        try {
            if (!token) return;
            const fullPrompt = `
            ${data.aiPrompt}
            
            Please evaluate these sentences completed by the student:
            ${fullSentencesWithAnswers}
            
            Instructions:
            1. Check if the answer in brackets [] is grammatically correct for the context.
            2. Provide a brief explanation in Spanish about any mistakes or why it is correct.
        `.trim();
            const res = await apiService.processExercise(fullPrompt, token);
            setTaskId(res.task_id);
        } catch (error) { setStatus("error"); }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 mt-10 w-full max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 cursor-pointer text-zinc-800 font-bold hover:text-zinc-600 transition-colors">
                <ArrowLeft size={20} /> Volver a Actividades
            </button>

            {/* Grammar Section Dinámica */}
            <section className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-xl space-y-6">
                <div className="flex gap-4 items-center border-b border-white/20 pb-4">
                    <div className={`${theme.bg} p-3 rounded-2xl text-white`}>
                        <data.icon size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-zinc-800">Lección: {data.grammarTip.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/30 p-5 rounded-2xl border border-white/20">
                        <p className={`font-bold ${theme.text} mb-1 italic`}>Estructura:</p>
                        <p className="text-sm text-zinc-800 font-bold">{data.grammarTip.structure}</p>
                        {data.grammarTip.extraNote && <p className="text-xs text-zinc-600 mt-2 italic">* {data.grammarTip.extraNote}</p>}
                    </div>
                    <div className="bg-white/30 p-5 rounded-2xl border border-white/20">
                        <p className={`font-bold ${theme.text} mb-1 italic`}>Ejemplos:</p>
                        {data.grammarTip.examples.map((ex, i) => (
                            <p key={i} className="text-sm text-zinc-700">"{ex}"</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exercise Section Dinámica */}
            <section className="bg-white/20 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/30 shadow-2xl">
                <h3 className="text-3xl font-black text-zinc-800 mb-8 tracking-tight text-center italic">{data.description}</h3>

                <div className="space-y-6 text-lg text-zinc-800 leading-relaxed bg-white/10 p-6 rounded-3xl">
                    {data.sentences.map((s) => (
                        <p key={s.id}>
                            {s.textBefore}
                            <input
                                type="text"
                                onChange={(e) => handleInputChange(s.id, e.target.value)}
                                placeholder={`(${s.id})`}
                                className={`mx-2 bg-white/60 border-b-2 border-zinc-400 outline-none px-2 w-36 text-center ${theme.border} focus:bg-white transition-all rounded-t-lg text-base font-bold text-zinc-900`}
                            />
                            {s.textAfter} <span className="text-zinc-500 text-sm italic">({s.hint})</span>
                        </p>
                    ))}
                </div>

                <button
                    onClick={handleEvaluate}
                    disabled={status === "pendiente" || status === "en_proceso"}
                    className={`mt-12  md:w-auto ${theme.bg} text-white px-12 py-4 rounded-2xl font-black  transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95`}
                >
                    {status === "pendiente" || status === "en_proceso" ? <Loader2 className="animate-spin" /> : "Verificar Respuestas"}
                </button>
            </section>

            {/* Result Section */}
            {status !== "" && (
                <section className="animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/60 backdrop-blur-lg rounded-[32px] p-8 border border-white/50 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            {status === "finalizado" ? <CheckCircle2 className="text-blue-600" /> : <Loader2 className="animate-spin text-zinc-600" />}
                            <h3 className="text-xl font-bold text-zinc-800">
                                {status === "finalizado" ? "Corrección de la IA" : "Analizando gramática..."}
                            </h3>
                        </div>

                        {result && (
                            <div className="prose prose-blue max-w-none text-zinc-700 bg-white/40 p-6 rounded-2xl border border-white/20 shadow-inner">
                                <ReactMarkdown>{result}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}