"use client"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Star, Globe, MessageCircle } from "lucide-react"
import Link from "next/link"
import ModelFeatureSection from "@/app/home/ModelFeatureSection";

export default function LandingPage() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-white text-zinc-900 font-sans selection:bg-[#fcb69f]/30">

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
                <div className="text-white font-black text-2xl tracking-tighter">ICB</div>
                <Link href="/auth">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:invert transition-all">
                        GET STARTED
                    </button>
                </Link>
            </nav>

            {/* SECCIÓN 1: HERO */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-teal-50 to-green-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="z-10 text-center px-4"
                >
                    <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-zinc-900 mb-8">
                        Global <br /> Language
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-zinc-800/80 max-w-xl mx-auto mb-8">
                        Dominar el inglés no es una meta, es el punto de partida para tu carrera internacional.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/home">
                            <button className="bg-orange-200 text-orange-950 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3">
                                EXPLORE ICB <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </motion.div>
                <div className="absolute bottom-[-10%] right-[-5%] w-1/2 h-1/2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20" />
            </section>

            {/* SECCIONES DE MODELOS INTERCALADOS */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* BLOQUE 1: POYITO */}
                    <div className="relative">
                        <ModelFeatureSection
                            title="¿Por qué el Inglés ahora?"
                            description="Aprender con modelos interactivos como Gemini te permite retener un 70% más de vocabulario visual."
                            modelPath="/poyito.glb"
                            modelScale={2.5}
                            reverse={false}
                        />
                        <div className="px-12 md:pl-24 -mt-10 max-w-2xl">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#ffecd2] flex items-center justify-center shrink-0"><Zap className="text-zinc-800" /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Salarios Globales</h4>
                                    <p className="text-zinc-500">Accede a vacantes remotas con incrementos de hasta un 50% anual.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BLOQUE 2: SUSAN (Sustituyendo a Jake) */}
                    <div className="relative">
                        <ModelFeatureSection
                            title="Practica con IA"
                            description="Nuestros modelos están listos para desafiar tu gramática y fluidez en tiempo real."
                            modelPath="/fusionfall-frankie_foster_belly_dancing.glb"
                            modelScale={.7}
                            reverse={true}
                        />
                        <div className="px-12 md:pr-24 -mt-10 flex justify-end">
                            <div className="flex gap-6 items-start max-w-2xl text-right flex-row-reverse">
                                <div className="w-12 h-12 rounded-2xl bg-[#fcb69f] flex items-center justify-center shrink-0"><Star className="text-zinc-800" /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Networking Pro</h4>
                                    <p className="text-zinc-500">Conecta con líderes globales en la lengua nativa de los negocios.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BLOQUE 3: MORDECAI (Sustituye la sección de cards) */}
                    <div className="relative">
                        <ModelFeatureSection
                            title="Nuestro Método AI"
                            description="Combinamos aprendizaje adaptativo, enfoque en negocios y una comunidad global bilingüe."
                            modelPath="/squidwards_robot_house.glb"
                            modelScale={1.5}
                            reverse={false}
                        />
                        <div className="px-12 md:pl-24 -mt-10 flex flex-wrap gap-8 max-w-4xl">
                            <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                <Zap size={20} className="text-orange-400" />
                                <span className="font-bold text-sm text-zinc-600">AI DRIVEN</span>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                <Globe size={20} className="text-teal-400" />
                                <span className="font-bold text-sm text-zinc-600">BUSINESS FOCUS</span>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                <MessageCircle size={20} className="text-blue-400" />
                                <span className="font-bold text-sm text-zinc-600">GLOBAL COMMUNITY</span>
                            </div>
                        </div>
                    </div>

                    {/* BLOQUE 4: SQUIDWARD HOUSE (Opcional - Estético) */}
                    <ModelFeatureSection
                        title="Tu espacio internacional"
                        description="Cada logro desbloquea entornos únicos para tu aprendizaje."
                        modelPath="/fusionfall-mordecai_hip_hop_dancing.glb"
                        modelScale={1}
                        reverse={true}
                    />
                </div>
            </section>

            {/* FOOTER MINIMALISTA */}
            <footer className="bg-white border-t border-zinc-100 py-16 px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-black tracking-tighter text-zinc-900">ICB</div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                        <a href="mailto:cornbread.institute@gmail.com" className="hover:text-zinc-900 transition-colors">Email</a>
                        <a href="https://www.instagram.com/web_gz?igsh=OHd0OTZ1MGN6Y3dz" className="hover:text-zinc-900 transition-colors">Instagram</a>
                        <a href="https://wa.me/522462136643" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors">WhatsApp</a>
                    </div>

                    <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                        © {currentYear} ICB INSTITUTE. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    )
}