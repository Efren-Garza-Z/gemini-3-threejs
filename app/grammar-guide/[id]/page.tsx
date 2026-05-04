"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";
import grammarData from "@/data/grammar-units.json";
import DragDropSentence from "@/components/grammar-guide/DragDropSentence";
import TenseTimeline from "@/components/grammar-guide/TenseTimeline";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function UnitPage() {
    const params = useParams();
    const router = useRouter();
    const unitId = Number(params.id);
    
    const unit = grammarData.find(u => u.id === unitId);
    const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);

    if (!unit) {
        return (
            <SidebarLayout>
                <div className="p-8">Unit not found</div>
            </SidebarLayout>
        );
    }

    const currentExercise = unit.exercises[currentExerciseIdx];
    const isCompleted = currentExerciseIdx >= unit.exercises.length;

    const handleNext = () => {
        setCurrentExerciseIdx(prev => prev + 1);
        setRevealed(false);
    };

    return (
        <SidebarLayout>
            <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
                <button 
                    onClick={() => router.push("/grammar-guide")}
                    className="flex items-center text-gray-400 hover:text-gray-600 font-bold mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Units
                </button>

                <div className="mb-8">
                    <span className="text-sm font-black tracking-widest text-indigo-500 uppercase">Unit {unit.id}</span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-1">{unit.title}</h1>
                </div>

                {/* Content Explanation */}
                <div className="bg-indigo-50 rounded-3xl p-6 md:p-8 mb-10 border border-indigo-100">
                    <div className="prose prose-indigo prose-lg max-w-none text-indigo-900 mb-6 font-medium">
                        <ReactMarkdown>{unit.content.explanation}</ReactMarkdown>
                    </div>
                    {unit.content.timeline && (
                        <TenseTimeline {...unit.content.timeline} />
                    )}
                </div>

                {/* Exercises Area */}
                {!isCompleted ? (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Practice</h2>
                            <span className="text-gray-400 font-bold">{currentExerciseIdx + 1} / {unit.exercises.length}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                            <div 
                                className="h-full bg-[#58cc02] transition-all duration-500"
                                style={{ width: `${(currentExerciseIdx / unit.exercises.length) * 100}%` }}
                            ></div>
                        </div>

                        {currentExercise.type === "DRAG_DROP" && (
                            <DragDropSentence 
                                parts={currentExercise.data.parts} 
                                correctOrder={currentExercise.data.correctOrder}
                                onSuccess={handleNext}
                            />
                        )}

                        {currentExercise.type === "ERROR_CORRECTION" && (
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-800 mb-4">{currentExercise.instruction}</h3>
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 font-medium text-lg mb-4 flex items-center line-through decoration-red-400 decoration-2">
                                    {currentExercise.data.incorrect}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-500 mb-2">Escribe la oración correcta:</label>
                                    <input 
                                        id="error-correction-input"
                                        type="text" 
                                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition-all font-medium text-lg"
                                        placeholder="Type your answer here..."
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const val = (e.target as HTMLInputElement).value;
                                                if (val.toLowerCase().trim() === currentExercise.data.correct.toLowerCase().trim()) {
                                                    handleNext();
                                                } else {
                                                    const target = e.target as HTMLInputElement;
                                                    target.value = "";
                                                    target.placeholder = "Incorrecto. Intenta de nuevo...";
                                                    target.classList.add("border-red-400", "bg-red-50");
                                                    setTimeout(() => {
                                                        target.classList.remove("border-red-400", "bg-red-50");
                                                        target.placeholder = "Type your answer here...";
                                                    }, 2000);
                                                }
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-gray-400 mt-2">Presiona Enter para verificar.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (!revealed) {
                                            setRevealed(true);
                                            const inputEl = document.getElementById("error-correction-input") as HTMLInputElement;
                                            if (inputEl) inputEl.value = currentExercise.data.correct;
                                        } else {
                                            const inputEl = document.getElementById("error-correction-input") as HTMLInputElement;
                                            if (inputEl) inputEl.value = "";
                                            handleNext();
                                        }
                                    }}
                                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-4 px-8 rounded-2xl transition-all"
                                >
                                    {!revealed ? "Revelar Respuesta" : "Saltar"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-green-50 rounded-3xl border border-green-200 flex flex-col items-center">
                        <CheckCircle2 size={80} className="text-green-500 mb-6" />
                        <h2 className="text-3xl font-black text-green-800 mb-4">Lesson Complete!</h2>
                        <p className="text-green-700 font-medium mb-8">You've mastered this unit.</p>
                        <button
                            onClick={() => router.push("/grammar-guide")}
                            className="bg-[#58cc02] hover:bg-[#46a302] text-white font-bold py-4 px-12 rounded-2xl shadow-[0_4px_0_rgb(60,138,2)] active:translate-y-[4px] active:shadow-none transition-all text-xl"
                        >
                            CONTINUE
                        </button>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
