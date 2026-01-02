import type {
  BookingOption,
  ClimatePreference,
  DailyPlan,
  DestinationPlan,
  TravelCompanionType,
} from "./types";

type DestinationTemplate = Omit<
  DestinationPlan,
  "bookingOptions" | "sampleItinerary"
> & {
  bookingOptions: Omit<BookingOption, "priceEstimate">[];
  sampleItinerary: Omit<DailyPlan, "day">[];
  tags: string[];
};

export const DESTINATION_LIBRARY: DestinationTemplate[] = [
  {
    destination: "Kyoto",
    country: "Japan",
    summary:
      "A tranquil blend of ancient temples, tea houses, and vibrant local culture surrounded by mountains and lush gardens.",
    highlights: [
      "Sunrise meditation at ancient temples",
      "Private tea ceremony in Gion",
      "Arashiyama bamboo forest walk",
    ],
    idealFor: ["couple", "solo", "family"],
    climates: ["temperate"],
    budget: "midrange",
    activities: [
      "culture",
      "history",
      "food",
      "nature",
      "wellness",
      "photography",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "Hoshinoya Kyoto",
        description: "Riverside ryokan with private boat transfer and kaiseki.",
        bookingUrl: "https://hoshinoyakyoto.com",
      },
      {
        type: "experience",
        name: "Private Tea Ceremony",
        description: "Guided by a tea master in Gion with kimono fitting option.",
        bookingUrl: "https://teaceremonykyoto.com",
      },
      {
        type: "tour",
        name: "Arashiyama Day Tour",
        description: "Tailored guide through bamboo grove and hidden temples.",
        bookingUrl: "https://kyotoprivateguide.jp",
      },
    ],
    sampleItinerary: [
      {
        title: "Historic Northern Kyoto",
        description:
          "Kinkaku-ji, Ryoan-ji rock garden, and Kaiseki dinner in Pontocho.",
      },
      {
        title: "Arashiyama Serenity",
        description:
          "Bamboo grove at dawn, river boat ride, Tenryu-ji temple gardens.",
      },
      {
        title: "Gion Cultural Immersion",
        description:
          "Tea ceremony, traditional crafts workshop, evening geisha district stroll.",
      },
    ],
    travelTips: [
      "Reserve popular restaurants and tea ceremonies 4-6 weeks ahead.",
      "Purchase the Kyoto City Bus & Subway pass for easy transport.",
      "Pack layers; evenings can be cool even in spring and autumn.",
    ],
    recommendedSeason: "March-May and October-November for mild weather and foliage.",
    localCuisine: ["kaiseki", "yudofu", "matcha sweets", "obanzai"],
    tags: ["zen", "gardens", "spiritual", "culinary"],
  },
  {
    destination: "Lisbon & Sintra",
    country: "Portugal",
    summary:
      "Sun-soaked coastal capital with vibrant neighborhoods partnered with fairy-tale palaces in nearby Sintra.",
    highlights: [
      "Fado music evening in Alfama",
      "Sunset sail on the Tagus River",
      "Peña Palace and Quinta da Regaleira exploration",
    ],
    idealFor: ["friends", "couple", "solo", "family"],
    climates: ["coastal", "temperate"],
    budget: "budget",
    activities: [
      "food",
      "nightlife",
      "history",
      "architecture",
      "outdoors",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "The Lumiares Hotel & Spa",
        description:
          "Boutique apartments in Bairro Alto with rooftop views and spa access.",
        bookingUrl: "https://thelumiares.com",
      },
      {
        type: "experience",
        name: "Sunset Sailing Cruise",
        description:
          "Small-group sail with local wine and narration of Lisbon’s maritime history.",
        bookingUrl: "https://lisbonsailing.com",
      },
      {
        type: "tour",
        name: "Sintra by Locals",
        description:
          "Day trip with skip-the-line palace access and gourmet picnic in the forests.",
        bookingUrl: "https://sintralocals.pt",
      },
    ],
    sampleItinerary: [
      {
        title: "Lisbon Neighborhoods",
        description:
          "Tram 28 ride, Time Out Market tasting session, and Alfama sunset viewpoints.",
      },
      {
        title: "Sintra and Cascais",
        description:
          "Explore Pena Palace, Moorish Castle, and relax on Guincho Beach before seafood dinner.",
      },
      {
        title: "Gastronomy & Culture",
        description:
          "Pastel de nata workshop, LX Factory creatives tour, Fado dinner club.",
      },
    ],
    travelTips: [
      "Use Viva Viagem card for public transport; recharge as needed.",
      "Wear comfortable shoes—Lisbon’s hills feature plenty of cobblestones.",
      "Sintra mornings are cooler; bring a light jacket.",
    ],
    recommendedSeason: "April-June or September for warm weather without peak crowds.",
    localCuisine: ["pastel de nata", "bacalhau", "sardines", "ginjinha"],
    tags: ["sunset", "culture", "budget-friendly", "music"],
  },
  {
    destination: "Queenstown",
    country: "New Zealand",
    summary:
      "Adventure capital framed by alpine lakes—perfect for adrenaline seekers and scenic escapes alike.",
    highlights: [
      "Helicopter glacier landing",
      "Milford Sound cruise",
      "Central Otago wine tasting",
    ],
    idealFor: ["friends", "group", "couple", "family"],
    climates: ["mountainous", "temperate"],
    budget: "luxury",
    activities: [
      "adventure",
      "hiking",
      "water",
      "wine",
      "scenery",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "Matakauri Lodge",
        description:
          "Luxury lakefront suites with spa, private decks, and curated adventure concierge.",
        bookingUrl: "https://matakaurilodge.com",
      },
      {
        type: "experience",
        name: "Milford Sound Scenic Flight + Cruise",
        description:
          "Fly-cruise-fly itinerary over Fiordland with naturalist commentary.",
        bookingUrl: "https://milfordsoundflights.co.nz",
      },
      {
        type: "tour",
        name: "Central Otago Wine Trail",
        description:
          "Private guide through boutique vineyards with gourmet lunch pairing.",
        bookingUrl: "https://queenstownwinetrail.co.nz",
      },
    ],
    sampleItinerary: [
      {
        title: "Lake Wakatipu Adventure",
        description:
          "Jet boating, Skyline gondola, and farm-to-table dining overlooking the Remarkables.",
      },
      {
        title: "Fiordland Expedition",
        description:
          "Scenic flight to Milford Sound, catamaran cruise, and guided rainforest walk.",
      },
      {
        title: "Wine & Wellness",
        description:
          "Spa morning, private wine tastings, sunset cruise with local chef tasting menu.",
      },
    ],
    travelTips: [
      "Layer clothing—weather shifts quickly in alpine climates.",
      "Book adventure activities at least 2 weeks out in peak season.",
      "Consider renting a car for winery visits; left-side driving applies.",
    ],
    recommendedSeason: "November-April for warmer weather; June-August for skiing.",
    localCuisine: ["lamb", "green-lipped mussels", "pinot noir", "pavlova"],
    tags: ["adventure", "luxury", "wine", "nature"],
  },
  {
    destination: "Tulum",
    country: "Mexico",
    summary:
      "Bohemian Caribbean escape featuring eco-chic stays, Mayan ruins, and cenote adventures.",
    highlights: [
      "Guided sunrise visit to Tulum ruins",
      "Swimming in Gran Cenote",
      "Chef-led jungle dining experience",
    ],
    idealFor: ["couple", "friends", "group"],
    climates: ["tropical", "coastal"],
    budget: "midrange",
    activities: [
      "beach",
      "wellness",
      "food",
      "culture",
      "nightlife",
      "diving",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "La Valise Tulum",
        description:
          "Eco-conscious boutique hotel with beach beds and personalized wellness programs.",
        bookingUrl: "https://lavalisetulum.com",
      },
      {
        type: "experience",
        name: "Cenote Exploration",
        description:
          "Private guide through lesser-known cenotes with underwater photography.",
        bookingUrl: "https://tulumcenotes.com",
      },
      {
        type: "tour",
        name: "Sian Ka’an Biosphere Safari",
        description:
          "Protected reserve boat tour spotting dolphins, turtles, and manatees.",
        bookingUrl: "https://siankaancommunitytours.com",
      },
    ],
    sampleItinerary: [
      {
        title: "Beach & Wellness",
        description:
          "Sunrise yoga, beach club afternoon, sunset sound bath with local healer.",
      },
      {
        title: "Cenotes & Culture",
        description:
          "Gran Cenote swim, Mayan workshop, jungle dinner at Hartwood.",
      },
      {
        title: "Biosphere Adventure",
        description:
          "Sian Ka’an boating, snorkeling on coral reef, nightlife in downtown Tulum.",
      },
    ],
    travelTips: [
      "Pack biodegradable sunscreen; standard sunscreen is banned in cenotes.",
      "Carry pesos for taxis and small vendors; ATMs can be limited.",
      "Reserve popular restaurants a week before arrival.",
    ],
    recommendedSeason: "November-April for dry season; avoid September/October storms.",
    localCuisine: ["cochinita pibil", "ceviche", "aguachile", "mezcal cocktails"],
    tags: ["wellness", "beach", "eco", "gastronomy"],
  },
  {
    destination: "Reykjavík & South Coast",
    country: "Iceland",
    summary:
      "Nordic capital with geothermal spas and dramatic landscapes including waterfalls, glaciers, and black-sand beaches.",
    highlights: [
      "Blue Lagoon retreat experience",
      "Northern Lights super-jeep hunt",
      "Glacier hike on Sólheimajökull",
    ],
    idealFor: ["friends", "family", "group", "solo"],
    climates: ["cold", "coastal"],
    budget: "luxury",
    activities: [
      "nature",
      "adventure",
      "photography",
      "wellness",
      "wildlife",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "The Reykjavik EDITION",
        description:
          "Design-forward stay with private geothermal experiences and harbor views.",
        bookingUrl: "https://editionhotels.com/reykjavik",
      },
      {
        type: "tour",
        name: "South Coast Super Jeep",
        description:
          "Private expedition to waterfalls, ice beach, and glacier walk with safety gear.",
        bookingUrl: "https://icelandluxurytours.is",
      },
      {
        type: "experience",
        name: "Northern Lights Retreat",
        description:
          "Aurora viewing with astrophotographer and hot gourmet beverages.",
        bookingUrl: "https://northernlights.is",
      },
    ],
    sampleItinerary: [
      {
        title: "City & Culinary",
        description:
          "Reykjavík city walk, Icelandic lamb tasting, evening geothermal spa relaxation.",
      },
      {
        title: "South Coast Wonders",
        description:
          "Seljalandsfoss waterfall, black sand beaches, glacier hike with expert guide.",
      },
      {
        title: "Arctic Adventure",
        description:
          "Golden Circle highlights, snowmobiling on Langjökull, aurora chase at night.",
      },
    ],
    travelTips: [
      "Weather changes rapidly; pack thermal layers and waterproof outerwear.",
      "Book Blue Lagoon and premium restaurants well in advance.",
      "Driving conditions can be challenging in winter—consider private transfers.",
    ],
    recommendedSeason:
      "February-April for aurora and snowy landscapes; June-August for midnight sun.",
    localCuisine: ["Icelandic lamb", "skyr", "langoustine", "rye bread"],
    tags: ["northern lights", "geothermal", "photography", "adventure"],
  },
  {
    destination: "Cape Town & Winelands",
    country: "South Africa",
    summary:
      "Iconic Table Mountain views, vibrant neighborhoods, and world-class vineyards within a short drive.",
    highlights: [
      "Table Mountain sunrise hike",
      "Private safari at Aquila Game Reserve",
      "Franschhoek wine tram exploration",
    ],
    idealFor: ["friends", "couple", "family", "group"],
    climates: ["coastal", "temperate"],
    budget: "midrange",
    activities: [
      "wildlife",
      "wine",
      "food",
      "hiking",
      "culture",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "One&Only Cape Town",
        description:
          "Waterfront resort with Table Mountain views and Nobu restaurant on-site.",
        bookingUrl: "https://oneandonlyresorts.com/cape-town",
      },
      {
        type: "tour",
        name: "Cape Peninsula Adventure",
        description:
          "Private guide for penguin colony, Cape Point, and Chapman’s Peak drive.",
        bookingUrl: "https://capetownprivatetours.co.za",
      },
      {
        type: "experience",
        name: "Franschhoek Wine Tram",
        description:
          "Open-air tram through storied vineyards with cellar tastings and gourmet lunch.",
        bookingUrl: "https://winetram.co.za",
      },
    ],
    sampleItinerary: [
      {
        title: "City & Coast",
        description:
          "Table Mountain cableway, V&A Waterfront, sunset at Camps Bay.",
      },
      {
        title: "Winelands Discovery",
        description:
          "Franschhoek tram, Stellenbosch pairings, evening fine-dining chef’s table.",
      },
      {
        title: "Wildlife & Culture",
        description:
          "Cape Peninsula drive, penguin colony visit, township arts tour.",
      },
    ],
    travelTips: [
      "Uber works well in the city; arrange private drivers for the Winelands.",
      "Secure safari and Cape Peninsula guides 3-4 weeks in advance.",
      "Spring (Sept-Nov) offers wildflowers; summer brings warm beach days.",
    ],
    recommendedSeason: "September-November or March-May for mild weather.",
    localCuisine: ["braai", "bobotie", "cape malay curry", "chenin blanc"],
    tags: ["safari", "wine", "culinary", "scenic"],
  },
  {
    destination: "Dubrovnik & Dalmatian Coast",
    country: "Croatia",
    summary:
      "Walled seaside city with Adriatic views, island hopping, and Mediterranean cuisine.",
    highlights: [
      "Old Town private walking tour",
      "Elaphiti Islands yacht day",
      "Pelješac Peninsula wine tasting",
    ],
    idealFor: ["couple", "friends", "family"],
    climates: ["coastal", "temperate"],
    budget: "midrange",
    activities: [
      "history",
      "sailing",
      "food",
      "wine",
      "relaxation",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "Hotel Excelsior Dubrovnik",
        description:
          "Seaside hotel steps from the Old Town with spa and private beach platform.",
        bookingUrl: "https://excelsior-dubrovnik.com",
      },
      {
        type: "tour",
        name: "Old Town Cultural Stroll",
        description:
          "Historian-led walk covering Game of Thrones filming spots and hidden monasteries.",
        bookingUrl: "https://dubrovnikwalks.com",
      },
      {
        type: "experience",
        name: "Elaphiti Yacht Charter",
        description:
          "Skippered yacht visiting Lopud, Sipan, and secluded coves with onboard lunch.",
        bookingUrl: "https://adriaticyacht.com",
      },
    ],
    sampleItinerary: [
      {
        title: "Walled City & Gastronomy",
        description:
          "City walls walk, seafood lunch, sunset cocktails at Buža bar.",
      },
      {
        title: "Island Yachting",
        description:
          "Full-day yacht charter, kayaking in hidden coves, cliffside dinner back in town.",
      },
      {
        title: "Wine & Countryside",
        description:
          "Pelješac wineries, oyster farm visit, evening fortress cable car ride.",
      },
    ],
    travelTips: [
      "Book yacht charters early in summer; they sell out quickly.",
      "Carry comfortable sandals for Old Town’s polished stone streets.",
      "Use the Dubrovnik pass for attractions and public transport savings.",
    ],
    recommendedSeason: "May-June or September for warm seas and fewer crowds.",
    localCuisine: ["dalmatian seafood", "black risotto", "oysters", "plavac mali wine"],
    tags: ["sailing", "culinary", "romantic", "history"],
  },
  {
    destination: "Banff & Lake Louise",
    country: "Canada",
    summary:
      "Iconic Canadian Rockies road trip with turquoise lakes, glacier-fed rivers, and alpine wildlife.",
    highlights: [
      "Sunrise canoe on Lake Louise",
      "Icefields Parkway guided drive",
      "Banff Upper Hot Springs soak",
    ],
    idealFor: ["family", "friends", "group", "solo"],
    climates: ["mountainous", "cold"],
    budget: "midrange",
    activities: [
      "hiking",
      "wildlife",
      "photography",
      "wellness",
      "scenic drives",
    ],
    bookingOptions: [
      {
        type: "hotel",
        name: "Fairmont Chateau Lake Louise",
        description:
          "Historic chateau with lakeside rooms, paddle rentals, and alpine guides desk.",
        bookingUrl: "https://fairmont.com/lake-louise",
      },
      {
        type: "experience",
        name: "Columbia Icefield Adventure",
        description:
          "Glacier explorer vehicle trip plus glass-floored Skywalk admission.",
        bookingUrl: "https://icefields.com",
      },
      {
        type: "tour",
        name: "Sunrise Wildlife Safari",
        description:
          "Naturalist-led small group to spot elk, bears, and big horn sheep safely.",
        bookingUrl: "https://banfftours.com",
      },
    ],
    sampleItinerary: [
      {
        title: "Banff & Bow Valley",
        description:
          "Banff gondola, Johnston Canyon hike, evening at historic Banff Springs.",
      },
      {
        title: "Lakes & Glaciers",
        description:
          "Lake Louise canoe, Moraine Lake photography, glacier viewpoints.",
      },
      {
        title: "Icefields Parkway",
        description:
          "Scenic drive with stops at Peyto Lake, Athabasca Glacier, and Mistaya Canyon.",
      },
    ],
    travelTips: [
      "Park shuttle reservations are required for Moraine Lake in peak season.",
      "Carry bear spray while hiking and know how to use it.",
      "Dress in layers; mountain weather swings widely.",
    ],
    recommendedSeason: "June-September for open trails; December-March for skiing.",
    localCuisine: ["alberta beef", "maple treats", "craft beer", "wild game"],
    tags: ["outdoors", "family-friendly", "road trip", "photography"],
  },
];

export const CLIMATE_LABELS: Record<ClimatePreference, string> = {
  tropical: "Tropical",
  temperate: "Temperate",
  cold: "Cold / Arctic",
  arid: "Desert / Arid",
  mountainous: "Mountainous",
  coastal: "Coastal",
};

export const COMPANION_LABELS: Record<TravelCompanionType, string> = {
  solo: "Solo Travelers",
  couple: "Couples",
  family: "Families",
  friends: "Friends",
  group: "Groups",
};
