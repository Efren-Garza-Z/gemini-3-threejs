"use client";

import React, { useEffect, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Link from "next/link";
import { ArrowLeft, Headphones, PlayCircle, Loader2 } from "lucide-react";
import { apiService, ListeningTest } from "@/services/api";

export default function IELTSListeningPage() {
    const [sections, setSections] = useState<ListeningTest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSections = async () => {
            try {
                const data = await apiService.getListeningTests();
                setSections(data);
            } catch (error) {
                console.error("Error cargando listening tests:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSections();
    }, []);

    return (
        <SidebarLayout>
            <div className="w-full min-h-full bg-gradient-to-br from-violet-100 via-fuchsia-50 to-indigo-100 pt-12 px-4 md:px-8 pb-10">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/ielts"
                        className="inline-flex items-center gap-2 text-zinc-600 font-bold hover:text-zinc-900 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} /> Volver a IELTS
                    </Link>

                    <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-xl mb-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white p-4 rounded-3xl shadow-md">
                                <Headphones className="text-purple-600" size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-zinc-900">
                                    IELTS Listening
                                </h1>
                                <p className="text-zinc-600 font-medium mt-2 text-lg">
                                    Completa cada sección, revisa tus respuestas y recibe feedback con IA.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 w-full bg-white/70 rounded-full h-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full w-0 rounded-full" />
                        </div>
                        <p className="text-sm text-zinc-500 mt-3 font-medium">
                            Progreso general: comienza con la Section 1 y avanza hasta completar el 100%.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-purple-600" size={40} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sections.map((section, index) => (
                                <Link
                                    key={section.id}
                                    href={`/ielts/listening/${section.id}`}
                                    className="group bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-white/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl shadow-sm">
                                            <PlayCircle size={28} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                      Section {index + 1}
                    </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-zinc-900 mb-3">
                                        {section.title}
                                    </h3>
                                    <p className="text-zinc-600 font-medium mb-6">
                                        {section.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-500">
                      10 preguntas · feedback IA
                    </span>
                                        <span className="text-purple-700 font-black group-hover:translate-x-1 transition-transform">
                      Empezar →
                    </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}