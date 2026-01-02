"use client";

import { useMemo, useState } from "react";
import {
  type BudgetLevel,
  type ClimatePreference,
  type PacePreference,
  type TravelCompanionType,
  type VacationPlan,
  type VacationRequest,
} from "@/lib/types";

const companionOptions: { value: TravelCompanionType; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "group", label: "Organized Group" },
];

const budgetOptions: { value: BudgetLevel; label: string }[] = [
  { value: "budget", label: "Smart Saver" },
  { value: "midrange", label: "Comfort" },
  { value: "luxury", label: "Luxury" },
];

const paceOptions: { value: PacePreference; label: string }[] = [
  { value: "relaxed", label: "Leisurely" },
  { value: "balanced", label: "Balanced" },
  { value: "fast-paced", label: "Fast Paced" },
];

const climateOptions: { value: ClimatePreference; label: string }[] = [
  { value: "tropical", label: "Tropical" },
  { value: "temperate", label: "Mild / Temperate" },
  { value: "coastal", label: "Coastal Breezes" },
  { value: "cold", label: "Cold & Snowy" },
  { value: "mountainous", label: "Mountainous" },
  { value: "arid", label: "Desert & Arid" },
];

const interestOptions = [
  "Beach & Relaxation",
  "Adventure Sports",
  "Cultural Immersion",
  "Historical Sites",
  "Food & Wine",
  "Nightlife",
  "Hiking & Outdoors",
  "Photography",
  "Wellness & Spa",
  "Wildlife Encounters",
  "Water Activities",
  "Family-Friendly Fun",
];

const cuisineOptions = [
  "Mediterranean",
  "Japanese",
  "Latin American",
  "Plant-Based",
  "Seafood",
  "Street Food",
  "Fine Dining",
  "Local Specialties",
];

const initialRequest: VacationRequest = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    homeAirport: "",
    travelCompanions: "couple",
    startDate: "",
    endDate: "",
    notes: "",
  },
  preferences: {
    budget: "midrange",
    climate: ["temperate"],
    interests: ["Cultural Immersion", "Food & Wine"],
    accommodation: "Boutique hotel or design-forward stay",
    cuisineFocus: ["Local Specialties"],
    pace: "balanced",
    mobilityConsiderations: "",
    specialOccasion: "",
  },
};

type StepId = "traveler" | "preferences" | "review";

const steps: { id: StepId; title: string; description: string }[] = [
  {
    id: "traveler",
    title: "Traveler Profile",
    description: "Tell us about who is traveling and key contact details.",
  },
  {
    id: "preferences",
    title: "Trip Preferences",
    description: "Share the experiences, climates, and cuisine you love.",
  },
  {
    id: "review",
    title: "Review & Consent",
    description: "Confirm details so we can craft your vacation matches.",
  },
];

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formState, setFormState] = useState<VacationRequest>(initialRequest);
  const [plan, setPlan] = useState<VacationPlan | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStep = steps[stepIndex];

  const canGoNext = useMemo(() => {
    if (stepIndex === 0) {
      const { personal } = formState;
      return Boolean(
        personal.fullName &&
          personal.email &&
          personal.homeAirport &&
          personal.startDate &&
          personal.endDate
      );
    }

    if (stepIndex === 1) {
      const { preferences } = formState;
      return (
        preferences.climate.length > 0 &&
        preferences.interests.length > 0 &&
        preferences.accommodation.length > 5
      );
    }

    return true;
  }, [formState, stepIndex]);

  const updatePersonal = <Field extends keyof VacationRequest["personal"]>(
    field: Field,
    value: VacationRequest["personal"][Field],
  ) => {
    setFormState((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updatePreferences = <
    Field extends keyof VacationRequest["preferences"],
  >(
    field: Field,
    value: VacationRequest["preferences"][Field],
  ) => {
    setFormState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const toggleClimate = (value: ClimatePreference) => {
    setFormState((prev) => {
      const currentValues = prev.preferences.climate;
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          climate: nextValues,
        },
      };
    });
  };

  const toggleInterests = (value: string) => {
    setFormState((prev) => {
      const currentValues = prev.preferences.interests;
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          interests: nextValues,
        },
      };
    });
  };

  const toggleCuisine = (value: string) => {
    setFormState((prev) => {
      const currentValues = prev.preferences.cuisineFocus;
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          cuisineFocus: nextValues,
        },
      };
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    setPlan(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data?.errors?.formErrors?.join(", ") ??
            data?.message ??
            "Unable to generate plan",
        );
      }

      setPlan(data.plan);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const reset = () => {
    setFormState(initialRequest);
    setPlan(null);
    setError(null);
    setStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-10 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/60 p-8 shadow-xl shadow-sky-100 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-500">
                Voyage Curator
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Tailored Vacation Intelligence Agent
              </h1>
            </div>
            <div className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
              Live data intake • Secure handling
            </div>
          </div>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
            Input traveler preferences and personal details. Our agent analyses
            climate desires, activity interests, and budget to recommend
            destinations with pre-scoped booking options ready for follow-up.
          </p>
          <StepIndicator currentStep={currentStep.id} />
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr),360px]">
          <div className="space-y-8">
            {currentStep.id === "traveler" && (
              <TravelerStep
                formState={formState}
                updatePersonal={updatePersonal}
              />
            )}

            {currentStep.id === "preferences" && (
              <PreferencesStep
                formState={formState}
                updatePreferences={updatePreferences}
                toggleClimate={toggleClimate}
                toggleInterests={toggleInterests}
                toggleCuisine={toggleCuisine}
              />
            )}

            {currentStep.id === "review" && (
              <ReviewStep
                formState={formState}
                submitting={submitting}
                error={error}
                onSubmit={handleSubmit}
                plan={plan}
              />
            )}

            <NavigationBar
              stepIndex={stepIndex}
              onNext={nextStep}
              onBack={prevStep}
              onSubmit={currentStep.id === "review" ? handleSubmit : undefined}
              canGoNext={canGoNext}
              submitting={submitting}
              planReady={Boolean(plan)}
            />
          </div>

          <aside className="space-y-6 rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur lg:sticky lg:top-12">
            <SnapshotCard formState={formState} />
            <PrivacyCard />
            {plan && (
              <button
                type="button"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
                onClick={reset}
              >
                Start a new plan
              </button>
            )}
          </aside>
        </section>

        {plan && (
          <section className="space-y-6 rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-emerald-100/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Intelligent Vacation Matches for {plan.request.personal.fullName}
            </h2>
            <p className="text-base text-slate-600">
              Based on a{" "}
              <span className="font-medium">{plan.request.preferences.budget}</span>{" "}
              budget profile,{" "}
              <span className="font-medium">
                {plan.request.preferences.climate.join(", ")}
              </span>{" "}
              climates, and interests in{" "}
              <span className="font-medium">
                {plan.request.preferences.interests.join(", ")}
              </span>
              , the agent recommends the following destinations with actionable
              booking pathways.
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {plan.destinations.map((destination) => (
                <DestinationCard key={destination.destination} destination={destination} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function StepIndicator({ currentStep }: { currentStep: StepId }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-3">
      {steps.map((step) => {
        const active = step.id === currentStep;
        return (
          <li
            key={step.id}
            className={`rounded-2xl border px-4 py-3 ${active ? "border-sky-400 bg-white text-sky-700 shadow-md shadow-sky-100" : "border-white/70 bg-white/40 text-slate-500"}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em]">
              Step {steps.indexOf(step) + 1}
            </p>
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="text-xs text-slate-500">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}

interface TravelerStepProps {
  formState: VacationRequest;
  updatePersonal: <Field extends keyof VacationRequest["personal"]>(
    field: Field,
    value: VacationRequest["personal"][Field],
  ) => void;
}

function TravelerStep({ formState, updatePersonal }: TravelerStepProps) {
  const { personal } = formState;

  return (
    <div className="space-y-6 rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-lg shadow-sky-100/70 backdrop-blur">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Traveler Identity & Contact
        </h2>
        <p className="text-sm text-slate-500">
          These details are used to personalize itineraries and prepare booking
          holds.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            placeholder="Alex Morgan"
            value={personal.fullName}
            onChange={(event) => updatePersonal("fullName", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            placeholder="alex@email.com"
            value={personal.email}
            onChange={(event) => updatePersonal("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Contact number
          </label>
          <input
            type="tel"
            placeholder="+1 555 123 4567"
            value={personal.phone}
            onChange={(event) => updatePersonal("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Home airport or city
          </label>
          <input
            type="text"
            placeholder="JFK, New York"
            value={personal.homeAirport}
            onChange={(event) =>
              updatePersonal("homeAirport", event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-1">
          <label className="text-sm font-medium text-slate-700">
            Traveling with
          </label>
          <div className="rounded-2xl border border-slate-200 bg-white p-1">
            <select
              value={personal.travelCompanions}
              onChange={(event) =>
                updatePersonal(
                  "travelCompanions",
                  event.target.value as TravelCompanionType,
                )
              }
              className="w-full rounded-2xl px-3 py-2 text-sm focus:outline-none"
            >
              {companionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Departure date
          </label>
          <input
            type="date"
            value={personal.startDate}
            onChange={(event) => updatePersonal("startDate", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Return date
          </label>
          <input
            type="date"
            value={personal.endDate}
            onChange={(event) => updatePersonal("endDate", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Notes for the planner
        </label>
        <textarea
          value={personal.notes}
          onChange={(event) => updatePersonal("notes", event.target.value)}
          placeholder="Share any preferences, allergies, must-see ideas, or constraints."
          className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
        />
      </div>
    </div>
  );
}

interface PreferencesStepProps {
  formState: VacationRequest;
  updatePreferences: <
    Field extends keyof VacationRequest["preferences"],
  >(
    field: Field,
    value: VacationRequest["preferences"][Field],
  ) => void;
  toggleClimate: (value: ClimatePreference) => void;
  toggleInterests: (value: string) => void;
  toggleCuisine: (value: string) => void;
}

function PreferencesStep({
  formState,
  updatePreferences,
  toggleClimate,
  toggleInterests,
  toggleCuisine,
}: PreferencesStepProps) {
  const { preferences } = formState;

  return (
    <div className="space-y-8 rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-lg shadow-emerald-100/70 backdrop-blur">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Experience Blueprint
        </h2>
        <p className="text-sm text-slate-500">
          Curate what a perfect getaway looks like so the agent can score each
          destination.
        </p>
      </div>

      <div className="space-y-4">
        <span className="text-sm font-medium text-slate-700">
          Preferred climate profiles
        </span>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {climateOptions.map((option) => {
            const active = preferences.climate.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleClimate(option.value)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-sm font-medium text-slate-700">
          Must-have vibes & activities
        </span>
        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((interest) => {
            const active = preferences.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterests(interest)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium text-left transition ${
                  active
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Budget posture
          </label>
          <div className="rounded-2xl border border-slate-200 bg-white p-1">
            <select
              value={preferences.budget}
              onChange={(event) =>
                updatePreferences(
                  "budget",
                  event.target.value as BudgetLevel,
                )
              }
              className="w-full rounded-2xl px-3 py-2 text-sm focus:outline-none"
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Preferred pace
          </label>
          <div className="rounded-2xl border border-slate-200 bg-white p-1">
            <select
              value={preferences.pace}
              onChange={(event) =>
                updatePreferences(
                  "pace",
                  event.target.value as PacePreference,
                )
              }
              className="w-full rounded-2xl px-3 py-2 text-sm focus:outline-none"
            >
              {paceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Accommodation style
          </label>
          <input
            type="text"
            placeholder="Eco-resort, boutique hotel, private villa…"
            value={preferences.accommodation}
            onChange={(event) =>
              updatePreferences("accommodation", event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-700">
          Culinary focus
        </label>
        <div className="flex flex-wrap gap-3">
          {cuisineOptions.map((option) => {
            const active = preferences.cuisineFocus.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleCuisine(option)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  active
                    ? "bg-emerald-500 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mobility or accessibility notes
          </label>
          <textarea
            value={preferences.mobilityConsiderations ?? ""}
            onChange={(event) =>
              updatePreferences("mobilityConsiderations", event.target.value)
            }
            placeholder="Elevator access, fitness level, medical items…"
            className="min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Special occasion (if any)
          </label>
          <textarea
            value={preferences.specialOccasion ?? ""}
            onChange={(event) =>
              updatePreferences("specialOccasion", event.target.value)
            }
            placeholder="Honeymoon, milestone birthday, corporate retreat…"
            className="min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
    </div>
  );
}

interface ReviewStepProps {
  formState: VacationRequest;
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
  plan: VacationPlan | null;
}

function ReviewStep({
  formState,
  submitting,
  error,
  onSubmit,
  plan,
}: ReviewStepProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-lg shadow-slate-200/70 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Review & authorize planning
          </h2>
          <p className="text-sm text-slate-500">
            Confirm the intake looks correct. The agent uses these details to
            score destinations and prepare booking options.
          </p>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
          Secure
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChecklistCard
          title="Traveler basics"
          items={[
            `Name: ${formState.personal.fullName || "—"}`,
            `Email: ${formState.personal.email || "—"}`,
            `Companions: ${formState.personal.travelCompanions}`,
            `Travel window: ${formState.personal.startDate || "?"} → ${formState.personal.endDate || "?"}`,
          ]}
        />
        <ChecklistCard
          title="Preference snapshot"
          items={[
            `Budget: ${formState.preferences.budget}`,
            `Climates: ${formState.preferences.climate.join(", ") || "—"}`,
            `Interests: ${formState.preferences.interests.join(", ") || "—"}`,
            `Cuisine: ${formState.preferences.cuisineFocus.join(", ") || "—"}`,
          ]}
        />
      </div>

      {formState.personal.notes && (
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Notes:</span>{" "}
          {formState.personal.notes}
        </div>
      )}

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        <p>
          By submitting, you authorize the agent to use the provided personal
          data purely for tailoring travel recommendations and initiating
          booking holds. Data is stored securely and never sold to third
          parties.
        </p>
        <p>
          You’ll receive a curated plan with bookable suppliers. Final
          reservations occur only after explicit confirmation from you.
        </p>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {submitting ? "Generating plan…" : plan ? "Refresh recommendations" : "Generate vacation matches"}
      </button>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <ul className="space-y-2 text-xs text-slate-500">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-[2px] inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface NavigationBarProps {
  stepIndex: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  canGoNext: boolean;
  submitting: boolean;
  planReady: boolean;
}

function NavigationBar({
  stepIndex,
  onNext,
  onBack,
  onSubmit,
  canGoNext,
  submitting,
  planReady,
}: NavigationBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white/70 px-6 py-4 shadow-lg shadow-slate-200/50 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Progress
        </p>
        <p className="text-sm font-semibold text-slate-700">
          Step {stepIndex + 1} of {steps.length}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={stepIndex === 0 || submitting}
          className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
        >
          Back
        </button>
        {stepIndex < steps.length - 1 && (
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
          >
            Continue
          </button>
        )}
        {stepIndex === steps.length - 1 && onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {planReady ? "Regenerate" : "Generate plan"}
          </button>
        )}
      </div>
    </div>
  );
}

function SnapshotCard({ formState }: { formState: VacationRequest }) {
  const tripLengthCopy = formState.personal.startDate && formState.personal.endDate
    ? `From ${formState.personal.startDate} to ${formState.personal.endDate}`
    : "Select travel dates to unlock length-based pricing.";

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-700">Live snapshot</p>
      <div className="space-y-2 text-xs text-slate-500">
        <p>
          {formState.personal.fullName
            ? `Lead traveler: ${formState.personal.fullName}`
            : "Set the lead traveler to personalize the plan headline."}
        </p>
        <p>{tripLengthCopy}</p>
        <p>
          Interests:{" "}
          {formState.preferences.interests.length
            ? formState.preferences.interests.join(", ")
            : "None selected yet"}
        </p>
      </div>
      <div className="rounded-xl bg-slate-900 px-4 py-3 text-xs text-white">
        Booking readiness:{" "}
        <span className="font-semibold text-emerald-300">
          {formState.personal.fullName && formState.personal.email ? "Almost there" : "Needs traveler identity"}
        </span>
      </div>
    </div>
  );
}

function PrivacyCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-700">Privacy posture</p>
      <ul className="space-y-2 text-xs text-slate-500">
        <li>• Data encrypted at rest and purged after confirmed bookings.</li>
        <li>• Only curated travel partners receive relevant trip details.</li>
        <li>• You can request deletion anytime via concierge support.</li>
      </ul>
    </div>
  );
}

function DestinationCard({
  destination,
}: {
  destination: VacationPlan["destinations"][number];
}) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/80">
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          {destination.country}
        </p>
        <h3 className="text-xl font-semibold text-slate-900">
          {destination.destination}
        </h3>
        <p className="text-sm text-slate-600">{destination.summary}</p>
      </header>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Highlights
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          {destination.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-emerald-400" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Booking pathways
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          {destination.bookingOptions.map((option) => (
            <li key={option.name} className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="font-semibold text-slate-800">
                {option.type.toUpperCase()} • {option.name}
              </p>
              <p className="text-xs text-slate-500">{option.description}</p>
              <p className="text-xs font-medium text-emerald-600">
                Est. {option.priceEstimate}
              </p>
              <a
                href={option.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex text-xs font-semibold text-sky-600 underline"
              >
                View supplier
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Daily cadence
        </p>
        <ul className="space-y-2 text-xs text-slate-500">
          {destination.sampleItinerary.slice(0, 3).map((day) => (
            <li key={day.day} className="rounded-xl border border-slate-100 bg-white px-3 py-2">
              <span className="font-semibold text-slate-700">
                Day {day.day}:
              </span>{" "}
              {day.title}
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-auto space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Insider tips
        </p>
        <ul className="space-y-1 text-xs text-slate-500">
          {destination.travelTips.slice(0, 3).map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
