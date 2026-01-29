import { List } from "lucide-react";
import { ReadingQuestion } from "@/app/ielts/data/readingTasks";

interface QuestionRendererProps {
    question: ReadingQuestion;
    sectionQuestions: ReadingQuestion[];
    answers: { [key: number]: string };
    setAnswers: (answers: { [key: number]: string }) => void;
}

export const QuestionRenderer = ({
                                     question,
                                     sectionQuestions,
                                     answers,
                                     setAnswers
                                 }: QuestionRendererProps) => {
    const commonLabelClasses = "text-slate-700 font-medium flex items-start gap-3";
    const commonNumberClasses = "inline-block bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-bold shrink-0";

    // Función para obtener las opciones de matching de un grupo
    const getMatchingOptions = (questions: ReadingQuestion[], currentQuestionId: number): string[] => {
        const questionWithOptions = questions.find(q =>
            q.type === "matching" &&
            q.options &&
            q.options.length > 0 &&
            Math.abs(q.id - currentQuestionId) <= 10
        );
        return questionWithOptions?.options || [];
    };

    switch (question.type) {
        case "matching":
            const options = question.options && question.options.length > 0
                ? question.options
                : getMatchingOptions(sectionQuestions, question.id);

            return (
                <div key={question.id} className="space-y-3">
                    <label className={commonLabelClasses}>
                        <span className={commonNumberClasses}>{question.id}</span>
                        <span className="leading-relaxed">{question.text}</span>
                    </label>

                    {question.options && question.options.length > 0 && (
                        <div className="ml-12 mb-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                            <p className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                                <List size={16} />
                                Choose from the following options:
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                {options.map((option, idx) => (
                                    <div key={idx} className="text-sm text-slate-700 font-medium">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <input
                        type="text"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                        placeholder="Enter your answer (e.g., i, ii, A, B)..."
                        value={answers[question.id] || ""}
                        onChange={(e) => setAnswers({...answers, [question.id]: e.target.value.toUpperCase()})}
                    />
                </div>
            );

        case "true-false-ng":
            return (
                <div key={question.id} className="space-y-3">
                    <label className={commonLabelClasses}>
                        <span className={commonNumberClasses}>{question.id}</span>
                        <span className="leading-relaxed">{question.text}</span>
                    </label>

                    <div className="flex gap-3">
                        {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                            <button
                                key={option}
                                onClick={() => setAnswers({...answers, [question.id]: option})}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                                    answers[question.id] === option
                                        ? "bg-indigo-600 text-white shadow-lg scale-105"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            );

        case "fill-in":
        default:
            return (
                <div key={question.id} className="space-y-2">
                    <label className={commonLabelClasses}>
                        <span className={commonNumberClasses}>{question.id}</span>
                        <span className="leading-relaxed">{question.text}</span>
                    </label>
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Your answer..."
                        value={answers[question.id] || ""}
                        onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
                    />
                </div>
            );
    }
};