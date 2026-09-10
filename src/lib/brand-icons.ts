export const brandIconSrc = {
  architectural: "/icons/Architectural.png",
  commercial: "/icons/Commercial.png",
  construction: "/icons/Construction.png",
  consulting: "/icons/consulting.png",
  consultingAlt: "/icons/consulting (2).png",
  developmentStrategy: "/icons/Development strategy.png",
  endToEndProjectManagement: "/icons/End to End project management.png",
  feasibilityStudy: "/icons/Feasibility study.png",
  infrastructure: "/icons/infracture.png",
  innovation: "/icons/Innovation.png",
  integrity: "/icons/integrity.png",
  investment: "/icons/investment.png",
  landPotential: "/icons/Land potential assessment.png",
  mission: "/icons/mission.png",
  nrnProjectManagement: "/icons/NRN project management.png",
  preConstruction: "/icons/Pre construction management.png",
  quality: "/icons/Quality.png",
  realEstate: "/icons/realstate.png",
  residential: "/icons/Residental.png",
  timely: "/icons/Timely Delivery.png",
  timelyDelivery: "/icons/Timely Delivery.png",
  value: "/icons/8.png",
  vision: "/icons/vision.png",
} as const;

export type BrandIconName = keyof typeof brandIconSrc;

const ALIASES: Record<string, BrandIconName> = {
  construction: "construction",
  investment: "investment",
  consulting: "consulting",
  residential: "residential",
  commercial: "commercial",
  infrastructure: "infrastructure",
  design: "architectural",
  "real-estate": "realEstate",
  realestate: "realEstate",
  realstate: "realEstate",
  quality: "quality",
  integrity: "integrity",
  timely: "timelyDelivery",
  "timely-delivery": "timelyDelivery",
  "timely delivery": "timelyDelivery",
  innovation: "innovation",
  value: "value",
  "value-creation": "value",
  "value creation": "value",
  mission: "mission",
  vision: "vision",
  ethos: "integrity",
  architectural: "architectural",
  architecture: "architectural",
  consultingalt: "consultingAlt",
  "consulting-alt": "consultingAlt",
  office: "construction",
  email: "consulting",
  phone: "investment",
  "business hours": "timelyDelivery",
  industrial: "infrastructure",
  engineering: "architectural",
  services: "consulting",
};

const TITLE_MATCHERS: Array<[RegExp, BrandIconName]> = [
  [/nrn/i, "nrnProjectManagement"],
  [/planning & feasibility|site feasibility|bill of quantities|boq/i, "feasibilityStudy"],
  [/architectural & design|floor plans|3d rendering/i, "architectural"],
  [/legal & permits|building permit|land registration/i, "preConstruction"],
  [/project management consulting|contractor vetting|quality audit|dispute/i, "endToEndProjectManagement"],
  [/investment advisory|rental yield|market research/i, "investment"],
  [/initial call|scope definition|report \/ deliverable|follow-up support/i, "consulting"],
  [/joint venture|off-plan|land banking|rental-ready|commercial plot/i, "investment"],
  [/due diligence|nrb approval|repatriation|power of attorney|tax obligation/i, "feasibilityStudy"],
  [/construction \/ acquisition|acquisition/i, "construction"],
  [/sign agreement/i, "preConstruction"],
  [/rental management/i, "nrnProjectManagement"],
  [/returns/i, "value"],
  [/land potential|land assessment/i, "landPotential"],
  [/pre[- ]?construction/i, "preConstruction"],
  [/feasibility|fdi/i, "feasibilityStudy"],
  [/development strategy|investment advisory/i, "developmentStrategy"],
  [/end[- ]to[- ]end|project management|project supervision|manage delivery/i, "endToEndProjectManagement"],
  [/architectural|design & engineer|design & document|design-build/i, "architectural"],
  [/structural|mep|interior|urban planning/i, "architectural"],
  [/renovat|extension|adding floors/i, "construction"],
  [/warehouse|factory|workshop|industrial/i, "infrastructure"],
  [/consultation|contract & timeline/i, "preConstruction"],
  [/design & boq|boq/i, "architectural"],
  [/handover|warranty/i, "quality"],
  [/licensed engineer|phase inspection/i, "integrity"],
  [/client portal/i, "nrnProjectManagement"],
  [/autocad|3d rendering|nbc/i, "architectural"],
  [/material quality|quality material/i, "quality"],
  [/insight|article|thought/i, "innovation"],
  [/earthquake/i, "architectural"],
  [/customer focus/i, "consulting"],
  [/safety and sustainab/i, "integrity"],
  [/premium finishing|excellence/i, "quality"],
  [/nationwide/i, "timelyDelivery"],
  [/international project/i, "infrastructure"],
  [/cost estimation|feasibility/i, "feasibilityStudy"],
  [/review & optimize|sustainab/i, "innovation"],
  [/sales and marketing|shah group/i, "realEstate"],
  [/activate & transfer|public-private/i, "investment"],
  [/residential|custom home|housing|apartment/i, "residential"],
  [/commercial|hospitality|office and retail/i, "commercial"],
  [/infrastructure|road|bridge|heavy civil|transport|healthcare facilities/i, "infrastructure"],
  [/real estate|property development/i, "realEstate"],
  [/mission/i, "mission"],
  [/vision/i, "vision"],
  [/integrity/i, "integrity"],
  [/timely/i, "timelyDelivery"],
  [/innovation/i, "innovation"],
  [/quality/i, "quality"],
  [/value creation|collaboration/i, "value"],
  [/safety|transparency|transparent/i, "integrity"],
  [/consulting|advisory|discover requirements/i, "consulting"],
  [/construction|build with discipline|execute at scale|interior design build|civil engineering|turnkey/i, "construction"],
  [/investment|structure & partnerships|activate/i, "investment"],
];

export function resolveBrandIconName(keyOrTitle: string): BrandIconName | null {
  const raw = keyOrTitle.trim();
  if (!raw) return null;

  const alias = ALIASES[raw.toLowerCase()];
  if (alias) return alias;

  if (raw in brandIconSrc) return raw as BrandIconName;

  for (const [pattern, name] of TITLE_MATCHERS) {
    if (pattern.test(raw)) return name;
  }

  return null;
}

export function getBrandIconSrc(name: BrandIconName): string {
  return `${encodeURI(brandIconSrc[name])}?v=2`;
}
