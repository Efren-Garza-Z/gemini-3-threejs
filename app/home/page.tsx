import {Metadata} from "next";
import HomeClient from "@/app/home/HomeClient";
import SidebarLayout from "@/components/SidebarLayout";

export const metadata: Metadata = {
    title: "ICB - Home",
    description: "Domina el inglés y accede a salarios globales en USD/EUR con incrementos de hasta 50% anual. Conecta con líderes de negocios y asegura tu futuro profesional",
    keywords: ["ICB", "Inglés", "Aprender Inglés", "Ejercicios de Inglés", "Vocabulario de Inglés", "Verbos en Inglés", "Preparación IELTS", "Salarios Globales", "Networking Profesional"],
};

export default function HomePage() {
    return (
        <SidebarLayout>
            <HomeClient />
        </SidebarLayout>
    );
}