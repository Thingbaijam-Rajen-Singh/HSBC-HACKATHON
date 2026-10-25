export type RoadmapMode = 'normal' | 'advanced' | 'smart' | 'quick_build';

export type ActivityType =
  | 'interactive'
  | 'quiz'
  | 'fill_code'
  | 'code_puzzle'
  | 'bug_hunt'
  | 'build_challenge'
  | 'predict_output'
  | 'boss_mission';

export interface UserProfile {
  userId: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  bio?: string;
  careerGoal?: string;
  selectedSkill?: string;
  roadmapMode?: RoadmapMode;
  totalXp: number;
  level: number;
  isPublicPortfolio: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SublevelProgress {
  userId: string;
  sublevelId: string;
  worldId: string;
  levelId: string;
  completed: boolean;
  stars: number; // 0 - 3
  xpEarned: number;
  attempts: number;
  completedAt?: string;
}

export interface ProjectSubmission {
  userId: string;
  projectId: string;
  title: string;
  category: string;
  status: 'not_started' | 'in_progress' | 'completed';
  githubUrl?: string;
  liveUrl?: string;
  notes?: string;
  featuredInPassport: boolean;
  updatedAt?: string;
}

export interface SavedCourse {
  userId: string;
  courseId: string;
  title: string;
  provider: string;
  url: string;
  isFree: boolean;
  savedAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'documentation' | 'article' | 'interactive' | 'course';
  provider: string;
  url: string;
  isFree: boolean;
  price?: string;
  duration?: string;
}

// Activity specific schemas
export interface InteractiveActivityData {
  initialCode: string;
  language: 'html' | 'css' | 'javascript';
  targetInstruction: string;
  solutionHint: string;
  validationRegex?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'true_false';
  options: string[];
  correctAnswerIndices: number[];
  explanation: string;
}

export interface FillCodeBlank {
  id: string;
  placeholder: string;
  correctAnswer: string;
  caseSensitive?: boolean;
}

export interface FillCodeActivityData {
  codeSnippet: string; // contains {{blank_1}}, {{blank_2}}
  blanks: FillCodeBlank[];
  explanation: string;
}

export interface CodePuzzlePiece {
  id: string;
  text: string;
}

export interface CodePuzzleActivityData {
  instructions: string;
  pieces: CodePuzzlePiece[];
  correctOrder: string[]; // array of piece ids
  explanation: string;
}

export interface BugHuntActivityData {
  starterCode: string;
  brokenDescription: string;
  expectedBehavior: string;
  testFunction: string; // JavaScript assertion or check code string
  hints: string[];
}

export interface BuildChallengeActivityData {
  challengePrompt: string;
  starterCode: string;
  requirements: string[];
  testAssertions: string[];
}

export interface PredictOutputActivityData {
  codeSnippet: string;
  options: string[];
  correctOptionIndex: number;
  executionExplanation: string;
}

export interface BossObjective {
  id: string;
  description: string;
  checkHint: string;
}

export interface BossMissionActivityData {
  bossName: string;
  bossTitle: string;
  bossHealth: number;
  scenarioDescription: string;
  starterCode: string;
  objectives: BossObjective[];
  badgeName: string;
  badgeIcon: string;
}

export interface ActivityDefinition {
  id: string;
  sublevelId: string;
  title: string;
  type: ActivityType;
  xpReward: number;
  description: string;
  learningObjectives: string[];
  hints: string[];
  // Data payloads corresponding to type
  interactiveData?: InteractiveActivityData;
  quizData?: QuizQuestion[];
  fillCodeData?: FillCodeActivityData;
  codePuzzleData?: CodePuzzleActivityData;
  bugHuntData?: BugHuntActivityData;
  buildChallengeData?: BuildChallengeActivityData;
  predictOutputData?: PredictOutputActivityData;
  bossMissionData?: BossMissionActivityData;
}

export interface Sublevel {
  id: string;
  levelId: string;
  worldId: string;
  title: string;
  order: number;
  summary: string;
  activities: ActivityDefinition[];
  optionalResources: LearningResource[];
  isLockedDefault?: boolean;
}

export interface Level {
  id: string;
  worldId: string;
  title: string;
  order: number;
  description: string;
  sublevels: Sublevel[];
}

export interface World {
  id: string;
  title: string;
  number: number;
  shortDesc: string;
  color: string;
  levels: Level[];
}

export interface SkillDefinition {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  prerequisites: string[];
  estimatedHours: number;
  iconName: string;
  color: string;
  worldsCount: number;
}

export interface ProjectDefinition {
  id: string;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'Backend & Database' | 'Integrated Web Development';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDesc: string;
  problem: string;
  requiredFeatures: string[];
  suggestedStack: string[];
  expectedDeliverables: string[];
  learningReferences: { title: string; url: string }[];
}

export interface CourseItem {
  id: string;
  title: string;
  provider: string;
  description: string;
  skill: string;
  isFree: boolean;
  price?: string;
  currency?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: string;
  duration: string;
  rating?: number;
  reviewCount?: number;
  url: string;
  isSampleData: boolean;
  lastChecked: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Fellowship' | 'Open Source' | 'Competition' | 'Community Project';
  location: string;
  stipend?: string;
  matchReason: string;
  matchedSkills: string[];
  deadline: string;
  applyUrl: string;
  isSampleData: boolean;
}

export interface PlacementQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
}
