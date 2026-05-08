"use client";

import { useState } from "react";
import verbsData from "@/app/data/verbs.json";
import SidebarLayout from "@/components/SidebarLayout";
import { Search, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerbsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"regular" | "irregular">("irregular");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVerbs = verbsData.filter(v => 
    v.type === activeTab && 
    (v.english.includes(searchTerm.toLowerCase()) || v.spanish.includes(searchTerm.toLowerCase()))
  );

  return (
    <SidebarLayout>
      <div className="w-full min-h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 pb-20 pt-12 px-6">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition-colors"
          >
            <ChevronLeft size={20} /> Volver al Inicio
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tight">Verbos Maestros</h1>
          <p className="text-lg text-indigo-800/80 mb-10 font-medium">Domina las tres formas temporales de los verbos más importantes en inglés.</p>

          {/* CONTROLS */}
          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-white/50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            
            <div className="flex bg-indigo-100/50 p-1 rounded-2xl w-full md:w-auto overflow-hidden border border-indigo-100">
              <button 
                onClick={() => setActiveTab("irregular")}
                className={`flex-1 md:px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "irregular" ? "bg-white shadow-sm text-indigo-700" : "text-indigo-400 hover:text-indigo-600"
                }`}
              >
                Irregulares
              </button>
              <button 
                onClick={() => setActiveTab("regular")}
                className={`flex-1 md:px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "regular" ? "bg-white shadow-sm text-indigo-700" : "text-indigo-400 hover:text-indigo-600"
                }`}
              >
                Regulares
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={20} />
              <input 
                type="text" 
                placeholder="Buscar verbo en IN/ES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-indigo-100 rounded-2xl py-3 pl-12 pr-4 text-indigo-900 font-medium outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>

          </div>

          {/* GRID OF VERBS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVerbs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-indigo-300 font-medium text-lg">
                No se encontraron verbos en esta categoría.
              </div>
            ) : (
              filteredVerbs.map((verb, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 capitalize">{verb.english}</h3>
                      <p className="text-indigo-500 font-bold">{verb.spanish}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full">
                      {verb.type}
                    </span>
                  </div>
                  
                  <div className="bg-indigo-50/50 rounded-2xl p-4 grid grid-cols-2 gap-4 border border-indigo-50/50">
                    <div>
                      <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Past Simple</span>
                      <span className="font-semibold text-zinc-800">{verb.past}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Past Participle</span>
                      <span className="font-semibold text-zinc-800">{verb.participle}</span>
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
