export interface WritingTask {
    id: string;
    type: "Task 1" | "Task 2";
    title: string;
    instructions: string;
    image?: string; // Para el gráfico de la Task 1
    minWords: number;
    suggestedTime: number;
    topic: string;
    tips: { title: string; example: string }[]; // Nueva sección de consejos
}

export const ieltsWritingData: WritingTask[] = [
    {
        id: "writing-t1-recycling",
        type: "Task 1",
        title: "Academic Writing - Line Graph",
        instructions: "Summarise the information by selecting and reporting the main features, making comparisons where relevant.",
        topic: "The graph shows the proportion of four different materials that were recycled from 1982 to 2010 in a particular country.",
        image: "/assest/ac_writing_task_1.png", // Aquí pondrías la imagen del gráfico
        minWords: 150,
        suggestedTime: 20,
        tips: [
            { title: "Comparatives", example: "The recycling rate for paper was significantly higher than for plastic." },
            { title: "Trends", example: "Aluminum cans showed a dramatic increase over the 28-year period." }
        ]
    },
    {
        id: "writing-t2-languages",
        type: "Task 2",
        title: "Academic Writing - Essay",
        instructions: "Give reasons for your answer and include any relevant examples from your own experience or knowledge.",
        topic: "Learning English at school is often seen as more important than learning local languages. If these are not taught, many are at risk of dying out. In your opinion, is it important for everyone to learn English? Should we try to ensure the survival of local languages?",
        minWords: 250,
        suggestedTime: 40,
        tips: [
            { title: "Conditionals", example: "If local languages are not protected, cultural heritage will be lost." },
            { title: "Modal Verbs", example: "Governments should implement policies to support bilingual education." }
        ]
    }
];