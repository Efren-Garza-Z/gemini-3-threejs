"use client";

import { useState } from "react";
import phrasalVerbsData from "@/app/data/phrasal-verbs.json";
import SidebarLayout from "@/components/SidebarLayout";
import { Search, ChevronLeft, Lightbulb, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PhrasalVerbsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPhrasalVerbs = phrasalVerbsData.filter(pv => 
    pv.word.includes(searchTerm.toLowerCase()) || 
    pv.spanish.includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="w-full min-h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 pb-20 pt-12 px-6">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition-colors"
          >
            <ChevronLeft size={20} /> Volver al Inicio
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tight">Phrasal Verbs</h1>
          <p className="text-lg text-indigo-800/80 mb-10 font-medium">Domina los verbos compuestos más usados por hablantes nativos.</p>

          {/* CONTROLS */}
          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-white/50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={20} />
              <input 
                type="text" 
                placeholder="Buscar phrasal verb en IN/ES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-indigo-100 rounded-2xl py-3 pl-12 pr-4 text-indigo-900 font-medium outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* GRID OF PHRASAL VERBS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrasalVerbs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-indigo-300 font-medium text-lg">
                No se encontraron phrasal verbs.
              </div>
            ) : (
              filteredPhrasalVerbs.map((pv, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 lowercase">{pv.word}</h3>
                      <p className="text-indigo-500 font-bold">{pv.spanish}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                      {pv.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="bg-violet-50/50 rounded-2xl p-4 border border-violet-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb size={16} className="text-violet-500" />
                        <span className="text-xs font-bold text-violet-800 uppercase tracking-wider">Uso</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 leading-relaxed">{pv.explanation}</p>
                    </div>
                    <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={16} className="text-indigo-500" />
                        <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Ejemplo</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-700 italic">"{pv.example}"</p>
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
