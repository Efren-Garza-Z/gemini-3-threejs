export type LetterPart = 
    | { type: "text"; content: string }
    | { type: "input"; id: string; placeholder: string; width: string };

export interface LetterTemplate {
    id: string;
    title: string;
    tips: { title: string; content: string }[];
    parts: LetterPart[];
}

export const letterTemplates: LetterTemplate[] = [
    {
        id: "formal_request",
        title: "Escribir una Carta Formal",
        tips: [
            { title: "Saludo", content: "Usa 'Dear Mr./Mrs. [Apellido]' si sabes el nombre, o 'Dear Sir or Madam' si no." },
            { title: "Razón", content: "Comienza directamente explicando por qué escribes ('I am writing to...')." },
            { title: "Despedida", content: "Usa 'Yours sincerely' si sabes su nombre, o 'Yours faithfully' si usaste Sir/Madam." }
        ],
        parts: [
            { type: "text", content: "Dear " },
            { type: "input", id: "recipient", placeholder: "Mr. Smith", width: "w-40" },
            { type: "text", content: ",\n\nI am writing to you to request " },
            { type: "input", id: "reason", placeholder: "information about the course", width: "w-64" },
            { type: "text", content: ".\nI have been studying English for " },
            { type: "input", id: "duration", placeholder: "three years", width: "w-32" },
            { type: "text", content: " and I would like to improve my " },
            { type: "input", id: "skill", placeholder: "speaking skills", width: "w-40" },
            { type: "text", content: ".\nCould you please send me information about " },
            { type: "input", id: "info", placeholder: "the schedule and prices", width: "w-64" },
            { type: "text", content: "?\n\nI look forward to hearing from you soon.\n\nYours " },
            { type: "input", id: "closing", placeholder: "sincerely", width: "w-32" },
            { type: "text", content: ",\n" },
            { type: "input", id: "name", placeholder: "Your Name", width: "w-48" }
        ]
    },
    {
        id: "job_application",
        title: "Aplicación de Trabajo",
        tips: [
            { title: "Propósito", content: "Indica claramente el puesto al que aplicas ('I am writing to apply for...')." },
            { title: "Experiencia", content: "Menciona brevemente tu experiencia y cómo se relaciona con el rol." },
            { title: "Adjuntos", content: "No olvides mencionar que has adjuntado tu CV o resume ('I have attached...')." }
        ],
        parts: [
            { type: "text", content: "Dear " },
            { type: "input", id: "recipient", placeholder: "Hiring Manager", width: "w-40" },
            { type: "text", content: ",\n\nI am writing to apply for the position of " },
            { type: "input", id: "position", placeholder: "Software Engineer", width: "w-48" },
            { type: "text", content: " which was advertised in " },
            { type: "input", id: "where", placeholder: "LinkedIn", width: "w-32" },
            { type: "text", content: ".\n\nI have " },
            { type: "input", id: "years", placeholder: "5", width: "w-16" },
            { type: "text", content: " years of experience working as a " },
            { type: "input", id: "currentJob", placeholder: "Frontend Developer", width: "w-48" },
            { type: "text", content: ".\nI believe my skills in " },
            { type: "input", id: "skill", placeholder: "React and Next.js", width: "w-48" },
            { type: "text", content: " would make me a valuable addition to your team.\n\nI have attached my " },
            { type: "input", id: "document", placeholder: "resume and portfolio", width: "w-48" },
            { type: "text", content: " for your consideration.\nI look forward to discussing my application with you.\n\nYours " },
            { type: "input", id: "closing", placeholder: "faithfully", width: "w-32" },
            { type: "text", content: ",\n" },
            { type: "input", id: "name", placeholder: "Your Name", width: "w-48" }
        ]
    },
    {
        id: "informal_apology",
        title: "Disculpa Informal",
        tips: [
            { title: "Tono", content: "Usa un saludo informal como 'Hi' o 'Dear [Nombre]'." },
            { title: "Disculpa", content: "Sé directo y sincero ('I am so sorry, but...')." },
            { title: "Alternativa", content: "Propón otra ocasión para verse o compensar la situación." }
        ],
        parts: [
            { type: "text", content: "Hi " },
            { type: "input", id: "friendName", placeholder: "Sarah", width: "w-32" },
            { type: "text", content: ",\n\nI am so sorry, but I won't be able to make it to " },
            { type: "input", id: "event", placeholder: "your party", width: "w-40" },
            { type: "text", content: " on " },
            { type: "input", id: "day", placeholder: "Saturday", width: "w-32" },
            { type: "text", content: ".\n\nUnfortunately, " },
            { type: "input", id: "excuse", placeholder: "I have caught a terrible cold", width: "w-64" },
            { type: "text", content: ".\nI hope we can reschedule and meet up " },
            { type: "input", id: "nextTime", placeholder: "next week", width: "w-40" },
            { type: "text", content: ".\n\nHave a great time!\n\nBest,\n" },
            { type: "input", id: "name", placeholder: "Your Name", width: "w-48" }
        ]
    }
];
