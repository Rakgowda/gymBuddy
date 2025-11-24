'use client';

import { useMemo, useState } from 'react';

type Gender = 'male' | 'female';

type ActivityLevel = {
  id: string;
  label: string;
  multiplier: number;
  description: string;
};

const activityLevels: ActivityLevel[] = [
  { id: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
  { id: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
  { id: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
  { id: 'active', label: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
  { id: 'extreme', label: 'Athlete', multiplier: 1.9, description: 'Physical job or 2x training' },
];

const calculateBmr = (weightKg: number, heightCm: number, age: number, gender: Gender) => {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};

export default function BmrPage() {
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [activity, setActivity] = useState<ActivityLevel>(activityLevels[1]);

  const parsedWeight = parseFloat(weightKg);
  const parsedHeight = parseFloat(heightCm);
  const parsedAge = parseInt(age, 10);

  const bmr = useMemo(() => {
    if (parsedWeight > 0 && parsedHeight > 0 && parsedAge > 0) {
      return calculateBmr(parsedWeight, parsedHeight, parsedAge, gender);
    }
    return null;
  }, [parsedWeight, parsedHeight, parsedAge, gender]);

  const maintenanceCalories = useMemo(() => {
    if (!bmr) return null;
    return bmr * activity.multiplier;
  }, [bmr, activity]);

  const goalRanges = useMemo(() => {
    if (!maintenanceCalories) return null;
    return {
      fatLoss: {
        label: 'Fat Loss (15% deficit)',
        value: maintenanceCalories * 0.85,
      },
      maintenance: {
        label: 'Maintenance',
        value: maintenanceCalories,
      },
      muscleGain: {
        label: 'Muscle Gain (10% surplus)',
        value: maintenanceCalories * 1.1,
      },
    };
  }, [maintenanceCalories]);

  const inputHelper =
    parsedWeight > 0 && parsedHeight > 0 && parsedAge > 0
      ? null
      : 'Enter your weight (kg), height (cm), and age to see results.';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          BMR Calculator
        </h1>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Estimate your Basal Metabolic Rate (BMR)—the calories you burn at rest—and translate it
          into daily calorie targets using activity multipliers.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Your Details</h2>
            <div className="space-y-5">
              <label className="block">
                <span className="text-sm text-gray-400">Weight (kg)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. 72"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-400">Height (cm)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. 178"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-400">Age</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <div>
                <span className="text-sm text-gray-400 block mb-2">Gender</span>
                <div className="grid grid-cols-2 gap-3">
                  {(['male', 'female'] as Gender[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rounded-lg border p-3 transition-colors ${
                        gender === option
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500'
                      }`}
                      onClick={() => setGender(option)}
                    >
                      {option === 'male' ? 'Male' : 'Female'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-400 block mb-2">Activity Level</span>
                <div className="space-y-3">
                  {activityLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      className={`w-full text-left rounded-xl border p-4 transition-colors ${
                        activity.id === level.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                      }`}
                      onClick={() => setActivity(level)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{level.label}</p>
                          <p className="text-sm text-gray-400">{level.description}</p>
                        </div>
                        <span className="text-sm text-gray-400">x{level.multiplier}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 flex flex-col">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>
            <div className="flex-1 space-y-6">
              {bmr ? (
                <>
                  <div className="p-5 rounded-xl bg-gray-900 border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">BMR (Mifflin-St Jeor)</p>
                    <p className="text-4xl font-bold">{Math.round(bmr)} kcal/day</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Energy burned at rest for basic body functions.
                    </p>
                  </div>

                  {goalRanges && (
                    <div className="grid gap-4">
                      {Object.values(goalRanges).map((goal) => (
                        <div key={goal.label} className="rounded-xl bg-gray-900 border border-gray-700 p-4">
                          <p className="text-sm text-gray-400">{goal.label}</p>
                          <p className="text-2xl font-semibold">{Math.round(goal.value)} kcal/day</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-center">
                  {inputHelper}
                </div>
              )}
            </div>
            <div className="mt-8 text-sm text-gray-400 border-t border-gray-700 pt-4">
              <p>
                This calculator uses the Mifflin-St Jeor equation, one of the most accurate formulas
                for estimating metabolic rate. For medical guidance, consult a healthcare
                professional.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

