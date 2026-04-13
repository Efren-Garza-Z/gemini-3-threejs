"use client"
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {ChevronRight, GraduationCap} from "lucide-react";

export default function HomePage() {
    const router = useRouter();

    return (
        <main className="h-max w-auto bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex flex-col items-center justify-center p-6">
            <Navbar />
            <div className="bg-white/20 mt-36 backdrop-blur-xl p-12 rounded-[40px] border border-white/30 shadow-2xl text-center max-w-md w-full animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl font-black text-zinc-800 mb-6 tracking-tight">Ready to Level Up?</h1>
                <p className="text-zinc-700 mb-8 font-medium">Domina el idioma con ejercicios inteligentes potenciados por IA.</p>

                <button
                    onClick={() => router.push("/activities")}
                    className="w-full bg-orange-200 text-orange-950 py-4 rounded-2xl font-bold text-xl hover:bg-orange-300 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    ¡Practica tu Inglés!
                </button>


            </div>

            <div className="mt-6 max-w-md w-full flex flex-col gap-4 pb-12">
                
                <button
                    onClick={() => router.push('/vocabulary')}
                    className="backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-left flex items-center gap-4 group bg-gradient-to-r from-white/40 to-white/20"
                >
                    <div className="bg-white/80 p-4 rounded-xl shadow-sm group-hover:bg-teal-200 group-hover:text-teal-900 transition-colors">
                        <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-zinc-900">Vocabulario Inteligente</h3>
                        <p className="text-sm font-medium text-zinc-700 leading-tight mt-1">Memoriza y evalúa con IA</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-400 group-hover:text-zinc-800" />
                </button>

                <button
                    onClick={() => router.push('/verbs')}
                    className="backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-left flex items-center gap-4 group bg-gradient-to-r from-white/40 to-white/20"
                >
                    <div className="bg-white/80 p-4 rounded-xl shadow-sm group-hover:bg-indigo-200 group-hover:text-indigo-900 transition-colors">
                        <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-zinc-900">Verbos Maestros</h3>
                        <p className="text-sm font-medium text-zinc-700 leading-tight mt-1">Tabla dinámica de 3 tiempos</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-400 group-hover:text-zinc-800" />
                </button>

                <button
                    onClick={() => window.location.href = '/ielts'}
                    className="backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-left flex items-center gap-4 group bg-gradient-to-r from-white/40 to-white/20"
                >
                    <div className="bg-white/80 p-4 rounded-xl shadow-sm group-hover:bg-orange-200 group-hover:text-orange-950 transition-colors relative">
                        <div className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm z-10">Pro</div>
                        <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-zinc-900">IELTS Preparation</h3>
                        <p className="text-sm font-medium text-zinc-700 leading-tight mt-1">Domina certificaciones</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-400 group-hover:text-zinc-800" />
                </button>
            </div>
        </main>
    );
}