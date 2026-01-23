"use client"
import { useState, useEffect } from "react";
import getTokenFromCookie, { apiService } from "@/services/api";
import { Loader2, Clock, Send, AlertCircle, BookOpen, ChevronLeft, Lightbulb } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { ieltsWritingData, WritingTask } from "@/app/ielts/data/writingTasks";
import Navbar from "@/app/navbar/Navbar";

export default function IeltsWritingPage() {
    // ESTADOS DE NAVEGACIÓN
    const [selectedTask, setSelectedTask] = useState<WritingTask | null>(null);
    const [isStarted, setIsStarted] = useState(false);

    // ESTADOS DE EJERCICIO
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [taskId, setTaskId] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [token, setToken] = useState<string | null>(null);
    const [isFileType, setIsFileType] = useState<boolean>(false);

    useEffect(() => {
        const savedToken = getTokenFromCookie();
        if (savedToken) setToken(savedToken);
    }, []);

    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // Timer Logic
    useEffect(() => {
        if (!isStarted || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [isStarted, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const startTask = (task: WritingTask) => {
        setSelectedTask(task);
        setTimeLeft(task.suggestedTime * 60);
        setIsStarted(true);
        setText("");
        setResult(null);
    };

    const handleEvaluate = async () => {
        if (!token || !selectedTask) return;
        setLoading(true);
        setStatus("pendiente");
        setResult(null);

        const prompt = `Actúa como examinador experto de IELTS. Evalúa según criterios oficiales: Task Response, Coherence, Lexical Resource y Grammar. Texto: ${text}. TEMA: ${selectedTask.topic}`;

        try {
            let res;
            if (selectedTask.image) {
                res = await apiService.processFile(prompt, selectedTask.image, token);
                setIsFileType(true);
            } else {
                res = await apiService.processExercise(prompt, token);
                setIsFileType(false);
            }
            if (res.task_id) setTaskId(res.task_id);
        } catch (error) {
            setStatus("error");
            setLoading(false);
        }
    };

    // Polling Effect (mismo que tenías)
    useEffect(() => {
        let interval: any;
        if (taskId && (status === "pendiente" || status === "en_proceso")) {
            interval = setInterval(async () => {
                const res = isFileType ? await apiService.checkFileStatus(taskId, token!) : await apiService.checkStatus(taskId, token!);
                setStatus(res.status);
                if (res.status === "finalizado") {
                    setResult(res.result);
                    setLoading(false);
                    clearInterval(interval);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [taskId, status]);

    // --- VISTA 1: SELECTOR DE CARDS ---
    if (!isStarted) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] pt-24 px-6 pb-20">
                <Navbar />
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Writing Practice</h1>
                    <p className="text-slate-600 mb-10">Select a task to begin your preparation.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {ieltsWritingData.map((task) => (
                            <div
                                key={task.id}
                                onClick={() => startTask(task)}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {task.type}
                                    </span>
                                    <Clock className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{task.title}</h3>
                                <p className="text-slate-600 line-clamp-2 mb-6">{task.topic}</p>
                                <div className="flex gap-6 text-sm font-bold text-slate-500">
                                    <span className="flex items-center gap-2"><Clock size={16}/> {task.suggestedTime} min</span>
                                    <span className="flex items-center gap-2"><BookOpen size={16}/> {task.minWords} words</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // --- VISTA 2: ENTORNO DE PRÁCTICA ---
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] pt-24 px-4 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto flex flex-col gap-6 mt-6">
                <button
                    onClick={() => setIsStarted(false)}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors w-fit"
                >
                    <ChevronLeft size={20}/> Back to tasks
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* COLUMNA IZQUIERDA: INSTRUCCIONES Y TIPS */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                            <h1 className="text-3xl font-black text-slate-900 mb-4">{selectedTask?.title}</h1>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-2">Instructions</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{selectedTask?.instructions}</p>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-2">Topic</h4>
                                    <p className="text-slate-700 font-medium leading-relaxed">{selectedTask?.topic}</p>
                                </div>
                                {selectedTask?.image && (
                                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <img src={selectedTask.image} alt="Task visual" className="w-full rounded-lg" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* NUEVA CARD DE CONSEJOS (TIPS) */}
                        <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-200">
                            <div className="flex items-center gap-2 mb-4 text-amber-700">
                                <Lightbulb size={20} />
                                <h3 className="font-black uppercase text-sm tracking-widest">Study Tips & Structures</h3>
                            </div>
                            <div className="space-y-4">
                                {selectedTask?.tips.map((tip, index) => (
                                    <div key={index} className="bg-white/60 p-4 rounded-xl">
                                        <p className="font-bold text-slate-800 text-sm">{tip.title}:</p>
                                        <p className="text-sm italic text-slate-600">"{tip.example}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: EDITOR */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center px-4">
                            <div className={`text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-slate-700'}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <div className="text-sm font-bold text-slate-500">
                                Words: <span className={wordCount < (selectedTask?.minWords ?? 0) ? 'text-orange-500' : 'text-green-600'}>{wordCount}</span>
                            </div>
                        </div>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write your essay here..."
                            className="w-full h-[500px] p-8 rounded-[2rem] border-2 border-slate-200 focus:border-indigo-500 outline-none shadow-inner resize-none text-lg text-gray-900 leading-relaxed"
                        />

                        <button
                            onClick={handleEvaluate}
                            disabled={loading || wordCount < 10}
                            className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black text-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Submit for Evaluation"}
                        </button>
                    </div>
                </div>

                {/* RESULTADOS */}
                {result && (
                    <div className="max-w-4xl mx-auto mt-8 bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-indigo-500/20">
                        <h2 className="text-3xl font-black mb-6">Examiner Feedback</h2>
                        <div className="prose prose-indigo max-w-none text-slate-700 font-medium">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}