// app/activities/data/exercises.ts
import {
    Clock,
    Zap,
    HelpCircle,
    XCircle,
    Map,
    BookOpen,
    CheckCircle,
    RefreshCw,
    Layers,
    Activity,
    Shuffle, Sparkles, Calendar, GitBranch, TrendingUp, MessageSquare
} from "lucide-react";

export interface ExerciseData {
    id: string;
    title: string;
    description: string;
    level: string;
    colorTheme: string; // Para clases de Tailwind: blue, red, orange, etc.
    icon: any;
    grammarTip: {
        title: string;
        description: string;
        structure: string;
        examples: string[];
        extraNote?: string;
        markdownGuide?: string;
    };
    sentences: {
        id: string;
        textBefore: string;
        textAfter: string;
        hint: string;
    }[];
    aiPrompt: string;
}

export const exercisesData: ExerciseData[] = [
    {
        id: "present-simple",
        title: "Present Simple",
        description: "Aprende sobre rutinas y hechos permanentes.",
        level: "A1",
        colorTheme: "orange",
        icon: Clock,
        grammarTip: {
            title: "The Present Simple",
            description: "Se usa para verdades generales y hábitos diarios.",
            structure: "Sujeto + Verbo (base) + Complemento",
            examples: ["I work every day", "She works every day"],
            extraNote: "Añade -s/es para He, She, It."
        },
        sentences: [
            { id: "1", textBefore: "Every day, Mark", textAfter: "up early.", hint: "wake" },
            { id: "2", textBefore: "He", textAfter: "his teeth and goes to the kitchen.", hint: "brush" },
            { id: "3", textBefore: "His parents", textAfter: "breakfast for the whole family.", hint: "cook" },
            { id: "4", textBefore: "I", textAfter: "fresh coffee, Mark says.", hint: "love" },
            { id: "5", textBefore: "After breakfast, he", textAfter: "to the bus station.", hint: "walk" },
            { id: "6", textBefore: "The bus", textAfter: "at exactly 8:00 AM.", hint: "arrive" },
            { id: "7", textBefore: "At work, he", textAfter: "many emails.", hint: "write" },
            { id: "8", textBefore: "His colleagues", textAfter: "him with difficult tasks.", hint: "help" },
            { id: "9", textBefore: "In the evening, they", textAfter: "soccer in the park.", hint: "play" },
            { id: "10", textBefore: "Finally, Mark", textAfter: "to bed at 10:00 PM.", hint: "go" }
        ],
        aiPrompt: "Evaluate the following English exercise in Simple Present. Check for correct third-person conjugation (-s/-es)."
    },
    {
        id: "present-continuous",
        title: "Present Continuous",
        description: "Habla sobre lo que está pasando ahora mismo.",
        level: "A1",
        colorTheme: "blue",
        icon: Zap,
        grammarTip: {
            title: "Present Continuous",
            description: "Para acciones que ocurren en este preciso instante.",
            structure: "Subject + am/is/are + verb-ING",
            examples: [
                "I am eating an apple right now", 
                "They are playing soccer in the park",
                "She is not listening to music",
                "Are you working at the moment?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Right now, Mark", textAfter: "TV in the living room.", hint: "watch" },
            { id: "2", textBefore: "He", textAfter: "a cup of coffee.", hint: "drink" },
            { id: "3", textBefore: "His parents", textAfter: "breakfast in the kitchen.", hint: "prepare" },
            { id: "4", textBefore: "Mark", textAfter: "to his best friend on the phone.", hint: "talk" },
            { id: "5", textBefore: "Outside, people", textAfter: "for the bus.", hint: "wait" },
            { id: "6", textBefore: "The dog", textAfter: "in the garden.", hint: "run" },
            { id: "7", textBefore: "At work, his colleagues", textAfter: "on a new project.", hint: "work" },
            { id: "8", textBefore: "Right now, the children", textAfter: "soccer in the park.", hint: "play" },
            { id: "9", textBefore: "Mark", textAfter: "an important email.", hint: "write" },
            { id: "10", textBefore: "At the moment, he", textAfter: "about his next vacation.", hint: "think" }
        ]
        ,
        aiPrompt: "Evaluate the following English exercise in Present Continuous. Check for correct use of auxiliary verb (am/is/are) and -ing suffix."
    },
    {
        id: "present-perfect",
        title: "Present Perfect",
        description: "Habla sobre experiencias o acciones pasadas que tienen conexión con el presente.",
        level: "A2",
        colorTheme: "green",
        icon: CheckCircle,
        grammarTip: {
            title: "Present Perfect",
            description: "Para acciones que ocurrieron en el pasado pero son relevantes ahora.",
            structure: "Subject + have/has + past participle",
            examples: [
                "I have visited Paris twice", 
                "She has already finished her homework",
                "We haven't seen that movie yet",
                "Have you ever eaten sushi?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "his homework already.", hint: "finish" },
            { id: "2", textBefore: "He", textAfter: "to that restaurant before.", hint: "be" },
            { id: "3", textBefore: "His parents", textAfter: "three movies this week.", hint: "watch" },
            { id: "4", textBefore: "Mark", textAfter: "never", hint: "travel" },
            { id: "5", textBefore: "They", textAfter: "their keys.", hint: "lose" },
            { id: "6", textBefore: "She", textAfter: "the email yet.", hint: "send" },
            { id: "7", textBefore: "We", textAfter: "a lot from this course.", hint: "learn" },
            { id: "8", textBefore: "Mark", textAfter: "his boss today.", hint: "call" },
            { id: "9", textBefore: "The team", textAfter: "the project successfully.", hint: "complete" },
            { id: "10", textBefore: "I", textAfter: "this song many times.", hint: "hear" }
        ],
        aiPrompt: "Evaluate the following English exercise in Present Perfect. Check correct use of have/has and past participle form."
    },
    {
        id: "present-perfect-continuous",
        title: "Present Perfect Continuous",
        description: "Habla sobre acciones que empezaron en el pasado y continúan hasta ahora.",
        level: "A2",
        colorTheme: "zinc",
        icon: RefreshCw,
        grammarTip: {
            title: "Present Perfect Continuous",
            description: "Para enfatizar la duración de una acción que aún continúa o acaba de parar.",
            structure: "Subject + have/has + been + verb-ING",
            examples: [
                "I have been studying all day", 
                "They have been working here for years",
                "She has been reading that book since this morning",
                "We have been waiting for the bus for 30 minutes",
                "Have you been exercising lately?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "English for two years.", hint: "study" },
            { id: "2", textBefore: "He", textAfter: "since early morning.", hint: "work" },
            { id: "3", textBefore: "His parents", textAfter: "all afternoon.", hint: "cook" },
            { id: "4", textBefore: "She", textAfter: "for the bus for 20 minutes.", hint: "wait" },
            { id: "5", textBefore: "They", textAfter: "about moving to another city.", hint: "talk" },
            { id: "6", textBefore: "Mark", textAfter: "a lot lately.", hint: "travel" },
            { id: "7", textBefore: "We", textAfter: "this problem for hours.", hint: "solve" },
            { id: "8", textBefore: "The children", textAfter: "video games all day.", hint: "play" },
            { id: "9", textBefore: "I", textAfter: "to call you all morning.", hint: "try" },
            { id: "10", textBefore: "She", textAfter: "at this company since 2020.", hint: "work" }
        ],
        aiPrompt: "Evaluate the following English exercise in Present Perfect Continuous. Check correct use of have/has been and verb-ing."
    },
    {
        id: "questions-present",
        title: "Questions in the Present",
        description: "Aprende a formular preguntas en los tiempos del presente.",
        level: "A1",
        colorTheme: "cyan",
        icon: HelpCircle,
        grammarTip: {
            title: "Questions in the Present",
            description: "Usamos auxiliares para hacer preguntas en presente.",
            structure: `
                Present Simple: Do/Does + subject + base verb?
                Present Continuous: Am/Is/Are + subject + verb-ING?
             `,
            examples: [
                "Do you like coffee?",
                "Is she working now?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Do you", textAfter: "coffee?", hint: "like" },
            { id: "2", textBefore: "Does Mark", textAfter: "to work every day?", hint: "go" },
            { id: "3", textBefore: "Are they", textAfter: "TV right now?", hint: "watch" },
            { id: "4", textBefore: "Is she", textAfter: "at the moment?", hint: "work" },
            { id: "5", textBefore: "Do we", textAfter: "English here?", hint: "study" },
            { id: "6", textBefore: "Does he", textAfter: "soccer?", hint: "play" },
            { id: "7", textBefore: "Are you", textAfter: "to music?", hint: "listen" },
            { id: "8", textBefore: "Is Mark", textAfter: "an email?", hint: "write" },
            { id: "9", textBefore: "Do they", textAfter: "near here?", hint: "live" },
            { id: "10", textBefore: "Are the children", textAfter: "in the park?", hint: "play" }
        ],
        aiPrompt: "Evaluate the present tense questions. Identify correct auxiliary usage and verb form."
    },
    {
        id: "present-negatives-mixed",
        title: "Negative Forms (Present)",
        description: "Aprende a negar oraciones en todos los tiempos del presente.",
        level: "A2",
        colorTheme: "red",
        icon: XCircle,
        grammarTip: {
            title: "Negative Forms in the Present",
            description: "Para formar oraciones negativas, usamos auxiliares según el tiempo verbal.",
            structure: `
                Present Simple: Subject + do/does + not + base verb
                Present Continuous: Subject + am/is/are + not + verb-ING
                Present Perfect: Subject + have/has + not + past participle
                Present Perfect Continuous: Subject + have/has + not + been + verb-ING
             `,
            examples: [
                "I do not like coffee",
                "She is not working now",
                "They have not finished yet",
                "He has not been studying today"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "coffee in the morning.", hint: "drink" }, // Present Simple
            { id: "2", textBefore: "He", textAfter: "TV right now.", hint: "watch" }, // Present Continuous
            { id: "3", textBefore: "His parents", textAfter: "meat.", hint: "eat" }, // Present Simple
            { id: "4", textBefore: "Mark", textAfter: "to music at the moment.", hint: "listen" }, // Present Continuous
            { id: "5", textBefore: "They", textAfter: "the project yet.", hint: "finish" }, // Present Perfect
            { id: "6", textBefore: "She", textAfter: "here before.", hint: "be" }, // Present Perfect
            { id: "7", textBefore: "Mark", textAfter: "English very long.", hint: "study" }, // Present Perfect Continuous
            { id: "8", textBefore: "We", textAfter: "for the bus for hours.", hint: "wait" }, // Present Perfect Continuous
            { id: "9", textBefore: "The children", textAfter: "soccer today.", hint: "play" }, // Present Simple
            { id: "10", textBefore: "He", textAfter: "an email right now.", hint: "write" } // Present Continuous
        ],
        aiPrompt: "Evaluate the following English exercise focusing on negative forms in the present. Identify the correct auxiliary (do/does, am/is/are, have/has), correct placement of 'not', and proper verb form."
    },
    {
        id: "past-simple",
        title: "Past Simple",
        description: "Habla sobre acciones que ocurrieron y terminaron en el pasado.",
        level: "A1",
        colorTheme: "orange",
        icon: Clock,
        grammarTip: {
            title: "Past Simple",
            description: "Para acciones completas en el pasado.",
            structure: "Subject + verb (past form)",
            examples: [
                "I visited my friend yesterday",
                "She watched a movie last night"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Yesterday, Mark", textAfter: "up early.", hint: "wake" },
            { id: "2", textBefore: "He", textAfter: "his teeth and had breakfast.", hint: "brush" },
            { id: "3", textBefore: "Mark", textAfter: "to work by bus.", hint: "go" },
            { id: "4", textBefore: "He", textAfter: "an important email.", hint: "write" },
            { id: "5", textBefore: "His parents", textAfter: "dinner together.", hint: "cook" },
            { id: "6", textBefore: "Mark", textAfter: "his friends after work.", hint: "meet" },
            { id: "7", textBefore: "They", textAfter: "soccer in the park.", hint: "play" },
            { id: "8", textBefore: "Mark", textAfter: "very tired last night.", hint: "be" },
            { id: "9", textBefore: "He", textAfter: "to bed at 11 PM.", hint: "go" },
            { id: "10", textBefore: "They", textAfter: "a great time.", hint: "have" }
        ],
        aiPrompt: "Evaluate the following English exercise in Past Simple. Check correct use of past tense verbs, including irregular forms."
    },
    {
        id: "past-continuous",
        title: "Past Continuous",
        description: "Habla sobre acciones que estaban ocurriendo en un momento específico del pasado.",
        level: "A2",
        colorTheme: "blue",
        icon: Activity,
        grammarTip: {
            title: "Past Continuous",
            description: "Para acciones en progreso en el pasado.",
            structure: "Subject + was/were + verb-ING",
            examples: [
                "I was studying at 8 PM",
                "They were watching TV"
            ],
        },
        sentences: [
            { id: "1", textBefore: "At 8 PM, Mark", textAfter: "TV.", hint: "watch" },
            { id: "2", textBefore: "He", textAfter: "dinner when the phone rang.", hint: "eat" },
            { id: "3", textBefore: "His parents", textAfter: "in the kitchen.", hint: "cook" },
            { id: "4", textBefore: "Mark", textAfter: "to music while working.", hint: "listen" },
            { id: "5", textBefore: "They", textAfter: "soccer when it started to rain.", hint: "play" },
            { id: "6", textBefore: "The dog", textAfter: "in the garden.", hint: "run" },
            { id: "7", textBefore: "We", textAfter: "for the bus.", hint: "wait" },
            { id: "8", textBefore: "She", textAfter: "an email at that moment.", hint: "write" },
            { id: "9", textBefore: "The children", textAfter: "a movie.", hint: "watch" },
            { id: "10", textBefore: "I", textAfter: "home when I saw him.", hint: "walk" }
        ],
        aiPrompt: "Evaluate the following English exercise in Past Continuous. Check correct use of was/were and verb-ing form."
    },
    {
        id: "past-perfect",
        title: "Past Perfect",
        description: "Habla sobre una acción que ocurrió antes de otra acción en el pasado.",
        level: "A2",
        colorTheme: "purple",
        icon: Layers,
        grammarTip: {
            title: "Past Perfect",
            description: "Para indicar que una acción pasó antes que otra en el pasado.",
            structure: "Subject + had + past participle",
            examples: [
                "I had finished my homework before dinner",
                "They had already left when we arrived",
                "She realized she had lost her keys",
                "Had he ever travelled to Europe before 2020?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "his homework before dinner.", hint: "finish" },
            { id: "2", textBefore: "He", textAfter: "already", hint: "leave" },
            { id: "3", textBefore: "They", textAfter: "the movie before we arrived.", hint: "watch" },
            { id: "4", textBefore: "She", textAfter: "the email before the meeting.", hint: "send" },
            { id: "5", textBefore: "Mark", textAfter: "never there before.", hint: "be" },
            { id: "6", textBefore: "We", textAfter: "everything when he called.", hint: "prepare" },
            { id: "7", textBefore: "The train", textAfter: "when we got to the station.", hint: "leave" },
            { id: "8", textBefore: "They", textAfter: "dinner already.", hint: "eat" },
            { id: "9", textBefore: "She", textAfter: "the book before the exam.", hint: "read" },
            { id: "10", textBefore: "I", textAfter: "my keys at home.", hint: "forget" }
        ],
        aiPrompt: "Evaluate the following English exercise in Past Perfect. Check correct use of 'had' and past participle."
    },
    {
        id: "past-simple-vs-continuous",
        title: "Past Simple vs Past Continuous",
        description: "Compara acciones completas con acciones en progreso en el pasado.",
        level: "A2",
        colorTheme: "amber",
        icon: Shuffle,
        grammarTip: {
            title: "Past Simple vs Past Continuous",
            description: "Usamos Past Continuous para acciones en progreso y Past Simple para acciones que interrumpen.",
            structure: `
                Past Continuous: was/were + verb-ING
                Past Simple: verb (past form)
            `,
            examples: [
                "I was watching TV when he arrived",
                "They were playing soccer when it started to rain"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "TV when the phone rang.", hint: "watch" },
            { id: "2", textBefore: "They", textAfter: "dinner when we arrived.", hint: "have" },
            { id: "3", textBefore: "She", textAfter: "home when it started to rain.", hint: "walk" },
            { id: "4", textBefore: "We", textAfter: "soccer when the lights went out.", hint: "play" },
            { id: "5", textBefore: "Mark", textAfter: "a shower when the doorbell rang.", hint: "take" },
            { id: "6", textBefore: "The children", textAfter: "outside when it got dark.", hint: "play" },
            { id: "7", textBefore: "I", textAfter: "to music when she called me.", hint: "listen" },
            { id: "8", textBefore: "They", textAfter: "a movie when the power went out.", hint: "watch" },
            { id: "9", textBefore: "He", textAfter: "to work when he saw the accident.", hint: "drive" },
            { id: "10", textBefore: "We", textAfter: "when the teacher arrived.", hint: "talk" }
        ],
        aiPrompt: "Evaluate the exercise comparing Past Simple and Past Continuous. Check correct tense selection and verb form."
    },
    {
        id: "past-negatives-mixed",
        title: "Negative Forms (Past)",
        description: "Aprende a negar oraciones en el pasado correctamente.",
        level: "A1",
        colorTheme: "red",
        icon: XCircle,
        grammarTip: {
            title: "Negative Forms in the Past",
            description: "En pasado usamos 'did not' y el verbo en forma base.",
            structure: "Subject + did not + base verb",
            examples: [
                "I did not go to work yesterday",
                "She did not understand the question"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "to work yesterday.", hint: "go" },
            { id: "2", textBefore: "He", textAfter: "TV last night.", hint: "watch" },
            { id: "3", textBefore: "They", textAfter: "the meeting.", hint: "attend" },
            { id: "4", textBefore: "She", textAfter: "the email.", hint: "send" },
            { id: "5", textBefore: "We", textAfter: "dinner at home.", hint: "have" },
            { id: "6", textBefore: "Mark", textAfter: "his homework.", hint: "finish" },
            { id: "7", textBefore: "They", textAfter: "the movie.", hint: "like" },
            { id: "8", textBefore: "I", textAfter: "your message.", hint: "see" },
            { id: "9", textBefore: "She", textAfter: "the answer.", hint: "know" },
            { id: "10", textBefore: "We", textAfter: "late.", hint: "arrive" }
        ],
        aiPrompt: "Evaluate the exercise focusing on negative forms in the Past Simple. Ensure correct use of 'did not' and base verb."
    },
    {
        id: "questions-past",
        title: "Questions in the Past",
        description: "Aprende a formular preguntas en pasado correctamente.",
        level: "A1",
        colorTheme: "teal",
        icon: HelpCircle,
        grammarTip: {
            title: "Questions in the Past",
            description: "Para hacer preguntas en pasado usamos 'did'.",
            structure: "Did + subject + base verb?",
            examples: [
                "Did you go to school yesterday?",
                "Did she finish her homework?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Did Mark", textAfter: "to work yesterday?", hint: "go" },
            { id: "2", textBefore: "Did he", textAfter: "TV last night?", hint: "watch" },
            { id: "3", textBefore: "Did they", textAfter: "dinner together?", hint: "have" },
            { id: "4", textBefore: "Did she", textAfter: "the email?", hint: "send" },
            { id: "5", textBefore: "Did you", textAfter: "the movie?", hint: "like" },
            { id: "6", textBefore: "Did Mark", textAfter: "late?", hint: "arrive" },
            { id: "7", textBefore: "Did they", textAfter: "soccer?", hint: "play" },
            { id: "8", textBefore: "Did we", textAfter: "the answer?", hint: "know" },
            { id: "9", textBefore: "Did she", textAfter: "him?", hint: "call" },
            { id: "10", textBefore: "Did you", textAfter: "your keys?", hint: "find" }
        ],
        aiPrompt: "Evaluate the following Past Simple questions. Check correct use of 'did' and base verb."
    },
    {
        id: "past-story",
        title: "Past Story Exercise",
        description: "Completa una historia usando correctamente los tiempos del pasado.",
        level: "A2",
        colorTheme: "slate",
        icon: BookOpen,
        grammarTip: {
            title: "Story in the Past",
            description: "Las historias combinan Past Simple y Past Continuous.",
            structure: "Past Simple + Past Continuous",
            examples: [
                "I was walking when I saw him",
                "They finished dinner and went home"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Yesterday, Mark", textAfter: "up early.", hint: "wake" },
            { id: "2", textBefore: "He", textAfter: "breakfast when the phone rang.", hint: "eat" },
            { id: "3", textBefore: "His friend", textAfter: "him some bad news.", hint: "tell" },
            { id: "4", textBefore: "Mark", textAfter: "very worried.", hint: "feel" },
            { id: "5", textBefore: "He", textAfter: "to work immediately.", hint: "go" },
            { id: "6", textBefore: "While he", textAfter: "to work, it started to rain.", hint: "drive" },
            { id: "7", textBefore: "He", textAfter: "late to the office.", hint: "arrive" },
            { id: "8", textBefore: "His boss", textAfter: "understanding.", hint: "be" },
            { id: "9", textBefore: "They", textAfter: "the problem together.", hint: "solve" },
            { id: "10", textBefore: "At the end of the day, Mark", textAfter: "relieved.", hint: "feel" }
        ],
        aiPrompt: "Evaluate the story-based exercise. Check correct use of past tenses and consistency within the narrative."
    },
    {
        id: "future-will",
        title: "Future with Will",
        description: "Habla sobre decisiones espontáneas y predicciones.",
        level: "A1",
        colorTheme: "yellow",
        icon: Sparkles,
        grammarTip: {
            title: "Future with Will",
            description: "Usamos 'will' para decisiones rápidas y promesas.",
            structure: "Subject + will + base verb",
            examples: [
                "I will help you",
                "She will call you later"
            ],
        },
        sentences: [
            { id: "1", textBefore: "I", textAfter: "you with your homework.", hint: "help" },
            { id: "2", textBefore: "Mark", textAfter: "you later.", hint: "call" },
            { id: "3", textBefore: "They", textAfter: "the problem soon.", hint: "solve" },
            { id: "4", textBefore: "I think it", textAfter: "tomorrow.", hint: "rain" },
            { id: "5", textBefore: "She", textAfter: "a doctor one day.", hint: "be" },
            { id: "6", textBefore: "We", textAfter: "our best.", hint: "do" },
            { id: "7", textBefore: "He", textAfter: "late today.", hint: "arrive" },
            { id: "8", textBefore: "Don’t worry, I", textAfter: "it.", hint: "fix" },
            { id: "9", textBefore: "They", textAfter: "the match.", hint: "win" },
            { id: "10", textBefore: "I", textAfter: "you tomorrow.", hint: "see" }
        ],
        aiPrompt: "Evaluate the exercise in Future with 'will'. Check correct use of 'will' and base verb."
    },
    {
        id: "future-going-to",
        title: "Future with Going To",
        description: "Habla sobre planes e intenciones.",
        level: "A1",
        colorTheme: "green",
        icon: Map,
        grammarTip: {
            title: "Future with Going To",
            description: "Usamos 'going to' para planes ya decididos.",
            structure: "Subject + am/is/are + going to + base verb",
            examples: [
                "I am going to study tonight",
                "They are going to travel next week"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "study English tonight.", hint: "going to" },
            { id: "2", textBefore: "They", textAfter: "travel next weekend.", hint: "going to" },
            { id: "3", textBefore: "She", textAfter: "start a new job.", hint: "going to" },
            { id: "4", textBefore: "We", textAfter: "watch a movie.", hint: "going to" },
            { id: "5", textBefore: "I", textAfter: "cook dinner today.", hint: "going to" },
            { id: "6", textBefore: "He", textAfter: "buy a new car.", hint: "going to" },
            { id: "7", textBefore: "They", textAfter: "move to another city.", hint: "going to" },
            { id: "8", textBefore: "Mark", textAfter: "call his parents.", hint: "going to" },
            { id: "9", textBefore: "She", textAfter: "learn French.", hint: "going to" },
            { id: "10", textBefore: "We", textAfter: "have a meeting tomorrow.", hint: "going to" }
        ],
        aiPrompt: "Evaluate the exercise in Future with 'going to'. Check correct auxiliary (am/is/are) and structure."
    },
    {
        id: "future-present-continuous",
        title: "Future with Present Continuous",
        description: "Habla sobre planes futuros ya organizados.",
        level: "A2",
        colorTheme: "blue",
        icon: Calendar,
        grammarTip: {
            title: "Present Continuous for Future",
            description: "Usamos el Present Continuous para planes futuros con fecha o arreglo.",
            structure: "Subject + am/is/are + verb-ING",
            examples: [
                "I am meeting my friend tomorrow",
                "They are leaving tonight"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "his friend tonight.", hint: "meet" },
            { id: "2", textBefore: "They", textAfter: "tomorrow morning.", hint: "leave" },
            { id: "3", textBefore: "She", textAfter: "a new course next week.", hint: "start" },
            { id: "4", textBefore: "We", textAfter: "dinner with them tonight.", hint: "have" },
            { id: "5", textBefore: "I", textAfter: "the doctor this afternoon.", hint: "see" },
            { id: "6", textBefore: "He", textAfter: "to Madrid on Friday.", hint: "travel" },
            { id: "7", textBefore: "They", textAfter: "married next year.", hint: "get" },
            { id: "8", textBefore: "Mark", textAfter: "home late today.", hint: "arrive" },
            { id: "9", textBefore: "We", textAfter: "a test tomorrow.", hint: "take" },
            { id: "10", textBefore: "She", textAfter: "her family this weekend.", hint: "visit" }
        ],
        aiPrompt: "Evaluate the exercise using Present Continuous for future meaning. Check correct auxiliary and verb-ing form."
    },
    {
        id: "future-will-vs-going-to",
        title: "Will vs Going To",
        description: "Aprende a elegir correctamente entre 'will' y 'going to'.",
        level: "A2",
        colorTheme: "purple",
        icon: Shuffle,
        grammarTip: {
            title: "Will vs Going To",
            description: "Will es para decisiones espontáneas y going to para planes.",
            structure: `
                Will → decision now
                Going to → plan before
              `,
            examples: [
                "I will answer the phone",
                "I am going to study tonight"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Look at the sky! It", textAfter: ".", hint: "rain" },
            { id: "2", textBefore: "I forgot my wallet. I", textAfter: "back.", hint: "go" },
            { id: "3", textBefore: "Mark", textAfter: "start a new job next month.", hint: "going to" },
            { id: "4", textBefore: "Don’t worry, I", textAfter: "you.", hint: "help" },
            { id: "5", textBefore: "They", textAfter: "move to Canada.", hint: "going to" },
            { id: "6", textBefore: "I think she", textAfter: "love this gift.", hint: "love" },
            { id: "7", textBefore: "We", textAfter: "visit our grandparents.", hint: "going to" },
            { id: "8", textBefore: "The phone is ringing. I", textAfter: "it.", hint: "answer" },
            { id: "9", textBefore: "He", textAfter: "study medicine.", hint: "going to" },
            { id: "10", textBefore: "I promise I", textAfter: "late.", hint: "be" }
        ],
        aiPrompt: "Evaluate the future tense exercise. Check correct choice between 'will' and 'going to' based on context."
    },
    {
        id: "future-negatives-mixed",
        title: "Negative Forms (Future)",
        description: "Aprende a negar oraciones en los diferentes tiempos del futuro.",
        level: "A1",
        colorTheme: "rose",
        icon: XCircle,
        grammarTip: {
            title: "Negative Forms in the Future",
            description: "Para negar en futuro, usamos 'not' después del auxiliar.",
            structure: `
                Will → Subject + will not + base verb
                Going to → Subject + am/is/are + not + going to + base verb
                Present Continuous (future) → Subject + am/is/are + not + verb-ING
             `,
            examples: [
                "I will not go today",
                "She is not going to study tonight",
                "They are not leaving tomorrow"
            ],
        },
        sentences: [
            { id: "1", textBefore: "I", textAfter: "help you today.", hint: "will not" },
            { id: "2", textBefore: "Mark", textAfter: "work tomorrow.", hint: "is not going to" },
            { id: "3", textBefore: "They", textAfter: "travel this weekend.", hint: "are not going to" },
            { id: "4", textBefore: "She", textAfter: "call him tonight.", hint: "will not" },
            { id: "5", textBefore: "We", textAfter: "have a meeting today.", hint: "are not having" },
            { id: "6", textBefore: "He", textAfter: "buy that car.", hint: "is not going to" },
            { id: "7", textBefore: "I", textAfter: "be late.", hint: "will not" },
            { id: "8", textBefore: "They", textAfter: "start the project now.", hint: "are not starting" },
            { id: "9", textBefore: "Mark", textAfter: "study tonight.", hint: "is not going to" },
            { id: "10", textBefore: "She", textAfter: "forget your birthday.", hint: "will not" }
        ],
        aiPrompt: "Evaluate the future negative forms exercise. Check correct auxiliary usage and placement of 'not'."
    },
    {
        id: "questions-future",
        title: "Questions in the Future",
        description: "Aprende a formular preguntas usando los tiempos del futuro.",
        level: "A1",
        colorTheme: "indigo",
        icon: HelpCircle,
        grammarTip: {
            title: "Questions in the Future",
            description: "Las preguntas en futuro se forman invirtiendo el auxiliar.",
            structure: `
                Will → Will + subject + base verb?
                Going to → Am/Is/Are + subject + going to + base verb?
                Present Continuous (future) → Am/Is/Are + subject + verb-ING?
             `,
            examples: [
                "Will you help me?",
                "Is she going to travel next week?",
                "Are they meeting tomorrow?"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Will you", textAfter: "me later?", hint: "help" },
            { id: "2", textBefore: "Is Mark", textAfter: "travel next week?", hint: "going to" },
            { id: "3", textBefore: "Are they", textAfter: "tonight?", hint: "leaving" },
            { id: "4", textBefore: "Will she", textAfter: "the exam?", hint: "pass" },
            { id: "5", textBefore: "Are you", textAfter: "dinner with us?", hint: "having" },
            { id: "6", textBefore: "Is he", textAfter: "buy a new phone?", hint: "going to" },
            { id: "7", textBefore: "Will they", textAfter: "on time?", hint: "arrive" },
            { id: "8", textBefore: "Are we", textAfter: "tomorrow?", hint: "meeting" },
            { id: "9", textBefore: "Is she", textAfter: "start a new job?", hint: "going to" },
            { id: "10", textBefore: "Will you", textAfter: "me the truth?", hint: "tell" }
        ],
        aiPrompt: "Evaluate the future tense questions. Check correct auxiliary selection and verb form."
    },
    {
        id: "mixed-tenses",
        title: "Mixed Tenses",
        description: "Practica pasado, presente y futuro en un solo ejercicio.",
        level: "A2",
        colorTheme: "zinc",
        icon: Layers,
        grammarTip: {
            title: "Mixed Tenses",
            description: "Identifica primero el tiempo verbal antes de completar la oración.",
            structure: `
                Past → verb (past form)
                Present → base / am-is-are
                Future → will / going to / present continuous
             `,
            examples: [
                "Yesterday, I went to work",
                "I am studying now",
                "I will call you later"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Yesterday, Mark", textAfter: "to work late.", hint: "go" },
            { id: "2", textBefore: "Right now, he", textAfter: "an email.", hint: "write" },
            { id: "3", textBefore: "Every morning, he", textAfter: "coffee.", hint: "drink" },
            { id: "4", textBefore: "Tomorrow, Mark", textAfter: "his parents.", hint: "visit" },
            { id: "5", textBefore: "Last night, they", textAfter: "a movie.", hint: "watch" },
            { id: "6", textBefore: "At the moment, she", textAfter: "for the bus.", hint: "wait" },
            { id: "7", textBefore: "Next week, we", textAfter: "a test.", hint: "have" },
            { id: "8", textBefore: "Usually, Mark", textAfter: "early.", hint: "wake" },
            { id: "9", textBefore: "While he", textAfter: "home, it started to rain.", hint: "walk" },
            { id: "10", textBefore: "I promise I", textAfter: "you later.", hint: "call" }
        ],
        aiPrompt: "Evaluate the mixed tense exercise. Identify correct tense usage based on time expressions and context."
    },
    {
        id: "level-up-a2-b1",
        title: "Level-Up Quiz",
        description: "Desafía tu comprensión del inglés combinando estructuras más complejas.",
        level: "B1",
        colorTheme: "indigo",
        icon: TrendingUp,
        grammarTip: {
            title: "Level-Up Grammar",
            description: "En este nivel debes reconocer intención, duración y resultado.",
            structure: `
                Present Perfect → experience/result
                Past Continuous → background action
                Future forms → intention vs decision
             `,
            examples: [
                "I have worked here for years",
                "I was studying when you called",
                "I will help you"
            ],
        },
        sentences: [
            { id: "1", textBefore: "Mark", textAfter: "here since 2020.", hint: "work" },
            { id: "2", textBefore: "He", textAfter: "TV when she arrived.", hint: "watch" },
            { id: "3", textBefore: "They", textAfter: "already finished the project.", hint: "have" },
            { id: "4", textBefore: "I think it", textAfter: "rain later.", hint: "will" },
            { id: "5", textBefore: "She", textAfter: "never been to London.", hint: "have" },
            { id: "6", textBefore: "While we", textAfter: "dinner, the lights went out.", hint: "have" },
            { id: "7", textBefore: "Mark", textAfter: "studying English a lot lately.", hint: "be" },
            { id: "8", textBefore: "They", textAfter: "going to move next year.", hint: "are" },
            { id: "9", textBefore: "I", textAfter: "this movie before.", hint: "see" },
            { id: "10", textBefore: "If you ask him, he", textAfter: "help you.", hint: "will" }
        ],
        aiPrompt: "Evaluate the level-up quiz. Focus on tense accuracy, auxiliary selection, and contextual meaning."
    },
    {
        id: "conditionals-zero-first",
        title: "Zero & First Conditional",
        description: "Aprende a hablar de hechos generales y situaciones posibles.",
        level: "B1",
        colorTheme: "teal",
        icon: GitBranch,
        grammarTip: {
            title: "Zero & First Conditional",
            description: "Usamos condicionales para hablar de resultados.",
            structure: `
                Zero Conditional:
                If + present simple, present simple
                
                First Conditional:
                If + present simple, will + base verb
            `,
            examples: [
                "If it rains, I stay at home",
                "If it rains, I will stay at home"
            ],
        },
        sentences: [
            { id: "1", textBefore: "If you heat ice, it", textAfter: ".", hint: "melt" }, // Zero
            { id: "2", textBefore: "If it rains, we", textAfter: "at home.", hint: "stay" }, // Zero
            { id: "3", textBefore: "If you study, you", textAfter: "the exam.", hint: "pass" }, // First
            { id: "4", textBefore: "If Mark is late, he", textAfter: "call us.", hint: "will" }, // First
            { id: "5", textBefore: "If you don’t eat, you", textAfter: "hungry.", hint: "get" }, // Zero
            { id: "6", textBefore: "If it stops raining, we", textAfter: "outside.", hint: "go" }, // First
            { id: "7", textBefore: "If you mix red and blue, you", textAfter: "purple.", hint: "get" }, // Zero
            { id: "8", textBefore: "If she finishes early, she", textAfter: "home.", hint: "go" }, // First
            { id: "9", textBefore: "If you press this button, the machine", textAfter: ".", hint: "start" }, // Zero
            { id: "10", textBefore: "If they arrive late, they", textAfter: "miss the bus.", hint: "will" } // First
        ],
        aiPrompt: "Evaluate the conditional exercise. Check correct conditional type and verb tense in both clauses."
    },
    {
        id: "passive-voice",
        title: "Passive Voice",
        description: "Enfatiza el objeto que recibe la acción en lugar de quién la realiza.",
        level: "B2",
        colorTheme: "rose",
        icon: RefreshCw,
        grammarTip: {
            title: "Passive Voice",
            description: "Para cambiar el enfoque de quién hace la acción a quién la recibe.",
            structure: "Subject + verb to be + Past participle",
            examples: [],
            markdownGuide: `
La **Voz Pasiva** se utiliza cuando queremos enfatizar la **acción o el objeto** afectado, en lugar de quién realiza la acción.

### 🧩 Estructura General
\`Subject + verb to be (en el tiempo adecuado) + Past participle\`

### 📝 Comparación de Usos

#### 1. Pasado Simple
- **Active voice:** *He didn't wash the car*
- **Passive voice:** *The car was not washed by him*

#### 2. Presente Continuo
- **Active:** *They are building a new house*
- **Passive:** *A new house is being built by them*

#### 3. Presente Perfecto
- **Active:** *He has finished the work*
- **Passive:** *The work has been finished by him*

#### 4. Pasado Continuo
- **Active:** *She was writing a novel*
- **Passive:** *A novel was being written by her*

> 💡 **Nota especial:** Solo se puede usar voz pasiva con verbos transitivos (los que recaen sobre un objeto). "By" se usa para introducir quién realizó la acción original si es relevante.
`
        },
        sentences: [
            { id: "1", textBefore: "The car", textAfter: "by him yesterday.", hint: "wash (negative past)" },
            { id: "2", textBefore: "A new house", textAfter: "by them right now.", hint: "build (present continuous)" },
            { id: "3", textBefore: "The work", textAfter: "by him already.", hint: "finish (present perfect)" },
            { id: "4", textBefore: "A novel", textAfter: "by her at that moment.", hint: "write (past continuous)" },
            { id: "5", textBefore: "The cake", textAfter: "by my mother every Sunday.", hint: "make (present simple)" },
            { id: "6", textBefore: "The match", textAfter: "by our team next week.", hint: "win (future will)" },
            { id: "7", textBefore: "The letters", textAfter: "yet.", hint: "send (negative present perfect)" },
            { id: "8", textBefore: "The problem", textAfter: "tomorrow.", hint: "solve (future going to)" },
            { id: "9", textBefore: "My wallet", textAfter: "yesterday.", hint: "steal (past simple)" },
            { id: "10", textBefore: "A lot of coffee", textAfter: "in this office every day.", hint: "drink (present simple)" }
        ],
        aiPrompt: "Evaluate the exercise focusing on Passive Voice. Check correct use of the verb 'to be' in different tenses combined with the past participle."
    },
    {
        id: "conditionals-second-third",
        title: "Second & Third Conditionals",
        description: "Aprende a hablar de situaciones hipotéticas en el presente y arrepentimientos en el pasado.",
        level: "B2",
        colorTheme: "amber",
        icon: GitBranch,
        grammarTip: {
            title: "Second & Third Conditionals",
            description: "Para situaciones irreales, hipotéticas o imaginarias.",
            structure: "Variada (ver detalles)",
            examples: [],
            markdownGuide: `
A diferencia el Zero/First conditional (que tratan cosas muy reales y probables), el **Second y Third Conditional** tratan de mundos **hipotéticos o imaginarios**.

### 🧩 Second Conditional (Situaciones hipotéticas en el PRESENTE)
Usamos el Segundo Condicional para hablar de cosas imposibles o altamente improbables *ahora*.

**Estructura:** \`If + Past Simple, would + base verb\`

**Ejemplos detallados:**
- *If I won the lottery, I would travel the world.* (No he ganado la lotería ahora).
- *If I had a million dollars, I would buy a big house.*
- *If she knew his number, she would call him.* (Pero ella no sabe el número).

> 💡 **Nota especial:** Con el verbo To Be en el segundo condicional, se suele usar **"were"** para todas las personas (I, he, she, it) en ambientes formales: *If I were you, I would study more.*

---

### 🧩 Third Conditional (Situaciones irreales en el PASADO / Arrepentimientos)
Usamos el Tercer Condicional para hablar del pasado imaginando que *hubiera* pasado algo distinto. Ya NO se puede cambiar.

**Estructura:** \`If + Past Perfect, would have + past participle\`

**Ejemplos detallados:**
- *If I had studied harder, I would have passed the exam.* (No estudié, y reprobé).
- *If we had left earlier, we wouldn't have missed the train.* (Salimos tarde).
- *If she hadn't eaten so much, she wouldn't have felt sick.*
`
        },
        sentences: [
            { id: "1", textBefore: "If I", textAfter: "a lot of money, I would buy an island.", hint: "have (2nd cond)" },
            { id: "2", textBefore: "If she had left earlier, she", textAfter: "the accident.", hint: "not/have (3rd cond)" },
            { id: "3", textBefore: "If I", textAfter: "you, I would talk to her.", hint: "be (2nd cond)" },
            { id: "4", textBefore: "We would have won the match if we", textAfter: "more.", hint: "practice (3rd cond)" },
            { id: "5", textBefore: "If he", textAfter: "to me, he wouldn't be in this trouble now.", hint: "listen (3rd cond / mixed)" },
            { id: "6", textBefore: "What would you do if you", textAfter: "a ghost?", hint: "see (2nd cond)" },
            { id: "7", textBefore: "If they", textAfter: "the map, they wouldn't have gotten lost.", hint: "check (3rd cond)" },
            { id: "8", textBefore: "I would travel more if I", textAfter: "more free time.", hint: "have (2nd cond)" },
            { id: "9", textBefore: "If the weather", textAfter: "better yesterday, we would have gone to the beach.", hint: "be (3rd cond)" },
            { id: "10", textBefore: "If she", textAfter: "the answer, she would tell us.", hint: "know (2nd cond)" }
        ],
        aiPrompt: "Evaluate the exercise focusing on Second and Third Conditionals. Check correct tense usage (Past Simple vs Past Perfect) and the correct conditional clause (would vs would have)."
    },
    {
        id: "mixed-conditionals",
        title: "Mixed Conditionals",
        description: "Conecta arrepentimientos o situaciones pasadas con consecuencias directas en el presente.",
        level: "C1",
        colorTheme: "rose",
        icon: GitBranch,
        grammarTip: {
            title: "Mixed Conditionals",
            description: "Para mezclar el pasado irreal con el presente irreal.",
            structure: "Past Perfect (pasado) + would (presente)",
            examples: [],
            markdownGuide: `
Los **Mixed Conditionals** (Condicionales Mixtos) ocurren cuando la condición y el resultado están en **diferentes tiempos**. Es como si combinaras la mitad de un Segundo Condicional con la mitad de un Tercer Condicional.

### 🧩 Mezcla 1: Condición Pasada, Resultado Presente
Algo no ocurrió en el pasado, y eso afecta directamente cómo estamos hoy.

**Estructura:** \`If + Past Perfect (3rd cond), would + base verb (2nd cond)\`

**Ejemplos detallados:**
- *If I had studied harder at university, I would have a better job now.*
  *(Si hubiera estudiado en el pasado, hoy tendría un mejor trabajo).*
- *If she had taken the map, we wouldn't be lost right now.*
- *If they hadn't spent all their money, they would be able to buy that house.*

### 🧩 Mezcla 2: Condición Presente, Resultado Pasado
Algo que es permanentemente cierto (o no cierto) ahora, afectó algo en el pasado.

**Estructura:** \`If + Past Simple (2nd cond), would have + past participle (3rd cond)\`

**Ejemplos detallados:**
- *If I weren't afraid of flying, I would have traveled to Japan last year.*
  *(Si no le tuviera miedo a volar en general, el año pasado habría viajado).*
- *If she knew how to speak French, she would have gotten the translation job.*
`
        },
        sentences: [
            { id: "1", textBefore: "If I had slept better last night, I", textAfter: "so tired right now.", hint: "not/be" },
            { id: "2", textBefore: "If she", textAfter: "afraid of dogs, she would have gone to the park.", hint: "not/be" },
            { id: "3", textBefore: "If they had invested their money wisely, they", textAfter: "rich today.", hint: "be" },
            { id: "4", textBefore: "I would have called her yesterday if I", textAfter: "her number.", hint: "have (permanent state)" },
            { id: "5", textBefore: "If you", textAfter: "the instructions, we wouldn't be lost now.", hint: "read" },
            { id: "6", textBefore: "If he were a better player, he", textAfter: "that easy goal.", hint: "not/miss" },
            { id: "7", textBefore: "We would be at the beach right now if we", textAfter: "our flight.", hint: "not/miss" },
            { id: "8", textBefore: "If I", textAfter: "how to swim, I would have joined you in the lake.", hint: "know" },
            { id: "9", textBefore: "If she had won the competition, she", textAfter: "very famous right now.", hint: "be" },
            { id: "10", textBefore: "If he didn't love her so much, he", textAfter: "all those sacrifices.", hint: "not/make" }
        ],
        aiPrompt: "Evaluate the mixed conditional exercise. Ensure the verbs correctly blend past conditions with present results or present conditions with past results."
    },
    {
        id: "passive-voice-advanced",
        title: "Advanced Passive Voice",
        description: "Explora usos expertos de la voz pasiva como verbos de reporte (It is said that) y modales.",
        level: "C1",
        colorTheme: "red",
        icon: RefreshCw,
        grammarTip: {
            title: "Advanced Passive Voice",
            description: "Para estructuras impersonales y formales extremas.",
            structure: "It + is + past participle + that...",
            examples: [],
            markdownGuide: `
Ya vimos la Voz Pasiva básica. Ahora veremos usos **avanzados y formales**, muy comunes en el entorno académico y periodístico.

### 🧩 1. The Impersonal Passive (Verbos de reporte)
Se usa con verbos de opinión o declaración como: *say, believe, think, consider, know*. Permite ser objetivo sin especificar quién lo dijo.

**Estructura 1 (Con It):** \`It + passive reporting verb + that...\`
- *It is said that the company is losing money.*
- *It was believed that the earth was flat.*

**Estructura 2 (Con infinitivo):** \`Subject + passive reporting verb + to + infinitive\`
- *The company is said to be losing money.*
- *He is known to have been a great leader.*

### 🧩 2. Passive with Modal Verbs
Cuando tenemos modales (can, must, should, might), también podemos hacerlos pasivos.

**Estructura:** \`Modal + be + Past participle\`
- **Active:** *You must finish this work today.*
- **Passive:** *This work must be finished today.*
- **Active:** *They should have told me earlier.*
- **Passive:** *I should have been told earlier.* (Past modal passive)

> 💡 **Nota especial:** La voz pasiva avanzada elimina casi en su totalidad al sujeto activo, ya que la información es general o periodística.
`
        },
        sentences: [
            { id: "1", textBefore: "It", textAfter: "that an apple a day keeps the doctor away.", hint: "say (present passive)" },
            { id: "2", textBefore: "The suspect is known", textAfter: "the country.", hint: "leave (infinitive)" },
            { id: "3", textBefore: "The project", textAfter: "by Friday, it's mandatory.", hint: "must / finish" },
            { id: "4", textBefore: "I really think I", textAfter: "about the changes sooner.", hint: "should / tell (past modal)" },
            { id: "5", textBefore: "It", textAfter: "that the universe is expanding.", hint: "believe (present passive)" },
            { id: "6", textBefore: "The ancient city is thought", textAfter: "by an earthquake.", hint: "destroy (passive infinitive)" },
            { id: "7", textBefore: "The rules", textAfter: "at all times inside the facility.", hint: "must / follow" },
            { id: "8", textBefore: "It", textAfter: "that the new policy will improve sales.", hint: "hope (present passive)" },
            { id: "9", textBefore: "The application", textAfter: "before the deadline.", hint: "can / submit" },
            { id: "10", textBefore: "The truth", textAfter: "from the public for years.", hint: "might / hide (past modal)" }
        ],
        aiPrompt: "Evaluate the advanced passive voice exercise. Look for correct impersonal structures (It is said that), infinitive passives (to be / to have been), and modal passives (must be / should have been)."
    },
    {
        id: "reported-speech-statements",
        title: "Reported Speech: Statements",
        description: "Aprende a reportar lo que otras personas dijeron cambiando los tiempos verbales.",
        level: "B2",
        colorTheme: "indigo",
        icon: MessageSquare,
        grammarTip: {
            title: "Reported Speech (Statements)",
            description: "Para citar indirectamente lo que alguien dijo en el pasado.",
            structure: "Shift tense back (Present -> Past, Past -> Past Perfect)",
            examples: [],
            markdownGuide: `
El **Reported Speech** (o estilo indirecto) se usa para contarle a una tercera persona lo que alguien más dijo.

Cuando el verbo introductorio está en pasado (ej. *He said, She told me*), ocurre un fenómeno llamado **Backshifting** (los tiempos verbales dan un "paso hacia atrás" en el tiempo).

### 🧩 Reglas de Backshifting

#### Present Simple ➡️ Past Simple
- **Directo:** *"I like coffee."*
- **Reportado:** *He said that he liked coffee.*

#### Present Continuous ➡️ Past Continuous
- **Directo:** *"I am working right now."*
- **Reportado:** *She said that she was working at that moment.*

#### Past Simple ➡️ Past Perfect
- **Directo:** *"I saw him yesterday."*
- **Reportado:** *He said that he had seen him the day before.*

#### Modales (will, can, must) ➡️ (would, could, had to)
- **Directo:** *"I will help you."* -> *She said she would help me.*
- **Directo:** *"I can do it."* -> *He said he could do it.*

> 💡 **No olvides:** También cambian los pronombres y referencias de tiempo y espacio (today -> that day, tomorrow -> the next day, here -> there).
`
        },
        sentences: [
            { id: "1", textBefore: "\"I love this book.\" ➡️ She said that she", textAfter: "that book.", hint: "love" },
            { id: "2", textBefore: "\"I am cooking dinner.\" ➡️ He told me that he", textAfter: "dinner.", hint: "cook" },
            { id: "3", textBefore: "\"I visited Paris last year.\" ➡️ Mark said that he", textAfter: "Paris the year before.", hint: "visit" },
            { id: "4", textBefore: "\"I will call you tomorrow.\" ➡️ She said that she", textAfter: "me the next day.", hint: "call" },
            { id: "5", textBefore: "\"I can fix the car.\" ➡️ He told me that he", textAfter: "the car.", hint: "fix" },
            { id: "6", textBefore: "\"We have finished the project.\" ➡️ They announced that they", textAfter: "the project.", hint: "finish" },
            { id: "7", textBefore: "\"I don't know the answer.\" ➡️ John stated that he", textAfter: "the answer.", hint: "not/know" },
            { id: "8", textBefore: "\"I was watching TV.\" ➡️ She explained that she", textAfter: "TV.", hint: "watch" },
            { id: "9", textBefore: "\"You must leave now.\" ➡️ The guard told us that we", textAfter: "then.", hint: "leave (must > had to)" },
            { id: "10", textBefore: "\"It is raining outside.\" ➡️ He pointed out that it", textAfter: "outside.", hint: "rain" }
        ],
        aiPrompt: "Evaluate the reported speech exercise. Ensure correct backshifting of tenses (present to past, past to past perfect) and modal conversions (will to would, can to could)."
    },
    {
        id: "reported-speech-questions-commands",
        title: "Reported Speech: Questions & Commands",
        description: "Reporta preguntas e instrucciones de forma fluida y nativa.",
        level: "B2",
        colorTheme: "cyan",
        icon: HelpCircle,
        grammarTip: {
            title: "Reported Speech: Questions & Commands",
            description: "Para reportar órdenes o preguntas indirectamente.",
            structure: "Questions: if/whether + subject + verb. Commands: tell + object + to + infinitive.",
            examples: [],
            markdownGuide: `
Reportar preguntas y órdenes tiene sus propias reglas especiales, distintas a las oraciones normales.

### 🧩 1. Reportando Preguntas (Reported Questions)
En el estilo indirecto, las preguntas **pierden su estructura de pregunta** (ya no hay auxiliares do/does/did invertidos) y se vuelven oraciones afirmativas normales (Sujeto + Verbo).

**A. Preguntas de Sí/No (Usamos if / whether):**
- **Directo:** *"Do you like tea?"*
- **Reportado:** *He asked me **if I liked** tea.* (Backshifting + sujeto primero).

**B. Preguntas con Wh- (Qué, Dónde, Cuándo):**
- **Directo:** *"Where do you live?"*
- **Reportado:** *She asked me **where I lived**.* (Se mantiene 'where', luego sujeto + verbo).

### 🧩 2. Reportando Órdenes (Reported Commands)
Las órdenes son súper fáciles. Simplemente usamos \`to + verbo\` (o \`not to + verbo\` para negativas). Verbos comunes de mandato: *tell, order, ask, advise*.

- **Directo:** *"Close the door."*
- **Reportado:** *He told me **to close** the door.*
- **Directo (Negativo):** *"Don't talk!"*
- **Reportado:** *The teacher ordered us **not to talk**.*
`
        },
        sentences: [
            { id: "1", textBefore: "\"Do you speak English?\" ➡️ She asked me", textAfter: "English.", hint: "if..." },
            { id: "2", textBefore: "\"Where did you go yesterday?\" ➡️ He asked me where I", textAfter: "the previous day.", hint: "go" },
            { id: "3", textBefore: "\"Close the window, please.\" ➡️ My mother asked me", textAfter: "the window.", hint: "close" },
            { id: "4", textBefore: "\"Don't touch that!\" ➡️ The guard ordered me", textAfter: "that.", hint: "not/touch" },
            { id: "5", textBefore: "\"Are you coming tonight?\" ➡️ He asked me", textAfter: "that night.", hint: "come" },
            { id: "6", textBefore: "\"What are you doing?\" ➡️ The boss asked her what she", textAfter: ".", hint: "do" },
            { id: "7", textBefore: "\"Please be quiet.\" ➡️ The librarian told us", textAfter: "quiet.", hint: "be" },
            { id: "8", textBefore: "\"Don't forget your keys.\" ➡️ She reminded him", textAfter: "his keys.", hint: "forget" },
            { id: "9", textBefore: "\"Have you seen my dog?\" ➡️ The boy asked if I", textAfter: "his dog.", hint: "see" },
            { id: "10", textBefore: "\"Why did you call?\" ➡️ She asked me why I", textAfter: ".", hint: "call" }
        ],
        aiPrompt: "Evaluate reported questions and commands. For questions, look for subject-verb word order (no typical question inversion) and backshifting. For commands, look for correct infinitive usage (to do / not to do)."
    },
    {
        id: "causative-verbs",
        title: "Causative Verbs",
        description: "Expresa cuando logras, pagas o convences a alguien más para que haga algo por ti.",
        level: "B2",
        colorTheme: "purple",
        icon: Activity,
        grammarTip: {
            title: "Causative Verbs (Have, Get, Make, Let)",
            description: "Para delegar acciones o forzar a que ocurran.",
            structure: "Subject + get/have/make/let + person + verb",
            examples: [],
            markdownGuide: `
Los **Causative Verbs** se usan cuando el sujeto *no realiza la acción directamente*, sino que *causa* que alguien más la haga (pagándole, pidiéndole, forzándole o dándole permiso).

### 🧩 1. Have / Get (Servicios Profesionales o Delegación)
Significa "encargar a alguien que haga algo".
- **Estructura (Activa):** \`have + person + base verb\` / \`get + person + To verb\`
  - *I had the mechanic fix my car.* (Le pagué/pedí al mecánico).
  - *I got the mechanic TO fix my car.* (Convencí al mecánico).
- **Estructura (Pasiva, muy común!):** \`have / get + object + past participle\`
  - *I had my car fixed.* / *I got my car fixed.* (Me arreglaron el auto).

### 🧩 2. Make (Forzar / Obligar)
Significa obligar a alguien a hacer algo que no quiere.
- **Estructura:** \`make + person + base verb\` (¡Nunca utilices 'to'!)
  - *My boss made me stay late.* (Mi jefe me obligó a quedarme).

### 🧩 3. Let (Permitir)
Significa dar permiso a alguien para hacer algo.
- **Estructura:** \`let + person + base verb\`
  - *My parents let me go to the party.* (Mis padres me dejaron ir).
`
        },
        sentences: [
            { id: "1", textBefore: "I didn't cut my hair myself. I", textAfter: "cut at the salon.", hint: "have" },
            { id: "2", textBefore: "The teacher", textAfter: "the students write an essay.", hint: "make (past)" },
            { id: "3", textBefore: "My mother doesn't", textAfter: "me watch scary movies.", hint: "let" },
            { id: "4", textBefore: "We need an expert. We should", textAfter: "a professional to do it.", hint: "get" },
            { id: "5", textBefore: "I'm going to", textAfter: "my house painted next week.", hint: "have" },
            { id: "6", textBefore: "They", textAfter: "us wait for two hours in the rain!", hint: "make (past)" },
            { id: "7", textBefore: "If you ask nicely, she might", textAfter: "you borrow her car.", hint: "let" },
            { id: "8", textBefore: "I finally", textAfter: "him to sign the contract.", hint: "get (past)" },
            { id: "9", textBefore: "We", textAfter: "the roof repaired after the storm.", hint: "have (past)" },
            { id: "10", textBefore: "SAD movies always", textAfter: "me cry.", hint: "make (present)" }
        ],
        aiPrompt: "Evaluate the causative verbs exercise. Ensure correct causative structure: make/let/have + bare infinitive, get + to-infinitive, and have/get + object + past participle for passive causatives."
    },
    {
        id: "verbs-of-movement",
        title: "Verbs & Prepositions of Movement",
        description: "Aprende a describir la dirección y el movimiento exacto en el espacio.",
        level: "B1",
        colorTheme: "green",
        icon: Map,
        grammarTip: {
            title: "Verbs and Prepositions of Movement",
            description: "Para describir trayectorias, rumbos y destinos.",
            structure: "Verb of movement + Preposition of direction + Noun",
            examples: [],
            markdownGuide: `
Describir el movimiento en inglés requiere combinar verbos básicos (go, run, walk, drive, climb) con **Preposiciones de Movimiento** muy específicas.

### 🧩 Preposiciones Principales
- **Towards:** En dirección a (sin implicar que llegas al destino).
  - *He is running towards the park.* (Corre en esa dirección).
- **Through:** A través de (como un túnel o bosque).
  - *They walked through the dark forest.*
- **Across:** Cruzando de un lado a otro (en una superficie plana, como una calle o puente).
  - *She swam across the river.*
- **Over:** Por encima de un obstáculo (sin tocarlo o cubriéndolo).
  - *The horse jumped over the fence.*
- **Along:** A lo largo de (siguiendo una línea, como un río o camino).
  - *We walked along the beach.*
- **Into / Out of:** Hacia el interior de / hacia afuera de.
  - *The cat ran into the box.*
- **Past:** Pasando de largo un punto.
  - *Walk past the bank, and turn left.*
`
        },
        sentences: [
            { id: "1", textBefore: "The dog ran", textAfter: "the street to chase a cat.", hint: "across" },
            { id: "2", textBefore: "He is walking", textAfter: "me, but I don't know him.", hint: "towards" },
            { id: "3", textBefore: "We drove", textAfter: "a dark tunnel.", hint: "through" },
            { id: "4", textBefore: "The thief climbed", textAfter: "the wall to escape.", hint: "over" },
            { id: "5", textBefore: "They walked slowly", textAfter: "the river.", hint: "along" },
            { id: "6", textBefore: "Put your hand", textAfter: "your pocket.", hint: "into" },
            { id: "7", textBefore: "Go", textAfter: "the supermarket, the pharmacy is next to it.", hint: "past" },
            { id: "8", textBefore: "She suddenly turned and ran", textAfter: "of the room.", hint: "out" },
            { id: "9", textBefore: "The plane flew", textAfter: "the mountains.", hint: "over" },
            { id: "10", textBefore: "He walked", textAfter: "the bridge safely.", hint: "across" }
        ],
        aiPrompt: "Evaluate the exercise on prepositions and verbs of movement. Check that the correct directional preposition (across, through, towards, over, etc.) is used according to the spatial context."
    },
    {
        id: "past-perfect-continuous",
        title: "Past Perfect Continuous",
        description: "Narra la duración de acciones que estaban ocurriendo antes de otro momento en el pasado.",
        level: "B2",
        colorTheme: "slate",
        icon: Clock,
        grammarTip: {
            title: "Past Perfect Continuous",
            description: "Para acciones pasadas en progreso que causaron un resultado pasado.",
            structure: "Subject + had been + verb-ING",
            examples: [],
            markdownGuide: `
El **Past Perfect Continuous** nos dice *cuánto tiempo había estado pasando algo* antes de que ocurriera OTRA cosa en el pasado.

### 🧩 Estructura
\`Subject + had been + verb-ING\`

### 📝 Casos de Uso
**1. Acción continua que provocó un resultado visible en el pasado.**
- *He was exhausted because he **had been working** for 10 hours.*
  (Estaba cansado en el pasado, porque antes de eso, llevaba 10 horas trabajando).
- *The streets were entirely wet because it **had been raining** all night.*

**2. Duración antes de un evento pasado.**
- *We **had been waiting** for 40 minutes when the bus finally arrived.*
- *She **had been studying** English for five years before she moved to London.*

> 💡 **Tip:** Casi siempre verás indicadores de tiempo con *for* (duración) o *since* (inicio) en estas oraciones, acompañadas por un evento interruptor en Past Simple.
`
        },
        sentences: [
            { id: "1", textBefore: "I was very tired because I", textAfter: "all day.", hint: "work" },
            { id: "2", textBefore: "They", textAfter: "for an hour when the doctor finally arrived.", hint: "wait" },
            { id: "3", textBefore: "She felt sick because she", textAfter: "candy all afternoon.", hint: "eat" },
            { id: "4", textBefore: "The ground was wet; it", textAfter: ".", hint: "rain" },
            { id: "5", textBefore: "How long", textAfter: "before he finally called you?", hint: "you / wait" },
            { id: "6", textBefore: "We", textAfter: "along the beach for hours before we found the cave.", hint: "walk" },
            { id: "7", textBefore: "He", textAfter: "for the test safely so he passed it.", hint: "prepare" },
            { id: "8", textBefore: "I", textAfter: "to reach her all morning, but her phone was dead.", hint: "try" },
            { id: "9", textBefore: "Mark", textAfter: "at that company for 10 years before he was promoted.", hint: "work" },
            { id: "10", textBefore: "My eyes were red because I", textAfter: ".", hint: "cry" }
        ],
        aiPrompt: "Evaluate the Past Perfect Continuous exercise. Look strictly for the structure 'had been + present participle' (except for questions/negatives) and sensible context fitting background ongoing past actions."
    },
    {
        id: "inversion",
        title: "Negative Inversion",
        description: "Estiliza y da un énfasis poético o dramático a tus expresiones formales.",
        level: "C1",
        colorTheme: "rose",
        icon: Sparkles,
        grammarTip: {
            title: "Negative Inversion",
            description: "Para dar un énfasis fuerte y dramático alterando el orden de la oración.",
            structure: "Negative adverb + auxiliary verb + subject + main verb",
            examples: [],
            markdownGuide: `
La **Inversion** (Inversión o Inversión Negativa) es una estrategia de sintaxis de nivel **C1/C2** que consiste en hacer que una oración afirmativa o negativa suene dramática, imitando la estructura de una pregunta.

### 🧩 ¿Cómo funciona?
Si comenzamos la frase con una **palabra restrictiva o adverbio negativo**, debemos invertir el sujeto y el auxiliar (como si hiciéramos una pregunta).

| Normal Order | Inverted (Dramatic) Order |
| :--- | :--- |
| I have **never** seen such a thing. | **Never have I** seen such a thing! |
| She **rarely** goes out. | **Rarely does she** go out. |
| He realized his mistake **only then**. | **Only then did he** realize his mistake. |

### 📝 Expresiones Comunes
- **Not only ... but also:** *Not only did they arrive late, but they also forgot the tickets.*
- **Hardly / Scarcely / Barely ... when:** *Hardly had I sat down when the phone rang.*
- **Little did (someone) know:** *Little did he know that she was planning a surprise.* (Él no tenía idea).
`
        },
        sentences: [
            { id: "1", textBefore: "Never", textAfter: "such a terrifying storm.", hint: "I / see (present perfect)" },
            { id: "2", textBefore: "Not only", textAfter: "the speed limit, but he also ran a red light.", hint: "he / break (past simple)" },
            { id: "3", textBefore: "Rarely", textAfter: "anything sensible in these meetings.", hint: "she / say (present simple)" },
            { id: "4", textBefore: "Little", textAfter: "that the company was going bankrupt.", hint: "they / know (past simple)" },
            { id: "5", textBefore: "Hardly", textAfter: "the house when it started to rain.", hint: "we / leave (past perfect)" },
            { id: "6", textBefore: "Under no circumstances", textAfter: "this button.", hint: "you / should press" },
            { id: "7", textBefore: "Only later", textAfter: "that he had lied to us.", hint: "I / realize (past simple)" },
            { id: "8", textBefore: "No sooner", textAfter: "the letter than he started to cry.", hint: "he / read (past perfect)" },
            { id: "9", textBefore: "At no time", textAfter: "me what his real intentions were.", hint: "he / tell (past simple)" },
            { id: "10", textBefore: "Not until the next day", textAfter: "about the accident.", hint: "we / hear (past simple)" }
        ],
        aiPrompt: "Evaluate the Negative Inversion exercise. Check for correct question-like structure (auxiliary + subject + verb) following the negative adverb, maintaining the intended tense."
    },
    {
        id: "cleft-sentences",
        title: "Cleft Sentences",
        description: "Aprende a usar oraciones endidas para recalcar y corregir información específica.",
        level: "C2",
        colorTheme: "amber",
        icon: TrendingUp,
        grammarTip: {
            title: "Cleft Sentences",
            description: "Para dar un foco extremo a una pieza de información.",
            structure: "It is... who/that OR What... is...",
            examples: [],
            markdownGuide: `
Las **Cleft Sentences** (oraciones hendidas) se usan para poner un **foco focal extremo** en un sujeto, un objeto o una acción, normalmente para contradecir a alguien o aclarar algo.

### 🧩 1. Estructura con "It is / It was"
La fórmula: \`It + be + (palabra a enfatizar) + that / who...\`

**Oración normal:** *John broke the window yesterday.*
- Énfasis en John: *It was **John** who broke the window yesterday.*
- Énfasis en la ventana: *It was **the window** that John broke yesterday.*
- Énfasis en ayer: *It was **yesterday** that John broke the window.*

### 🧩 2. Estructura con "What" (Pseudo-cleft)
La fórmula: \`What + clause + is/was + (enfoque)\`

**Oración normal:** *I need a cup of coffee.*
- Énfasis drástico: ***What** I need is **a cup of coffee**.*

**Oración normal:** *She hated the noise in the city.*
- Énfasis drástico: ***What** she hated was **the noise in the city**.*

> 💡 **Nota especial:** También puedes usar *The reason why... is*, *The place where... is*, *The person who... is*.
`
        },
        sentences: [
            { id: "1", textBefore: "I didn't break the glass! It", textAfter: "who broke it.", hint: "be / Mark" },
            { id: "2", textBefore: "What I really", textAfter: "a long holiday.", hint: "need / be" },
            { id: "3", textBefore: "It is his attitude", textAfter: "me the most.", hint: "annoy" },
            { id: "4", textBefore: "I don't like London. The place", textAfter: "Tokyo.", hint: "I / love / be" },
            { id: "5", textBefore: "No, they met in 2020. It", textAfter: "that they met.", hint: "be / in 2020" },
            { id: "6", textBefore: "What she did", textAfter: "tell the truth to the police.", hint: "be" },
            { id: "7", textBefore: "It", textAfter: "who stole the money, not Peter.", hint: "be / Sarah" },
            { id: "8", textBefore: "The reason why I", textAfter: "I was extremely sick.", hint: "not/come / be" },
            { id: "9", textBefore: "What", textAfter: "the unpredictable weather.", hint: "I / hate / be" },
            { id: "10", textBefore: "It was the movie's ending", textAfter: "so deeply.", hint: "make / me cry" }
        ],
        aiPrompt: "Evaluate the Cleft Sentences exercise. Look for correct usage of 'It is/was... that/who' and pseudo-cleft formats 'What... is/was'. Check for tense consistency within the cleft."
    },
    {
        id: "participle-clauses",
        title: "Participle Clauses",
        description: "Condensa oraciones y aporta fluidez nativa a tu discurso.",
        level: "C2",
        colorTheme: "blue",
        icon: Layers,
        grammarTip: {
            title: "Participle Clauses",
            description: "Para aportar información extra de manera muy resumida, reemplazando conjunciones.",
            structure: "Present Participle (verb-ING) / Past Participle (for passive) / Perfect Participle (Having + Past participle)",
            examples: [],
            markdownGuide: `
Las **Participle Clauses** son el distintivo crítico de los lectores y hablantes nivel C2. Permiten condensar o combinar dos oraciones en una sola suprimiendo muchas palabras (como *because, when, after, who*).

### 🧩 1. Action happening at the same time (Present Participle -> VERB-ING)
Se usa con sentido activo para acciones simultáneas o consecuencias.
- *Normal:* He walked down the street. He was whistling a song.
- *Avanzado:* **Whistling a song**, he walked down the street.
- *Significado:* Significa *(While he was whistling)*.

### 🧩 2. Action happening before another (Perfect Participle -> Having + Participle)
Se usa si una acción terminó completamente antes de que empezara la otra.
- *Normal:* After he had finished his work, he went home.
- *Avanzado:* **Having finished** his work, he went home.

### 🧩 3. Passive meaning (Past Participle -> Participle)
Se usa cuando la cláusula tiene un sentido pasivo.
- *Normal:* Because it was built in 1920, the house is very old.
- *Avanzado:* **Built in 1920**, the house is very old.

> 💡 **Regla de oro:** El sujeto de la cláusula principal DEBE SER EL MISMO que el sujeto oculto de la Participle Clause. El error común es el *Dangling Participle* (ej. "Walking down the street, a car hit me" -> incorrecto, significa que el auto iba caminando).
`
        },
        sentences: [
            { id: "1", textBefore: "", textAfter: "for hours, I was incredibly tired.", hint: "walk (perfect participle)" },
            { id: "2", textBefore: "", textAfter: "by the dog, she started crying.", hint: "bite (passive past participle)" },
            { id: "3", textBefore: "", textAfter: "at the map, he realized he was lost.", hint: "look (present participle)" },
            { id: "4", textBefore: "", textAfter: "the exam, she decided to celebrate with her friends.", hint: "pass (perfect participle)" },
            { id: "5", textBefore: "", textAfter: "in France, the wine was extremely expensive.", hint: "make (passive past participle)" },
            { id: "6", textBefore: "", textAfter: "feeling sick, I didn't go to work.", hint: "be (present participle)" },
            { id: "7", textBefore: "", textAfter: "not to go further, the explorers turned back.", hint: "warn (passive past participle)" },
            { id: "8", textBefore: "", textAfter: "all his money, he had to ask for a loan.", hint: "spend (perfect participle)" },
            { id: "9", textBefore: "", textAfter: "rapidly towards the door, she grabbed her coat.", hint: "walk (present participle)" },
            { id: "10", textBefore: "", textAfter: "by experts, the painting's value skyrocketed.", hint: "verify (passive past participle)" }
        ],
        aiPrompt: "Evaluate the Participle Clauses exercise. Ensure students properly apply Present Participles (-ing) for active/simultaneous actions, Perfect Participles (Having done) for prior events, and Past Participles for passive meaning."
    }
];