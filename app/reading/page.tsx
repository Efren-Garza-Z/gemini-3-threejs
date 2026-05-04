"use client"
import { useState, useEffect } from "react";
import { ieltsReadingData, ReadingTest } from "@/app/ielts/data/readingTasks";
import SidebarLayout from "@/components/SidebarLayout";
import {Clock, BookOpen, Info, ChevronLeft, CheckCircle2, Loader2, AlertCircle} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import {useTestEvaluation} from "@/app/reading/hooks/Usetestevaluation";
import InstructionsModal from "@/app/reading/components/Instructionsmodal";
import {QuestionRenderer} from "@/app/reading/components/Questionrenderer";
import {Toast} from "@/components/Notice";


export default function IeltsReadingPage() {
    const [selectedTest, setSelectedTest] = useState<ReadingTest | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [showInstructions, setShowInstructions] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);


    const { loading, result, evaluateTest, resetEvaluation } = useTestEvaluation();

    // Timer
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

    const handleStart = (test: ReadingTest) => {
        setSelectedTest(test);
        setTimeLeft(test.duration * 60);
        setIsStarted(true);
        setShowInstructions(true);
        setAnswers({});
        resetEvaluation();
    };

    const handleFinishTest = () => {
        if (!selectedTest) return;

        const answeredCount = Object.keys(answers).length;
        if (answeredCount === 0) {
            setToast({ message: "La contraseña es muy corta (mínimo 4)", type: 'error' });
            return;
        }

        setShowConfirmModal(true);
    };

    // Modal de Confirmación Visual
    const ConfirmationModal = () => (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={32} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                    Ready to submit?
                </h3>

                <p className="text-slate-600 text-center mb-8">
                    You have answered <span className="font-bold text-indigo-600">{Object.keys(answers).length}</span> out of <span className="font-bold text-slate-900">{selectedTest?.totalQuestions}</span> questions.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            setShowConfirmModal(false);
                            evaluateTest(selectedTest!.title, selectedTest!.sections, answers);
                        }}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        Yes, submit my test
                    </button>

                    <button
                        onClick={() => setShowConfirmModal(false)}
                        className="w-full py-4 bg-white text-slate-600 rounded-2xl font-bold hover:bg-slate-50 border border-slate-200 transition-all"
                    >
                        No, let me check again
                    </button>
                </div>
            </div>
        </div>
    );

    // --- VISTA 1: CARDS DE SELECCIÓN ---
    if (!isStarted) {
        return (
            <SidebarLayout>
            <div className="w-full min-h-full bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
                <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
                    <div className="mb-12">
                        <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">Reading Practice</h1>
                        <p className="text-lg text-slate-600">Choose a practice test. You will have 60 minutes to complete 3 sections.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ieltsReadingData.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-indigo-300 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Paper-based format
                                        </span>
                                        <Clock className="text-slate-300" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{test.title}</h3>
                                    <ul className="space-y-3 mb-8">
                                        {test.instructions.slice(0, 3).map((ins, i) => (
                                            <li key={i} className="text-sm text-slate-600 flex gap-3 items-start">
                                                <CheckCircle2 size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                                                <span>{ins}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handleStart(test)}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Clock size={18} />
                                    Start Test (60 min)
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </SidebarLayout>
        );
    }

    // --- VISTA 2: ENTORNO DE EXAMEN ---
    return (
        <SidebarLayout>
        <div className="h-full flex flex-col bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">

            {/* Header del Test */}
            <div className="pt-20 px-6 py-4 border-b flex justify-between items-center text-black shadow-lg mt-9">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsStarted(false)}
                        className="hover:text-indigo-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="font-bold text-lg">{selectedTest?.title}</h2>
                </div>
                <div className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-green-400'}`}>
                    Time Left: {formatTime(timeLeft)}
                </div>
            </div>

            {/* Panel de Instrucciones */}
            <div>
                {showInstructions && (
                    <InstructionsModal
                        selectedTest={selectedTest}
                        onClose={() => setShowInstructions(false)}
                    />
                )}
            </div>


            {/* Layout de Lectura y Preguntas */}
            <div className="flex flex-1 overflow-hidden">
                {/* LADO IZQUIERDO: TEXTOS */}
                <div className="w-1/2 overflow-y-auto p-8 border-r bg-slate-50 text-black">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {selectedTest?.sections.map((section) => (
                            <div key={section.sectionNumber} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                                <div className="mb-6">
                                    <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                        Section {section.sectionNumber}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
                                </div>
                                <article className="prose prose-slate prose-lg max-w-none">
                                    <ReactMarkdown>{section.text}</ReactMarkdown>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LADO DERECHO: PREGUNTAS */}
                <div className="w-1/2 overflow-y-auto p-8 bg-white">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-200 flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-slate-900">
                                <BookOpen className="text-indigo-600" size={24} />
                                Answer Sheet
                            </h3>
                            <button
                                onClick={() => setShowInstructions(true)}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                            >
                                <Info size={16} />
                                View Instructions
                            </button>
                        </div>

                        {/* Progreso de respuestas */}
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 font-medium">Progress:</span>
                                <span className="text-slate-900 font-bold">
                                    {Object.keys(answers).length} / {selectedTest?.totalQuestions} answered
                                </span>
                            </div>
                            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-300"
                                    style={{
                                        width: `${(Object.keys(answers).length / (selectedTest?.totalQuestions || 1)) * 100}%`
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-10">
                            {selectedTest?.sections.map((section) => (
                                <div key={`questions-${section.sectionNumber}`} className="space-y-6">
                                    <h4 className="font-bold text-slate-500 uppercase text-sm tracking-wider border-b-2 border-slate-200 pb-3">
                                        Questions for Section {section.sectionNumber}
                                    </h4>
                                    {section.questions.map((q) => (
                                        <QuestionRenderer
                                            key={q.id}
                                            question={q}
                                            sectionQuestions={section.questions}
                                            answers={answers}
                                            setAnswers={setAnswers}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleFinishTest}
                            disabled={loading}
                            className="w-full mt-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Evaluating Your Test...
                                </>
                            ) : (
                                "Finish and Check Answers"
                            )}
                        </button>

                        {/* RESULTADOS */}
                        {result && (
                            <div className="mt-12 bg-white p-10 rounded-3xl shadow-xl border-4 border-indigo-500/20">
                                <h2 className="text-4xl font-bold mb-8 text-slate-900 flex items-center gap-3">
                                    <BookOpen className="text-indigo-600" />
                                    Your Results
                                </h2>
                                <div className="prose prose-lg prose-slate max-w-none">
                                    <ReactMarkdown>{result}</ReactMarkdown>
                                </div>
                                <button
                                    onClick={() => {
                                        resetEvaluation();
                                        setAnswers({});
                                        setTimeLeft(selectedTest?.duration ? selectedTest.duration * 60 : 3600);
                                    }}
                                    className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal de Confirmación */}
            {showConfirmModal && <ConfirmationModal />}
        </div>
        </SidebarLayout>
    );
}