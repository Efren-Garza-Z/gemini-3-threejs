// Ubicación: components/auth/AuthForm.tsx (o como lo tengas nombrado)
"use client"
import { useState } from "react";
import { apiService } from "@/services/api";

export default function AuthForm({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
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
                    document.cookie = `token=${res.token}; path=/; SameSite=None; Secure`
                    onLoginSuccess(res.token);
                }
            } else {
                await apiService.register(formData);
                setIsLogin(true);
            }
        } catch (err) {
            alert("Error en la operación. Inténtalo de nuevo.");
        }
    };

    return (
        /* Eliminamos el 'fixed inset-0' para que fluya como contenido de página */
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="w-full bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50">
                <div className="text-center mb-8">
                    <span className="text-sm font-black tracking-widest text-zinc-600 uppercase">ICB Institute</span>
                    <h2 className="text-4xl font-black text-zinc-900 mt-2">
                        {isLogin ? "Bienvenido" : "Crea tu cuenta"}
                    </h2>
                    <p className="text-zinc-700 mt-2 font-medium">
                        {isLogin ? "Tu viaje al bilingüismo continúa." : "Empieza hoy tu camino al éxito global."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text" placeholder="Nombre completo"
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
                    <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all shadow-lg hover:scale-[1.02] active:scale-95">
                        {isLogin ? "Entrar ahora" : "Registrarme"}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-6 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    {isLogin ? "¿No tienes cuenta? Regístrate gratis" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
            </div>
        </div>
    );
}
