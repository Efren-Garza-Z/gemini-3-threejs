// app/page.tsx
"use client"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Navbar from "@/app/Navbar"
const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false })
import { apiService } from "@/services/api"
import dynamic from "next/dynamic";
import {ArrowUp, Loader2} from "lucide-react";
import LandingPage from "@/app/landing/page";

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

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setHistory([])
        setIsTyping(false)
    }

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
            <Navbar onLogout={handleLogout} />


        </main>
    )
}