"use client";

import {Home, BookOpen, PenTool, CheckSquare, User, LogOut, Menu, X, Book, TestTube, Bot} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showExpiredModal, setShowExpiredModal] = useState(false);

    const handleLogout = () => {
        document.cookie = "token=; Max-Age=0; path=/";
        localStorage.removeItem("user_session");
        router.push("/");
    };

    const navItems = [
        { name: "My activities", path: "/home", icon: <Home size={24} /> },
        { name: "Grammar Guide", path: "/grammar-guide", icon: <BookOpen size={24} /> },
        { name: "Vocabulario", path: "/vocabulary", icon: <PenTool size={24} /> },
        { name: "Verbos", path: "/verbs", icon: <CheckSquare size={24} /> },
        { name: "Adverbios", path: "/adverbs", icon: <Book size={24} /> },
        { name: "Adjetivos", path: "/adjectives", icon: <PenTool size={24} /> },
        { name: "Phrasal Verbs", path: "/phrasal-verbs", icon: <CheckSquare size={24} /> },
        { name: "Activities", path: "/activities", icon: <Book size={24} /> },
        { name: "IELTS", path: "/ielts", icon: <BookOpen size={24} /> },
        { name: "Test", path: "/test-nivelacion", icon: <TestTube size={24} /> },
        { name: "Chat", path: "/chat", icon: <Bot size={24} /> },
        { name: "Perfil", path: "/profile", icon: <User size={24} /> },
    ];

    useEffect(() => {
        const handleAuthExpired = (e: any) => {
            setShowExpiredModal(true);
        };

        window.addEventListener("auth-expired", handleAuthExpired);
        return () => window.removeEventListener("auth-expired", handleAuthExpired);
    }, []);

    const go = (path: string) => {
        setIsMobileOpen(false);
        router.push(path);
    };

    return (
        <>
            {/* Mobile Header & Hamburger */}
            <div className="md:hidden fixed top-0 w-full bg-white z-[100] border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
                <span className="text-[#40E0D0] font-black text-2xl tracking-tighter cursor-pointer" onClick={() => go("/home")}>ICB</span>
                <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-500">
                    {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Sidebar Content (Desktop & Mobile Dropdown) */}
            <div className={`
                fixed md:static top-14 left-0 w-full md:w-[250px] lg:w-[280px] h-[calc(100vh-3.5rem)] md:h-screen 
                bg-white border-r border-gray-200 z-[90] transition-transform transform 
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                flex flex-col
            `}>
                <div className="hidden md:flex p-6 items-center">
                    <span className="text-[#40E0D0] font-black text-3xl tracking-tighter cursor-pointer" onClick={() => go("/home")}>ICB</span>
                </div>

                <div className="flex-1 flex flex-col px-4 pt-4 md:pt-0 gap-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || pathname?.startsWith(item.path + "/");
                        return (
                            <button
                                key={item.path}
                                onClick={() => go(item.path)}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all
                                    ${isActive 
                                        ? "bg-blue-50 text-blue-500 border-2 border-blue-200" 
                                        : "text-gray-500 hover:bg-gray-100 border-2 border-transparent"}
                                `}
                            >
                                <div className={isActive ? "text-blue-500" : "text-gray-400"}>
                                    {item.icon}
                                </div>
                                <span className="uppercase tracking-wide text-sm">{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all w-full border-2 border-transparent"
                    >
                        <LogOut size={24} className="text-gray-400 group-hover:text-red-500" />
                        <span className="uppercase tracking-wide text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Session Expired Modal */}
            {showExpiredModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                            <LogOut size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">Su sesión ha expirado</h2>
                        <p className="text-gray-500 mb-8 font-medium">Por favor, vuelva a iniciar sesión para continuar.</p>
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_4px_0_rgb(37,99,235)] hover:shadow-[0_2px_0_rgb(37,99,235)] hover:translate-y-[2px] transition-all"
                        >
                            Ir al Login
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
