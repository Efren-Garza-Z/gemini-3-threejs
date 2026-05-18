"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";
import grammarData from "@/data/grammar-units.json";
import DragDropSentence from "@/components/grammar-guide/DragDropSentence";
import TenseTimeline from "@/components/grammar-guide/TenseTimeline";
import { ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import getTokenFromCookie, { apiService } from "@/services/api";

export default function UnitPage() {
    const params = useParams();
    const router = useRouter();
    const unitId = Number(params.id);

    const unit = grammarData.find((u) => u.id === unitId);
    const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [errorCorrectionValue, setErrorCorrectionValue] = useState("");
    const [isSavingProgress, setIsSavingProgress] = useState(false);

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
        setCurrentExerciseIdx((prev) => prev + 1);
        setRevealed(false);
        setErrorCorrectionValue("");
    };

    const handleVerifyErrorCorrection = () => {
        const userAnswer = errorCorrectionValue.toLowerCase().trim();
        const correctAnswer = currentExercise.data?.correct?.toLowerCase().trim();

        if (userAnswer === correctAnswer) {
            handleNext();
        } else {
            setErrorCorrectionValue("");
            const inputEl = document.getElementById("error-correction-input") as HTMLInputElement | null;
            if (inputEl) {
                inputEl.placeholder = "Incorrecto. Intenta de nuevo...";
                inputEl.classList.add("border-red-400", "bg-red-50");
                setTimeout(() => {
                    inputEl.classList.remove("border-red-400", "bg-red-50");
                    inputEl.placeholder = "Type your answer here...";
                }, 2000);
            }
        }
    };

    const handleContinue = async () => {
        const token = getTokenFromCookie();

        if (!token) {
            router.push("/grammar-guide");
            return;
        }

        try {
            setIsSavingProgress(true);
            await apiService.saveCompletedActivity(unit.id, token);
        } catch (error) {
            console.error("Error al guardar progreso de grammar activity:", error);
        } finally {
            setIsSavingProgress(false);
            router.push("/grammar-guide");
        }
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
          <span className="text-sm font-black tracking-widest text-indigo-500 uppercase">
            Unit {unit.id}
          </span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-1">
                        {unit.title}
                    </h1>
                </div>

                <div className="mb-12">
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown
                            components={{
                                h3: ({ node, ...props }) => (
                                    <h3
                                        className="text-3xl font-black text-indigo-950 mb-6 pb-4 border-b-2 border-indigo-100 flex items-center gap-3"
                                        {...props}
                                    >
                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                      <BookOpen size={24} />
                    </span>
                                        {props.children}
                                    </h3>
                                ),
                                h4: ({ node, ...props }) => (
                                    <h4
                                        className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center gap-2"
                                        {...props}
                                    >
                                        <div className="w-2 h-6 bg-indigo-400 rounded-full"></div>
                                        {props.children}
                                    </h4>
                                ),
                                p: ({ node, ...props }) => (
                                    <p
                                        className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]"
                                        {...props}
                                    />
                                ),
                                ul: ({ node, ...props }) => <ul className="space-y-3 mb-6" {...props} />,
                                li: ({ node, ...props }) => (
                                    <li className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex items-start gap-3 hover:shadow-md transition-shadow relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-300 group-hover:bg-indigo-500 transition-colors"></div>
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
                                        <div className="text-gray-800 w-full">{props.children}</div>
                                    </li>
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong
                                        className="font-black text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded-md"
                                        {...props}
                                    />
                                ),
                                em: ({ node, ...props }) => {
                                    const isExample = props.children?.toString().includes("Example:");
                                    if (isExample) {
                                        return (
                                            <em
                                                className="text-orange-600 font-bold not-italic bg-orange-100 px-2 py-1 rounded-lg text-sm tracking-wide uppercase mr-2"
                                                {...props}
                                            />
                                        );
                                    }
                                    return (
                                        <em className="text-indigo-600 font-medium italic" {...props} />
                                    );
                                },
                            }}
                        >
                            {unit.content.explanation}
                        </ReactMarkdown>
                    </div>

                    {unit.content.timeline && (
                        <div className="mt-8 bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                            <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span className="bg-white p-1.5 rounded-lg text-indigo-500 shadow-sm">
                  ⏳
                </span>{" "}
                                Línea de Tiempo
                            </h4>
                            <TenseTimeline {...unit.content.timeline} />
                        </div>
                    )}
                </div>

                {!isCompleted ? (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Practice</h2>
                            <span className="text-gray-400 font-bold">
                {currentExerciseIdx + 1} / {unit.exercises.length}
              </span>
                        </div>

                        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                            <div
                                className="h-full bg-[#58cc02] transition-all duration-500"
                                style={{ width: `${(currentExerciseIdx / unit.exercises.length) * 100}%` }}
                            ></div>
                        </div>

                        {currentExercise.type === "DRAG_DROP" && (
                            <DragDropSentence
                                parts={currentExercise.data?.parts ?? []}
                                correctOrder={currentExercise.data?.correctOrder ?? []}
                                onSuccess={handleNext}
                            />
                        )}

                        {currentExercise.type === "ERROR_CORRECTION" && (
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-800 mb-4">
                                    {currentExercise.instruction}
                                </h3>

                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 font-medium text-lg mb-4 flex items-center line-through decoration-red-400 decoration-2">
                                    {currentExercise.data.incorrect}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-500 mb-2">
                                        Escribe la oración correcta:
                                    </label>

                                    <input
                                        id="error-correction-input"
                                        type="text"
                                        value={errorCorrectionValue}
                                        onChange={(e) => setErrorCorrectionValue(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition-all font-medium text-lg"
                                        placeholder="Type your answer here..."
                                    />
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleVerifyErrorCorrection}
                                        className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-bold py-4 px-8 rounded-2xl transition-all"
                                    >
                                        Verificar
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (!revealed) {
                                                setRevealed(true);
                                                setErrorCorrectionValue(currentExercise.data?.correct ?? "");
                                            } else {
                                                setErrorCorrectionValue("");
                                                handleNext();
                                            }
                                        }}
                                        className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-4 px-8 rounded-2xl transition-all"
                                    >
                                        {!revealed ? "Revelar Respuesta" : "Saltar"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-green-50 rounded-3xl border border-green-200 flex flex-col items-center">
                        <CheckCircle2 size={80} className="text-green-500 mb-6" />
                        <h2 className="text-3xl font-black text-green-800 mb-4">
                            Lesson Complete!
                        </h2>
                        <p className="text-green-700 font-medium mb-8">
                            You&apos;ve mastered this unit.
                        </p>
                        <button
                            onClick={handleContinue}
                            disabled={isSavingProgress}
                            className="bg-[#58cc02] hover:bg-[#46a302] text-white font-bold py-4 px-12 rounded-2xl shadow-[0_4px_0_rgb(60,138,2)] active:translate-y-[4px] active:shadow-none transition-all text-xl disabled:opacity-70"
                        >
                            {isSavingProgress ? "GUARDANDO..." : "CONTINUE"}
                        </button>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}