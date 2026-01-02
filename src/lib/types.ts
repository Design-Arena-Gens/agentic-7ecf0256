export type TravelCompanionType = "solo" | "couple" | "family" | "friends" | "group";

export type BudgetLevel = "budget" | "midrange" | "luxury";

export type ClimatePreference =
  | "tropical"
  | "temperate"
  | "cold"
  | "arid"
  | "mountainous"
  | "coastal";

export type PacePreference = "relaxed" | "balanced" | "fast-paced";

export interface PersonalProfile {
  fullName: string;
  email: string;
  phone: string;
  homeAirport: string;
  travelCompanions: TravelCompanionType;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface PreferenceProfile {
  budget: BudgetLevel;
  climate: ClimatePreference[];
  interests: string[];
  accommodation: string;
  cuisineFocus: string[];
  pace: PacePreference;
  mobilityConsiderations?: string;
  specialOccasion?: string;
}

export interface VacationRequest {
  personal: PersonalProfile;
  preferences: PreferenceProfile;
}

export interface BookingOption {
  type: "hotel" | "tour" | "experience" | "transport";
  name: string;
  description: string;
  priceEstimate: string;
  bookingUrl: string;
}

export interface DailyPlan {
  day: number;
  title: string;
  description: string;
}

export interface DestinationPlan {
  destination: string;
  country: string;
  summary: string;
  highlights: string[];
  idealFor: TravelCompanionType[];
  climates: ClimatePreference[];
  budget: BudgetLevel;
  activities: string[];
  tags: string[];
  bookingOptions: BookingOption[];
  sampleItinerary: DailyPlan[];
  travelTips: string[];
  recommendedSeason: string;
  localCuisine: string[];
}

export interface VacationPlan {
  request: VacationRequest;
  generatedAt: string;
  currency: "USD";
  destinations: DestinationPlan[];
}
