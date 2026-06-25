import type { Leader, LeaderProfile } from "@/types";
import { NEBCO_FACEBOOK_URL, siteConfig } from "@/config/site";

export const chairmanMessage = {
  quote:
    "For more than three decades, NEBCO has stood for one promise: to build with integrity, deliver with discipline, and earn the confidence of every client we serve. Under the Shah Group, that commitment is not a slogan. It is the standard by which we measure every project, every partnership, and every structure we leave behind.",
  author: "NEBCO Leadership",
  role: "National Estate Builders Co. Pvt. Ltd.",
  image: "/images/site/Mr.-Prabhu-Rana-1.png",
};

export const leaders: Leader[] = [
  {
    id: "chairman",
    name: "Shah Group Leadership",
    role: "Parent Organization",
    bio: "Guiding NEBCO with the institutional strength, strategic vision, and decades of real estate expertise that define the Shah Group legacy in Nepal.",
    image: "/images/site/cg.png",
    facebook: NEBCO_FACEBOOK_URL,
  },
  {
    id: "md",
    name: "Managing Director",
    role: "Managing Director, NEBCO",
    bio: "Leading integrated operations across construction, investment, and consulting, with a focus on accountability, transparency, and results clients can verify.",
    image: "/images/site/Mr.-Prabhu-Rana-1.png",
    facebook: NEBCO_FACEBOOK_URL,
    email: siteConfig.email,
  },
  {
    id: "construction-head",
    name: "Project Management Team",
    role: "Head of Construction",
    bio: "Directing on-site execution with rigorous quality control, safety compliance, and milestone-driven delivery across every NEBCO build.",
    image: "/images/site/binod-ojha-1.jpg",
    facebook: NEBCO_FACEBOOK_URL,
  },
  {
    id: "design-head",
    name: "Design Team",
    role: "Head of Design & Engineering",
    bio: "Uniting architecture and structural engineering under one roof, designing buildings that are safe, compliant, efficient, and built to endure.",
    image: "/images/site/IMG_6211.jpg",
    facebook: NEBCO_FACEBOOK_URL,
  },
];

export const leaderProfiles: Record<string, Omit<LeaderProfile, keyof Leader>> = {
  chairman: {
    message: {
      quote:
        "A building is more than steel and concrete. It is a commitment to the people who will live, work, and invest in it. The Shah Group has upheld that responsibility across generations, and NEBCO carries that same standard of trust into every project we undertake.",
      body: [
        "NEBCO operates as part of the Shah Group, one of Nepal's most established names in real estate and construction. That relationship provides more than a name on a letterhead. It provides institutional depth: experienced governance, financial discipline, and a long-term view that short-cycle builders simply cannot replicate.",
        "Our leadership philosophy rests on four pillars that guide every decision at NEBCO: excellence in execution, integrity in every client relationship, innovation in how we build, and collaboration across teams, partners, and communities. These are not values posted on a wall. They are the criteria we use to evaluate our own performance.",
        "From A-Class licensed construction to integrated investment and consulting services, NEBCO exists to give clients a single, accountable partner for projects that matter. Whether the scope is a family residence, a commercial development, or a specialized facility, our standard remains the same: deliver work that is structurally sound, transparently managed, and worthy of the Shah Group name.",
        "We invite you to explore the perspectives and publications below, written by our leadership team, to understand not only what we build, but how and why we build it the way we do.",
      ],
    },
    articles: [
      {
        slug: "shah-group-heritage-and-vision",
        title: "Heritage, Governance, and the Shah Group Vision for Nepal",
        excerpt:
          "How institutional leadership and generational expertise under Shah Group continue to define NEBCO's standards for construction excellence.",
        body: [
          "The Shah Group's presence in Nepal's real estate and construction sector reflects a record built over decades, not through volume alone, but through consistent delivery, ethical practice, and relationships that endure beyond project completion. That institutional memory is one of NEBCO's most valuable assets.",
          "Governance matters in construction. Clients entrust significant capital, time, and expectation to their builder. Under Shah Group leadership, NEBCO maintains the financial stability, oversight structures, and quality systems that allow us to honor that trust from initial consultation through final handover and beyond.",
          "Our vision extends past individual developments. We invest in skilled teams, reliable supply relationships, and construction practices that raise the bar for the industry in Nepal. NEBCO was established in 1995 and holds A-Class certification precisely because we treat that responsibility with the seriousness it demands.",
          "Every structure we deliver is a reflection of that vision: built to code, built to last, and built with the understanding that our reputation is secured one project at a time.",
        ],
        category: "Leadership",
        date: "2025-01-15",
        readTime: "5 min read",
        image: "/images/site/cg.png",
      },
      {
        slug: "building-trust-through-the-shah-group",
        title: "Why Institutional Stability Matters in Construction Partnerships",
        excerpt:
          "In a sector where timelines are long and stakes are high, organizational continuity and group-level accountability give clients confidence that endures.",
        body: [
          "Construction is inherently a long-horizon commitment. Design decisions made today affect safety and value for decades. Clients therefore need more than a contractor. They need an organization that will remain accountable throughout the lifecycle of their investment.",
          "The Shah Group structure provides that continuity. Shared standards across the group, experienced leadership at every level, and a reputation tested across multiple economic cycles mean NEBCO clients benefit from stability that independent operators often cannot offer.",
          "This translates into tangible outcomes: consistent communication protocols, vetted subcontractor networks, documented quality procedures, and leadership that remains accessible when decisions require escalation. Our clients notice the difference not in marketing language, but in how their projects are managed day to day.",
          "Trust, in our view, is earned through performance and protected through governance. Shah Group leadership remains committed to both across every NEBCO engagement.",
        ],
        category: "Strategy",
        date: "2024-11-08",
        readTime: "5 min read",
        image: "/images/site/1-3-scaled.jpg",
      },
    ],
  },
  md: {
    message: {
      quote:
        "Leadership at NEBCO means creating the conditions for excellence: clear accountability, disciplined processes, and a culture where every team member understands that the client's trust is our most valuable asset.",
      body: [
        "As Managing Director, I am responsible for ensuring that NEBCO's three divisions (Construction, Investment, and Consulting & Design) operate not as isolated units, but as an integrated platform serving a single client objective: successful project outcomes.",
        "That integration eliminates the friction that often plagues complex builds. When design, financial planning, and site execution share leadership oversight, decisions are faster, communication is clearer, and accountability is unmistakable. Our clients work with one organization, not a chain of disconnected vendors.",
        "Operational discipline is the foundation. We define milestones before work begins, document progress against those milestones, and communicate proactively when circumstances require adjustment. Transparency is not a courtesy we extend when convenient. It is a professional obligation we uphold on every engagement.",
        "NEBCO has served clients across Kathmandu and beyond for more than thirty years. That longevity is not accidental. It is the result of a management philosophy that treats every inquiry seriously, every contract honorably, and every completed project as a reference for the next.",
      ],
    },
    articles: [
      {
        slug: "operational-excellence-at-nebco",
        title: "Integrated Leadership: How NEBCO's Divisions Work as One",
        excerpt:
          "A unified management approach across construction, investment, and consulting delivers clarity, speed, and accountability that fragmented teams cannot match.",
        body: [
          "Fragmentation is one of the most common sources of delay, cost overrun, and client frustration in construction. When architects, engineers, contractors, and financial advisors operate without shared leadership, gaps appear and clients pay the price.",
          "NEBCO was structured deliberately to prevent that outcome. Our divisions function under unified executive oversight, ensuring that design intent, budget alignment, and site execution remain synchronized from feasibility through completion.",
          "This model produces measurable benefits: fewer change orders driven by miscommunication, faster resolution of design queries, and a single point of executive accountability when strategic decisions are required. Clients know who stands behind their project, not which subcontractor or consultant holds responsibility.",
          "Operational excellence, in our definition, is the consistent delivery of these outcomes across residential, commercial, and infrastructure portfolios. It is not a destination we claim to have reached, but a standard we apply and refine with every project we undertake.",
        ],
        category: "Leadership",
        date: "2025-02-20",
        readTime: "5 min read",
        image: "/images/site/Mr.-Prabhu-Rana-1.png",
      },
      {
        slug: "client-first-project-delivery",
        title: "Transparency and Accountability in Project Delivery",
        excerpt:
          "Why honest communication, structured reporting, and executive accessibility define the NEBCO client experience.",
        body: [
          "Clients select NEBCO because they expect a partner, not a vendor who disappears after signing. That expectation shapes every element of our delivery model, from the first site meeting to the final inspection walkthrough.",
          "Structured progress reporting keeps clients informed at defined intervals, with documentation that covers completed work, upcoming milestones, and any factors affecting schedule or scope. When challenges arise, we address them directly with options, recommendations, and timelines rather than allowing uncertainty to accumulate.",
          "Executive accessibility matters. Important decisions should not be filtered through layers of bureaucracy. Our leadership team remains available for consultations that require strategic input, ensuring that client priorities inform outcomes at every stage.",
          "Accountability is personal to us. When NEBCO commits to a deliverable, our leadership stands behind it. Our reputation, built since 1995, depends on nothing less.",
        ],
        category: "Management",
        date: "2024-12-05",
        readTime: "4 min read",
        image: "/images/josepmonter-cranes-7347888.jpg",
      },
    ],
  },
  "construction-head": {
    message: {
      quote:
        "On every NEBCO site, we hold ourselves to a simple standard: build it right, build it safely, and deliver what was agreed on schedule, on specification, and without compromise.",
      body: [
        "Construction management is where design intent meets physical reality. Our project management team bears direct responsibility for that transition, coordinating trades, materials, inspections, and schedules while maintaining the quality and safety standards that define NEBCO.",
        "Quality control begins before the first excavation. Specifications are reviewed, materials are verified, and subcontractor qualifications are confirmed against our requirements. On site, inspections at critical structural and finishing milestones ensure that issues are identified and resolved before they propagate.",
        "Safety is non-negotiable. Every active NEBCO site operates under established protocols covering worker training, equipment standards, and environmental protection. We comply with applicable building codes and regulatory requirements not as a minimum threshold, but as the baseline from which our own standards exceed.",
        "Our clients deserve visibility into this process. Milestone-based reporting, coordinated site visits, and direct communication with project managers ensure that progress is never a mystery and that confidence in the build grows with every phase completed.",
      ],
    },
    articles: [
      {
        slug: "quality-control-on-every-site",
        title: "Quality Assurance and Site Safety: The NEBCO Standard",
        excerpt:
          "From pre-construction review to final inspection: how our project managers enforce quality, compliance, and safety on every active build.",
        body: [
          "Quality assurance at NEBCO is a structured process, not an aspiration. Before ground is broken, project managers conduct comprehensive reviews of drawings, specifications, and material schedules to confirm alignment with client requirements and regulatory standards.",
          "During construction, inspections are scheduled at defined structural milestones (foundation, framing, MEP rough-in, and finishing) with documentation at each stage. Deficiencies are recorded, assigned, and closed before subsequent work proceeds. This discipline prevents the costly rework that arises when quality is deferred to the final walkthrough.",
          "Safety management runs parallel to quality control. Worker orientation, personal protective equipment requirements, equipment inspections, and site access protocols are enforced consistently across all NEBCO projects. Protecting our teams and the communities adjacent to our sites is a leadership responsibility we do not delegate.",
          "The result is a construction process that clients can observe with confidence, knowing that what they see on site reflects the standards we committed to in contract and the reputation NEBCO has maintained for more than three decades.",
        ],
        category: "Construction",
        date: "2025-01-28",
        readTime: "5 min read",
        image: "/images/site/binod-ojha-1.jpg",
      },
      {
        slug: "delivering-projects-on-schedule",
        title: "Schedule Discipline in Nepal's Construction Environment",
        excerpt:
          "Realistic planning, proactive risk management, and weekly coordination: the practices that keep NEBCO projects moving forward.",
        body: [
          "Timely delivery in Nepal's construction environment requires planning that accounts for real-world variables: material lead times, seasonal weather, regulatory approvals, and the coordination demands of multi-trade sites. Our schedules are built on that reality, not on optimistic assumptions that collapse under pressure.",
          "Weekly coordination meetings align all trades on progress, upcoming work, and potential constraints. When disruptions occur (a delayed shipment, a design clarification, an unforeseen site condition), project managers escalate immediately and adjust the plan rather than allowing compounding delays.",
          "Clients receive milestone-based progress reports that compare actual progress against the agreed schedule, with clear explanation of any adjustments and the steps being taken to maintain overall delivery objectives. Transparency in scheduling builds the trust that sustains long client relationships.",
          "Schedule discipline is ultimately a leadership function. Our project management team is empowered and accountable because on-time delivery is not a preference. It is a professional commitment.",
        ],
        category: "Project Management",
        date: "2024-10-14",
        readTime: "5 min read",
        image: "/images/pexels-enrique-11376668.jpg",
      },
    ],
  },
  "design-head": {
    message: {
      quote:
        "Architecture must inspire, but engineering must protect. At NEBCO, our design team unites both disciplines from the first sketch, because a beautiful building that fails structurally serves no one.",
      body: [
        "Nepal presents unique design challenges: seismic risk, varied topography, monsoon exposure, and evolving building codes that demand rigorous engineering alongside creative vision. Our in-house architects and structural engineers collaborate from project inception, not in sequence, but in partnership.",
        "Integrated design eliminates the costly disconnect that occurs when aesthetic decisions are made without structural input, or when engineering solutions are applied after architectural plans are finalized. Load paths, material selections, spatial layouts, and MEP coordination are optimized together, producing buildings that are constructible, compliant, and efficient.",
        "We design for performance over the full lifecycle of a structure, not merely for presentation at handover. Energy efficiency, maintenance accessibility, and adaptability for future use are considered alongside form and function, because our clients invest for decades, not for photographs.",
        "Every drawing that leaves our office carries NEBCO's A-Class commitment: structurally sound, code-compliant, and ready for the disciplined execution our construction teams are known for.",
      ],
    },
    articles: [
      {
        slug: "integrated-design-and-engineering",
        title: "Integrated Design: Where Architecture Meets Structural Integrity",
        excerpt:
          "Why collaborative design between architects and engineers produces safer, more efficient, and more cost-effective buildings.",
        body: [
          "The most common source of design-related construction delay is not complexity. It is disconnect. When architectural and structural disciplines operate in isolation, conflicts emerge on site that should have been resolved on paper. NEBCO's integrated design team exists to prevent exactly that outcome.",
          "From conceptual design through construction documentation, architects and structural engineers work in continuous collaboration. Spatial intent informs structural strategy; structural requirements shape architectural possibilities. The result is a unified design that respects both vision and physics.",
          "Constructability review is embedded in our process. Before documents are issued for construction, our team evaluates whether what is drawn can be built efficiently on site, identifying potential conflicts, specifying critical details, and aligning with the capabilities of our construction division.",
          "For clients, integrated design translates into fewer surprises, reduced change orders, and buildings that achieve their aesthetic goals without compromising the structural performance that safety and longevity require.",
        ],
        category: "Design",
        date: "2025-02-10",
        readTime: "5 min read",
        image: "/images/site/IMG_6211.jpg",
      },
      {
        slug: "seismic-design-for-nepal",
        title: "Earthquake-Resistant Design: A Non-Negotiable Standard for Nepal",
        excerpt:
          "How NEBCO's engineering team applies seismic analysis, code compliance, and quality-controlled construction to protect lives and investments.",
        body: [
          "Nepal's seismic history makes earthquake-resistant design an absolute requirement, not an optional enhancement. Our engineers treat structural safety as the primary design constraint, evaluating site geology, soil bearing capacity, and appropriate structural systems before architectural development proceeds.",
          "Design practices include rigorous attention to reinforcement detailing, lateral force resistance, diaphragm continuity, and connection design. These elements determine whether a structure performs under seismic loading or fails catastrophically. We align our work with applicable Nepali building codes and established international engineering standards.",
          "Design integrity must be preserved through construction. Our engineering team maintains involvement during execution, reviewing critical structural work and coordinating with project managers to ensure that what is built matches what was designed, because seismic performance depends as much on construction quality as on engineering calculations.",
          "Clients who invest in proper seismic design protect more than property. They protect the people who will occupy their buildings. NEBCO accepts that responsibility as fundamental to every project we design and deliver.",
        ],
        category: "Engineering",
        date: "2024-09-22",
        readTime: "6 min read",
        image: "/images/pexels-enrique-11376668.jpg",
      },
    ],
  },
};

export function getLeaderProfileById(id: string): LeaderProfile | undefined {
  const leader = leaders.find((item) => item.id === id);
  const profile = leaderProfiles[id];
  if (!leader || !profile) return undefined;
  return { ...leader, ...profile };
}

export function getAllLeaderIds(): string[] {
  return leaders.map((leader) => leader.id);
}

export function getLeaderArticle(
  leaderId: string,
  articleSlug: string,
): { leader: LeaderProfile; article: LeaderProfile["articles"][number] } | undefined {
  const leader = getLeaderProfileById(leaderId);
  if (!leader) return undefined;
  const article = leader.articles.find((item) => item.slug === articleSlug);
  if (!article) return undefined;
  return { leader, article };
}
