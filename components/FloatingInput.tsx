"use client"
import { useState, useRef, useEffect } from "react"

export default function FloatingInput({ onSearch }: { onSearch: (q: string) => void }) {
    const [val, setVal] = useState("")
    const [pos, setPos] = useState({ x: 100, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const offset = useRef({ x: 0, y: 0 })

    useEffect(() => {
        setPos({ x: 50, y: window.innerHeight - 100 })
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
            setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
        }
        const handleMouseUp = () => setIsDragging(false)

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    const startDrag = (e: React.MouseEvent) => {
        setIsDragging(true)
        offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    }

    return (
        <div
            style={{ left: `${pos.x}px`, top: `${pos.y}px`, position: 'fixed' }}
            className={`z-[100] flex items-center min-w-[300px] md:min-w-[450px] bg-zinc-900/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={startDrag}
        >
            <input
                className="flex-1 bg-transparent px-4 py-2 outline-none text-white text-sm"
                placeholder="Escribe tu pregunta aquí..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (onSearch(val), setVal(""))}
                onMouseDown={(e) => e.stopPropagation()} // Evita arrastrar al escribir
            />
            <button onClick={() => { onSearch(val); setVal(""); }} className="bg-blue-600 p-2 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
        </div>
    )
}