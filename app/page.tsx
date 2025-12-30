"use client"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import FloatingInput from "@/components/chat/FloatingInput"
import {apiService} from "@/services/api";
import dynamic from "next/dynamic";
import LandingPage from "@/app/landing/page";

const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false })

export default function Home() {
    const [token, setToken] = useState<string | null>(null);
    const [showLanding, setShowLanding] = useState(true)
    const [displayText, setDisplayText] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            setShowLanding(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setDisplayText("")
    }

    const handleNewSearch = async (query: string) => {
        if (!token) return;
        setIsTyping(true);

        // 1. Enviar prompt
        await apiService.sendChat(query, token);

        // 2. Polling: Revisar historial hasta que aparezca la respuesta
        const checkResponse = setInterval(async () => {
            const history = await apiService.getHistory(token);
            const lastInteraction = history[0]; // Asumiendo que el más reciente es el primero

            if (lastInteraction && lastInteraction.prompt === query && lastInteraction.response) {
                clearInterval(checkResponse);
                renderTypingEffect(lastInteraction.response);
            }
        }, 3000); // Revisa cada 3 segundos
    };

    const renderTypingEffect = async (text: string) => {
        const words = text.split(" ");
        let currentText = "";
        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + " ";
            setDisplayText(currentText);
            await new Promise(res => setTimeout(res, 70));
        }
        setIsTyping(false);
    };

    if (showLanding && !token) {
        return <LandingPage />
    }
    return (
        <main className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]">
            <Navbar onLogout={handleLogout} />

            <div className="flex flex-col md:flex-row h-full w-full pt-32 pb-10 px-10 md:px-24 gap-4">
                {/* LADO IZQUIERDO: Texto con scroll minimalista */}
                <section className="w-full md:w-3/5 h-[60vh] md:h-full flex flex-col justify-center">
                    <div className="overflow-y-auto pr-6 max-h-[75vh] custom-scrollbar prose prose-zinc prose-lg">
                        {displayText ? (
                            <div className="text-zinc-800 leading-relaxed">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {displayText}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="text-4xl font-bold text-zinc-800/40">¿En qué puedo ayudarte hoy?</p>
                        )}
                    </div>
                </section>

                {/* LADO DERECHO: Modelo centrado */}
                <section className="w-full md:w-2/5 h-[40vh] md:h-full flex items-center justify-center">
                    <div className="w-full h-full max-w-[450px] pointer-events-none">
                        <Scene isTyping={isTyping} />
                    </div>
                </section>
            </div>

            <FloatingInput onSearch={handleNewSearch} />
        </main>
    )
}