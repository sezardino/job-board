export const industriesAndCategories = {
  "information-technology": [
    "software-developer",
    "qa-engineer",
    "mobile-developer",
    "designer",
    "database-administrator",
    "cybersecurity-specialist",
    "data-analyst",
    "devops-engineer",
    "systems-architect",
    "product-owner",
    "ai-ml-specialist",
  ],
  "marketing-and-advertising": [
    "marketing-specialist",
    "advertising-manager",
    "content-marketing-specialist",
    "market-analyst",
  ],
  "finance-and-accounting": [
    "financial-analyst",
    "accountant",
    "financial-consultant",
    "credit-analyst",
  ],
  "art-and-design": ["artist-designer", "graphic-designer", "art-director"],
  "services-and-hospitality": [
    "customer-service-specialist",
    "hairstylist-stylist",
    "masseuse-masseur",
  ],
  "tourism-and-hospitality": [
    "tourism-manager",
    "hotel-resort-staff",
    "tour-guide",
  ],
  "law-and-legal": ["lawyer", "attorney", "judicial-officer", "notary"],
  "sports-and-fitness": [
    "fitness-trainer",
    "sports-manager",
    "physiotherapist",
    "personal-trainer",
  ],
  "media-and-entertainment": [
    "journalist",
    "tv-radio-host",
    "content-editor",
    "screenwriter",
  ],
  "construction-and-architecture": [
    "architect",
    "construction-engineer",
    "site-supervisor",
    "interior-designer",
  ],
  "restaurants-and-food-service": [
    "chef",
    "waiter-waitress",
    "bartender",
    "baker",
  ],
} as const;

export const industries = Object.keys(industriesAndCategories) as Array<
  keyof typeof industriesAndCategories
>;
