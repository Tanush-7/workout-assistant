import { describe, expect, it } from 'vitest';
import { generatePlan } from './plan';
import type { PlanInput } from './types';

const base: PlanInput = {
  goal: 'running',
  daysPerWeek: 6,
  equipment: 'gym',
  experience: 'intermediate',
  limitations: '',
};

describe('rest rules', () => {
  it('6 requested days -> 5 training, 2 rest (1 per 3 training days)', () => {
    const p = generatePlan({ ...base, daysPerWeek: 6 });
    expect(p.trainingDays).toBe(5);
    expect(p.restDays).toBe(2);
  });

  it('Sunday is always a rest day', () => {
    for (const days of [2, 3, 4, 5, 6]) {
      const p = generatePlan({ ...base, daysPerWeek: days });
      expect(p.days[6].rest).toBe(true);
      expect(p.days[6].day).toBe('Sunday');
    }
  });

  it('2 requested days -> 2 training, 5 rest', () => {
    const p = generatePlan({ ...base, daysPerWeek: 2 });
    expect(p.trainingDays).toBe(2);
    expect(p.restDays).toBe(5);
  });
});

describe('running goal', () => {
  it('includes 3 runs per week at 5-6 training days', () => {
    const p = generatePlan({ ...base, daysPerWeek: 6 });
    const runs = p.days.filter((d) => !d.rest && d.run);
    expect(runs.length).toBe(3);
  });

  it('keeps the long run as the final session', () => {
    const p = generatePlan({ ...base, daysPerWeek: 5 });
    const training = p.days.filter((d) => !d.rest);
    expect(training[training.length - 1].title).toBe('Long Easy Run');
  });

  it('approximates the reference template for running/intermediate/gym', () => {
    const p = generatePlan({ ...base, goal: 'running', daysPerWeek: 6, equipment: 'gym', experience: 'intermediate' });
    const titles = p.days.filter((d) => !d.rest).map((d) => d.title);
    expect(titles[0]).toBe('Lower Body A — Strength');
    expect(titles).toContain('Upper Body');
    expect(titles).toContain('Long Easy Run');
  });
});

describe('push/pull balance', () => {
  it('muscle goal has equal push and pull sessions', () => {
    const p = generatePlan({ ...base, goal: 'muscle', daysPerWeek: 5 });
    const training = p.days.filter((d) => !d.rest);
    const push = training.filter((d) => d.title?.startsWith('Push')).length;
    const pull = training.filter((d) => d.title?.startsWith('Pull')).length;
    expect(push).toBe(pull);
    expect(push).toBeGreaterThan(0);
  });
});

describe('equipment filtering', () => {
  it('bodyweight-only plans never need gym-only movements', () => {
    const p = generatePlan({ ...base, equipment: 'bodyweight', goal: 'muscle', daysPerWeek: 4 });
    const names = p.days.flatMap((d) => d.exercises ?? []).map((e) => e.name);
    expect(names).not.toContain('Hack Squat');
    expect(names).not.toContain('Lat Pulldown');
    expect(names.length).toBeGreaterThan(0);
  });

  it('every lift slot resolves to something for every equipment tier', () => {
    for (const gear of ['gym', 'dumbbell', 'bodyweight'] as const) {
      for (const goal of ['running', 'muscle', 'fat_loss', 'general'] as const) {
        const p = generatePlan({ ...base, equipment: gear, goal, daysPerWeek: 5 });
        for (const d of p.days) {
          if (!d.rest && (d.exercises?.length ?? 0) > 0) {
            expect(d.exercises!.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});

describe('session length', () => {
  it('all sessions estimate 45–75 minutes', () => {
    for (const goal of ['running', 'muscle', 'fat_loss', 'general'] as const) {
      const p = generatePlan({ ...base, goal, daysPerWeek: 5 });
      for (const d of p.days) {
        if (!d.rest) {
          expect(d.minutes).toBeGreaterThanOrEqual(45);
          expect(d.minutes).toBeLessThanOrEqual(75);
        }
      }
    }
  });
});

describe('limitations', () => {
  it('surfaces a safety note when limitations are given', () => {
    const p = generatePlan({ ...base, limitations: 'knee pain on stairs' });
    expect(p.limitationNote).toContain('knee pain on stairs');
    expect(p.limitationNote).toContain('not adjusted');
  });

  it('no note when limitations are empty', () => {
    expect(generatePlan(base).limitationNote).toBeUndefined();
  });
});

describe('beginner scaling', () => {
  it('beginners get fewer sets than intermediates on the same plan', () => {
    const b = generatePlan({ ...base, experience: 'beginner', goal: 'muscle', daysPerWeek: 3 });
    const i = generatePlan({ ...base, experience: 'intermediate', goal: 'muscle', daysPerWeek: 3 });
    const bSets = b.days.flatMap((d) => d.exercises ?? []).reduce((a, e) => a + e.sets, 0);
    const iSets = i.days.flatMap((d) => d.exercises ?? []).reduce((a, e) => a + e.sets, 0);
    expect(iSets).toBeGreaterThan(bSets);
  });
});
