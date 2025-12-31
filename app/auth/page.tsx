// Archivo: app/auth/layout.tsx
"use client"
import { useRouter } from "next/navigation";
import AuthForm from "@/app/auth/auth";

export default function AuthPage() {
    const router = useRouter();

    const handleSuccess = (token: string) => {
        // Redirigir al home donde se cargará el chat
        router.push("/chat");
        router.refresh();
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] flex items-center justify-center p-6">
            {/* Aquí llamamos al componente */}
            <AuthForm onLoginSuccess={handleSuccess} />
        </main>
    );
}
