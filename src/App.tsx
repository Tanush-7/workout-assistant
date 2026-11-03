import { useState } from 'react';
import { generatePlan } from './engine/plan';
import {
  EQUIPMENT_LABELS,
  EXPERIENCE_LABELS,
  GOAL_LABELS,
  type Equipment,
  type Experience,
  type GeneratedPlan,
  type Goal,
} from './engine/types';

const GOALS: Goal[] = ['fat_loss', 'muscle', 'running', 'general'];
const EQUIPMENTS: Equipment[] = ['gym', 'dumbbell', 'bodyweight'];
const EXPERIENCES: Experience[] = ['beginner', 'intermediate'];

const GOAL_HINTS: Record<Goal, string> = {
  fat_loss: 'Lose weight, keep muscle',
  muscle: 'Build size and strength',
  running: 'Run farther, stay injury-free',
  general: 'Look, feel, and move better',
};

function OptionCard({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition ${
        selected
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className={`font-semibold ${selected ? 'text-emerald-900' : 'text-slate-800'}`}>{title}</div>
      {hint && <div className="mt-1 text-sm text-slate-500">{hint}</div>}
    </button>
  );
}

function Question({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-slate-900">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  const [goal, setGoal] = useState<Goal>('general');
  const [days, setDays] = useState(4);
  const [equipment, setEquipment] = useState<Equipment>('gym');
  const [experience, setExperience] = useState<Experience>('beginner');
  const [limitations, setLimitations] = useState('');
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(null);

  const build = () => {
    const p = generatePlan({ goal, daysPerWeek: days, equipment, experience, limitations });
    setPlan(p);
    const firstTraining = p.days.findIndex((d) => !d.rest);
    setOpenDay(firstTraining >= 0 ? firstTraining : null);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen text-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Workout Assistant</h1>
          <p className="mt-2 text-slate-500">
            {plan ? 'Your week, planned.' : 'Answer 5 questions. Get a weekly plan.'}
          </p>
        </header>

        {plan === null ? (
          <>
            <Question n="1" title="What's the goal?">
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <OptionCard
                    key={g}
                    selected={goal === g}
                    onClick={() => setGoal(g)}
                    title={GOAL_LABELS[g]}
                    hint={GOAL_HINTS[g]}
                  />
                ))}
              </div>
            </Question>

            <Question n="2" title="How many days per week can you train?">
              <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4">
                <button
                  type="button"
                  aria-label="Fewer days"
                  onClick={() => setDays((d) => Math.max(2, d - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-700 hover:bg-slate-200"
                >
                  −
                </button>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-extrabold text-slate-900">{days}</div>
                  <div className="text-sm text-slate-500">days / week</div>
                </div>
                <button
                  type="button"
                  aria-label="More days"
                  onClick={() => setDays((d) => Math.min(6, d + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-700 hover:bg-slate-200"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                The engine adds rest days automatically — at least 1 per 3 training days, Sunday always off.
              </p>
            </Question>

            <Question n="3" title="What equipment do you have?">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {EQUIPMENTS.map((e) => (
                  <OptionCard
                    key={e}
                    selected={equipment === e}
                    onClick={() => setEquipment(e)}
                    title={EQUIPMENT_LABELS[e]}
                  />
                ))}
              </div>
            </Question>

            <Question n="4" title="How experienced are you?">
              <div className="grid grid-cols-2 gap-3">
                {EXPERIENCES.map((e) => (
                  <OptionCard
                    key={e}
                    selected={experience === e}
                    onClick={() => setExperience(e)}
                    title={EXPERIENCE_LABELS[e]}
                    hint={e === 'beginner' ? 'Under a year of consistent training' : 'A year or more, comfortable with compounds'}
                  />
                ))}
              </div>
            </Question>

            <Question n="5" title="Any limitations? (optional)">
              <textarea
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                rows={2}
                placeholder="e.g. sore left knee, no jumping, bad shoulder…"
                className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
              <p className="mt-2 text-sm text-slate-500">
                Noted for safety — the plan is not adjusted for it. See the disclaimer below.
              </p>
            </Question>

            <button
              type="button"
              onClick={build}
              className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white shadow hover:bg-emerald-700"
            >
              Build my plan
            </button>

            <p className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
              <strong className="text-slate-800">Disclaimer:</strong> general fitness information only —
              not medical advice. If you have an injury, pain, or a medical condition, consult a qualified
              professional before training.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {[GOAL_LABELS[plan.input.goal], `${plan.trainingDays} days/wk`, EQUIPMENT_LABELS[plan.input.equipment], EXPERIENCE_LABELS[plan.input.experience]].map(
                (chip) => (
                  <span key={chip} className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
                    {chip}
                  </span>
                ),
              )}
              <button
                type="button"
                onClick={() => setPlan(null)}
                className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-300"
              >
                Edit answers
              </button>
            </div>

            {plan.limitationNote && (
              <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                {plan.limitationNote}
              </div>
            )}

            <div className="space-y-3">
              {plan.days.map((d, i) =>
                d.rest ? (
                  <div key={d.day} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-500">{d.day}</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                        REST
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">Recover. Walk if you feel like it.</p>
                  </div>
                ) : (
                  <div key={d.day} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenDay(openDay === i ? null : i)}
                      className="flex w-full items-center justify-between p-4 text-left"
                    >
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                          {d.day} · ≈{d.minutes} min
                        </div>
                        <div className="font-bold text-slate-900">{d.title}</div>
                        <div className="text-sm text-slate-500">{d.focus}</div>
                      </div>
                      <span className="text-xl text-slate-400">{openDay === i ? '−' : '+'}</span>
                    </button>
                    {openDay === i && (
                      <div className="border-t border-slate-100 p-4 pt-3 text-sm">
                        {d.warmup && d.warmup.length > 0 && (
                          <div className="mb-3">
                            <div className="mb-1 font-semibold text-slate-700">Warm-up</div>
                            <ul className="list-disc space-y-1 pl-5 text-slate-600">
                              {d.warmup.map((w) => (
                                <li key={w}>{w}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {d.run && (
                          <div className="mb-3 rounded-lg bg-sky-50 p-3 font-medium text-sky-900">{d.run}</div>
                        )}
                        {d.exercises && d.exercises.length > 0 && (
                          <div className="mb-3">
                            <div className="mb-1 font-semibold text-slate-700">Main work</div>
                            <ul className="space-y-2">
                              {d.exercises.map((e) => (
                                <li key={e.name} className="rounded-lg bg-slate-50 p-2.5">
                                  <div className="flex items-baseline justify-between gap-2">
                                    <span className="font-medium text-slate-800">{e.name}</span>
                                    <span className="shrink-0 font-mono text-sm font-semibold text-emerald-700">
                                      {e.sets} × {e.reps}
                                    </span>
                                  </div>
                                  {e.notes && <div className="mt-1 text-xs text-slate-500">{e.notes}</div>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {d.cooldown && d.cooldown.length > 0 && (
                          <div>
                            <div className="mb-1 font-semibold text-slate-700">Cool-down</div>
                            <ul className="list-disc space-y-1 pl-5 text-slate-600">
                              {d.cooldown.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <div className="mb-1 font-bold">Progressive overload</div>
              {plan.overloadNote}
            </div>

            <p className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
              <strong className="text-slate-800">Disclaimer:</strong> general fitness information only —
              not medical advice. If you have an injury, pain, or a medical condition, consult a qualified
              professional before training.
            </p>

            <button
              type="button"
              onClick={() => {
                setPlan(null);
                window.scrollTo({ top: 0 });
              }}
              className="mt-4 w-full rounded-xl border-2 border-slate-200 bg-white py-3 font-bold text-slate-700 hover:border-slate-300"
            >
              Start over
            </button>
          </>
        )}

        <footer className="mt-10 text-center text-xs text-slate-400">
          Workout Assistant · Build #2 · Built in public
        </footer>
      </div>
    </div>
  );
}
