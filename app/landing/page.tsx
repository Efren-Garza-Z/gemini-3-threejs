"use client"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Shield, Zap, Star, Menu } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';


export default function LandingPage() {
    return (
        <div className="bg-white text-zinc-900 font-sans selection:bg-[#fcb69f]/30">

            {/* NAVBAR VANGUARDISTA */}
            <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
                <div className="text-white font-black text-2xl tracking-tighter">ICB</div>

                <Link href="../auth">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:invert transition-all">
                        GET STARTED
                    </button>
                </Link>
            </nav>

            {/* SECCIÓN 1: HERO (100vh - Pastel Impact) */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]">
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
                        <button className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3">
                            EXPLORE ICB <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
                {/* Espacio para Imagen Vanguardista Flotante (Abstracta/3D) */}
                <div className="absolute bottom-[-10%] right-[-5%] w-1/2 h-1/2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20" />
            </section>

            {/* SECCIÓN 2: THE WHY (100vh - White Minimalist) */}
            <section id="why" className="h-screen w-full bg-white flex items-center px-10 md:px-24 relative">
                <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
                    <div>
                        <span className="text-sm font-bold tracking-[0.3em] text-zinc-400 uppercase">The Opportunity</span>
                        <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-8 tracking-tight">
                            ¿Por qué el <span className="text-[#fcb69f]">Inglés</span> ahora?
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#ffecd2] flex items-center justify-center shrink-0"><Zap className="text-zinc-800" /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Salarios Globales</h4>
                                    <p className="text-zinc-500">Accede a vacantes remotas en USD y EUR con incrementos de hasta un 50% anual.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#fcb69f] flex items-center justify-center shrink-0"><Star className="text-zinc-800" /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Networking de Alto Nivel</h4>
                                    <p className="text-zinc-500">Conecta con líderes y fundadores en la lengua nativa de los negocios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ESPACIO PARA IMAGEN 1 (Vanguardista / Business Moderno) */}
                    <div className="w-full h-[60vh] bg-zinc-100 rounded-[40px] overflow-hidden relative shadow-2xl border border-zinc-200">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 font-bold uppercase tracking-widest text-xs italic">
                            <Image
                                src="/assest/salary.png" /* Ruta relativa desde la carpeta public */
                                alt="Imagen Vanguardista 1: Oficina Minimalista"
                                fill={true} /* La imagen llenará el contenedor padre */
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: METODOLOGÍA (Cards en Colores Pastel) */}
            <section id="method" className="py-32 px-10 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Nuestro Método</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">IA aplicada y práctica conversacional intensa desde el primer día.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-10 rounded-[40px] bg-[#ffecd2] flex flex-col justify-between h-[450px] shadow-sm">
                            <h3 className="text-3xl font-bold">AI Driven <br /> Learning</h3>
                            <div className="h-40 bg-white/40 rounded-3xl border border-white/60 relative items-center justify-center text-xs text-zinc-400">
                                <Image
                                    src="/assest/jake.png" /* Ruta relativa desde la carpeta public */
                                    alt="Imagen Vanguardista 1: Oficina Minimalista"
                                    fill={true} /* La imagen llenará el contenedor padre */
                                    className="object-cover rounded-3xl" // Clase opcional para que la imagen no se estire y herede bordes
                                />
                            </div>
                        </div>
                        <div className="p-10 rounded-[40px] bg-[#fcb69f] flex flex-col justify-between h-[450px] shadow-sm">
                            <h3 className="text-3xl font-bold">Business <br /> Focus</h3>
                            <div className="h-40 bg-white/40 rounded-3xl border border-white/60 relative items-center justify-center text-xs text-zinc-400">
                                <Image
                                    src="/assest/meetings.jpeg" /* Ruta relativa desde la carpeta public */
                                    alt="Imagen Vanguardista 1: Oficina Minimalista"
                                    fill={true} /* La imagen llenará el contenedor padre */
                                    className="object-cover rounded-3xl" // Clase opcional para que la imagen no se estire y herede bordes
                                />
                            </div>
                        </div>
                        <div className="p-10 rounded-[40px] bg-[#ff9a9e] flex flex-col justify-between h-[450px] shadow-sm text-white">
                            <h3 className="text-3xl font-bold">Global <br /> Community</h3>
                            <div className="h-40 bg-black/10 rounded-3xl border border-white/20 relative items-center justify-center text-xs text-white/50">
                                <Image
                                    src="/assest/connection.jpeg" /* Ruta relativa desde la carpeta public */
                                    alt="Imagen Vanguardista 1: Oficina Minimalista"
                                    fill={true} /* La imagen llenará el contenedor padre */
                                    className="object-cover rounded-3xl" // Clase opcional para que la imagen no se estire y herede bordes
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER (Diseño de Logos) */}
            <footer className="bg-zinc-900 text-white py-24 px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <span className="text-4xl font-black tracking-tighter">ICB</span>
                        <p className="mt-6 text-zinc-400 max-w-sm">
                            Formando la próxima generación de líderes bilingües con tecnología de vanguardia.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-zinc-500 uppercase text-xs tracking-widest">Company</h5>
                        <ul className="space-y-4 font-medium text-zinc-300">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-zinc-500 uppercase text-xs tracking-widest">Connect</h5>
                        <ul className="space-y-4 font-medium text-zinc-300">
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                            <li><a href="#">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-zinc-500 text-sm">
                    <p>© 2025 INSTITUTE CORN BREAD. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8 italic font-bold">
                        <span>LOGO 1</span>
                        <span>LOGO 2</span>
                        <span>LOGO 3</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}