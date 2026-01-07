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
    Shuffle, Sparkles, Calendar, GitBranch, TrendingUp
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
            examples: ["I am eating an apple", "They are playing"],
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
            examples: ["I have visited Paris", "She has finished her homework"],
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
            description: "Para enfatizar la duración de una acción que aún continúa.",
            structure: "Subject + have/has + been + verb-ING",
            examples: ["I have been studying all day", "They have been working here for years"],
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
                "They had left when we arrived"
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

];