"use client";

import {Home, BookOpen, PenTool, CheckSquare, User, LogOut, Menu, X, Book, TestTube, Bot} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        { name: "Activities", path: "/activities", icon: <Book size={24} /> },
        { name: "IELTS", path: "/ielts", icon: <BookOpen size={24} /> },
        { name: "Test", path: "/test-nivelacion", icon: <TestTube size={24} /> },
        { name: "Chat", path: "/chat", icon: <Bot size={24} /> },
        { name: "Perfil", path: "/profile", icon: <User size={24} /> },
    ];

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
        </>
    );
}
