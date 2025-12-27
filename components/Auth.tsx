"use client"
import { useState } from "react";
import { apiService } from "@/services/api";

export default function AuthModal({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "", password: "", full_name: "", language_level: "A1", target_language: "English"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await apiService.login({ email: formData.email, password: formData.password });
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    onLoginSuccess(res.token);
                }
            } else {
                await apiService.register(formData);
                setIsLogin(true); // Cambiar a login tras registro exitoso
            }
        } catch (err) {
            alert("Error en la operación");
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white">
                <h2 className="text-3xl font-bold text-zinc-800 mb-6 text-center">
                    {isLogin ? "Bienvenido" : "Crea tu cuenta"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text" placeholder="Nombre completo"
                            className="w-full p-3 rounded-xl bg-zinc-100 border-none outline-blue-400"
                            onChange={e => setFormData({...formData, full_name: e.target.value})}
                        />
                    )}
                    <input
                        type="email" placeholder="Email" required
                        className="w-full p-3 rounded-xl bg-zinc-100 border-none outline-blue-400 text-zinc-800"
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                        type="password" placeholder="Contraseña" required
                        className="w-full p-3 rounded-xl bg-zinc-100 border-none outline-blue-400 text-zinc-800"
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                    <button className="w-full bg-[#f5c518] text-zinc-900 font-bold p-3 rounded-xl hover:bg-yellow-500 transition-all">
                        {isLogin ? "Entrar" : "Registrarme"}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-4 text-sm text-zinc-500 hover:text-zinc-800"
                >
                    {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
            </div>
        </div>
    );
}