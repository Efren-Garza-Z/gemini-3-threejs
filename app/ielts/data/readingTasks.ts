export interface ReadingQuestion {
    id: number;
    text: string;
    type: "fill-in" | "true-false-ng" | "multiple-choice" | "matching";
    options?: string[]; // Para matching o opción múltiple
}

export interface ReadingSection {
    sectionNumber: number;
    title: string;
    text: string;
    questions: ReadingQuestion[];
}

export interface ReadingTest {
    id: string;
    title: string;
    duration: number; // 60 min
    totalQuestions: number;
    instructions: string[];
    sections: ReadingSection[];
}

export const ieltsReadingData: ReadingTest[] = [
    {
        id: "reading-test-1",
        title: "General Training Reading Practice Test 1",
        duration: 60,
        totalQuestions: 40,
        instructions: [
            "Do not open this question paper until you are told to do so",
            "Write your name and candidate number in the spaces at the top of the page",
            "Read the instructions for each part of the paper carefully",
            "Answer all the questions",
            "Write your answers on the answer sheet",
            "You must complete the answer sheet within the time limit"
        ],
        sections: [
            // ============ SECTION 1 ============
            {
                sectionNumber: 1,
                title: "Emergency Procedures & Community Education",
                text: `## Emergency procedures

**Revised July 2011**

This applies to all persons on the school campus:

In cases of emergency (e.g. fire), find the nearest teacher who will send a messenger at full speed to the Office or inform the Office via phone ext. 99.

### Procedure for evacuation

- Warning of an emergency evacuation will be marked by a number of short bell rings. (In the event of a power failure, this may be a hand-held bell or siren.)
- All class work will cease immediately.
- Students will leave their bags, books and other possessions where they are.
- Teachers will take the class rolls.
- Classes will vacate the premises using the nearest staircase. If these stairs are inaccessible, use the nearest alternative staircase. Do not use the lifts. Do not run.
- Each class, under the teacher's supervision, will move in a brisk, orderly fashion to the paved quadrangle area adjacent to the car park.
- All support staff will do the same.
- The Marshalling Supervisor, Ms Randall, will be wearing a red cap and she will be waiting there with the master timetable and staff list in her possession.
- Students assemble in the quad with their teacher at the time of evacuation. The teacher will do a head count and check the roll.
- Each teacher sends a student to the Supervisor to report whether all students have been accounted for. After checking, students will sit down (in the event of rain or wet pavement they may remain standing).
- The Supervisor will inform the Office when all staff and students have been accounted for.
- All students, teaching staff and support personnel remain in the evacuation area until the All Clear signal is given.
- The All Clear will be a long bell ring or three blasts on the siren.
- Students will return to class in an orderly manner under teacher guidance.
- In the event of an emergency occurring during lunch or breaks, students are to assemble in their home-room groups in the quad and await their home-room teacher.

---

## Community Education - Short Courses: Business

### Business Basics
Gain foundation knowledge for employment in an accounts position with bookkeeping and business basics through to intermediate level; suitable for anyone requiring knowledge from the ground up.
- **Code:** B/ED011
- **Date:** 16th or 24th April 9am–4pm
- **Cost:** $420

### Bookkeeping
This course will provide students with a comprehensive understanding of bookkeeping and a great deal of hands-on experience.
- **Code:** B/ED020
- **Date:** 19th April 9am–2.30pm (one session only so advance bookings essential)
- **Cost:** $250

### New Enterprise Module
Understand company structures, tax rates, deductions, employer obligations, profit and loss statements, GST and budgeting for tax.
- **Code:** B/ED030
- **Date:** 15th or 27th May 6pm–9pm
- **Cost:** $105

### Social Networking – the Latest Marketing Tool
This broad overview gives you the opportunity to analyse what web technologies are available and how they can benefit your organisation.
- **Code:** B/ED033
- **Date:** 1st or 8th or 15th June 6pm–9pm
- **Cost:** $95

### Communication
Take the fear out of talking to large gatherings of people. Gain the public-speaking experience that will empower you with better communication skills and confidence.
- **Code:** B/ED401
- **Date:** 12th or 13th or 14th July 6pm–9pm
- **Cost:** $90`,
                questions: [
                    { id: 1, text: "In an emergency, a teacher will either phone the office or ……………….. .", type: "fill-in" },
                    { id: 2, text: "The signal for evacuation will normally be several ……………….. .", type: "fill-in" },
                    { id: 3, text: "If possible, students should leave the building by the ……………….. .", type: "fill-in" },
                    { id: 4, text: "They then walk quickly to the ……………….. .", type: "fill-in" },
                    { id: 5, text: "……………….. will join the teachers and students in the quad.", type: "fill-in" },
                    { id: 6, text: "Each class teacher will count up his or her students and mark ……………….. .", type: "fill-in" },
                    { id: 7, text: "After the ……………….. , everyone may return to class.", type: "fill-in" },
                    { id: 8, text: "If there is an emergency at lunchtime, students gather in the quad in ……………….. and wait for their teacher.", type: "fill-in" },
                    { id: 9, text: "Business Basics is appropriate for beginners.", type: "true-false-ng" },
                    { id: 10, text: "Bookkeeping has no practical component.", type: "true-false-ng" },
                    { id: 11, text: "Bookkeeping is intended for advanced students only.", type: "true-false-ng" },
                    { id: 12, text: "The New Enterprise Module can help your business become more profitable.", type: "true-false-ng" },
                    { id: 13, text: "Social Networking focuses on a specific website to help your business succeed.", type: "true-false-ng" },
                    { id: 14, text: "The Communication class involves speaking in front of an audience.", type: "true-false-ng" }
                ]
            },

            // ============ SECTION 2 ============
            {
                sectionNumber: 2,
                title: "Beneficial Work Practices & Workplace Dismissals",
                text: `## Beneficial work practices for the keyboard operator

**A)** Sensible work practices are an important factor in the prevention of muscular fatigue; discomfort or pain in the arms, neck, hands or back; or eye strain which can be associated with constant or regular work at a keyboard and visual display unit (VDU).

**B)** It is vital that the employer pays attention to the physical setting such as workplace design, the office environment, and placement of monitors as well as the organisation of the work and individual work habits. Operators must be able to recognise work-related health problems and be given the opportunity to participate in the management of these. Operators should take note of and follow the preventive measures outlined below.

**C)** The typist must be comfortably accommodated in a chair that is adjustable for height with a back rest that is also easily adjustable both for angle and height. The back rest and sitting ledge (with a curved edge) should preferably be cloth-covered to avoid excessive perspiration.

**D)** When the keyboard operator is working from a paper file or manuscript, it should be at the same distance from the eyes as the screen. The most convenient position can be found by using some sort of holder. Individual arrangement will vary according to whether the operator spends more time looking at the VDU or the paper – whichever the eyes are focused on for the majority of time should be put directly in front of the operator.

**E)** While keying, it is advisable to have frequent but short pauses of around thirty to sixty seconds to proofread. When doing this, relax your hands. After you have been keying for sixty minutes, you should have a ten minute change of activity. During this spell it is important that you do not remain seated but stand up or walk around. This period could be profitably used to do filing or collect and deliver documents.

**F)** Generally, the best position for a VDU is at right angles to the window. If this is not possible then glare from the window can be controlled by blinds, curtains or movable screens. Keep the face of the VDU vertical to avoid glare from overhead lighting.

**G)** Unsatisfactory work practices or working conditions may result in aches or pain. Symptoms should be reported to your supervisor early on so that the cause of the trouble can be corrected and the operator should seek medical attention.

---

## Workplace dismissals

### Before the dismissal
If an employer wants to dismiss an employee, there is a process to be followed. Instances of minor misconduct and poor performance must first be addressed through some preliminary steps.

Firstly, you should be given an improvement note. This will explain the problem, outline any necessary changes and offer some assistance in correcting the situation. Then, if your employer does not think your performance has improved, you may be given a written warning. The last step is called a final written warning which will inform you that you will be dismissed unless there are improvements in performance. If there is no improvement, your employer can begin the dismissal procedure.

The dismissal procedure begins with a letter from the employer setting out the charges made against the employee. The employee will be invited to a meeting to discuss these accusations. If the employee denies the charges, he is given the opportunity to appear at a formal appeal hearing in front of a different manager. After this, a decision is made as to whether the employee will be let go or not.

### Dismissals
Of the various types of dismissal, a fair dismissal is the best kind if an employer wants an employee out of the workplace. A fair dismissal is legally and contractually strong and it means all the necessary procedures have been correctly followed. In cases where an employee's misconduct has been very serious, however, an employer may not have to follow all of these procedures. If the employer can prove that the employee's behaviour was illegal, dangerous or severely wrong, the employee can be dismissed immediately: a procedure known as summary dismissal.

Sometimes a dismissal is not considered to have taken place fairly. One of these types is wrongful dismissal and involves a breach of contract by the employer. This could involve dismissing an employee without notice or without following proper disciplinary and dismissal procedures. Another type, unfair dismissal, is when an employee is sacked without good cause.

There is another kind of dismissal, known as constructive dismissal, which is slightly peculiar because the employee is not actually openly dismissed by the employer. In this case the employee is forced into resigning by an employer who tries to make significant changes to the original contract. This could mean an employee might have to work night shifts after originally signing on for day work, or he could be made to work in dangerous conditions.`,
                questions: [
                    {
                        id: 15,
                        text: "Section A",
                        type: "matching",
                        options: [
                            "i - How can reflection problems be avoided?",
                            "ii - How long should I work without a break?",
                            "iii - What if I experience any problems?",
                            "iv - When is the best time to do filing chores?",
                            "v - What makes a good seat?",
                            "vi - What are the common health problems?",
                            "vii - What is the best kind of lighting to have?",
                            "viii - What are the roles of management and workers?",
                            "ix - Why does a VDU create eye fatigue?",
                            "x - Where should I place the documents?"
                        ]
                    },
                    { id: 16, text: "Section B", type: "matching", options: [] },
                    { id: 17, text: "Section C", type: "matching", options: [] },
                    { id: 18, text: "Section D", type: "matching", options: [] },
                    { id: 19, text: "Section E", type: "matching", options: [] },
                    { id: 20, text: "Section F", type: "matching", options: [] },
                    { id: 21, text: "Section G", type: "matching", options: [] },
                    { id: 22, text: "If an employee receives a ……………….. , this means he will lose his job if his work does not get better.", type: "fill-in" },
                    { id: 23, text: "If an employee does not accept the reasons for his dismissal, a ……………….. can be arranged.", type: "fill-in" },
                    {
                        id: 24,
                        text: "An employee is asked to leave work straight away because he has done something really bad.",
                        type: "matching",
                        options: [
                            "A - Fair dismissal",
                            "B - Summary dismissal",
                            "C - Unfair dismissal",
                            "D - Wrongful dismissal",
                            "E - Constructive dismissal"
                        ]
                    },
                    { id: 25, text: "An employee is pressured to leave his job unless he accepts conditions that are very different from those agreed to in the beginning.", type: "matching", options: [] },
                    { id: 26, text: "An employer gets rid of an employee without keeping to conditions in the contract.", type: "matching", options: [] },
                    { id: 27, text: "The reason for an employee's dismissal is not considered good enough.", type: "matching", options: [] },
                    { id: 28, text: "The reasons for an employee's dismissal are acceptable by law and the terms of the employment contract.", type: "matching", options: [] }
                ]
            },

            // ============ SECTION 3 ============
            {
                sectionNumber: 3,
                title: "Calisthenics - The World's Oldest Form of Resistance Training",
                text: `## Calisthenics: The world's oldest form of resistance training

**A)** From the very first caveman to scale a tree or hang from a cliff face, to the mighty armies of the Greco-Roman empires and the gymnasiums of modern American high schools, calisthenics has endured and thrived because of its simplicity and utility. Unlike strength training which involves weights, machines or resistance bands, calisthenics uses only the body's own weight for physical development.

**B)** Calisthenics enters the historical record at around 480 B.C., with Herodotus' account of the Battle of Thermopolylae. Herodotus reported that, prior to the battle, the god-king Xerxes sent a scout party to spy on his Spartan enemies. The scouts informed Xerxes that the Spartans, under the leadership of King Leonidas, were practicing some kind of bizarre, synchronised movements akin to a tribal dance. Xerxes was greatly amused. His own army was comprised of over 120,000 men, while the Spartans had just 300. Leonidas was informed that he must retreat or face annihilation. The Spartans did not retreat, however, and in the ensuing battle they managed to hold Xerxes' enormous army at bay for some time until reinforcements arrived. It turns out their tribal dance was not a superstitious ritual but a form of calisthenics by which they were building awe-inspiring physical strength and endurance.

**C)** The Greeks took calisthenics seriously not only as a form of military discipline and strength, but also as an artistic expression of movement and an aesthetically ideal physique. Indeed, the term calisthenics itself is derived from the Greek words for beauty and strength. We know from historical records and images from pottery, mosaics and sculptures of the period that the ancient Olympians took calisthenics training seriously. They were greatly admired – and still are, today – for their combination of athleticism and physical beauty. You may have heard a friend whimsically sigh and mention that someone 'has the body of a Greek god'. This expression has travelled through centuries and continents, and the source of this envy and admiration is the calisthenics method.

**D)** Calisthenics experienced its second golden age in the 1800s. This century saw the birth of gymnastics, an organised sport that uses a range of bars, rings, vaulting horses and balancing beams to display physical prowess. This period is also when the phenomena of strongmen developed. These were people of astounding physical strength and development who forged nomadic careers by demonstrating outlandish feats of strength to stunned populations. Most of these men trained using hand balancing and horizontal bars, as modern weight machines had not yet been invented.

**E)** In the 1950s, Angelo Siciliano – who went by the stage name Charles Atlas – was crowned "The World's Most Perfectly Developed Man". Atlas's own approach stemmed from traditional calisthenics, and through a series of mail order comic books he taught these methods to hundreds of thousands of children and young adults through the 1960s and 1970s. But Atlas was the last of a dying breed. The tides were turning, fitness methods were drifting away from calisthenics, and no widely-regarded proponent of the method would ever succeed him.

**F)** In the 1960s and 1970s calisthenics and the goal of functional strength combined with physical beauty was replaced by an emphasis on huge muscles at any cost. This became the sport of body building. Although body building's pioneers were drawn from the calisthenics tradition, the sole goal soon became an increase in muscle size. Body building icons, people such as Arnold Schwarzenegger and Sergio Oliva were called mass monsters because of their imposing physiques. Physical development of this nature was only attainable through the use of anabolic steroids, synthetic hormones which boosted muscle development while harming overall health. These body builders also relied on free weights and machines, which allowed them to target and bloat the size of individual muscles rather than develop a naturally proportioned body. Calisthenics, with its emphasis on physical beauty and a balance in proportions, had little to offer the mass monsters.

**G)** In this "bigger is better" climate, calisthenics was relegated to groups perceived to be vulnerable, such as women, people recuperating from injuries and school students. Although some of the strongest and most physically developed human beings ever to have lived acquired their abilities through the use of sophisticated calisthenics, a great deal of this knowledge was discarded and the method was reduced to nothing more than an easily accessible and readily available activity. Those who mastered the rudimentary skills of calisthenics could expect to graduate to weight training rather than advanced calisthenics.

**H)** In recent years, however, fitness trends have been shifting back toward the use of calisthenics. Bodybuilding approaches that promote excessive muscle development frequently lead to joint pain, injuries, unbalanced physiques and weak cardiovascular health. As a result, many of the newest and most popular gyms and programmes emphasise calisthenics-based methods instead. Modern practices often combine elements from a number of related traditions such as yoga, Pilates, kettle-ball training, gymnastics and traditional Greco-Roman calisthenics. Many people are keen to recover the original Greek vision of physical beauty and strength and harmony of the mind-body connection.`,
                questions: [
                    { id: 29, text: "Which paragraph contains: the origin of the word 'calisthenics'", type: "matching" },
                    { id: 30, text: "Which paragraph contains: the last popular supporter of calisthenics", type: "matching" },
                    { id: 31, text: "Which paragraph contains: the first use of calisthenics as a training method", type: "matching" },
                    { id: 32, text: "Which paragraph contains: a multidisciplinary approach to all-round health and strength", type: "matching" },
                    { id: 33, text: "Which paragraph contains: reasons for the survival of calisthenics throughout the ages", type: "matching" },
                    { id: 34, text: "Which paragraph contains: medical substance to increase muscle mass and strength", type: "matching" },
                    { id: 35, text: "Which paragraph contains: a reference to travelling showmen who displayed their strength for audiences", type: "matching" },
                    { id: 36, text: "During the sixties and seventies, attaining huge muscles became more important than ……………….. or having an attractive-looking body.", type: "fill-in" },
                    { id: 37, text: "The first people to take up this new sport of body building had a background in calisthenics but the most famous practitioners became known as ……………….. on account of the impressive size of their muscles.", type: "fill-in" },
                    { id: 38, text: "Calisthenics then became the domain of 'weaker' people: females, children and those recovering from ……………….. .", type: "fill-in" },
                    { id: 39, text: "Much of the advanced knowledge about calisthenics was lost and the method was subsequently downgraded to the status of a simple, user-friendly activity. Once a person became skilled at this, he would progress to ……………….. .", type: "fill-in" },
                    { id: 40, text: "Currently a revival of calisthenics is under way as extreme muscle building can harm the body leaving it sore, out of balance, and in poor ……………….. .", type: "fill-in" }
                ]
            }
        ]
    }
];