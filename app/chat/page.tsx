// app/layout.tsx
"use client"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false })
import { apiService } from "@/services/api"
import dynamic from "next/dynamic";
import {ArrowUp, Loader2} from "lucide-react";
import LandingPage from "@/app/landing/page";
import Navbar from "@/app/navbar/Navbar";

export default function ChatPage() {
    const [token, setToken] = useState<string | null>(null)
    const [history, setHistory] = useState<any[]>([])
    const [inputText, setInputText] = useState("")
    const [isTyping, setIsTyping] = useState(false) // Controla animación del modelo
    const [isWaitingResponse, setIsWaitingResponse] = useState(false) // Controla el estado "Pensando"
    const scrollRef = useRef<HTMLDivElement>(null)

    // 1. Manejo de Sesión (Login / Logout)
    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (savedToken) {
            setToken(savedToken)
            fetchTodayHistory(savedToken)
        }
    }, [])


    // 2. Cargar Historial del día
    const fetchTodayHistory = async (activeToken: string) => {
        try {
            const data = await apiService.getHistory(activeToken)
            const today = new Date().toISOString().split('T')[0]
            const filtered = data
                .filter((item: any) => item.created_at.startsWith(today))
                .reverse()
            setHistory(filtered)
        } catch (error) {
            console.error("Error al obtener historial:", error)
        }
    }

    // 3. Efecto de escritura Gemini
    const simulateTyping = async (fullText: string, messageId: number) => {
        setIsTyping(true)
        const words = fullText.split(" ")
        let currentText = ""

        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + " "
            setHistory(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, response: currentText } : msg
            ))
            await new Promise(res => setTimeout(res, 40))
        }
        setIsTyping(false)
    }

    // 4. Envío de Mensajes
    const handleSend = async () => {
        if (!inputText.trim() || isWaitingResponse || !token) return

        const userPrompt = inputText
        setInputText("")
        setIsWaitingResponse(true)

        // Agregamos localmente para feedback inmediato
        const tempId = Date.now()
        setHistory(prev => [...prev, { id: tempId, prompt: userPrompt, response: "", isLocal: true }])

        try {
            await apiService.sendChat(userPrompt, token)

            const checkResponse = setInterval(async () => {
                const data = await apiService.getHistory(token)
                const lastMsg = data[0]

                if (lastMsg && lastMsg.prompt === userPrompt) {
                    clearInterval(checkResponse)
                    setIsWaitingResponse(false)
                    await simulateTyping(lastMsg.response, tempId)
                    fetchTodayHistory(token) // Sincronizamos historial real
                }
            }, 2500)
        } catch (error) {
            setIsWaitingResponse(false)
        }
    }

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
        }
    }, [history, isWaitingResponse])

    if (!token) {
        return <LandingPage />
    }
    return (
        <main className="h-screen w-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] overflow-hidden flex flex-col">
            <Navbar/>
            <div className="flex flex-col md:flex-row flex-1 pt-24 pb-6 px-4 md:px-12 gap-6 overflow-hidden">
                {/* COLUMNA 3: Modelo 3D (1/3) */}
                <section className="w-full md:w-1/3 h-[30vh] md:h-full relative bg-white/10 rounded-[32px] border border-white/20">
                    <Scene isTyping={isTyping} />
                </section>
                {/* COLUMNA 1 & 2: Chat e Input (2/3) */}
                <section className="w-full md:w-2/3 flex flex-col h-full bg-white/20 backdrop-blur-md rounded-[32px] border border-white/30 overflow-hidden shadow-2xl">

                    {/* Historial con Scroll */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-24">
                        {history.length == 0 ?
                            <h1 className="text-4xl font-bold text-zinc-800/40">¿En qué puedo ayudarte hoy?</h1>
                            :
                            history.map((msg) => (
                                <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {/* Prompt del Usuario */}
                                    <div className="flex justify-end mb-4">
                                        <div className="bg-zinc-900 text-white px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg text-sm">
                                            {msg.prompt}
                                        </div>
                                    </div>

                                    {/* Respuesta de la IA */}
                                    {(msg.response || msg.isLocal) && (
                                        <div className="flex justify-start">
                                            <div className="prose prose-zinc max-w-[90%] bg-white/60 p-6 rounded-3xl rounded-tl-none border border-white/40 shadow-sm text-zinc-800">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.response}
                                                </ReactMarkdown>
                                                {/* Cursor parpadeante si está escribiendo */}
                                                {isTyping && msg.id === history[history.length - 1].id && (
                                                    <span className="inline-block w-2 h-4 ml-1 bg-[#fcb69f] animate-pulse" />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                        {/* Estado Pensando / Procesando */}
                        {isWaitingResponse && (
                            <div className="flex justify-start animate-pulse">
                                <div className="flex items-center gap-3 bg-white/40 px-6 py-4 rounded-3xl rounded-tl-none border border-white/20 text-zinc-600 font-medium italic">
                                    <Loader2 className="animate-spin" size={18} />
                                    ICB está pensando...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* INPUT ESTÁTICO (No Draggable) */}
                    <div className="p-6 bg-white/30 border-t border-white/20">
                        <div className="relative flex items-end gap-2 bg-white rounded-2xl p-2 shadow-inner border border-zinc-200">
              <textarea
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                      }
                  }}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-transparent p-3 outline-none text-zinc-800 resize-none max-h-32 custom-scrollbar"
                  style={{ height: 'auto' }}
                  onInput={(e: any) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                  }}
              />
                            <button
                                onClick={handleSend}
                                className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-zinc-800 transition-colors"
                            >
                                <ArrowUp size={20} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}