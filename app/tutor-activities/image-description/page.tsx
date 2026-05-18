"use client";

import React, { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { ArrowLeft, CheckCircle2, MessageSquare, Loader2, Info, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import ReactMarkdown from "react-markdown";
import {practiceImages, speakingTips} from "../data/images";

export default function ImageDescriptionPage() {
    const router = useRouter();
    const [currentImage, setCurrentImage] = useState(practiceImages[0]);
    const [description, setDescription] = useState("");

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Seleccionar imagen aleatoria al cargar
    useEffect(() => {
        pickRandomImage();
    }, []);

    const pickRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * practiceImages.length);
        setCurrentImage(practiceImages[randomIndex]);
        setDescription("");
        setFeedback(null);
    };

    const handleAnalyze = async () => {
        if (!description.trim()) return;
        setIsAnalyzing(true);
        setFeedback(null);

        const prompt = `Eres un profesor de inglés evaluando la descripción de una imagen. 
Descripción del estudiante: "${description}"
Analiza si la gramática, vocabulario y estructura de la descripción son correctos y proporciona feedback constructivo en Markdown. Menciona qué elementos de la imagen capturó bien y qué le faltó.`;

        try {
            // El endpoint y el archivo (en public/images/)
            const taskRes = await apiService.processFile(prompt, currentImage.path);
            const taskId = taskRes.task_id;

            // Polling cada 10 segundos
            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await apiService.checkFileStatus(taskId);
                    if (statusRes.status === "finalizado") {
                        clearInterval(pollInterval);
                        setIsAnalyzing(false);
                        setFeedback(statusRes.result);
                    } else if (statusRes.status === "failed") {
                        clearInterval(pollInterval);
                        setIsAnalyzing(false);
                        setFeedback("Hubo un error al analizar la imagen. Por favor, intenta de nuevo.");
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

    return (
        <SidebarLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <button
                    onClick={() => router.push("/tutor-activities")}
                    className="flex items-center text-gray-400 hover:text-gray-600 font-bold mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Volver a Actividades
                </button>

                <div className="mb-8">
                    <span className="text-sm font-black tracking-widest text-orange-500 uppercase">Tutor Virtual</span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-1">Describir una Imagen</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar: Tips */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
                            <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                                <Info size={20} className="text-orange-500" /> Cómo empezar
                            </h3>
                            <ul className="space-y-4 text-sm text-orange-800 font-medium">
                                {speakingTips.map((tip) => (
                                    <li
                                        key={tip.id}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100/50 hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600">
              {tip.title}
            </span>
                                            <p className="text-zinc-800 font-semibold text-base">
                                                {tip.example}
                                            </p>
                                            {tip.description && (
                                                <p className="text-zinc-500 text-xs font-normal mt-1">
                                                    {tip.description}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Area: Image & Input */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border-2 border-gray-100">
                            <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-6 bg-gray-100 group">
                                {/* Usamos img genérico para simplificar, en producción podría ser Next Image */}
                                <img 
                                    src={currentImage.path} 
                                    alt="Practice Image" 
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        // Fallback visual si la imagen no existe
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400 font-medium bg-gray-100">Agrega tu imagen en ' + currentImage.path + '</div>';
                                    }}
                                />
                                <button 
                                    onClick={pickRandomImage}
                                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-700 hover:text-orange-600 p-3 rounded-full shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100"
                                    title="Cambiar imagen"
                                >
                                    <RefreshCw size={20} />
                                </button>
                            </div>

                            <label className="block text-gray-700 font-bold mb-3 text-lg">
                                Describe lo que ves:
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="In this picture, I can see..."
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-gray-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-medium min-h-[150px] resize-y"
                            />
                        </div>

                        {/* Analyze Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !description.trim()}
                                className={`flex items-center gap-2 font-bold py-4 px-10 rounded-2xl transition-all ${
                                    isAnalyzing || !description.trim()
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-y-[4px]"
                                        : "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_4px_0_rgb(194,65,12)] hover:shadow-[0_2px_0_rgb(194,65,12)] hover:translate-y-[2px]"
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
