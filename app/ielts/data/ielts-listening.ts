export type ListeningQuestion =
    | {
  number: number;
  type: "text";
  prompt: string;
  context?: string;
  answerFormat?: string;
  placeholder?: string;
  acceptedAnswers: string[];
}
    | {
  number: number;
  type: "multiple_choice";
  prompt: string;
  context?: string;
  answerFormat?: string;
  options: { label: string; text: string }[];
  acceptedAnswers: string[];
};

export type ListeningSectionContent = {
  id: string;
  title: string;
  instructions: string;
  questions: ListeningQuestion[];
};
export const listeningSections: ListeningSectionContent[] = [
  {
    id: "ielts-section-1",
    title: "IELTS Listening Test - Section 1",
    instructions:
        "Questions 1–10. Complete the tables below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    questions: [
      {
        number: 1,
        type: "text",
        context: "City Bank Customer Service Log",
        prompt: "Customer name: David ____",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Escribe el apellido del cliente",
        acceptedAnswers: ["marshall"],
      },
      {
        number: 2,
        type: "text",
        context: "Customer's Term Deposit details",
        prompt: "Term: ____",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Ej. 180 days",
        acceptedAnswers: ["180 days", "180"],
      },
      {
        number: 3,
        type: "text",
        context: "Current Term Deposit interest rates",
        prompt: "2 years: ____ % per annum",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Ej. 3.85",
        acceptedAnswers: ["3.85", "3.85%"],
      },
      {
        number: 4,
        type: "text",
        context: "4 ____ Term Deposits",
        prompt: "Complete the type of term deposit",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Escribe el tipo de depósito",
        acceptedAnswers: ["monthly interest", "monthly"],
      },
      {
        number: 5,
        type: "text",
        context: "Investment returns",
        prompt: "Depend on ____",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "¿De qué dependen los returns?",
        acceptedAnswers: ["income bracket"],
      },
      {
        number: 6,
        type: "text",
        context: "Salary band for effective rate of return",
        prompt: "$70,001 – ____ $",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Escribe la cantidad máxima",
        acceptedAnswers: ["120000", "120,000"],
      },
      {
        number: 7,
        type: "text",
        context: "Hidden charges / fees",
        prompt: "There are ____",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Ej. no fees",
        acceptedAnswers: ["no fees"],
      },
      {
        number: 8,
        type: "text",
        context: "Interest payment options",
        prompt: "monthly, ____, 6-monthly, annually",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Escribe la opción que falta",
        acceptedAnswers: ["quarterly"],
      },
      {
        number: 9,
        type: "text",
        context: "Application options",
        prompt: "online / ____ / in person",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "¿Qué otra opción hay?",
        acceptedAnswers: ["by phone", "phone"],
      },
      {
        number: 10,
        type: "text",
        context: "Investment product condition",
        prompt: "This option is suitable for ____ return conditions",
        answerFormat: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER",
        placeholder: "Completa con una palabra",
        acceptedAnswers: ["maximum"],
      },
    ],
  },
  {
    id: "ielts-section-2",
    title: "IELTS Listening Test - Section 2",
    instructions:
        "Questions 11–20. Choose the correct letter, A, B or C, and complete the notes below. Write NO MORE THAN TWO WORDS where required.",
    questions: [
      {
        number: 11,
        type: "multiple_choice",
        context: "September Celebration day",
        prompt: "The September Celebration day is held...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "five times a year to honour the city" },
          { label: "B", text: "on the park’s important birthday" },
          { label: "C", text: "to remember the history of the park" },
        ],
        acceptedAnswers: ["C", "c"],
      },
      {
        number: 12,
        type: "multiple_choice",
        context: "History of the park",
        prompt: "The park was first built in...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "1955" },
          { label: "B", text: "1979" },
          { label: "C", text: "the 1990s" },
        ],
        acceptedAnswers: ["B", "b"],
      },
      {
        number: 13,
        type: "multiple_choice",
        context: "Original attractions",
        prompt: "The park still uses...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "a children’s play area" },
          { label: "B", text: "a petting zoo" },
          { label: "C", text: "two of the early rides" },
        ],
        acceptedAnswers: ["B", "b"],
      },
      {
        number: 14,
        type: "multiple_choice",
        context: "The Hurricane roller-coaster",
        prompt: "The Hurricane roller-coaster is...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "tall and made of wood" },
          { label: "B", text: "designed for smaller children" },
          { label: "C", text: "very fast and exciting" },
        ],
        acceptedAnswers: ["A", "a"],
      },
      {
        number: 15,
        type: "multiple_choice",
        context: "Ride safety coding",
        prompt: "The rides with a height limit are coded...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "yellow" },
          { label: "B", text: "blue" },
          { label: "C", text: "black" },
        ],
        acceptedAnswers: ["C", "c"],
      },
      {
        number: 16,
        type: "text",
        context: "Food options",
        prompt: "hamburgers, sandwiches, etc. at ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Lugar donde venden hamburgers y sandwiches",
        acceptedAnswers: ["food stands"],
      },
      {
        number: 17,
        type: "text",
        context: "Parade",
        prompt: "Starts at noon / On the ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Nombre del lugar o calle",
        acceptedAnswers: ["main street", "main st", "st", "st."],
      },
      {
        number: 18,
        type: "text",
        context: "Concert",
        prompt: "Theme: ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Tema del concierto",
        acceptedAnswers: ["hollywood"],
      },
      {
        number: 19,
        type: "text",
        context: "Safety and Security",
        prompt: "Ten ____ centres in the park",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Tipo de centros de asistencia",
        acceptedAnswers: ["first aid", "first-aid"],
      },
      {
        number: 20,
        type: "text",
        context: "Security information",
        prompt: "Ask security team at the ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Lugar donde está el security team",
        acceptedAnswers: ["guard stations"],
      },
    ],
  },

  {
    id: "ielts-section-3",
    title: "IELTS Listening Test - Section 3",
    instructions:
        "Questions 21–30. Complete the flowchart, summary and notes below. Write NO MORE THAN TWO WORDS where indicated, and NO MORE THAN ONE WORD where required.",
    questions: [
      {
        number: 21,
        type: "text",
        context: "Session outline · Tutorial structure · Step 1",
        prompt: "Step 1: go over ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "¿Qué revisan primero?",
        acceptedAnswers: ["task instructions"],
      },
      {
        number: 22,
        type: "text",
        context: "Session outline · Tutorial structure · Step 2",
        prompt: "Step 2: think about research ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Tipo de enfoque de investigación",
        acceptedAnswers: ["strategies"],
      },
      {
        number: 23,
        type: "text",
        context: "Tutorial structure · Research examples",
        prompt: "Consider the kind of research, e.g. ____ from other projects",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Ejemplo de tipo de investigación",
        acceptedAnswers: ["case studies"],
      },
      {
        number: 24,
        type: "text",
        context: "Session outline · Tutorial structure · Step 3",
        prompt: "Step 3: develop an ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Documento o plan final",
        acceptedAnswers: ["action plan"],
      },
      {
        number: 25,
        type: "text",
        context: "Project description",
        prompt:
            "You need to design a grey-water treatment system to reduce the pressure on the water ____ in a Cameroon village.",
        answerFormat: "Write NO MORE THAN ONE WORD",
        placeholder: "Recurso afectado",
        acceptedAnswers: ["supply"],
      },
      {
        number: 26,
        type: "text",
        context: "Project description",
        prompt: "Grey-water is wastewater from household ____.",
        answerFormat: "Write NO MORE THAN ONE WORD",
        placeholder: "Origen del wastewater",
        acceptedAnswers: ["drains"],
      },
      {
        number: 27,
        type: "text",
        context: "Project description",
        prompt:
            "The recycled water can be used for watering plants, flushing toilets and doing ____.",
        answerFormat: "Write NO MORE THAN ONE WORD",
        placeholder: "Actividad doméstica",
        acceptedAnswers: ["laundry"],
      },
      {
        number: 28,
        type: "text",
        context: "Research tips · General internet searches",
        prompt: "Avoid websites where ____ try to sell their products.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "¿Quién intenta vender productos?",
        acceptedAnswers: ["manufacturers"],
      },
      {
        number: 29,
        type: "text",
        context: "Engineering library",
        prompt: "Use key words such as: grey-water treatment systems / ____ use",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Tipo de uso",
        acceptedAnswers: ["residential"],
      },
      {
        number: 30,
        type: "text",
        context: "EWB website",
        prompt: "Check examples from the ____ last year.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "¿Qué tipo de ejemplos?",
        acceptedAnswers: ["competition"],
      },
    ],
  },
  {
    id: "ielts-section-4",
    title: "IELTS Listening Test - Section 4",
    instructions:
        "Questions 31–40. Complete the summary and notes below, and choose the correct letter for multiple choice items. Write NO MORE THAN TWO WORDS where required.",
    questions: [
      {
        number: 31,
        type: "text",
        context: "Origins of the Caveman Diet",
        prompt:
            "There are many fad diets nowadays. They all promise good health if you stick to the ____.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Completa la expresión",
        acceptedAnswers: ["plan"],
      },
      {
        number: 32,
        type: "text",
        context: "Origins of the Caveman Diet",
        prompt:
            "This diet includes foods people ate before we developed ____.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Actividad humana desarrollada después",
        acceptedAnswers: ["agriculture"],
      },
      {
        number: 33,
        type: "text",
        context: "Hunter-gatherer tribes",
        prompt:
            "These tribes are skilled with their weapons, e.g. ____ and ____.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Escribe ambas armas",
        acceptedAnswers: [
          "bows arrows",
          "arrows bows",
          "bows, arrows",
          "arrows, bows",
        ],
      },
      {
        number: 34,
        type: "text",
        context: "Hunter-gatherer tribes",
        prompt: "They get only about a ____ of their energy from meat.",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Fracción o número ordinal",
        acceptedAnswers: ["third", "3rd"],
      },
      {
        number: 35,
        type: "multiple_choice",
        context: "Research evidence",
        prompt: "Research evidence suggests that...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "the tribesmen’s traditional diet is unhealthy" },
          { label: "B", text: "our bodies can digest only certain foods" },
          { label: "C", text: "we can adapt to a range of diets" },
        ],
        acceptedAnswers: ["C", "c"],
      },
      {
        number: 36,
        type: "multiple_choice",
        context: "Digesting milk",
        prompt: "Thai people have difficulty digesting milk because...",
        answerFormat: "Choose the correct letter, A, B or C",
        options: [
          { label: "A", text: "they have too much lactase in their bodies" },
          { label: "B", text: "in the past they didn’t farm cows" },
          { label: "C", text: "their saliva lacks certain enzymes" },
        ],
        acceptedAnswers: ["B", "b"],
      },
      {
        number: 37,
        type: "text",
        context: "Variation in global diets",
        prompt: "Inuit – most calories from ____ foods, e.g. seal meat",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Tipo de alimento",
        acceptedAnswers: ["high fat", "high-fat"],
      },
      {
        number: 38,
        type: "text",
        context: "Implications for the caveman diet",
        prompt: "Diets come from complicated cultural ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Completa la idea",
        acceptedAnswers: ["practices", "dietary practices"],
      },
      {
        number: 39,
        type: "text",
        context: "Problems with Caveman diet",
        prompt: "Costs a lot of money for lean meat and ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Otro producto costoso",
        acceptedAnswers: ["nut oils"],
      },
      {
        number: 40,
        type: "text",
        context: "Problems with Caveman diet",
        prompt: "Reliance on meat is bad for the ____",
        answerFormat: "Write NO MORE THAN TWO WORDS",
        placeholder: "Impacto negativo general",
        acceptedAnswers: ["environment"],
      },
    ],
  }
];
export const listeningBandTable = [
  { band: "9", raw: "39–40" },
  { band: "8.5", raw: "37–38" },
  { band: "8", raw: "35–36" },
  { band: "7.5", raw: "32–34" },
  { band: "7", raw: "30–31" },
  { band: "6.5", raw: "26–29" },
  { band: "6", raw: "23–25" },
  { band: "5.5", raw: "18–22" },
  { band: "5", raw: "16–17" },
  { band: "4.5", raw: "13–15" },
  { band: "4", raw: "11–12" },
  { band: "3.5", raw: "8–10" },
  { band: "3", raw: "6–7" },
  { band: "2.5", raw: "4–5" },
];