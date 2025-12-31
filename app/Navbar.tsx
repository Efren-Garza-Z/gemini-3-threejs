"use client"
import { useState } from "react"
import Link from "next/link";
import {useRouter} from "next/navigation";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    const [active, setActive] = useState("Home")

    const router = useRouter();

    const navItem = (label: string, path?: string) => (
        <button
            onClick={() => {
                setActive(label)
                if (path) router.push(path)
            }}
        >
            {label}
        </button>
    )

    const handleLogoutAndReload = () => {
        // 1. Ejecuta la lógica de logout del componente padre (elimina el token de localStorage)
        onLogout();

        // 2. Ejecuta la recarga completa del navegador
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    return (
        <nav className="fixed top-0 w-full z-[150] flex justify-between items-center px-12 py-8 bg-transparent">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-sm">
                <span className="text-zinc-800 font-black text-2xl tracking-tighter">EDG</span>
            </div>

            <div className="flex gap-4 md:gap-8 items-center bg-white/10 px-8 py-3 rounded-full backdrop-blur-sm border border-white/20">
                {navItem("Home", "/chat")}
                {navItem("About", "/chat")}
                {navItem("Projects")}
                {/* Botón de Logout */}
                <button
                    onClick={handleLogoutAndReload}
                    className="text-red-500 font-bold hover:text-red-700 ml-4 transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}