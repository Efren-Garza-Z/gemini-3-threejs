import { useState, useEffect } from "react";
import getTokenFromCookie, { apiService } from "@/services/api";

export const useTestEvaluation = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [taskId, setTaskId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = getTokenFromCookie();
        if (savedToken) setToken(savedToken);
    }, []);

    // Polling Effect
    useEffect(() => {
        let interval: any;
        if (taskId && (status === "pendiente" || status === "en_proceso")) {
            interval = setInterval(async () => {
                const res = await apiService.checkStatus(taskId, token!);
                setStatus(res.status);
                if (res.status === "finalizado") {
                    setResult(res.result);
                    setLoading(false);
                    clearInterval(interval);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [taskId, status, token]);

    const evaluateTest = async (
        testTitle: string,
        sections: Array<{
            sectionNumber: number;
            title: string;
            text: string;
            questions: any[];
        }>,
        answers: { [key: number]: string }
    ) => {
        if (!token) {
            alert("Please login to evaluate your test");
            return;
        }

        setLoading(true);
        setStatus("pendiente");
        setResult(null);

        // Construir el prompt con toda la información
        const sectionsText = sections.map(section => {
            const questionsForThisSection = section.questions
                .map(q => `Question ${q.id}: ${q.text} ${q.type === 'matching' ? `(Options: ${q.options?.join(', ')})` : ''}`)
                .join("\n");

            return `### Section ${section.sectionNumber}: ${section.title}\n**Text:**\n${section.text}\n\n**Questions for this section:**\n${questionsForThisSection}`;
        }).join("\n\n---\n\n");

        const answersText = Object.entries(answers)
            .map(([questionId, answer]) => `Question ${questionId}: ${answer}`)
            .join("\n");

        const prompt = `You are an expert IELTS Reading examiner. Evaluate the following test answers according to official IELTS criteria.

            TEST: ${testTitle}
            
            READING PASSAGES:
            ${sectionsText}
            
            STUDENT'S ANSWERS:
            ${answersText}
            
            Please provide:
            1. **Score for each section** (out of the questions in that section)
            2. **Overall band score** (0-9 scale)
            3. **Detailed feedback** on incorrect answers with the correct answers
            4. **Strengths and weaknesses** in the student's performance
            5. **Recommendations** for improvement
            
            Format your response in clear sections with markdown.`;

        try {
            const res = await apiService.processExercise(prompt, token);
            if (res.task_id) setTaskId(res.task_id);
        } catch (error) {
            console.error("Evaluation error:", error);
            setStatus("error");
            setLoading(false);
            alert("Error evaluating test. Please try again.");
        }
    };

    const resetEvaluation = () => {
        setLoading(false);
        setResult(null);
        setStatus("");
        setTaskId(null);
    };

    return {
        loading,
        result,
        evaluateTest,
        resetEvaluation
    };
};