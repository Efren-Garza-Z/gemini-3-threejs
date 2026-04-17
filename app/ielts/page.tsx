// app/ielts/page.tsx
"use client"
import React from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Mic, Headset, PenTool, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

export default function IELTSPage() {
    const modules = [
        {
            id: "reading",
            title: "Reading",
            description: "Mejora tu comprensión lectora con textos académicos y ejercicios tipo examen.",
            icon: <BookOpen className="text-blue-500" />,
            status: "Disponible",
            path: "/reading"
        },
        {
            id: "writing",
            title: "Writing",
            description: "Practica Task 1 y Task 2 con correcciones instantáneas de nuestra IA.",
            icon: <PenTool className="text-orange-500" />,
            status: "Disponible",
            path: "/writing"
        },
        {
            id: "listening",
            title: "Listening",
            description: "Entrena tu oído con diferentes acentos y completa ejercicios de respuesta rápida.",
            icon: <Headset className="text-purple-500" />,
            status: "Próximamente",
            path: "#"
        },
        {
            id: "speaking",
            title: "Speaking",
            description: "Simulacros de entrevista en tiempo real para mejorar tu fluidez y pronunciación.",
            icon: <Mic className="text-red-500" />,
            status: "Próximamente",
            path: "#"
        }
    ];

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex flex-col pt-36 px-4 pb-10 overflow-x-hidden items-center">
            <Navbar />

            <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                <header className="mb-12 w-full text-center md:text-left">
                    <Link href="/home" className="flex items-center gap-2 text-zinc-600 font-bold hover:text-zinc-900 transition-colors mb-6">
                        <ArrowLeft size={20} /> Volver al inicio
                    </Link>
                    <h1 className="text-5xl font-black text-zinc-900 tracking-tight">IELTS Academy</h1>
                    <p className="text-zinc-700 font-medium mt-3 text-xl">Selecciona la habilidad que deseas potenciar hoy.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {modules.map((module) => (
                        <Link
                            href={module.path}
                            key={module.id}
                            className={`group relative bg-white/50 backdrop-blur-md p-10 rounded-[3rem] border border-white/60 shadow-xl hover:shadow-2xl transition-all flex flex-col ${module.status === "Próximamente" ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"}`}
                        >
                            <div className="bg-white p-5 rounded-3xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform">
                                {module.icon}
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-3xl font-black text-zinc-900">{module.title}</h3>
                                <span className={`text-xs font-black uppercase px-4 py-1 rounded-full ${module.status === "Disponible" ? "bg-green-100 text-green-700" : "bg-zinc-200 text-zinc-500"}`}>
                                    {module.status}
                                </span>
                            </div>

                            <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-8">
                                {module.description}
                            </p>

                            {module.status === "Disponible" && (
                                <div className="mt-auto flex items-center gap-2 font-bold text-zinc-800">
                                    Comenzar práctica <Star size={18} className="fill-yellow-400 text-yellow-400" />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}