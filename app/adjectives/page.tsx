"use client";

import { useState } from "react";
import adjectivesData from "@/app/data/adjectives.json";
import SidebarLayout from "@/components/SidebarLayout";
import { Search, ChevronLeft, Lightbulb, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdjectivesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdjectives = adjectivesData.filter(a => 
    a.word.includes(searchTerm.toLowerCase()) || 
    a.spanish.includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="w-full min-h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20 pt-12 px-6">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 text-teal-600 font-semibold mb-6 hover:text-teal-800 transition-colors"
          >
            <ChevronLeft size={20} /> Volver al Inicio
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-teal-950 mb-4 tracking-tight">Adjetivos</h1>
          <p className="text-lg text-teal-800/80 mb-10 font-medium">Expande tu vocabulario para describir el mundo con precisión.</p>

          {/* CONTROLS */}
          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-white/50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-300" size={20} />
              <input 
                type="text" 
                placeholder="Buscar adjetivo en IN/ES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-teal-100 rounded-2xl py-3 pl-12 pr-4 text-teal-900 font-medium outline-none focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </div>

          {/* GRID OF ADJECTIVES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdjectives.length === 0 ? (
              <div className="col-span-full py-12 text-center text-teal-300 font-medium text-lg">
                No se encontraron adjetivos.
              </div>
            ) : (
              filteredAdjectives.map((adjective, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-teal-50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-teal-400 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 capitalize">{adjective.word}</h3>
                      <p className="text-teal-500 font-bold">{adjective.spanish}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-teal-50 text-teal-600 px-3 py-1 rounded-full border border-teal-100">
                      {adjective.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="bg-cyan-50/50 rounded-2xl p-4 border border-cyan-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb size={16} className="text-cyan-500" />
                        <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Uso</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 leading-relaxed">{adjective.explanation}</p>
                    </div>
                    <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={16} className="text-teal-500" />
                        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Ejemplo</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 italic">"{adjective.example}"</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </SidebarLayout>
  );
}
