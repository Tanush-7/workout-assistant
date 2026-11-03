// Core types for the workout plan engine.

export type Goal = 'fat_loss' | 'muscle' | 'running' | 'general';
export type Equipment = 'gym' | 'dumbbell' | 'bodyweight';
export type Experience = 'beginner' | 'intermediate';
export type Category = 'push' | 'pull' | 'legs' | 'core' | 'cardio';

export interface PlanInput {
  goal: Goal;
  /** Training days requested per week (2-6). Engine enforces rest rules. */
  daysPerWeek: number;
  equipment: Equipment;
  experience: Experience;
  /** Free text, may be empty. Surfaced back as a safety note, never diagnosed. */
  limitations: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: Category;
  /** Every equipment tier that can perform this exercise. */
  equipment: Equipment[];
  /** Minimum experience level. */
  level: Experience;
  /** [beginner sets, intermediate sets] */
  sets: [number, number];
  reps: string;
  notes?: string;
}

export interface PlannedExercise {
  name: string;
  category: Category;
  sets: number;
  reps: string;
  notes?: string;
}

/** A session template: ordered lift slots, each a preference-ordered list of
 *  exercise ids. The engine picks the first id the user's equipment supports. */
export interface SessionTemplate {
  title: string;
  focus: string;
  tags: Category[];
  warmup: string[];
  /** Optional run block (for running/cardio sessions). */
  run?: string;
  liftSlots: string[][];
  cooldown: string[];
}

export interface DayPlan {
  day: string;
  rest: boolean;
  title?: string;
  focus?: string;
  warmup?: string[];
  run?: string;
  exercises?: PlannedExercise[];
  cooldown?: string[];
  /** Estimated session length in minutes. */
  minutes?: number;
}

export interface GeneratedPlan {
  input: PlanInput;
  trainingDays: number;
  restDays: number;
  days: DayPlan[];
  overloadNote: string;
  limitationNote?: string;
}

export const GOAL_LABELS: Record<Goal, string> = {
  fat_loss: 'Fat loss',
  muscle: 'Muscle gain',
  running: 'Running',
  general: 'General fitness',
};

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  gym: 'Full gym',
  dumbbell: 'Home dumbbells',
  bodyweight: 'Bodyweight only',
};

export const EXPERIENCE_LABELS: Record<Experience, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
};

const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function dayName(index: number): string {
  return DAY_NAMES[index];
}
