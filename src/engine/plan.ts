import { EXERCISES } from './exercises';
import {
  dayName,
  type DayPlan,
  type Equipment,
  type Experience,
  type GeneratedPlan,
  type Goal,
  type PlannedExercise,
  type PlanInput,
  type SessionTemplate,
} from './types';

// ---------------------------------------------------------------------------
// Session templates. Each goal has a 6-session list; the engine slices it to
// the user's training-day count (running always keeps the long run last).
// Lift slots are preference-ordered exercise ids; the engine picks the first
// one the user's equipment supports.
// ---------------------------------------------------------------------------

const RUNNING_SESSIONS: SessionTemplate[] = [
  {
    title: 'Lower Body A — Strength',
    focus: 'Heavy bilateral legs for running power',
    tags: ['legs'],
    warmup: ['Incline treadmill walk — 5 min', 'Ankle dorsiflexion rocks — 2×10 / side', 'Glute bridge — 2×12'],
    liftSlots: [
      ['hack_squat', 'goblet_squat', 'bodyweight_squat'],
      ['romanian_deadlift', 'glute_bridge'],
      ['bulgarian_split_squat', 'walking_lunge'],
      ['seated_leg_curl', 'glute_bridge'],
      ['standing_calf_raise'],
      ['tibialis_raise'],
      ['dead_bug'],
    ],
    cooldown: ['Couch stretch — 2×45s / side', 'Standing calf stretch — 2×30s / side'],
  },
  {
    title: 'Easy Run + Mechanics',
    focus: 'Aerobic base with running drills',
    tags: ['cardio', 'legs'],
    warmup: ['Brisk walk — 5 min', 'A-march — 2×20 m', 'Wall-lean march — 2×10 / side'],
    run: 'Easy run 4–5 km at conversational pace (walk breaks are fine)',
    liftSlots: [['standing_calf_raise'], ['tibialis_raise']],
    cooldown: ['Hip flexor stretch — 2×30s / side', 'Calf stretch — 2×30s / side'],
  },
  {
    title: 'Upper Body',
    focus: 'Push/pull balance for posture and arm drive',
    tags: ['push', 'pull'],
    warmup: ['Rowing machine 5 min (or jumping jacks)', 'Band pull-aparts — 2×15', 'Chin tucks — 2×10'],
    liftSlots: [
      ['incline_db_press', 'floor_press', 'push_up'],
      ['chest_supported_row', 'db_row'],
      ['lat_pulldown', 'db_row'],
      ['seated_db_press', 'pike_push_up'],
      ['cable_lateral_raise', 'db_lateral_raise'],
      ['face_pull', 'band_pull_apart'],
    ],
    cooldown: ['Doorway chest stretch — 2×30s / side'],
  },
  {
    title: 'Easy Run + Hip & Core',
    focus: 'Aerobic base with hip stability',
    tags: ['cardio', 'core'],
    warmup: ['Brisk walk — 5 min', 'Glute bridge — 2×12'],
    run: 'Easy run 5–6 km at conversational pace',
    liftSlots: [['side_plank'], ['bird_dog'], ['pallof_press', 'dead_bug']],
    cooldown: ['Couch stretch — 2×45s / side'],
  },
  {
    title: 'Lower Body B — Running Strength',
    focus: 'Single-leg stability for injury-proof running',
    tags: ['legs'],
    warmup: ['Glute bridge — 2×12', 'Ankle dorsiflexion rocks — 2×10 / side'],
    liftSlots: [
      ['step_up'],
      ['romanian_deadlift', 'glute_bridge'],
      ['reverse_lunge', 'walking_lunge'],
      ['seated_leg_curl', 'glute_bridge'],
      ['standing_calf_raise'],
      ['tibialis_raise'],
      ['plank'],
    ],
    cooldown: ['Hip flexor stretch — 2×30s / side'],
  },
  {
    title: 'Long Easy Run',
    focus: 'Weekly aerobic cornerstone',
    tags: ['cardio'],
    warmup: ['Brisk walk — 5 min'],
    run: 'Long easy run 7–8 km at conversational pace',
    liftSlots: [['band_pull_apart', 'face_pull'], ['dead_bug']],
    cooldown: ['Full-body stretch — 10 min'],
  },
];

const MUSCLE_SESSIONS: SessionTemplate[] = [
  {
    title: 'Push — Chest, Shoulders, Triceps',
    focus: 'Pushing strength and size',
    tags: ['push'],
    warmup: ['Jumping jacks — 2 min', 'Band pull-aparts — 2×15'],
    liftSlots: [
      ['incline_db_press', 'floor_press', 'push_up'],
      ['seated_db_press', 'pike_push_up'],
      ['dips', 'push_up'],
      ['db_lateral_raise', 'cable_lateral_raise'],
    ],
    cooldown: ['Doorway chest stretch — 2×30s / side'],
  },
  {
    title: 'Pull — Back & Biceps',
    focus: 'Pulling strength and size',
    tags: ['pull'],
    warmup: ['Band pull-aparts — 2×15', 'Dead hang — 2×20s (if bar available)'],
    liftSlots: [
      ['lat_pulldown', 'db_row'],
      ['chest_supported_row', 'db_row'],
      ['seated_cable_row', 'db_row'],
      ['face_pull', 'band_pull_apart'],
      ['db_curl'],
    ],
    cooldown: ['Lat doorway stretch — 2×30s / side'],
  },
  {
    title: 'Legs',
    focus: 'Lower-body strength and size',
    tags: ['legs'],
    warmup: ['Bodyweight squats — 2×10', 'Glute bridge — 2×12'],
    liftSlots: [
      ['hack_squat', 'goblet_squat', 'bodyweight_squat'],
      ['romanian_deadlift', 'glute_bridge'],
      ['bulgarian_split_squat', 'walking_lunge'],
      ['seated_leg_curl', 'glute_bridge'],
      ['standing_calf_raise'],
    ],
    cooldown: ['Couch stretch — 2×45s / side'],
  },
  {
    title: 'Push — Volume',
    focus: 'Higher-rep pushing work',
    tags: ['push'],
    warmup: ['Push-ups — 2×8', 'Band pull-aparts — 2×15'],
    liftSlots: [
      ['machine_chest_press', 'floor_press', 'push_up'],
      ['db_lateral_raise', 'cable_lateral_raise'],
      ['dips', 'push_up'],
      ['pike_push_up', 'push_up'],
    ],
    cooldown: ['Doorway chest stretch — 2×30s / side'],
  },
  {
    title: 'Pull — Volume',
    focus: 'Higher-rep pulling work',
    tags: ['pull'],
    warmup: ['Band pull-aparts — 2×15'],
    liftSlots: [
      ['db_row'],
      ['lat_pulldown', 'db_row'],
      ['reverse_pec_deck', 'face_pull', 'band_pull_apart'],
      ['face_pull', 'band_pull_apart'],
      ['db_curl'],
    ],
    cooldown: ['Lat doorway stretch — 2×30s / side'],
  },
  {
    title: 'Legs + Core',
    focus: 'Lower body with trunk finish',
    tags: ['legs', 'core'],
    warmup: ['Bodyweight squats — 2×10', 'Glute bridge — 2×12'],
    liftSlots: [
      ['goblet_squat', 'bodyweight_squat'],
      ['seated_leg_curl', 'glute_bridge'],
      ['step_up'],
      ['standing_calf_raise'],
      ['plank'],
      ['dead_bug'],
    ],
    cooldown: ['Couch stretch — 2×45s / side'],
  },
];

const FAT_LOSS_SESSIONS: SessionTemplate[] = [
  {
    title: 'Full-Body Circuit A',
    focus: 'Strength circuit, short rests',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Jumping jacks — 2 min', 'Bodyweight squats — 2×10'],
    liftSlots: [
      ['goblet_squat', 'bodyweight_squat'],
      ['push_up'],
      ['db_row'],
      ['glute_bridge'],
      ['plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Cardio Intervals',
    focus: 'Engine builder',
    tags: ['cardio'],
    warmup: ['Brisk walk — 5 min'],
    run: 'Walk–run intervals: 3 min jog / 1 min walk × 6 (or 20 min on bike/rower)',
    liftSlots: [['mountain_climber', 'jumping_jack']],
    cooldown: ['Easy walk — 5 min', 'Calf stretch'],
  },
  {
    title: 'Full-Body Circuit B',
    focus: 'Hinge and pull emphasis',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Glute bridge — 2×12', 'Band pull-aparts — 2×15'],
    liftSlots: [
      ['romanian_deadlift', 'glute_bridge'],
      ['incline_db_press', 'floor_press', 'push_up'],
      ['lat_pulldown', 'db_row'],
      ['walking_lunge'],
      ['side_plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Steady Cardio + Core',
    focus: 'Low-intensity fat-burn day',
    tags: ['cardio', 'core'],
    warmup: ['Easy walk — 5 min'],
    run: 'Steady cardio 30 min — easy run, bike, or brisk incline walk',
    liftSlots: [['dead_bug'], ['bird_dog']],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Full-Body Strength',
    focus: 'Heavier compounds, full rests',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Bodyweight squats — 2×10', 'Push-ups — 2×8'],
    liftSlots: [
      ['hack_squat', 'goblet_squat', 'bodyweight_squat'],
      ['db_row'],
      ['seated_db_press', 'pike_push_up', 'push_up'],
      ['step_up'],
      ['farmer_carry', 'plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Active Recovery Cardio',
    focus: 'Move, don’t train',
    tags: ['cardio'],
    warmup: [],
    run: 'Incline walk or easy cycle 30–40 min at a pace you could hold a conversation',
    liftSlots: [],
    cooldown: ['Full-body stretch — 10 min'],
  },
];

const GENERAL_SESSIONS: SessionTemplate[] = [
  {
    title: 'Full Body A',
    focus: 'Foundational strength',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Jumping jacks — 2 min', 'Bodyweight squats — 2×10'],
    liftSlots: [
      ['goblet_squat', 'bodyweight_squat'],
      ['push_up'],
      ['db_row'],
      ['glute_bridge'],
      ['plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Cardio',
    focus: 'Heart and lungs',
    tags: ['cardio'],
    warmup: ['Brisk walk — 5 min'],
    run: 'Easy run, bike, or brisk walk — 20–30 min',
    liftSlots: [],
    cooldown: ['Easy walk — 5 min'],
  },
  {
    title: 'Full Body B',
    focus: 'Hinge and overhead',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Glute bridge — 2×12', 'Band pull-aparts — 2×15'],
    liftSlots: [
      ['romanian_deadlift', 'glute_bridge'],
      ['seated_db_press', 'pike_push_up', 'push_up'],
      ['lat_pulldown', 'db_row'],
      ['walking_lunge'],
      ['side_plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Cardio + Core',
    focus: 'Engine plus trunk',
    tags: ['cardio', 'core'],
    warmup: ['Easy walk — 5 min'],
    run: 'Bike, rower, or walk — 20 min, steady',
    liftSlots: [['dead_bug'], ['bird_dog']],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Full Body C',
    focus: 'Unilateral and carry',
    tags: ['legs', 'push', 'pull'],
    warmup: ['Bodyweight squats — 2×10', 'Push-ups — 2×8'],
    liftSlots: [
      ['bulgarian_split_squat', 'walking_lunge'],
      ['incline_db_press', 'floor_press', 'push_up'],
      ['seated_cable_row', 'db_row'],
      ['step_up'],
      ['farmer_carry', 'plank'],
    ],
    cooldown: ['Full-body stretch — 8 min'],
  },
  {
    title: 'Long Walk',
    focus: 'Easy aerobic volume',
    tags: ['cardio'],
    warmup: [],
    run: 'Long walk 45–60 min, relaxed pace',
    liftSlots: [],
    cooldown: ['Full-body stretch — 10 min'],
  },
];

const GOAL_SESSIONS: Record<Goal, SessionTemplate[]> = {
  running: RUNNING_SESSIONS,
  muscle: MUSCLE_SESSIONS,
  fat_loss: FAT_LOSS_SESSIONS,
  general: GENERAL_SESSIONS,
};

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

/** Equipment hierarchy: gym can do everything, dumbbells cover home kit,
 *  bodyweight needs no gear. */
function equipmentAvailable(ex: (typeof EXERCISES)[string], gear: Equipment): boolean {
  return ex.equipment.includes(gear);
}

/** Rest-day placement among Mon–Sat, spread out (Wed first, then Sat, ...). */
const REST_PRIORITY = [2, 5, 1, 4, 0, 3]; // Wed, Sat, Tue, Fri, Mon, Thu

function pickSessions(goal: Goal, trainingDays: number): SessionTemplate[] {
  const all = GOAL_SESSIONS[goal];
  if (goal === 'running') {
    // Always keep the long run last; take the first N-1 sessions before it.
    if (trainingDays >= all.length) return all.slice();
    return [...all.slice(0, trainingDays - 1), all[all.length - 1]];
  }
  return all.slice(0, trainingDays);
}

function resolveSlot(
  slot: string[],
  gear: Equipment,
  experience: Experience,
): PlannedExercise | null {
  for (const id of slot) {
    const ex = EXERCISES[id];
    if (!ex) continue;
    if (!equipmentAvailable(ex, gear)) continue;
    if (ex.level === 'intermediate' && experience === 'beginner') continue;
    return {
      name: ex.name,
      category: ex.category,
      sets: experience === 'beginner' ? ex.sets[0] : ex.sets[1],
      reps: ex.reps,
      notes: ex.notes,
    };
  }
  return null;
}

function estimateMinutes(t: SessionTemplate, liftCount: number): number {
  const warm = t.warmup.length > 0 ? 10 : 0;
  const run = t.run ? 30 : 0;
  const lifts = liftCount * 6;
  const cool = 5;
  const total = warm + run + lifts + cool;
  return Math.min(75, Math.max(45, Math.round(total / 5) * 5));
}

const OVERLOAD_NOTES: Record<Goal, string> = {
  running:
    'Progressive overload for runners: add ~10% to the long run every 2–3 weeks, keep easy days genuinely easy, and never increase distance and intensity in the same week.',
  muscle:
    'Progressive overload: when you hit the top of the rep range on all sets of a lift, add a small amount of weight next session. Track every workout — if it is not written down, it did not happen.',
  fat_loss:
    'Progressive overload still applies: add reps, rounds, or a little load each week. Pair training with a modest calorie deficit and 8,000–10,000 steps a day — the kitchen decides fat loss, the gym decides what you keep.',
  general:
    'Progressive overload: each week, add one rep per set or a small load increase on one or two movements. Consistency beats intensity — the best plan is the one you repeat.',
};

export function generatePlan(raw: PlanInput): GeneratedPlan {
  const daysPerWeek = Math.min(6, Math.max(2, Math.round(raw.daysPerWeek)));
  const limitations = raw.limitations.trim();

  // Rest rule: at least 1 rest day per 3 training days, Sunday always rests.
  const restNeeded = Math.ceil(daysPerWeek / 3);
  const restDaysTotal = Math.max(7 - daysPerWeek, restNeeded);
  const trainingDays = 7 - restDaysTotal;
  const restDaysMonSat = restDaysTotal - 1; // Sunday is the fixed rest day

  const sessions = pickSessions(raw.goal, trainingDays);
  const restSet = new Set(REST_PRIORITY.slice(0, restDaysMonSat));

  const days: DayPlan[] = [];
  let s = 0;
  for (let i = 0; i < 6; i++) {
    if (restSet.has(i)) {
      days.push({ day: dayName(i), rest: true });
      continue;
    }
    const t = sessions[s++];
    const exercises = t.liftSlots
      .map((slot) => resolveSlot(slot, raw.equipment, raw.experience))
      .filter((e): e is PlannedExercise => e !== null);
    days.push({
      day: dayName(i),
      rest: false,
      title: t.title,
      focus: t.focus,
      warmup: t.warmup,
      run: t.run,
      exercises,
      cooldown: t.cooldown,
      minutes: estimateMinutes(t, exercises.length),
    });
  }
  days.push({ day: dayName(6), rest: true }); // Sunday: complete rest

  const limitationNote = limitations
    ? `You noted: "${limitations}". This plan is general fitness information — it is not adjusted for your limitation. Check with a qualified coach or physiotherapist before training around pain or an injury.`
    : undefined;

  return {
    input: { ...raw, daysPerWeek, limitations },
    trainingDays,
    restDays: restDaysTotal,
    days,
    overloadNote: OVERLOAD_NOTES[raw.goal],
    limitationNote,
  };
}
