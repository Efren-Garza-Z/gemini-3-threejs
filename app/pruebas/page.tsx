"use client"
import { useState, useEffect } from "react";
import Navbar from "@/app/navbar/Navbar";
import getTokenFromCookie, { apiService } from "@/services/api";

import { Loader2, CheckCircle2, BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// 1. DEFINICIÓN DEL COMPONENTE AUXILIAR
function CustomInput({ id, value, onChange }: { id: string, value: string, onChange: (id: string, v: string) => void }) {
    return (
        <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={`(${id})`}
            className="mx-2 bg-white/60 border-b-2 border-zinc-400 outline-none px-2 w-28 text-center focus:border-[#fcb69f] focus:bg-white transition-all rounded-t-lg text-base font-bold text-zinc-900"
        />
    );
}

export default function PruebasPage() {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [token, setToken] = useState<string | null>(null)
    const [taskId, setTaskId] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);

    const handleInputChange = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        const savedToken = getTokenFromCookie()
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    // Lógica de Polling corregida con dependencias
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (taskId && (status === "pendiente" || status === "en_proceso")) {
            interval = setInterval(async () => {
                try {
                    if (!token) return
                    const data = await apiService.checkStatus(taskId, token);
                    setStatus(data.status);
                    if (data.status === "finalizado") {
                        setResult(data.result);
                        clearInterval(interval);
                    }
                } catch (err) {
                    setStatus("error");
                    clearInterval(interval);
                }
            }, 3000);
        }

        return () => clearInterval(interval);
    }, [taskId, status, token]); // <--- Agregado 'token' aquí

    const handleEvaluate = async () => {
        setStatus("pendiente");
        setResult(null);

        const userResponses = Object.entries(answers)
            .map(([id, val]) => `Space ${id}: ${val}`)
            .join(", ");

        try {
            if (!token) return
            const fullPrompt = `Evaluate the following English exercise in Simple Present. The student provided these answers: ${userResponses}. Check for correct third-person conjugation (-s/-es) and general grammar.. Al final da una explicacion breve en español de porque esta bien.`;
            const data = await apiService.processExercise(fullPrompt, token);
            setTaskId(data.task_id);
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <main className="h-screen w-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] flex flex-col pt-24 px-4 overflow-y-auto pb-10">
            <Navbar />

            <div className="max-w-4xl mx-auto w-full space-y-6">
                <section className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/40 shadow-xl flex gap-6 items-start">
                    <div className="bg-zinc-900 p-4 rounded-2xl text-white hidden md:block">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-zinc-800 mb-2">Grammar Tip: Present Simple</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-700">
                            <div className="bg-white/30 p-3 rounded-xl border border-white/20">
                                <p className="font-bold text-zinc-900">Estructura:</p>
                                <p>Sujeto + Verbo (base) + Complemento</p>
                                <p className="mt-1 text-xs italic">* Añade -s/es para He, She, It</p>
                            </div>
                            <div className="bg-white/30 p-3 rounded-xl border border-white/20">
                                <p className="font-bold text-zinc-900">Ejemplo:</p>
                                {/* Reemplazo de comillas por entidades HTML */}
                                <p>&quot;I **work** every day&quot;</p>
                                <p>&quot;She **works** every day&quot;</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white/20 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/30 shadow-2xl">
                    <h3 className="text-3xl font-black text-zinc-800 mb-8 tracking-tight">Daily Routine Story</h3>

                    <div className="space-y-6 text-lg text-zinc-800 leading-relaxed">
                        <p>1. Every day, Mark <CustomInput id="1" value={answers["1"]} onChange={handleInputChange} /> (wake) up early.</p>
                        <p>2. He <CustomInput id="2" value={answers["2"]} onChange={handleInputChange} /> (brush) his teeth and goes to the kitchen.</p>
                        <p>3. His parents <CustomInput id="3" value={answers["3"]} onChange={handleInputChange} /> (cook) breakfast for the whole family.</p>
                        {/* Reemplazo de comillas en el texto del ejercicio */}
                        <p>4. &quot;I <CustomInput id="4" value={answers["4"]} onChange={handleInputChange} /> (love) fresh coffee,&quot; Mark says.</p>
                        <p>5. After breakfast, he <CustomInput id="5" value={answers["5"]} onChange={handleInputChange} /> (walk) to the bus station.</p>
                        <p>6. The bus <CustomInput id="6" value={answers["6"]} onChange={handleInputChange} /> (arrive) at exactly 8:00 AM.</p>
                        <p>7. At work, he <CustomInput id="7" value={answers["7"]} onChange={handleInputChange} /> (write) many emails.</p>
                        <p>8. His colleagues <CustomInput id="8" value={answers["8"]} onChange={handleInputChange} /> (help) him with difficult tasks.</p>
                        <p>9. In the evening, they <CustomInput id="9" value={answers["9"]} onChange={handleInputChange} /> (play) soccer in the park.</p>
                        <p>10. Finally, Mark <CustomInput id="10" value={answers["10"]} onChange={handleInputChange} /> (go) to bed at 10:00 PM.</p>
                    </div>

                    <button
                        onClick={handleEvaluate}
                        disabled={status === "pendiente" || status === "en_proceso"}
                        className="mt-12 w-full md:w-auto bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-lg"
                    >
                        {status === "pendiente" || status === "en_proceso" ? <Loader2 className="animate-spin" /> : "Evaluar Ejercicio"}
                    </button>
                </section>

                {status !== "" && (
                    <section className="animate-in slide-in-from-top-4 duration-500">
                        <div className="bg-white/60 backdrop-blur-lg rounded-[32px] p-8 border border-white/50 shadow-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                {status === "finalizado" ? <CheckCircle2 className="text-green-600" /> : <Loader2 className="animate-spin text-zinc-600" />}
                                <h3 className="text-xl font-bold text-zinc-800">
                                    {status === "pendiente" && "Enviando a Gemini..."}
                                    {status === "en_proceso" && "ICB está analizando tu respuesta..."}
                                    {status === "finalizado" && "Resultado del Análisis"}
                                    {status === "error" && "Hubo un error en la conexión"}
                                </h3>
                            </div>

                            {result && (
                                <div className="prose prose-zinc max-w-none text-zinc-700 bg-white/40 p-6 rounded-2xl border border-white/20">
                                    <ReactMarkdown>{result}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}