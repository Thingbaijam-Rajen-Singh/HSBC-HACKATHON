import { World, PlacementQuestion } from '../types';

export const cloudDevopsPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-cld-1',
    topic: 'Containerization Basics',
    question: 'What is the primary difference between a Docker container and a virtual machine (VM)?',
    options: [
      'Containers share the host operating system kernel and are lightweight, while VMs run full guest operating systems with a hypervisor',
      'Containers only run on Linux, while VMs only run on Windows',
      'VMs are faster to boot up than containers',
      'Containers require dedicated hardware processors',
    ],
    correctIndex: 0,
  },
  {
    id: 'pq-cld-2',
    topic: 'CI/CD Pipelines',
    question: 'What is the main objective of Continuous Integration (CI)?',
    options: [
      'To automatically build, test, and validate developer code changes frequently into a shared repository',
      'To eliminate the need for writing unit tests',
      'To charge client credit cards continuously every second',
      'To manually configure production servers via SSH',
    ],
    correctIndex: 0,
  },
];

export const cloudDevopsCurriculumWorlds: World[] = [
  {
    id: 'world-cld-1',
    number: 1,
    title: 'World 1: Linux CLI & Infrastructure Foundations',
    shortDesc: 'Bash scripting, file permissions (chmod/chown), process management, SSH keys, and system diagnostics.',
    color: 'from-cyan-600 to-blue-700',
    levels: [
      {
        id: 'lvl-cld-1-1',
        worldId: 'world-cld-1',
        title: 'Level 1: Linux Shell & File Permissions',
        order: 1,
        description: 'Command line mastery, piping, grep, chmod, and system metrics.',
        sublevels: [
          {
            id: 'sub-cld-1-1-1',
            levelId: 'lvl-cld-1-1',
            worldId: 'world-cld-1',
            title: '1.1 Linux Shell Playground',
            order: 1,
            summary: 'Live experiment testing Linux terminal commands, pipes, and environment variables.',
            optionalResources: [
              {
                id: 'res-cld-1',
                title: 'Linux Foundation: Introduction to Linux Systems',
                type: 'documentation',
                provider: 'Linux Foundation',
                url: 'https://www.linuxfoundation.org/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-cld-1-1-1',
                sublevelId: 'sub-cld-1-1-1',
                title: 'Terminal Diagnostics Playground',
                type: 'interactive',
                xpReward: 35,
                description: 'Verify Linux server diagnostics output below. Ensure stdout streams and port binding metrics are displayed.',
                learningObjectives: ['Inspect process tables with ps and top', 'Trace open network sockets with netstat/ss'],
                hints: ['Verify system process rows are listed.'],
                interactiveData: {
                  initialCode: `<div class="terminal bg-black text-emerald-400 p-5 rounded-2xl font-mono text-xs">\n  <p>root@infra-node-01:~$ netstat -tuln | grep 3000</p>\n  <p class="text-white">tcp   0   0 0.0.0.0:3000   0.0.0.0:*   LISTEN</p>\n  <p class="text-sky-400 mt-2">root@infra-node-01:~$ docker ps</p>\n  <p class="text-slate-300">CONTAINER ID   IMAGE         COMMAND     STATUS         PORTS</p>\n  <p class="text-slate-300">9c1b3f2e1a     nginx:alpine  "/entry..."  Up 4 hours     0.0.0.0:3000->80/tcp</p>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Verify server terminal process and port binding output.',
                  solutionHint: 'Keep terminal output with port 3000 listening.',
                  validationRegex: '0.0.0.0:3000',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-cld-2',
    number: 2,
    title: 'World 2: Docker & Containerization',
    shortDesc: 'Dockerfiles, multi-stage builds, volumes, port forwarding, and Docker Compose orchestration.',
    color: 'from-blue-600 to-indigo-800',
    levels: [
      {
        id: 'lvl-cld-2-1',
        worldId: 'world-cld-2',
        title: 'Level 1: Multi-Stage Dockerfiles',
        order: 1,
        description: 'Optimize image sizes with multi-stage builds, non-root users, and caching.',
        sublevels: [
          {
            id: 'sub-cld-2-1-1',
            levelId: 'lvl-cld-2-1',
            worldId: 'world-cld-2',
            title: '1.1 Dockerfile Optimization Quiz',
            order: 1,
            summary: 'Test knowledge of image layer caching, security, and minimal base images.',
            optionalResources: [],
            activities: [
              {
                id: 'act-cld-2-1-1',
                sublevelId: 'sub-cld-2-1-1',
                title: 'Docker Image Hardening Quiz',
                type: 'quiz',
                xpReward: 45,
                description: 'Select the optimal Docker architecture practices.',
                learningObjectives: ['Minimize attack surface with distroless/alpine images'],
                hints: ['Multi-stage builds exclude build tools from the final runtime image.'],
                quizData: [
                  {
                    id: 'cld-q-1',
                    question: 'Why should production containers avoid running processes as the default "root" user?',
                    type: 'single',
                    options: [
                      'Root containers consume 10x more RAM',
                      'If a vulnerability allows container escape, the attacker gains full root privileges over the host machine',
                      'Docker will refuse to build images containing root',
                      'Root users cannot bind to ports',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Running as non-root (e.g. USER node or USER app) enforces least privilege, mitigating container breakout risks.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-cld-3',
    number: 3,
    title: 'World 3: CI/CD Automation & GitHub Actions',
    shortDesc: 'Automated test runners, pull-request checks, secret management, and zero-downtime CD.',
    color: 'from-amber-500 to-orange-600',
    levels: [
      {
        id: 'lvl-cld-3-1',
        worldId: 'world-cld-3',
        title: 'Level 1: GitHub Actions Workflows',
        order: 1,
        description: 'YAML workflow triggers, caching npm dependencies, and matrix builds.',
        sublevels: [
          {
            id: 'sub-cld-3-1-1',
            levelId: 'lvl-cld-3-1',
            worldId: 'world-cld-3',
            title: '1.1 Fill in Missing GitHub Actions YAML',
            order: 1,
            summary: 'Complete a CI pipeline YAML workflow configuration.',
            optionalResources: [],
            activities: [
              {
                id: 'act-cld-3-1-1',
                sublevelId: 'sub-cld-3-1-1',
                title: 'CI Workflow Pipeline Precision',
                type: 'fill_code',
                xpReward: 50,
                description: 'Fill in the blanks to trigger a workflow on push to "main" and run the test step.',
                learningObjectives: ['Configure on: push events', 'Define steps with uses and run keys'],
                hints: ['The top trigger keyword is "on:".', 'The command execution keyword is "run:".'],
                fillCodeData: {
                  codeSnippet: `name: Production CI\n{{blank_1}}:\n  push:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - {{blank_2}}: npm test`,
                  blanks: [
                    { id: 'blank_1', placeholder: 'trigger keyword', correctAnswer: 'on' },
                    { id: 'blank_2', placeholder: 'step command keyword', correctAnswer: 'run' },
                  ],
                  explanation: 'Workflows specify triggers under "on:" and execute bash commands under "run:".',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
