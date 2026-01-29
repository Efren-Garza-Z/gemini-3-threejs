"use client"
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import {ChevronRight, GraduationCap} from "lucide-react";

export default function HomePage() {
    const router = useRouter();

    return (
        <main className="h-screen w-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] flex flex-col items-center justify-center p-6">
            <Navbar />
            <div className="bg-white/20 mt-12 backdrop-blur-xl p-12 rounded-[40px] border border-white/30 shadow-2xl text-center max-w-md w-full animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl font-black text-zinc-800 mb-6 tracking-tight">Ready to Level Up?</h1>
                <p className="text-zinc-700 mb-8 font-medium">Domina el idioma con ejercicios inteligentes potenciados por IA.</p>

                <button
                    onClick={() => router.push("/activities")}
                    className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    ¡Practica tu Inglés!
                </button>


            </div>

            <div className="mt-6 max-w-md">
                <button
                    onClick={() => window.location.href = '/ielts'}
                    className=" backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all text-left group flex flex-col h-full relative overflow-hidden"
                >
                    <div className="bg-white/60 p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <GraduationCap size={24} />
                    </div>
                    <div className="mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                        Especializado
                    </span>
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">IELTS Preparation</h3>
                    <p className="text-zinc-700 font-medium leading-tight mb-6 flex-1">
                        Domina las 4 habilidades clave para obtener tu certificación internacional.
                    </p>
                    <div className="flex items-center gap-2 font-bold text-zinc-800">
                        Explorar módulos <ChevronRight size={16} />
                    </div>
                </button>
            </div>
        </main>
    );
}