"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, GraduationCap, CheckCircle, BookOpen, Clock } from "lucide-react";

export default function HomeClient() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("TODAS");

    const tabs = ["TODAS", "GRAMÁTICA", "VOCABULARIO", "VERBOS", "IELTS"];

    const modules = [
        {
            title: "English Mastery Guide",
            description: "Interactive Grammar Guide based on 'English for Everyone'. Drag & drop, quizzes, and more.",
            icon: <BookOpen size={32} />,
            color: "blue",
            path: "/grammar-guide",
            progress: "1/120",
            category: "GRAMÁTICA",
            badge: "NUEVO"
        },
        {
            title: "Vocabulario Inteligente",
            description: "Memoriza y evalúa con IA",
            icon: <GraduationCap size={32} />,
            color: "teal",
            path: "/vocabulary",
            progress: "12/50",
            category: "VOCABULARIO"
        },
        {
            title: "Verbos Maestros",
            description: "Tabla dinámica de 3 tiempos",
            icon: <CheckCircle size={32} />,
            color: "indigo",
            path: "/verbs",
            progress: "5/10",
            category: "VERBOS"
        },
        {
            title: "IELTS Preparation",
            description: "Domina certificaciones",
            icon: <Clock size={32} />,
            color: "orange",
            path: "/ielts",
            progress: "0/5",
            category: "IELTS",
            badge: "PRO"
        },
        {
            title: "Agente IA (Chat)",
            description: "Practica conversación libre con nuestro tutor virtual",
            icon: <GraduationCap size={32} />,
            color: "blue",
            path: "/chat",
            progress: "Ilimitado",
            category: "TODAS"
        },
        {
            title: "Test de Nivelación",
            description: "Evalúa tu nivel de inglés en 5 minutos",
            icon: <CheckCircle size={32} />,
            color: "teal",
            path: "/test-nivelacion",
            progress: "Completo",
            category: "TODAS"
        }
    ];

    const filteredModules = activeTab === "TODAS" 
        ? modules 
        : modules.filter(m => m.category === activeTab);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
            {/* Banner Top */}
            <div className="bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 rounded-[2rem] p-8 md:p-12 mb-10 border border-teal-200/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="z-10 flex-1">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">Empieza tu práctica diaria</h1>
                    <p className="text-gray-600 font-medium mb-6">Completa una lección para mantener tu racha.</p>
                    <button 
                        onClick={() => router.push("/grammar-guide")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-2xl shadow-[0_4px_0_rgb(37,99,235)] hover:shadow-[0_2px_0_rgb(37,99,235)] hover:translate-y-[2px] transition-all"
                    >
                        PRACTICA GRATIS
                    </button>
                </div>
                {/* Decorative Element */}
                <div className="w-32 h-32 md:w-48 md:h-48 bg-teal-200/50 rounded-full blur-3xl absolute -right-10 -bottom-10"></div>
            </div>

            <h2 className="text-2xl font-black text-gray-800 mb-6">Práctica de habilidades</h2>

            {/* Tabs */}
            <div className="flex border-b-2 border-gray-200 mb-6 overflow-x-auto custom-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-4 py-3 font-bold text-sm tracking-wide whitespace-nowrap uppercase relative
                            ${activeTab === tab ? "text-blue-500" : "text-gray-400 hover:text-gray-600"}
                        `}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-500 rounded-t-sm" />
                        )}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
                {filteredModules.map((module, idx) => {
                    const colorStyles = {
                        blue: "text-blue-500 bg-blue-50 group-hover:bg-blue-100 border-blue-200",
                        teal: "text-teal-500 bg-teal-50 group-hover:bg-teal-100 border-teal-200",
                        indigo: "text-indigo-500 bg-indigo-50 group-hover:bg-indigo-100 border-indigo-200",
                        orange: "text-orange-500 bg-orange-50 group-hover:bg-orange-100 border-orange-200",
                    }[module.color];

                    return (
                        <button
                            key={idx}
                            onClick={() => router.push(module.path)}
                            className="group flex flex-col text-left p-5 rounded-3xl border-2 border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm hover:shadow-[0_4px_0_rgb(229,231,235)] hover:-translate-y-1 relative"
                        >
                            {module.badge && (
                                <div className={`absolute top-4 right-4 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full ${
                                    module.badge === 'PRO' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {module.badge}
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-2xl ${colorStyles} transition-colors`}>
                                    {module.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm font-medium mb-6 flex-1">
                                {module.description}
                            </p>

                            {/* Progress bar simulation */}
                            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mt-auto mb-2 relative">
                                <div 
                                    className="h-full bg-yellow-400 rounded-full" 
                                    style={{ width: `${Math.random() * 60 + 10}%` }}
                                >
                                    <div className="w-full h-[3px] bg-white/30 absolute top-0 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-right text-xs font-bold text-gray-400">
                                {module.progress}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}