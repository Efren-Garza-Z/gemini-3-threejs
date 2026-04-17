"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ChevronLeft, BrainCircuit, RefreshCcw, Send, CheckCircle2, RotateCw } from "lucide-react";
import vocabData from "@/app/data/vocabulary.json";
import { apiService } from "@/services/api";
import getTokenFromCookie from "@/services/api";
import ReactMarkdown from "react-markdown";

export default function VocabularyPage() {
  const router = useRouter();
  
  // Game State
  const [setupMode, setSetupMode] = useState(true);
  const [level, setLevel] = useState("A1");
  const [amount, setAmount] = useState(5);
  
  const [sessionWords, setSessionWords] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Card & Input State
  const [isFlipped, setIsFlipped] = useState(false);
  const [sentenceInput, setSentenceInput] = useState("");
  const [savedSentences, setSavedSentences] = useState<{word: string, sentence: string}[]>([]);
  
  // AI Review State
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const startSession = () => {
    // Escoger palabras aleatorias del nivel
    const filtered = vocabData.filter(v => v.level === level);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, amount);
    
    // Si no hay suficientes palabras para probar, tomamos las que haya
    setSessionWords(selected.length > 0 ? selected : [{word: "Error", meaning: "Sin datos", level}]);
    setCurrentIndex(0);
    setSavedSentences([]);
    setIsFlipped(false);
    setSentenceInput("");
    setIsFinished(false);
    setAiFeedback(null);
    setSetupMode(false);
  };

  const handleNextWord = () => {
    if (!sentenceInput.trim()) return;

    const currentWord = sessionWords[currentIndex];
    const updatedSentences = [...savedSentences, { word: currentWord.word, sentence: sentenceInput }];
    setSavedSentences(updatedSentences);

    if (currentIndex + 1 < sessionWords.length) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSentenceInput("");
    } else {
      setIsFinished(true);
    }
  };

  const handleRequestAIReview = async () => {
    setIsAnalyzing(true);

    const formattedSentences = savedSentences.map((s, i) => `${i+1}. Palabra [${s.word}]: "${s.sentence}"`).join("\\n");
    const prompt = `Soy un estudiante de inglés nivel ${level}. He practicado escribiendo estas oraciones con nuevo vocabulario:\\n${formattedSentences}\\n\\nPor favor, revisa cada oración y escribe retroalimentación en ESPAÑOL. Dime si están bien escritas, corrige mis errores ortográficos o gramaticales y sé muy breve y motivador. Usa formato Markdown.`;

    try {
      const response = await apiService.processExercise(prompt);
      if (response && response.task_id) {
        pollStatus(response.task_id);
      } else {
        setAiFeedback("Error: No se inició la tarea de IA.");
        setIsAnalyzing(false);
      }
    } catch (e: any) {
      setAiFeedback(`Error al conectar con la IA: ${e.message}`);
      setIsAnalyzing(false);
    }
  };

  const pollStatus = async (taskId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const check = await apiService.checkStatus(taskId);
        if (check.status === "finalizado" && check.result) {
          setAiFeedback(check.result);
          setIsAnalyzing(false);
          clearInterval(intervalId);
        } else if (check.status === "fallido") {
          setAiFeedback("Hubo un error al generar la retroalimentación.");
          setIsAnalyzing(false);
          clearInterval(intervalId);
        }
      } catch (e) {
        setAiFeedback("Error de conexión al revisar el estado.");
        setIsAnalyzing(false);
        clearInterval(intervalId);
      }
    }, 2000); // Check every 2 secs
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 pb-20">
      <Navbar />
      
      <div className="max-w-2xl mx-auto pt-36 px-6 animate-in fade-in duration-500">
        <button 
          onClick={() => setupMode ? router.push("/home") : setSetupMode(true)}
          className="flex items-center gap-2 text-teal-700 font-semibold mb-6 hover:text-teal-900 transition-colors"
        >
          <ChevronLeft size={20} /> {setupMode ? "Volver al Inicio" : "Abandonar Práctica"}
        </button>

        <div className="flex items-center gap-4 mb-2">
            <div className="bg-teal-200 text-teal-800 p-3 rounded-2xl">
                <BrainCircuit size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-teal-950 tracking-tight">Vocabulary Builder</h1>
        </div>
        <p className="text-lg text-teal-800/80 mb-10 font-medium">Memoriza, contextualiza y recibe retroalimentación inteligente.</p>

        {/* SETUP MODE */}
        {setupMode && (
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Configura tu sesión</h2>
            
            <div className="mb-6">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Nivel de Inglés</label>
                <div className="flex flex-wrap gap-2">
                    {levels.map(l => (
                        <button 
                            key={l}
                            onClick={() => setLevel(l)}
                            className={`px-5 py-2.5 rounded-xl font-bold transition-all border-2 ${
                                level === l ? "border-teal-500 bg-teal-50 text-teal-700" : "border-transparent bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Palabras a probar</label>
                <div className="flex gap-2">
                    {[5, 10].map(n => (
                        <button 
                            key={n}
                            onClick={() => setAmount(n)}
                            className={`flex-1 py-3 rounded-xl font-black text-lg transition-all border-2 ${
                                amount === n ? "border-orange-400 bg-orange-50 text-orange-600" : "border-transparent bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                            }`}
                        >
                            {n} Palabras
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={startSession}
                className="w-full bg-teal-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
            >
                Empezar Reto <Send size={20} />
            </button>
          </div>
        )}

        {/* GAME LOOP */}
        {!setupMode && !isFinished && (
           <div className="animate-in slide-in-from-right-8 duration-500">
               <div className="flex items-center justify-between mb-6">
                   <div className="text-teal-800 font-bold bg-teal-100 px-4 py-1.5 rounded-full text-sm uppercase tracking-widest">
                       Nivel {level}
                   </div>
                   <div className="font-black text-zinc-400">
                       <span className="text-teal-600 text-2xl">{currentIndex + 1}</span> / {amount}
                   </div>
               </div>

               {/* THE FLIP CARD */}
               <div className="perspective-1000 w-full mb-8 h-48">
                    <div 
                        onClick={() => setIsFlipped(!isFlipped)}
                        className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                    >
                        {/* Frente (Inglés) */}
                        <div className="absolute w-full h-full backface-hidden bg-white border border-zinc-100 shadow-xl rounded-[40px] flex items-center justify-center flex-col p-6 user-select-none">
                            <span className="text-zinc-400 font-semibold mb-2 flex items-center gap-2">Toca para traducir <RotateCw size={14}/></span>
                            <h2 className="text-5xl font-black text-zinc-900 tracking-tight">{sessionWords[currentIndex]?.word}</h2>
                        </div>
                        
                        {/* Reverso (Español) */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-teal-600 border border-teal-500 shadow-xl rounded-[40px] flex items-center justify-center flex-col p-6 text-white user-select-none">
                            <span className="text-teal-200 font-semibold mb-2 flex items-center gap-2">Significado <CheckCircle2 size={14}/></span>
                            <h2 className="text-4xl font-balck text-center">{sessionWords[currentIndex]?.meaning}</h2>
                        </div>
                    </div>
               </div>

               <div className="bg-white p-6 rounded-[32px] shadow-sm border border-zinc-100">
                   <label className="block text-zinc-800 font-bold mb-3">Escribe una oración usando la palabra:</label>
                   <textarea
                     value={sentenceInput}
                     onChange={(e) => setSentenceInput(e.target.value)}
                     placeholder={`Ex: I need to buy a new ${sessionWords[currentIndex]?.word.toLowerCase()}...`}
                     className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 min-h-32 text-zinc-800 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 mb-4 transition-all"
                   ></textarea>
                   <button 
                     onClick={handleNextWord}
                     disabled={!sentenceInput.trim()}
                     className="w-full py-4 rounded-xl font-bold bg-zinc-900 text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                   >
                       {currentIndex + 1 === amount ? "Finalizar Práctica" : "Siguiente Palabra"}
                   </button>
               </div>
           </div>
        )}

        {/* REVIEW MODE */}
        {isFinished && (
            <div className="animate-in zoom-in-95 duration-500">
                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-zinc-100">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-zinc-900">¡Práctica Completada!</h2>
                        <p className="text-zinc-500 mt-2">Has formulado {amount} oraciones exitosamente.</p>
                    </div>

                    {!aiFeedback && !isAnalyzing && (
                        <div className="space-y-4">
                            <button 
                                onClick={handleRequestAIReview}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 rounded-2xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all"
                            >
                                <BrainCircuit /> Revisar mis oraciones con la IA
                            </button>
                            <button 
                                onClick={() => setSetupMode(true)}
                                className="w-full flex items-center justify-center gap-3 bg-zinc-100 text-zinc-600 p-4 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
                            >
                                <RefreshCcw size={18} /> Practicar otro nivel
                            </button>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="text-center py-12">
                            <RefreshCcw size={40} className="animate-spin text-teal-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-zinc-800">El Agente está analizando...</h3>
                            <p className="text-zinc-500 text-sm">Detectando errores gramaticales y de ortografía.</p>
                        </div>
                    )}

                    {aiFeedback && !isAnalyzing && (
                        <div className="mt-8 border-t border-zinc-100 pt-8 animate-in slide-in-from-bottom-4">
                            <h3 className="text-xl font-black text-zinc-900 mb-4 flex items-center gap-2">
                                <BrainCircuit className="text-teal-500" /> Feedback Inteligente
                            </h3>
                            <div className="prose prose-teal prose-zinc max-w-none bg-teal-50/50 p-6 rounded-3xl border border-teal-100">
                                <ReactMarkdown>{aiFeedback}</ReactMarkdown>
                            </div>

                            <button
                                onClick={() => setupMode ? router.push("/home") : setSetupMode(true)}
                                className="w-full mt-6 bg-zinc-900 text-white p-4 rounded-2xl font-bold hover:bg-zinc-800 transition-colors"
                            >
                                Finalizar y salir
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
