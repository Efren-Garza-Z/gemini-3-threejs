"use client"
import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import getTokenFromCookie from "@/services/api";
import { Loader2, CheckCircle2, Award, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Question {
    id: number;
    level: string;
    question: string;
    options: string[];
}

export default function LevelTestPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
    const [status, setStatus] = useState("generando"); // generando, pendiente_preguntas, contestando, evaluando, finalizado
    const [taskId, setTaskId] = useState<string | null>(null);
    const [finalResult, setFinalResult] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = getTokenFromCookie();
        if (t) {
            setToken(t);
            generateTest();
        }
    }, []);

    // 1. GENERAR EL TEST
    const generateTest = async () => {
        const prompt = `Generate a 48-question English placement test. 8 questions each for A1, A2, B1, B2, C1. Return ONLY a JSON object: { "questions": [{ "id": 1, "level": "A1", "question": "...", "options": ["...", "..."], "correct_index": 0 }] }`;
        try {
            const data = await apiService.processExercise(prompt);
            setTaskId(data.task_id);
            setStatus("pendiente_preguntas");
        } catch (err) { setStatus("error"); }
    };

    // Polling para recuperar preguntas o resultados
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (taskId && (status === "pendiente_preguntas" || status === "evaluando")) {
            interval = setInterval(async () => {
                if (!token) return;
                try {
                    const data = await apiService.checkStatus(taskId);

                    if (data.status === "finalizado") {
                        // Limpieza robusta con Regex para extraer solo el contenido entre llaves
                        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
                        if (!jsonMatch) throw new Error("No JSON found in response");

                        const parsed = JSON.parse(jsonMatch[0]);

                        if (status === "pendiente_preguntas") {
                            setQuestions(parsed.questions);
                            setStatus("contestando");
                        } else {
                            // Estamos en etapa de evaluación final
                            setFinalResult(parsed);

                            // --- INTEGRACIÓN DEL PATCH ---
                            const session = JSON.parse(localStorage.getItem("user_session") || "{}");
                            const userEmail = session.email;

                            if (userEmail) {
                                await apiService.updateUserLanguage(userEmail, {
                                    language_level: parsed.nivel,
                                    target_language: "English"
                                }, token);

                                // Actualizamos también la sesión local para que el resto de la app lo sepa
                                session.language_level = parsed.nivel;
                                localStorage.setItem("user_session", JSON.stringify(session));
                            }

                            setStatus("finalizado");
                        }
                        setTaskId(null);
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error("Error en polling:", err);
                    setStatus("error");
                    clearInterval(interval);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [taskId, status, token]);

    // 2. ENVIAR PARA EVALUACIÓN
    const handleFinish = async () => {
        setStatus("evaluando");

        const detailedAnswers = questions.map(q => {
            const answerIndex = userAnswers[q.id];
            return {
                question: q.question,
                user_answer: answerIndex !== undefined ? q.options[answerIndex] : "Not answered",
                level_tag: q.level
            };
        });

        const promptEval = `Act as an expert CEFR English examiner. Analyze the following list of questions and the student's selected answers:
        ${JSON.stringify(detailedAnswers, null, 2)}

        STRICT RULES:
        1. Evaluate each answer based on standard English grammar and the CEFR framework (A1 to C2).
        2. Any "Not answered" entry must be counted as incorrect.
        3. Determine the final level (nivel) based on the overall performance.
        4. Provide constructive feedback in Spanish.
        5. Return ONLY a valid JSON object. No prose.

        REQUIRED JSON STRUCTURE:
        {
            "correct_count": 0,
            "incorrect_count": 0,
            "feedback": "...",
            "nivel": "B2"
        }`;

        try {
            if (!token) return;
            const data = await apiService.processExercise(promptEval);
            setTaskId(data.task_id);
        } catch (err) { setStatus("error"); }
    };

    // --- RENDERIZADOS DE ESTADO ---

    if (status === "generando" || status === "pendiente_preguntas") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex flex-col items-center justify-center p-6 text-center">
                <Navbar/>
                <Loader2 size={48} className="text-white animate-spin mb-4" />
                <h2 className="text-3xl font-black text-white">IA creando tu examen...</h2>
                <p className="text-white/80 mt-2 font-medium">Gemini está formulando 48 preguntas para medir tu nivel real.</p>
            </div>
        );
    }

    if (status === "finalizado") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex items-center justify-center p-4">
                <Navbar/>
                <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center border-t-8 border-orange-400 animate-in zoom-in duration-300">
                    <Award size={80} className="mx-auto text-orange-400 mb-6" />
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tight">¡Test Completado!</h1>
                    <div className="my-8 space-y-2 p-6 bg-orange-50 rounded-3xl border border-orange-100">
                        <p className="text-zinc-500 uppercase font-black tracking-widest text-xs">Tu nivel asignado es:</p>
                        <span className="text-7xl font-black text-orange-500">{finalResult.nivel}</span>
                    </div>
                    <p className="text-zinc-700 leading-relaxed mb-8 font-medium italic">"{finalResult.feedback}"</p>
                    <button
                        onClick={() => window.location.href = "/home"}
                        className="w-full bg-orange-200 text-orange-950 py-5 rounded-2xl font-black text-lg hover:bg-orange-300 transition-all shadow-lg active:scale-95"
                    >
                        Comenzar mi viaje
                    </button>
                </div>
            </div>
        );
    }

    const isTestIncomplete = Object.keys(userAnswers).length < 48;

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-24 pb-20 px-4">
            <Navbar/>
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl sticky top-24 z-10 border border-white/50">
                    <div>
                        <h1 className="text-2xl font-black text-zinc-900">Placement Test</h1>
                        <p className="text-zinc-600 text-sm font-medium">Responde lo mejor que puedas.</p>
                    </div>
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-2xl font-black shadow-inner">
                        {Object.keys(userAnswers).length} / 48
                    </div>
                </div>

                <div className="space-y-6">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="bg-white/90 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/40 shadow-lg hover:shadow-xl transition-all">
                            <span className="text-[10px] font-black text-orange-600 uppercase bg-orange-100 px-4 py-1.5 rounded-full tracking-widest">{q.level}</span>
                            <h3 className="text-xl font-bold text-zinc-800 mt-4 mb-6 leading-tight">{idx + 1}. {q.question}</h3>
                            <div className="grid gap-3">
                                {q.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setUserAnswers({ ...userAnswers, [q.id]: i })}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold ${
                                            userAnswers[q.id] === i
                                                ? 'border-orange-400 bg-orange-200 text-orange-950 shadow-lg'
                                                : 'border-zinc-100 bg-white/50 hover:border-orange-200 text-zinc-700'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleFinish}
                    disabled={status === "evaluando" || isTestIncomplete}
                    className={`w-full font-black py-6 rounded-[2rem] shadow-2xl transition-all text-xl active:scale-95 ${
                        isTestIncomplete
                            ? 'bg-zinc-300 cursor-not-allowed text-zinc-500'
                            : 'bg-orange-200 text-orange-950 hover:bg-orange-300'
                    }`}
                >
                    {status === "evaluando" ? <Loader2 className="animate-spin mx-auto" /> :
                        isTestIncomplete ? `Faltan ${48 - Object.keys(userAnswers).length} respuestas` : "Finalizar y Ver Mi Nivel"}
                </button>
            </div>
        </main>
    );
}