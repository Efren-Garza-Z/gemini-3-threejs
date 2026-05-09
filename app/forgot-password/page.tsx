"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { apiService } from "@/services/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await apiService.forgotPassword(email);
            setMessage(
                "Si el correo existe en el sistema, te enviaremos un enlace para restablecer tu contraseña."
            );
            setEmail("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50">
                <Link
                    href="/auth"
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-zinc-900 mb-6"
                >
                    <ArrowLeft size={16} />
                    Volver
                </Link>

                <div className="text-center mb-8">
          <span className="text-sm font-black tracking-widest text-zinc-600 uppercase">
            ICB Institute
          </span>
                    <h1 className="text-4xl font-black text-zinc-900 mt-2">
                        Recuperar contraseña
                    </h1>
                    <p className="text-zinc-600 text-sm mt-3">
                        Ingresa tu correo y te enviaremos un enlace de recuperación.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={18}
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 text-zinc-800"
                        />
                    </div>

                    {message && (
                        <div className="bg-green-500/15 border border-green-500/30 text-green-800 p-4 rounded-2xl text-sm font-medium">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/15 border border-red-500/30 text-red-800 p-4 rounded-2xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-200 text-orange-950 font-bold py-4 rounded-2xl hover:bg-orange-300 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Enviar enlace"}
                    </button>
                </form>
            </div>
        </div>
    );
}