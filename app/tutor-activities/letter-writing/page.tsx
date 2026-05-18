"use client";

import React, { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { ArrowLeft, CheckCircle2, MessageSquare, Loader2, Info, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import ReactMarkdown from "react-markdown";
import { letterTemplates, LetterTemplate } from "../data/letters";

export default function LetterWritingPage() {
    const router = useRouter();
    const [template, setTemplate] = useState<LetterTemplate | null>(null);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        pickRandomTemplate();
    }, []);

    const pickRandomTemplate = () => {
        const randomIndex = Math.floor(Math.random() * letterTemplates.length);
        const selected = letterTemplates[randomIndex];
        setTemplate(selected);
        
        // Inicializar los inputs vacíos según la plantilla seleccionada
        const initialInputs: Record<string, string> = {};
        selected.parts.forEach(part => {
            if (part.type === "input") {
                initialInputs[part.id] = "";
            }
        });
        setInputs(initialInputs);
        setFeedback(null);
    };

    const handleInputChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const handleAnalyze = async () => {
        if (!template) return;
        setIsAnalyzing(true);
        setFeedback(null);

        // Reconstruir el texto completo
        let fullText = "";
        template.parts.forEach(part => {
            if (part.type === "text") {
                fullText += part.content;
            } else if (part.type === "input") {
                fullText += inputs[part.id] || `[${part.placeholder}]`;
            }
        });

        const prompt = `Eres profesor de inglés y debes analizar esta carta escrita por un estudiante. La estructura esperada es: "${template.title}".
Corrige errores gramaticales, de vocabulario o de formalidad, y dale tips de mejora. Usa un tono amigable, de profesor a alumno. Formatea tu respuesta en Markdown.

Carta del estudiante:
"""
${fullText}
"""
`;

        try {
            const taskRes = await apiService.processExercise(prompt);
            const taskId = taskRes.task_id;

            // Polling
            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await apiService.checkStatus(taskId);
                    if (statusRes.status === "finalizado") {
                        clearInterval(pollInterval);
                        setIsAnalyzing(false);
                        setFeedback(statusRes.result);
                    } else if (statusRes.status === "failed") {
                        clearInterval(pollInterval);
                        setIsAnalyzing(false);
                        setFeedback("Hubo un error al analizar la carta. Por favor, intenta de nuevo.");
                    }
                } catch (e) {
                    clearInterval(pollInterval);
                    setIsAnalyzing(false);
                    setFeedback("Error de conexión al consultar el estado.");
                }
            }, 10000);
        } catch (error) {
            setIsAnalyzing(false);
            setFeedback("No se pudo iniciar el análisis. Verifica tu conexión.");
        }
    };

    if (!template) return null;

    return (
        <SidebarLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => router.push("/tutor-activities")}
                        className="flex items-center text-gray-400 hover:text-gray-600 font-bold transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Volver a Actividades
                    </button>
                    <button 
                        onClick={pickRandomTemplate}
                        className="flex items-center gap-2 text-teal-600 bg-teal-50 px-4 py-2 rounded-xl font-bold hover:bg-teal-100 transition-colors"
                    >
                        <RefreshCw size={18} /> Cambiar Estructura
                    </button>
                </div>

                <div className="mb-8">
                    <span className="text-sm font-black tracking-widest text-teal-500 uppercase">Tutor Virtual</span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-1">{template.title}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar: Tips */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
                            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <Info size={20} className="text-blue-500" /> Tips de Escritura
                            </h3>
                            <ul className="space-y-4 text-sm text-blue-800 font-medium">
                                {template.tips.map((tip, index) => (
                                    <li key={index} className="bg-white p-3 rounded-2xl shadow-sm">
                                        <strong>{tip.title}:</strong> {tip.content}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Area: The Letter */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border-2 border-gray-100 text-lg leading-loose text-gray-700">
                            {template.parts.map((part, index) => {
                                if (part.type === "text") {
                                    return (
                                        <React.Fragment key={index}>
                                            {part.content.split('\n').map((line, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i < arr.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    );
                                } else if (part.type === "input") {
                                    return (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={part.placeholder}
                                            className={`border-b-2 border-gray-300 focus:border-teal-500 outline-none px-2 py-1 text-teal-700 font-medium ${part.width} transition-colors bg-gray-50 focus:bg-white rounded-t-md`}
                                            value={inputs[part.id] || ""}
                                            onChange={(e) => handleInputChange(part.id, e.target.value)}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Analyze Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className={`flex items-center gap-2 font-bold py-4 px-10 rounded-2xl transition-all shadow-[0_4px_0_rgb(13,148,136)] ${
                                    isAnalyzing
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-y-[4px]"
                                        : "bg-teal-500 hover:bg-teal-600 text-white hover:shadow-[0_2px_0_rgb(13,148,136)] hover:translate-y-[2px]"
                                }`}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} /> Analizando...
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare size={24} /> Analizar con Tutor IA
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Feedback Section */}
                        {feedback && (
                            <div className="bg-green-50 border border-green-200 p-8 rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-2xl font-black text-green-900 mb-6 flex items-center gap-3">
                                    <CheckCircle2 size={32} className="text-green-500" /> Feedback del Tutor
                                </h3>
                                <div className="prose prose-green prose-lg max-w-none text-green-900 font-medium">
                                    <ReactMarkdown>{feedback}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
