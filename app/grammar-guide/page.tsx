"use client";

import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { useRouter } from "next/navigation";
import grammarData from "@/data/grammar-units.json";
import { Book, CheckCircle, Lock } from "lucide-react";

export default function GrammarGuideDashboard() {
    const router = useRouter();
    const [filterLevel, setFilterLevel] = useState("ALL");

    const levels = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    const filteredUnits = filterLevel === "ALL" 
        ? grammarData 
        : grammarData.filter(u => u.level === filterLevel);

    return (
        <SidebarLayout>
            <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] p-8 md:p-12 mb-10 text-white shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-black mb-4">English Mastery Guide</h1>
                    <p className="text-indigo-100 font-medium text-lg max-w-xl">
                        120 interactive units based on the visual learning method. Master tenses, rules, and avoid common mistakes.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                    {levels.map(level => (
                        <button
                            key={level}
                            onClick={() => setFilterLevel(level)}
                            className={`
                                px-6 py-2 rounded-full font-bold text-sm tracking-wide whitespace-nowrap transition-all
                                ${filterLevel === level 
                                    ? "bg-indigo-600 text-white shadow-md" 
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
                            `}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Units List */}
                <div className="space-y-4 pb-12">
                    {filteredUnits.map((unit, index) => {
                        const isLocked = unit.exercises && unit.exercises.length === 0; // Lock if no content yet

                        return (
                            <button
                                key={unit.id}
                                onClick={() => !isLocked && router.push(`/grammar-guide/${unit.id}`)}
                                className={`
                                    w-full flex items-center p-5 rounded-3xl border-2 text-left transition-all
                                    ${isLocked 
                                        ? "bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed" 
                                        : "bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-md cursor-pointer group"}
                                `}
                            >
                                <div className={`
                                    w-14 h-14 rounded-2xl flex items-center justify-center mr-6
                                    ${isLocked ? "bg-gray-200 text-gray-400" : "bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform"}
                                `}>
                                    {isLocked ? <Lock size={24} /> : <Book size={24} />}
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black tracking-widest text-gray-400 uppercase">Unit {unit.id}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                        <span className="text-xs font-bold text-indigo-500">{unit.category}</span>
                                    </div>
                                    <h3 className={`text-xl font-bold ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
                                        {unit.title}
                                    </h3>
                                </div>

                                {!isLocked && (
                                    <div className="hidden md:flex items-center text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ChevronRight size={20} className="ml-1" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </SidebarLayout>
    );
}

// Temporary ChevronRight for this file
const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
