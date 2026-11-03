import type { Exercise } from './types';

// Exercise database: ~45 movements across push / pull / legs / core / cardio.
// `equipment` lists every tier that can perform the movement, so the engine
// can always fall back to something the user has. `level` is the minimum
// experience; intermediates may use any exercise.

export const EXERCISES: Record<string, Exercise> = {
  // ---------------- PUSH ----------------
  push_up: {
    id: 'push_up', name: 'Push-up', category: 'push',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '8–15',
    notes: 'Elevate hands on a bench to make it easier.',
  },
  incline_db_press: {
    id: 'incline_db_press', name: 'Incline Dumbbell Press', category: 'push',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '8–10',
  },
  floor_press: {
    id: 'floor_press', name: 'Dumbbell Floor Press', category: 'push',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '8–12',
    notes: 'No bench needed — the home alternative to bench pressing.',
  },
  machine_chest_press: {
    id: 'machine_chest_press', name: 'Machine Chest Press', category: 'push',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '10–12',
  },
  seated_db_press: {
    id: 'seated_db_press', name: 'Seated Dumbbell Shoulder Press', category: 'push',
    equipment: ['gym', 'dumbbell'], level: 'intermediate',
    sets: [2, 3], reps: '8–10',
  },
  pike_push_up: {
    id: 'pike_push_up', name: 'Pike Push-up', category: 'push',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'intermediate',
    sets: [2, 3], reps: '8–12',
  },
  dips: {
    id: 'dips', name: 'Bench Dips', category: 'push',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'intermediate',
    sets: [2, 3], reps: '8–12',
    notes: 'Use a sturdy chair or bench.',
  },
  db_lateral_raise: {
    id: 'db_lateral_raise', name: 'Dumbbell Lateral Raise', category: 'push',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },
  cable_lateral_raise: {
    id: 'cable_lateral_raise', name: 'Cable Lateral Raise', category: 'push',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },

  // ---------------- PULL ----------------
  db_row: {
    id: 'db_row', name: 'One-Arm Dumbbell Row', category: 'pull',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '8–10 / side',
  },
  chest_supported_row: {
    id: 'chest_supported_row', name: 'Chest-Supported Row', category: 'pull',
    equipment: ['gym'], level: 'intermediate',
    sets: [2, 4], reps: '8–10',
  },
  lat_pulldown: {
    id: 'lat_pulldown', name: 'Lat Pulldown', category: 'pull',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '8–10',
  },
  seated_cable_row: {
    id: 'seated_cable_row', name: 'Seated Cable Row', category: 'pull',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '10–12',
  },
  face_pull: {
    id: 'face_pull', name: 'Face Pull', category: 'pull',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
    notes: 'Great for posture — pull to forehead height.',
  },
  band_pull_apart: {
    id: 'band_pull_apart', name: 'Band Pull-Apart', category: 'pull',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '15–20',
    notes: 'Needs a resistance band.',
  },
  reverse_pec_deck: {
    id: 'reverse_pec_deck', name: 'Reverse Pec Deck', category: 'pull',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },
  pull_up_assisted: {
    id: 'pull_up_assisted', name: 'Assisted Pull-up', category: 'pull',
    equipment: ['gym'], level: 'intermediate',
    sets: [2, 3], reps: '5–8',
    notes: 'Use the assisted machine or a band.',
  },
  db_curl: {
    id: 'db_curl', name: 'Dumbbell Biceps Curl', category: 'pull',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '10–12',
  },

  // ---------------- LEGS ----------------
  bodyweight_squat: {
    id: 'bodyweight_squat', name: 'Bodyweight Squat', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },
  goblet_squat: {
    id: 'goblet_squat', name: 'Goblet Squat', category: 'legs',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '8–12',
  },
  hack_squat: {
    id: 'hack_squat', name: 'Hack Squat', category: 'legs',
    equipment: ['gym'], level: 'intermediate',
    sets: [2, 3], reps: '6–8',
  },
  romanian_deadlift: {
    id: 'romanian_deadlift', name: 'Romanian Deadlift', category: 'legs',
    equipment: ['gym', 'dumbbell'], level: 'intermediate',
    sets: [2, 3], reps: '8–10',
    notes: 'Hinge at the hips; keep the back flat.',
  },
  bulgarian_split_squat: {
    id: 'bulgarian_split_squat', name: 'Bulgarian Split Squat', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'intermediate',
    sets: [2, 3], reps: '8 / leg',
    notes: 'Rear foot on a bench or chair.',
  },
  walking_lunge: {
    id: 'walking_lunge', name: 'Walking Lunge', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '10 / leg',
  },
  reverse_lunge: {
    id: 'reverse_lunge', name: 'Reverse Lunge', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 2], reps: '8 / leg',
  },
  step_up: {
    id: 'step_up', name: 'Step-up', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '10 / leg',
    notes: 'Use a bench, box, or sturdy step.',
  },
  seated_leg_curl: {
    id: 'seated_leg_curl', name: 'Seated Leg Curl', category: 'legs',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 3], reps: '10–12',
  },
  standing_calf_raise: {
    id: 'standing_calf_raise', name: 'Standing Calf Raise', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },
  tibialis_raise: {
    id: 'tibialis_raise', name: 'Tibialis Raise', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '15–20',
    notes: 'Toes toward shin against a wall — protects the shins for running.',
  },
  glute_bridge: {
    id: 'glute_bridge', name: 'Glute Bridge', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '12–15',
  },
  wall_sit: {
    id: 'wall_sit', name: 'Wall Sit', category: 'legs',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '30–45 sec',
  },

  // ---------------- CORE ----------------
  dead_bug: {
    id: 'dead_bug', name: 'Dead Bug', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '10 / side',
    notes: 'Keep the lower back pressed into the floor.',
  },
  plank: {
    id: 'plank', name: 'Plank', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '30–60 sec',
  },
  side_plank: {
    id: 'side_plank', name: 'Side Plank', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 2], reps: '30–45 sec / side',
  },
  bird_dog: {
    id: 'bird_dog', name: 'Bird Dog', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 2], reps: '10 / side',
  },
  pallof_press: {
    id: 'pallof_press', name: 'Pallof Press', category: 'core',
    equipment: ['gym'], level: 'beginner',
    sets: [2, 2], reps: '12 / side',
    notes: 'Needs a cable machine or anchored band.',
  },
  mountain_climber: {
    id: 'mountain_climber', name: 'Mountain Climbers', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'intermediate',
    sets: [2, 3], reps: '30 sec',
  },
  hollow_hold: {
    id: 'hollow_hold', name: 'Hollow Hold', category: 'core',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'intermediate',
    sets: [2, 3], reps: '20–30 sec',
  },

  // ---------------- CARDIO ----------------
  easy_run: {
    id: 'easy_run', name: 'Easy Run', category: 'cardio',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [1, 1], reps: 'at conversational pace',
  },
  brisk_walk: {
    id: 'brisk_walk', name: 'Brisk Walk', category: 'cardio',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [1, 1], reps: '20–30 min',
  },
  incline_walk: {
    id: 'incline_walk', name: 'Incline Treadmill Walk', category: 'cardio',
    equipment: ['gym'], level: 'beginner',
    sets: [1, 1], reps: '20–30 min',
  },
  row_erg: {
    id: 'row_erg', name: 'Rowing Machine', category: 'cardio',
    equipment: ['gym'], level: 'beginner',
    sets: [1, 1], reps: '15–20 min',
  },
  stationary_bike: {
    id: 'stationary_bike', name: 'Stationary Bike', category: 'cardio',
    equipment: ['gym'], level: 'beginner',
    sets: [1, 1], reps: '20–30 min',
  },
  jumping_jack: {
    id: 'jumping_jack', name: 'Jumping Jacks', category: 'cardio',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [2, 3], reps: '30 sec',
  },
  walk_run_intervals: {
    id: 'walk_run_intervals', name: 'Walk–Run Intervals', category: 'cardio',
    equipment: ['gym', 'dumbbell', 'bodyweight'], level: 'beginner',
    sets: [1, 1], reps: '3 min jog / 1 min walk × 6',
    notes: 'The classic beginner running progression.',
  },
  farmer_carry: {
    id: 'farmer_carry', name: 'Farmer Carry', category: 'cardio',
    equipment: ['gym', 'dumbbell'], level: 'beginner',
    sets: [2, 3], reps: '30–40 m',
    notes: 'Heavy dumbbells, tall posture, steady walk.',
  },
};

export const exerciseList = Object.values(EXERCISES);
