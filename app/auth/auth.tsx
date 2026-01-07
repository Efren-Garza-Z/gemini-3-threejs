// Ubicación: components/auth/AuthForm.tsx (o como lo tengas nombrado)
"use client"
import React, { useState } from "react";
import { apiService } from "@/services/api";
import {AlertCircle, ChevronRight, GraduationCap, Languages, Loader2, X} from "lucide-react";

export default function AuthForm({ onLoginSuccess }: { onLoginSuccess: (token: string, needsTest?: boolean) => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [needsLevelTest, setNeedsLevelTest] = useState(false);
    const [formData, setFormData] = useState({
        email: "", password: "", full_name: "", language_level: "A1", target_language: "English"
    });

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            handleSubmit(e);
        } else {
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e?.preventDefault();
        setError(null); // Limpiar errores previos
        setLoading(true);
        try {
            if (isLogin) {
                const res = await apiService.login({ email: formData.email, password: formData.password });
                if (res.error) throw new Error(res.error);
                if (res.token) {
                    document.cookie = `token=${res.token}; path=/; SameSite=None; Secure`
                    const userData = await apiService.getUserByEmail(formData.email, res.token);
                    const userInfo = {
                        email: userData.email,
                        full_name: userData.full_name,
                        language_level: userData.language_level,
                        target_language: userData.target_language || "English"
                    };
                    localStorage.setItem("user_session", JSON.stringify(userInfo));
                    onLoginSuccess(res.token, false);                }
            } else {
                const finalData = needsLevelTest ? { ...formData, language_level: "A1" } : formData;
                const res = await apiService.register(finalData);
                if (res.error) throw new Error(res.error);
                const loginRes = await apiService.login({ email: formData.email, password: formData.password });
                if (loginRes.token) {
                    document.cookie = `token=${loginRes.token}; path=/; SameSite=None; Secure`;
                    const userInfo = {
                        email: formData.email,
                        full_name: formData.full_name || "User"
                    };
                    localStorage.setItem("user_session", JSON.stringify(userInfo));
                    onLoginSuccess(loginRes.token, needsLevelTest);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado");
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Eliminamos el 'fixed inset-0' para que fluya como contenido de página */
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="w-full bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50">
                {/* Botón SKIP (Solo en paso 2 de registro) */}
                {!isLogin && step === 2 && (
                    <button
                        onClick={handleSubmit}
                        className="absolute top-6 right-8 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
                    >
                        Skip
                    </button>
                )}

                {/* --- ALERTA DE ERROR --- */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 bg-red-500/20 border border-red-500/50 p-4 rounded-2xl text-red-900 text-sm font-bold animate-in slide-in-from-top-2">
                        <AlertCircle size={20} className="shrink-0" />
                        <p className="flex-1">{error}</p>
                        <button onClick={() => setError(null)} className="hover:bg-red-500/20 p-1 rounded-full transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* --- PASO 1: LOGIN O DATOS BÁSICOS REGISTRO --- */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-8">
                            <span className="text-sm font-black tracking-widest text-zinc-600 uppercase">ICB Institute</span>
                            <h2 className="text-4xl font-black text-zinc-900 mt-2">{isLogin ? "Bienvenido" : "Crea tu cuenta"}</h2>
                        </div>

                        <form onSubmit={handleNextStep} className="space-y-4">
                            {!isLogin && (
                                <input
                                    type="text" placeholder="Nombre completo" required
                                    className="w-full p-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 transition-all text-zinc-800"
                                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                                />
                            )}
                            <input
                                type="email" placeholder="Email" required
                                className="w-full p-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 transition-all text-zinc-800"
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                            <input
                                type="password" placeholder="Contraseña" required
                                className="w-full p-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 transition-all text-zinc-800"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                            <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2 group">
                                {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Entrar ahora" : "Siguiente")}
                                {!isLogin && !loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- PASO 2: IDIOMA Y NIVEL (Solo Registro) --- */}
                {!isLogin && step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-zinc-900">Configura tu perfil</h2>
                            <p className="text-zinc-600 text-sm mt-2">Personaliza tu experiencia de aprendizaje.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Idioma */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">
                                    <Languages size={14} /> Idioma Objetivo
                                </label>
                                <select
                                    className="w-full p-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 appearance-none text-zinc-800 font-medium"
                                    value={formData.target_language}
                                    onChange={e => setFormData({...formData, target_language: e.target.value})}
                                >
                                    <option value="English">Inglés</option>
                                </select>
                            </div>

                            {/* Nivel */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">
                                    <GraduationCap size={14} /> Tu Nivel Actual
                                </label>
                                <select
                                    className="w-full p-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 appearance-none text-zinc-800 font-medium disabled:opacity-50"
                                    disabled={needsLevelTest}
                                    value={formData.language_level}
                                    onChange={e => setFormData({...formData, language_level: e.target.value})}
                                >
                                    {["A1", "A2", "B1", "B2", "C1", "C2"].map(lvl => (
                                        <option key={lvl} value={lvl}>{lvl} - {lvl === 'A1' ? 'Principiante' : 'Avanzado'}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Opción de Test */}
                            <div
                                onClick={() => setNeedsLevelTest(!needsLevelTest)}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${needsLevelTest ? 'border-orange-400 bg-orange-50/50' : 'border-white/20 bg-white/30 hover:bg-white/50'}`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${needsLevelTest ? 'bg-orange-400 border-orange-400' : 'border-zinc-400'}`}>
                                    {needsLevelTest && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-800">Desconozco mi nivel</p>
                                    <p className="text-xs text-zinc-600">Hacer test de nivelación con IA</p>
                                </div>
                            </div>

                            <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : "Completar Registro"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                Regresar
                            </button>
                        </form>
                    </div>
                )}

                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setStep(1);
                        setError(null);
                    }}
                    className="w-full mt-6 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    {isLogin ? "¿No tienes cuenta? Regístrate gratis" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>


            </div>
        </div>
    );
}
