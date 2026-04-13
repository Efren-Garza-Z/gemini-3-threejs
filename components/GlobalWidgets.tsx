"use client";

import { useEffect, useState } from "react";
import { Book, NotebookPen, X, Search, Sparkles } from "lucide-react";
import DictionaryData from "@/app/data/dictionary.json";
import { usePathname } from "next/navigation";

// Types
interface Note {
  id: string;
  text: string;
  context?: string;
  date: string;
}

interface SelectionContext {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

export default function GlobalWidgets() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [selection, setSelection] = useState<SelectionContext>({ visible: false, x: 0, y: 0, text: "" });
  const [dictModal, setDictModal] = useState<{ visible: boolean; word: string; result: any }>({ visible: false, word: "", result: null });
  const [customNoteText, setCustomNoteText] = useState("");
  const pathname = usePathname();

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user_notebook");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage when notes change
  useEffect(() => {
    localStorage.setItem("user_notebook", JSON.stringify(notes));
  }, [notes]);

  // Handle Text Selection
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          setSelection(prev => ({ ...prev, visible: false }));
          return;
        }

        const text = sel.toString().trim();
        if (text.length > 0 && text.length < 300) { // arbitrary limit so it doesn't show for huge selections
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Calculate middle top position
          setSelection({
            visible: true,
            x: rect.left + (rect.width / 2),
            y: rect.top - 10, // 10px above selection
            text: text,
          });
        } else {
          setSelection(prev => ({ ...prev, visible: false }));
        }
      }, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't close if clicking inside the widget
      if ((e.target as HTMLElement).closest('.selection-widget')) return;
      window.getSelection()?.removeAllRanges();
      setSelection(prev => ({ ...prev, visible: false }));
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleAddNote = (text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setSelection(prev => ({ ...prev, visible: false }));
    window.getSelection()?.removeAllRanges();
    setIsNotebookOpen(true);
  };

  const handleCreateCustomNote = () => {
    if (!customNoteText.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: customNoteText,
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setCustomNoteText("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleDictionaryLookup = (rawText: string) => {
    setSelection(prev => ({ ...prev, visible: false }));
    window.getSelection()?.removeAllRanges();
    
    // Clean text: only letters and numbers
    const word = rawText.replace(/[^a-zA-Z0-9\s]/g, '').trim().toLowerCase();
    
    // Exact match or contains logic
    // For PoC, exact match first word if multiple selected
    const targetWord = word.split(' ')[0];
    
    const entry = DictionaryData.find(d => d.word.toLowerCase() === targetWord);
    
    setDictModal({
      visible: true,
      word: targetWord,
      result: entry || null
    });
  };

  if (pathname === "/") {
    return null;
  }


  return (
    <>
      {/* SELECTION TOOLTIP */}
      {selection.visible && (
        <div 
          className="fixed z-[9999] selection-widget bg-zinc-900 border border-zinc-700 text-white shadow-2xl rounded-xl flex items-center p-1.5 gap-1 animate-in fade-in zoom-in-95 duration-200"
          style={{ 
            top: selection.y, 
            left: selection.x, 
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <button 
            onClick={() => handleAddNote(selection.text)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm font-semibold transition-colors"
          >
            <NotebookPen size={16} className="text-orange-400" /> Añadir a Notas
          </button>
          <div className="w-px h-6 bg-zinc-700 mx-1"></div>
          <button 
            onClick={() => handleDictionaryLookup(selection.text)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm font-semibold transition-colors"
          >
            <Book size={16} className="text-teal-400" /> Definición
          </button>
          
          {/* Pequeña flecha debajo */}
          <div className="absolute left-1/2 bottom-0 w-3 h-3 bg-zinc-900 border-b border-l border-zinc-700 transform -translate-x-1/2 translate-y-1/2 -rotate-45"></div>
        </div>
      )}

      {/* DICTIONARY MODAL */}
      {dictModal.visible && (
        <div className="fixed inset-0 z-[9900] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-white/40">
            <div className="bg-teal-600 text-white p-6 relative">
              <button 
                onClick={() => setDictModal(prev => ({ ...prev, visible: false }))}
                className="absolute top-4 right-4 bg-teal-700 hover:bg-teal-800 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 opacity-80 mb-2">
                <Book size={20} />
                <span className="font-semibold uppercase tracking-widest text-sm">Diccionario ICB</span>
              </div>
              <h2 className="text-4xl font-black">{dictModal.word}</h2>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {dictModal.result ? (
                <div className="space-y-6">
                  {dictModal.result.definitions.map((def: any, i: number) => (
                    <div key={i} className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100">
                      <p className="font-bold text-zinc-800 text-lg mb-2 flex items-center gap-2">
                         <span className="bg-teal-200 text-teal-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">{i + 1}</span> 
                         {def.meaning}
                      </p>
                      <p className="text-zinc-600 italic border-l-4 border-teal-400 pl-3">"{def.example}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <Search size={48} className="mx-auto text-zinc-300" />
                  <p className="text-zinc-500 font-medium">No se encontró la palabra <span className="font-bold text-zinc-800">"{dictModal.word}"</span> en nuestro diccionario de prueba.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING NOTEBOOK BUTTON */}
      <button 
        onClick={() => setIsNotebookOpen(true)}
        className="fixed bottom-4 left-4 z-[9000] bg-orange-300 text-orange-950 p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-orange-200"
      >
        <NotebookPen size={20} />
      </button>

      {/* NOTEBOOK PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[9500] transform transition-transform duration-300 ease-in-out border-l border-zinc-200 flex flex-col ${isNotebookOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-orange-950">
            <NotebookPen size={28} />
            <h2 className="text-2xl font-black tracking-tight">Mis Apuntes</h2>
          </div>
          <button 
            onClick={() => setIsNotebookOpen(false)}
            className="p-2 bg-orange-200 text-orange-950 rounded-full hover:bg-orange-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Create Note Area */}
        <div className="p-4 bg-orange-50/50 border-b border-zinc-100">
           <textarea 
             value={customNoteText}
             onChange={(e) => setCustomNoteText(e.target.value)}
             placeholder="Escribe una nota fresca aquí..."
             className="w-full bg-white border border-zinc-300 rounded-xl p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none h-24 mb-3"
           ></textarea>
           <button 
             onClick={handleCreateCustomNote}
             className="w-full bg-orange-200 text-orange-950 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-300 transition-colors"
           >
             <Sparkles size={16} /> Guardar Apunte
           </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-zinc-50/50">
          {notes.length === 0 ? (
            <div className="text-center text-zinc-400 mt-10">
              <NotebookPen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Tu libreta está vacía.</p>
              <p className="text-sm mt-2">Selecciona cualquier texto y presiona "Añadir a Notas" para guardar conocimiento valioso.</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm relative group hover:border-orange-300 transition-colors">
                <button 
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full uppercase tracking-wider">
                    {note.date}
                  </span>
                </div>
                <p className="text-zinc-800 leading-relaxed whitespace-pre-wrap">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  );
}
