import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalWidgets from "@/components/GlobalWidgets";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ICB",
    description:
        "Domina el inglés y accede a salarios globales en USD/EUR con incrementos de hasta 50% anual. Conecta con líderes de negocios y asegura tu futuro profesional",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{ colorScheme: "light" }}>
        <body className={`${inter.className} min-h-screen relative`}>
        <Providers>
            {children}
            <GlobalWidgets />
        </Providers>
        </body>
        </html>
    );
}