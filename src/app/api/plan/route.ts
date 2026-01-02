import { NextResponse } from "next/server";
import { z } from "zod";
import { generateVacationPlan } from "@/lib/planGenerator";
import type { BudgetLevel, ClimatePreference, PacePreference, TravelCompanionType } from "@/lib/types";

const travelCompanions: [TravelCompanionType, ...TravelCompanionType[]] = [
  "solo",
  "couple",
  "family",
  "friends",
  "group",
];

const climateValues: [ClimatePreference, ...ClimatePreference[]] = [
  "tropical",
  "temperate",
  "cold",
  "arid",
  "mountainous",
  "coastal",
];

const budgetValues: [BudgetLevel, ...BudgetLevel[]] = [
  "budget",
  "midrange",
  "luxury",
];

const paceValues: [PacePreference, ...PacePreference[]] = [
  "relaxed",
  "balanced",
  "fast-paced",
];

const vacationRequestSchema = z.object({
  personal: z.object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email("Please provide a valid email."),
    phone: z
      .string()
      .min(7, "Please provide a contact number with at least 7 digits.")
      .max(20)
      .optional()
      .default(""),
    homeAirport: z.string().min(3, "Please provide a home city or airport."),
    travelCompanions: z.enum(travelCompanions),
    startDate: z.string(),
    endDate: z.string(),
    notes: z.string().optional().default(""),
  }),
  preferences: z.object({
    budget: z.enum(budgetValues),
    climate: z.array(z.enum(climateValues)).min(1),
    interests: z.array(z.string().min(2)).min(1),
    accommodation: z.string().min(3),
    cuisineFocus: z.array(z.string().min(2)).default([]),
    pace: z.enum(paceValues),
    mobilityConsiderations: z.string().optional(),
    specialOccasion: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = vacationRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten(),
        },
        { status: 422 }
      );
    }

    const vacationPlan = generateVacationPlan(parsed.data);

    return NextResponse.json({
      ok: true,
      plan: vacationPlan,
    });
  } catch (error) {
    console.error("Failed to generate vacation plan", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We were unable to generate a vacation plan. Please try again or adjust the information provided.",
      },
      { status: 500 }
    );
  }
}
