"use client"
import { useState } from "react"
import {useRouter} from "next/navigation";
import {Menu, X} from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "token=; Max-Age=0; path=/"
        router.push("/")
    }



    const go = (path: string) => {
        setOpen(false)
        router.push(path)
    }

    return (
        <nav className="fixed top-0 w-full z-[150] flex justify-between items-center px-12 py-8 bg-transparent">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-sm">
                <span className="text-zinc-800 font-black text-2xl tracking-tighter">EDG</span>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex gap-6">
                <button onClick={() => go("/chat")}>Chat</button>
                <button onClick={() => go("/projects")}>Projects</button>
                <button onClick={() => go("/about")}>About</button>
                <button
                    onClick={handleLogout}
                    className="text-red-500 font-bold hover:text-red-700 ml-4 transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Mobile */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
                {open ? <X /> : <Menu />}
            </button>

            {open && (
                <div className="absolute w-40 top-full right-6 mt-4 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 md:hidden">
                    <button onClick={() => go("/chat")}>Chat</button>
                    <button onClick={() => go("/projects")}>Projects</button>
                    <button onClick={() => go("/about")}>About</button>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 font-bold hover:text-red-700 ml-4 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}