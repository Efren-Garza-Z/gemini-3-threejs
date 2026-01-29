"use client"
import { useState, useEffect } from "react";
import Navbar from "@/app/navbar/Navbar";
import { User, Mail, Globe, Award, Settings, LogOut, ChevronRight } from "lucide-react";
import getTokenFromCookie, { apiService } from "@/services/api";
import {Toast} from "@/app/util/notice";

const ChangePasswordModal = ({ isOpen, onClose, onConfirm }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void
}) => {
    const [newPassword, setNewPassword] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
                <h3 className="text-2xl font-black text-zinc-900 mb-2">Cambiar Contraseña</h3>
                <p className="text-zinc-600 mb-6 font-medium">Introduce tu nueva clave de acceso.</p>

                <input
                    type="password"
                    autoFocus
                    placeholder="Nueva contraseña"
                    className="w-full p-4 bg-white/50 border-2 border-zinc-200 rounded-2xl focus:border-orange-400 outline-none transition-all mb-6 text-zinc-800 font-bold"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            onConfirm(newPassword);
                            setNewPassword("");
                        }}
                        className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black hover:bg-zinc-800 transition-all shadow-lg"
                    >
                        Actualizar Contraseña
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-transparent text-zinc-500 rounded-2xl font-bold hover:bg-zinc-100 transition-all"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ProfilePage() {
    const [user, setUser] = useState<{
        full_name: string;
        email: string;
        language_level: string;
        target_language: string;
    } | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);


    useEffect(() => {
        // Recuperamos la sesión que guardamos durante el login y el test
        const session = localStorage.getItem("user_session");
        if (session) {
            setUser(JSON.parse(session));
        }
    }, []);

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem("user_session");
        window.location.href = "/auth";
    };

    if (!user) return null;

    const handleConfirmPasswordChange = async (newPassword: string) => {
        if (!newPassword || newPassword.length < 4) {
            setToast({ message: "La contraseña es muy corta (mínimo 4)", type: 'error' });
            return;
        }

        try {
            const token = getTokenFromCookie();
            if (!token || !user) return;

            await apiService.updateUserPassword(user.email, newPassword, token);

            // Cerramos el modal tras el éxito
            setIsPasswordModalOpen(false);
            setToast({ message: "¡Contraseña actualizada con éxito!", type: 'success' });
        } catch (error) {
            setToast({ message: "Error al actualizar la contraseña", type: 'error' });
        }
    };


    return (
        <main className="min-h-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] pt-28 pb-12 px-4">
            <Navbar />
            {/* Renderizar el Toast si existe */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Cabecera de Perfil */}
                <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/50 shadow-xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-2xl">
                        <User size={60} />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-zinc-900 tracking-tight">{user.full_name}</h1>
                        <p className="text-zinc-700 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                            <Mail size={16} /> {user.email}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                            <span className="bg-orange-500 text-white px-6 py-2 rounded-2xl font-black text-sm shadow-lg flex items-center gap-2">
                                <Award size={18} /> Nivel: {user.language_level || "No evaluado"}
                            </span>
                            <span className="bg-white/60 text-zinc-800 px-6 py-2 rounded-2xl font-black text-sm border border-white/40 flex items-center gap-2">
                                <Globe size={18} /> {user.target_language || "English"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid de Configuración */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tarjeta de Progreso */}
                    <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/40 shadow-lg">
                        <h3 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-2">
                            <Settings size={20} /> Ajustes de Cuenta
                        </h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="w-full flex items-center justify-between p-4 bg-white/40 rounded-2xl hover:bg-white/60 transition-all group"
                            >
                                <span className="font-bold text-zinc-700">Cambiar Contraseña</span>
                                <ChevronRight size={18} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Tarjeta de Acción */}
                    <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/40 shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-black text-zinc-900 mb-2">¿Quieres subir de nivel?</h3>
                            <p className="text-zinc-700 text-sm font-medium">Puedes volver a tomar el test de nivelación cada 30 días.</p>
                        </div>
                        <button
                            onClick={() => window.location.href = "/test-nivelacion"}
                            className="mt-6 w-full bg-orange-400/20 text-orange-700 border-2 border-orange-400/50 py-4 rounded-2xl font-black hover:bg-orange-400/30 transition-all"
                        >
                            Repetir Test de Nivelación
                        </button>
                    </div>
                </div>

                {/* Botón Cerrar Sesión */}
                <button
                    onClick={handleLogout}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 px-10 py-5 rounded-3xl font-black transition-all border border-red-500/20"
                >
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={handleConfirmPasswordChange}
            />
        </main>
    );
}