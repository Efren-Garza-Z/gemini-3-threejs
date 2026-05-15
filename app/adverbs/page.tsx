"use client";

import { useState } from "react";
import adverbsData from "@/app/data/adverbs.json";
import SidebarLayout from "@/components/SidebarLayout";
import { Search, ChevronLeft, Lightbulb, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdverbsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdverbs = adverbsData.filter(a => 
    a.word.includes(searchTerm.toLowerCase()) || 
    a.spanish.includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="w-full min-h-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20 pt-12 px-6">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800 transition-colors"
          >
            <ChevronLeft size={20} /> Volver al Inicio
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-purple-950 mb-4 tracking-tight">Adverbios</h1>
          <p className="text-lg text-purple-800/80 mb-10 font-medium">Aprende a modificar y describir acciones con fluidez.</p>

          {/* CONTROLS */}
          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-white/50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
              <input 
                type="text" 
                placeholder="Buscar adverbio en IN/ES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-purple-100 rounded-2xl py-3 pl-12 pr-4 text-purple-900 font-medium outline-none focus:ring-4 focus:ring-purple-100"
              />
            </div>
          </div>

          {/* GRID OF ADVERBS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdverbs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-purple-300 font-medium text-lg">
                No se encontraron adverbios.
              </div>
            ) : (
              filteredAdverbs.map((adverb, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-purple-50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-purple-400 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 capitalize">{adverb.word}</h3>
                      <p className="text-purple-500 font-bold">{adverb.spanish}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-purple-50 text-purple-600 px-3 py-1 rounded-full border border-purple-100">
                      {adverb.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb size={16} className="text-orange-400" />
                        <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">Uso</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 leading-relaxed">{adverb.explanation}</p>
                    </div>
                    <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={16} className="text-purple-400" />
                        <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Ejemplo</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 italic">"{adverb.example}"</p>
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
