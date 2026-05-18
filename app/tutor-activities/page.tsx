import SidebarLayout from "@/components/SidebarLayout";
import { MessageSquare, PenTool, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function TutorActivitiesPage() {
    return (
        <SidebarLayout>
            <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-black text-gray-800">Actividades con Tutor</h1>
                    <p className="text-gray-500 font-medium mt-2 text-lg">
                        Practica situaciones reales con feedback instantáneo de la IA.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    {/* Activity 1 */}
                    <Link href="/tutor-activities/letter-writing" className="block group">
                        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-teal-50 w-32 h-32 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="bg-teal-100 text-teal-600 p-4 rounded-2xl w-fit mb-6 shadow-sm">
                                <PenTool size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-2">Escribir una Carta</h3>
                            <p className="text-gray-500 font-medium leading-tight mb-6 flex-1">
                                Aprende a redactar cartas con la estructura correcta rellenando los espacios clave.
                            </p>
                            <div className="flex items-center gap-2 font-bold text-teal-600 group-hover:gap-4 transition-all">
                                Empezar ahora <MessageSquare size={18} />
                            </div>
                        </div>
                    </Link>

                    {/* Activity 2 */}
                    <Link href="/tutor-activities/image-description" className="block group">
                        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-50 w-32 h-32 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl w-fit mb-6 shadow-sm">
                                <ImageIcon size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-2">Describir una Imagen</h3>
                            <p className="text-gray-500 font-medium leading-tight mb-6 flex-1">
                                Practica tu vocabulario describiendo lo que ves en diferentes escenarios con feedback de IA.
                            </p>
                            <div className="flex items-center gap-2 font-bold text-orange-600 group-hover:gap-4 transition-all">
                                Empezar ahora <MessageSquare size={18} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </SidebarLayout>
    );
}
