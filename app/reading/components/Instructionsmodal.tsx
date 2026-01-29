import { Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { ReadingTest } from "@/app/ielts/data/readingTasks";

interface InstructionsModalProps {
    selectedTest: ReadingTest | null;
    onClose: () => void;
}

export default function InstructionsModal({ selectedTest, onClose }: InstructionsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[75vh] overflow-y-auto">
                {/* Header del modal */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-t-3xl">
                    <div className="flex items-center gap-3 text-white mb-4">
                        <Info size={32} />
                        <h2 className="text-3xl font-bold">Test Instructions</h2>
                    </div>
                    <p className="text-indigo-100">Please read carefully before starting</p>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-8">
                    {/* Instrucciones generales */}
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                        <h3 className="font-bold text-lg text-amber-900 mb-4 flex items-center gap-2">
                            <AlertCircle size={20} />
                            General Instructions
                        </h3>
                        <ul className="space-y-3">
                            {selectedTest?.instructions.map((instruction, i) => (
                                <li key={i} className="flex gap-3 text-slate-700">
                                    <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Información por sección */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-xl text-slate-900">Test Structure</h3>

                        {selectedTest?.sections.map((section) => (
                            <div key={section.sectionNumber} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <h4 className="font-bold text-indigo-600 mb-3">
                                    Section {section.sectionNumber}: {section.title}
                                </h4>
                                <div className="space-y-2 text-sm text-slate-600">
                                    {section.sectionNumber === 1 && (
                                        <>
                                            <p>• Questions 1-8: Complete sentences (max 3 words)</p>
                                            <p>• Questions 9-14: True/False/Not Given</p>
                                        </>
                                    )}
                                    {section.sectionNumber === 2 && (
                                        <>
                                            <p>• Questions 15-21: Match headings to paragraphs</p>
                                            <p>• Questions 22-23: Complete sentences (max 3 words)</p>
                                            <p>• Questions 24-28: Match descriptions to terms</p>
                                        </>
                                    )}
                                    {section.sectionNumber === 3 && (
                                        <>
                                            <p>• Questions 29-35: Match information to paragraphs</p>
                                            <p>• Questions 36-40: Complete summary (max 2 words)</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                        <h3 className="font-bold text-lg text-blue-900 mb-4">💡 Test Tips</h3>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>• Read the questions first before reading the text</li>
                            <li>• Manage your time: ~20 minutes per section</li>
                            <li>• For word limit questions, use exact words from the text</li>
                            <li>• Answers appear in order in the text</li>
                            <li>• Don't leave any questions blank - guess if needed</li>
                        </ul>
                    </div>
                </div>

                {/* Footer con botón */}
                <div className="p-6 border-t bg-slate-50 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                    >
                        I Understand - Start Test
                    </button>
                </div>
            </div>
        </div>
    );
}