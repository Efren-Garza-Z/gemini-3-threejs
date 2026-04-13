// Archivo: app/auth/layout.tsx
"use client"
import { useRouter } from "next/navigation";
import AuthForm from "@/app/auth/auth";

export default function AuthPage() {
    const router = useRouter();

    const handleSuccess = (token: string, needsTest: boolean = false) => {
        if (needsTest) {
            router.push("/test-nivelacion");
        } else {
            router.push("/home");
        }
        router.refresh();
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 flex items-center justify-center p-6">
            {/* Aquí llamamos al componente */}
            <AuthForm onLoginSuccess={handleSuccess} />
        </main>
    );
}
