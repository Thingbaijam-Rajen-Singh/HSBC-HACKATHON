import { World, PlacementQuestion } from '../types';

export const pythonPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-py-1',
    topic: 'Python Data Structures',
    question: 'In Python, what is the difference between a list and a tuple?',
    options: [
      'Lists are immutable, while tuples can be modified',
      'Lists are mutable (can be changed), while tuples are immutable',
      'Tuples can only store numbers',
      'Lists cannot contain mixed data types',
    ],
    correctIndex: 1,
  },
  {
    id: 'pq-py-2',
    topic: 'List Comprehensions',
    question: 'What does `[x**2 for x in range(4) if x % 2 == 0]` evaluate to?',
    options: ['[0, 4]', '[0, 1, 4, 9]', '[1, 9]', '[4, 16]'],
    correctIndex: 0,
  },
];

export const pythonCurriculumWorlds: World[] = [
  {
    id: 'world-py-1',
    number: 1,
    title: 'World 1: Python Core Foundations',
    shortDesc: 'Variables, dynamic typing, control flow, functions, and standard libraries.',
    color: 'from-amber-500 to-emerald-600',
    levels: [
      {
        id: 'lvl-py-1-1',
        worldId: 'world-py-1',
        title: 'Level 1: Variables, Lists & Dicts',
        order: 1,
        description: 'Understand Python syntax elegance, list indexing, and key-value dictionaries.',
        sublevels: [
          {
            id: 'sub-py-1-1-1',
            levelId: 'lvl-py-1-1',
            worldId: 'world-py-1',
            title: '1.1 Interactive Python Logic Lab',
            order: 1,
            summary: 'Live experiment formatting output with Python f-strings and dictionaries.',
            optionalResources: [
              {
                id: 'res-py-1',
                title: 'Official Python Tutorial: Data Structures',
                type: 'documentation',
                provider: 'Python.org',
                url: 'https://docs.python.org/3/tutorial/datastructures.html',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-py-1-1-1',
                sublevelId: 'sub-py-1-1-1',
                title: 'F-String & Dictionary Precision',
                type: 'interactive',
                xpReward: 35,
                description: 'Format the dictionary data below using Python string interpolation.',
                learningObjectives: ['Master f-strings and key access'],
                hints: ['Use f"User: {student[\'name\']}"'],
                interactiveData: {
                  initialCode: `<!-- Python Web Output Simulation -->\n<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 8px;">\n  <h3># Python 3.12 Runtime</h3>\n  <p>student = {"name": "Jordan", "skill": "Python", "xp": 120}</p>\n  <p style="color: #4ade80;">>>> print(f"Student {student['name']} is learning {student['skill']}!")</p>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Customize the output message to say "Python Developer" or student name.',
                  solutionHint: 'Verify student data is displayed in the terminal.',
                  validationRegex: 'student',
                },
              },
            ],
          },
          {
            id: 'sub-py-1-1-2',
            levelId: 'lvl-py-1-1',
            worldId: 'world-py-1',
            title: '1.2 Python Idioms Quiz',
            order: 2,
            summary: 'Test your grasp of Pythonic code conventions (PEP 8) and list comprehensions.',
            optionalResources: [
              {
                id: 'res-py-2',
                title: 'PEP 8 Style Guide for Python Code',
                type: 'documentation',
                provider: 'Python.org',
                url: 'https://peps.python.org/pep-0008/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-py-1-1-2',
                sublevelId: 'sub-py-1-1-2',
                title: 'Pythonic Mastery Quiz',
                type: 'quiz',
                xpReward: 40,
                description: 'Select the idiomatic Python answer.',
                learningObjectives: ['Differentiate idiomatic Python from other language patterns'],
                hints: ['List comprehensions replace verbose loops.'],
                quizData: [
                  {
                    id: 'py-q-1',
                    question: 'What is the most idiomatic Python way to iterate over both indices and items of a list?',
                    type: 'single',
                    options: [
                      'for i in range(len(items)): item = items[i]',
                      'for idx, item in enumerate(items):',
                      'while i < items.length:',
                      'for (int i=0; i<items.count; i++)',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'The built-in enumerate() function generates index-item tuples cleanly without manual indexing.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-py-1-2',
        worldId: 'world-py-1',
        title: 'Level 2: Bug Hunt: The Off-By-One Index',
        order: 2,
        description: 'Fix common loop boundary and list mutation bugs.',
        sublevels: [
          {
            id: 'sub-py-1-2-1',
            levelId: 'lvl-py-1-2',
            worldId: 'world-py-1',
            title: '2.1 Bug Hunt: Repair the Loop Boundary',
            order: 1,
            summary: 'Fix a range error that stops before the final item.',
            optionalResources: [],
            activities: [
              {
                id: 'act-py-1-2-1',
                sublevelId: 'sub-py-1-2-1',
                title: 'Bug Hunt: Range Boundary Rescue',
                type: 'bug_hunt',
                xpReward: 60,
                description: 'The script needs to process 10 records, but range(9) only processes 0 through 8! Change range(9) to range(10).',
                learningObjectives: ['Understand Python range(stop) non-inclusive endpoint'],
                hints: ['range(10) includes numbers 0 through 9 (10 total).'],
                bugHuntData: {
                  starterCode: `<div style="font-family: monospace; background: #111; color: #fff; padding: 16px;">\n  <p># BUG: range(9) excludes the 10th item!</p>\n  <code>for i in range(9): process(i)</code>\n</div>`,
                  brokenDescription: 'Loop uses range(9) instead of range(10).',
                  expectedBehavior: 'Uses range(10) to include all 10 items.',
                  testFunction: `(code) => {
                    if (code.includes('range(9)')) return 'Still has range(9). Change to range(10).';
                    if (!code.includes('range(10)')) return 'Must use range(10).';
                    return true;
                  }`,
                  hints: ['Change range(9) to range(10).'],
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
