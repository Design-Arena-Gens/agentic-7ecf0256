import { DESTINATION_LIBRARY } from "./destinations";
import type {
  DailyPlan,
  DestinationPlan,
  VacationPlan,
  VacationRequest,
} from "./types";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const DAILY_RATES = {
  budget: { min: 160, max: 260 },
  midrange: { min: 280, max: 420 },
  luxury: { min: 520, max: 780 },
};

const normalizeInterests = (interests: string[]): string[] => {
  return interests.map((item) =>
    item
      .toLowerCase()
      .replace(/[^a-z\s/-]/g, "")
      .trim()
  );
};

const calculateTripLength = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 5;
  }

  const diff = endDate.getTime() - startDate.getTime();
  const nights = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  return nights;
};

const estimatePrice = (budget: keyof typeof DAILY_RATES, nights: number) => {
  const { min, max } = DAILY_RATES[budget];
  const lower = min * nights;
  const upper = max * nights;
  return `${CURRENCY_FORMATTER.format(lower)} – ${CURRENCY_FORMATTER.format(
    upper
  )}`;
};

const calculateScore = (request: VacationRequest, plan: DestinationPlan) => {
  const interestSet = new Set(normalizeInterests(request.preferences.interests));
  const planActivities = normalizeInterests(plan.activities);

  const sharedActivities = planActivities.filter((activity) =>
    interestSet.has(activity)
  ).length;
  const activityScore = sharedActivities / Math.max(planActivities.length, 1);

  const budgetScore =
    request.preferences.budget === plan.budget
      ? 1
      : request.preferences.budget === "luxury" && plan.budget !== "budget"
        ? 0.75
        : request.preferences.budget === "budget" && plan.budget !== "luxury"
          ? 0.7
          : 0.4;

  const climateScore = request.preferences.climate.some((climate) =>
    plan.climates.includes(climate)
  )
    ? 1
    : 0.25;

  const companionScore = plan.idealFor.includes(
    request.personal.travelCompanions
  )
    ? 1
    : 0.5;

  const paceScore =
    request.preferences.pace === "relaxed" && plan.tags.includes("wellness")
      ? 1
      : request.preferences.pace === "fast-paced" &&
          plan.tags.some((tag) => ["adventure", "nightlife"].includes(tag))
        ? 1
        : 0.7;

  return (
    activityScore * 0.4 +
    budgetScore * 0.2 +
    climateScore * 0.2 +
    companionScore * 0.1 +
    paceScore * 0.1
  );
};

const personalizeSummary = (
  summary: string,
  request: VacationRequest
): string => {
  if (!request.preferences.specialOccasion) {
    return summary;
  }

  return `${summary} Perfectly suited for celebrating ${request.preferences.specialOccasion.toLowerCase()}.`;
};

const expandTips = (
  plan: Pick<DestinationPlan, "travelTips">,
  request: VacationRequest
) => {
  const tips = new Set(plan.travelTips);

  if (request.preferences.pace === "relaxed") {
    tips.add("Build in buffer afternoons for spontaneous downtime.");
  }

  if (request.preferences.cuisineFocus.length > 0) {
    tips.add(
      `Reserve at least one chef-driven tasting menu that highlights ${request.preferences.cuisineFocus.join(
        ", "
      )}.`
    );
  }

  if (request.preferences.specialOccasion) {
    tips.add(
      `Notify hotels and guides about your ${request.preferences.specialOccasion.toLowerCase()} to unlock surprise upgrades.`
    );
  }

  if (request.preferences.mobilityConsiderations) {
    tips.add(
      "Share mobility considerations when booking tours to ensure accessible transport and pacing."
    );
  }

  return Array.from(tips);
};

const buildDailyPlan = (
  templatePlan: Array<Omit<DailyPlan, "day">>,
  nights: number
): DestinationPlan["sampleItinerary"] => {
  const days: DestinationPlan["sampleItinerary"] = [];

  for (let i = 0; i < nights; i += 1) {
    const template = templatePlan[i % templatePlan.length];
    days.push({
      ...template,
      day: i + 1,
    });
  }

  return days;
};

const enrichDestination = (
  request: VacationRequest,
  templateIndex: number,
  nights: number
): DestinationPlan => {
  const template = DESTINATION_LIBRARY[templateIndex];

  const basePrice =
    DAILY_RATES[request.preferences.budget].min +
    (templateIndex % 2 === 0 ? 60 : 0);

  const bookingOptions = template.bookingOptions.map((option, idx) => {
    const multiplier = 1 + idx * 0.18;
    const price = basePrice * multiplier * Math.max(3, nights);
    return {
      ...option,
      priceEstimate: CURRENCY_FORMATTER.format(price),
    };
  });

  const itinerary = buildDailyPlan(template.sampleItinerary, nights);
  const tips = expandTips(template, request);

  return {
    ...template,
    summary: personalizeSummary(template.summary, request),
    bookingOptions,
    sampleItinerary: itinerary,
    travelTips: tips,
  };
};

export const generateVacationPlan = (
  request: VacationRequest
): VacationPlan => {
  const nights = calculateTripLength(
    request.personal.startDate,
    request.personal.endDate
  );

  const ranked = DESTINATION_LIBRARY.map((template, index) => {
    const destination = enrichDestination(request, index, nights);
    const score = calculateScore(request, destination);
    return { destination, score };
  })
    .filter(({ score }) => score > 0.15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const destinations =
    ranked.length > 0
      ? ranked.map(({ destination }, idx) => {
          const priceEstimate = estimatePrice(
            destination.budget,
            Math.max(destinationsAverageNights(destination.sampleItinerary), nights)
          );

          return {
            ...destination,
            bookingOptions: destination.bookingOptions.map((option, optionIdx) => ({
              ...option,
              priceEstimate:
                option.priceEstimate ||
                CURRENCY_FORMATTER.format(
                  DAILY_RATES[destination.budget].min *
                    Math.max(3, nights) *
                    (1 + optionIdx * 0.2)
                ),
            })),
            sampleItinerary: destination.sampleItinerary.map((day, dayIdx) => ({
              ...day,
              title:
                dayIdx === 0
                  ? `${day.title} (Arrival Day)`
                  : dayIdx === destination.sampleItinerary.length - 1
                    ? `${day.title} (Farewell)`
                    : day.title,
            })),
            travelTips: [
              `Ideal trip length: ${Math.max(4, nights)}-day escape.`,
              ...destination.travelTips,
            ],
            summary:
              idx === 0
                ? `${destination.summary} Tailored as the lead recommendation for ${request.personal.fullName}.`
                : destination.summary,
            priceEstimate,
          };
        })
      : [
          enrichDestination(request, 0, nights),
          enrichDestination(request, 1, nights),
        ];

  return {
    request,
    generatedAt: new Date().toISOString(),
    currency: "USD",
    destinations,
  };
};

const destinationsAverageNights = (itinerary: DestinationPlan["sampleItinerary"]) => {
  if (!itinerary.length) {
    return 4;
  }

  const days = itinerary[itinerary.length - 1].day;
  return Number.isFinite(days) ? days : itinerary.length;
};
