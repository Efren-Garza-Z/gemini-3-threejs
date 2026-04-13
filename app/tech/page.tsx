"use client"
import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import getTokenFromCookie from "@/services/api";
import { Loader2, Award, Terminal, Database } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Question {
    id: number;
    level: string; // "Básico", "Medio", "Alto"
    category: string; // "Java" o "SQL"
    question: string;
    options: string[];
}

export default function TechLevelTestPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
    const [status, setStatus] = useState("generando");
    const [taskId, setTaskId] = useState<string | null>(null);
    const [finalResult, setFinalResult] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const TOTAL_QUESTIONS = 30;

    useEffect(() => {
        const t = getTokenFromCookie();
        if (t) {
            setToken(t);
            generateTest(t);
        }
    }, []);

    const generateTest = async (t: string) => {
        const prompt = `Actúa como un reclutador técnico senior. Genera un examen de 30 preguntas: 15 de Java y 15 de SQL. 
        Distribución: 10 Nivel Medio, 20 Nivel Alto.
        En Java incluye: HashMap, POO, Excepciones y Multithreading.
        En SQL incluye: Joins complejos, Subqueries, Constraints (PK/FK) y Transacciones.
        Retorna UNICAMENTE un objeto JSON: 
        { "questions": [{ "id": 1, "level": "Alto", "category": "Java", "question": "...", "options": ["...", "..."], "correct_index": 0 }] }`;

        try {
            const data = await apiService.processExercise(prompt, t);
            setTaskId(data.task_id);
            setStatus("pendiente_preguntas");
        } catch (err) { setStatus("error"); }
    };

    // Polling (Se mantiene igual a tu lógica original)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (taskId && (status === "pendiente_preguntas" || status === "evaluando")) {
            interval = setInterval(async () => {
                if (!token) return;
                try {
                    const data = await apiService.checkStatus(taskId, token);
                    if (data.status === "finalizado") {
                        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
                        if (!jsonMatch) throw new Error("No JSON found");
                        const parsed = JSON.parse(jsonMatch[0]);

                        if (status === "pendiente_preguntas") {
                            setQuestions(parsed.questions);
                            setStatus("contestando");
                        } else {
                            setFinalResult(parsed);
                            setStatus("finalizado");
                        }
                        setTaskId(null);
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

    const handleFinish = async () => {
        setStatus("evaluando");
        const detailedAnswers = questions.map(q => ({
            question: q.question,
            category: q.category,
            user_answer: userAnswers[q.id] !== undefined ? q.options[userAnswers[q.id]] : "No contestada",
            level_tag: q.level
        }));

        const promptEval = `Actúa como un evaluador técnico. Analiza estas respuestas de un test de Java y SQL:
        ${JSON.stringify(detailedAnswers, null, 2)}
        REGLAS:
        1. Evalúa precisión técnica. 
        2. Determina el nivel final: "Junior Avanzado", "Semi-Senior" o "Senior".
        3. Da feedback específico por cada categoría (Java y SQL).
        4. Retorna SOLO JSON: { "correct_count": 0, "incorrect_count": 0, "feedback": "...", "nivel": "..." }`;

        try {
            if (!token) return;
            const data = await apiService.processExercise(promptEval, token);
            setTaskId(data.task_id);
        } catch (err) { setStatus("error"); }
    };

    if (status === "generando" || status === "pendiente_preguntas") {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
                <Loader2 size={48} className="text-blue-400 animate-spin mb-4" />
                <h2 className="text-3xl font-bold">Preparando entorno de evaluación...</h2>
                <p className="text-slate-400 mt-2">Configurando 30 desafíos de nivel medio y alto.</p>
            </div>
        );
    }

    if (status === "finalizado") {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-slate-800 rounded-[2rem] p-10 shadow-2xl text-center border-b-8 border-blue-500">
                    <Award size={60} className="mx-auto text-yellow-400 mb-4" />
                    <h1 className="text-3xl font-bold text-white">Resultado del Skill Test</h1>
                    <div className="my-6 p-6 bg-slate-700 rounded-2xl">
                        <p className="text-blue-400 font-black text-sm uppercase tracking-widest">Nivel Técnico Detectado</p>
                        <span className="text-5xl font-black text-white">{finalResult.nivel}</span>
                        <div className="flex justify-center gap-4 mt-4">
                            <span className="text-green-400 font-bold">Correctas: {finalResult.correct_count}</span>
                            <span className="text-red-400 font-bold">Incorrectas: {finalResult.incorrect_count}</span>
                        </div>
                    </div>
                    <p className="text-slate-300 mb-8 italic">{finalResult.feedback}</p>
                    <button onClick={() => window.location.href = "/home"} className="w-full bg-blue-600 py-4 rounded-xl font-bold text-white hover:bg-blue-500">Volver al Panel</button>
                </div>
            </div>
        );
    }

    const isTestIncomplete = Object.keys(userAnswers).length < TOTAL_QUESTIONS;

    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 text-white">
            <Navbar/>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 sticky top-20 z-20">
                    <div>
                        <h1 className="text-xl font-bold">Java & SQL Technical Assessment</h1>
                        <p className="text-slate-500 text-sm">30 preguntas • Nivel Medio/Alto</p>
                    </div>
                    <div className="bg-blue-600 px-4 py-2 rounded-lg font-bold">
                        {Object.keys(userAnswers).length} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="space-y-6">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                            <div className="flex gap-2 mb-4">
                                <span className="bg-blue-900/50 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">{q.category}</span>
                                <span className="bg-purple-900/50 text-purple-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">{q.level}</span>
                            </div>
                            <h3 className="text-lg font-medium mb-6">{idx + 1}. {q.question}</h3>
                            <div className="grid gap-3">
                                {q.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setUserAnswers({ ...userAnswers, [q.id]: i })}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                                            userAnswers[q.id] === i
                                                ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                                                : 'border-slate-800 bg-slate-800/50 hover:border-slate-600'
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
                    className="w-full font-bold py-5 rounded-xl bg-blue-600 disabled:bg-slate-700 transition-all text-white"
                >
                    {status === "evaluando" ? <Loader2 className="animate-spin mx-auto" /> : "Enviar Evaluación Técnica"}
                </button>
            </div>
        </main>
    );
}