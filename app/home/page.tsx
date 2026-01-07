"use client"
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";

export default function HomePage() {
    const router = useRouter();

    return (
        <main className="h-screen w-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] flex flex-col items-center justify-center p-6">
            <Navbar />
            <div className="bg-white/20 backdrop-blur-xl p-12 rounded-[40px] border border-white/30 shadow-2xl text-center max-w-md w-full animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl font-black text-zinc-800 mb-6 tracking-tight">Ready to Level Up?</h1>
                <p className="text-zinc-700 mb-8 font-medium">Domina el idioma con ejercicios inteligentes potenciados por IA.</p>

                <button
                    onClick={() => router.push("/activities")}
                    className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    ¡Practica tu Inglés!
                </button>
            </div>
        </main>
    );
}