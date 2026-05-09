"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!token) {
            setError("El enlace no contiene un token válido.");
            return;
        }

        if (newPassword.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        try {
            await apiService.resetPassword(token, newPassword, confirmPassword);
            setMessage("Tu contraseña fue restablecida correctamente.");
            setTimeout(() => router.push("/auth"), 1800);
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
                        Restablecer contraseña
                    </h1>
                    <p className="text-zinc-600 text-sm mt-3">
                        Ingresa tu nueva contraseña para recuperar el acceso.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <KeyRound
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={18}
                        />
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-orange-300 text-zinc-800"
                        />
                    </div>

                    <div className="relative">
                        <KeyRound
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={18}
                        />
                        <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Restablecer contraseña"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}