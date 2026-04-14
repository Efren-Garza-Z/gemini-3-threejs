"use client"
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import getTokenFromCookie from "@/services/api";
import {CheckCircle, Star} from "lucide-react";

// Importamos el motor y los datos
import { exercisesData } from "./data/exercises";
import ExerciseEngine from "@/components/ExerciseEngine";


export default function ActivitiesPage() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [history, setHistory] = useState<Record<string, any>>({});


    useEffect(() => {
        const savedToken: string | undefined = getTokenFromCookie();
        setToken(savedToken ?? null);
        const savedHistory = localStorage.getItem("activities_history");
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Buscamos los datos del ejercicio seleccionado
    const selectedExercise = exercisesData.find(ex => ex.id === activeTab);

    return (
        <main className="min-h-screen mx-auto w-full bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex flex-col pt-24 px-4 pb-10 overflow-x-hidden">
            <Navbar />

            <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                {!activeTab ? (
                    /* 1. VISTA DEL LISTADO (Si no hay pestaña activa) */
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
                        <header className="mb-10 text-center md:text-left">
                            <h1 className="text-4xl font-black text-zinc-900">Actividades de Práctica</h1>
                            <p className="text-zinc-700 font-medium mt-2 text-lg">
                                Selecciona un tema para practicar con nuestra IA.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                            {exercisesData.map((activity) => {
                                const userStats = history[activity.id];
                                return (
                                    <button
                                        key={activity.id}
                                        onClick={() => setActiveTab(activity.id)}
                                        className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all text-left group flex flex-col h-full"
                                    >
                                        <div
                                            className={`bg-white/60 p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:bg-orange-200 group-hover:text-orange-950 group-hover:text-white transition-colors`}>
                                            {/* Renderizamos el icono que viene en el objeto */}
                                            <activity.icon size={24}/>
                                        </div>
                                        <div className="mb-4">
                                        <span
                                            className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                            {activity.level}
                                        </span>
                                        </div>
                                        {userStats && (
                                            <div className="mb-2 flex items-center gap-1 text-sm font-bold text-teal-600">
                                                <CheckCircle size={14} />
                                                Último puntaje: {userStats.score}/10
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-black text-zinc-900 mb-2">{activity.title}</h3>
                                        <p className="text-zinc-600 font-medium leading-tight mb-6 flex-1">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center gap-2 font-bold text-zinc-800">
                                            Empezar ahora <Star size={16} className="fill-current"/>
                                        </div>
                                    </button>)
                            })}
                        </div>
                    </div>
                ) : (
                    /* 2. VISTA DEL EJERCICIO (Si activeTab tiene un ID) */
                    selectedExercise && (
                        <ExerciseEngine
                            data={selectedExercise}
                            token={token}
                            onBack={() => setActiveTab(null)}
                        />
                    )
                )}
            </div>
        </main>
    );
}