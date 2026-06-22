export type ScrollPortfolioImage = {
  src: string;
  alt: string;
};

export type ScrollPortfolioOrbitImage = ScrollPortfolioImage & {
  angle: number;
  radius: number;
  size: "sm" | "md" | "lg";
  stagger: number;
};

export const scrollPortfolioCenter: ScrollPortfolioImage = {
  src: "/images/home.jpg",
  alt: "NEBCO construction site with scaffolding and building development",
};

/** Satellite images in a circular collage around the center hero image */
export const scrollPortfolioOrbit: ScrollPortfolioOrbitImage[] = [
  {
    src: "/images/site/hotel-buddy-thamel-5.png",
    alt: "Hotel Buddy Thamel commercial construction by NEBCO",
    angle: -88,
    radius: 0.44,
    size: "md",
    stagger: 0.12,
  },
  {
    src: "/images/site/kapan-2_11zon.jpg",
    alt: "Kapan residential project by NEBCO",
    angle: -58,
    radius: 0.5,
    size: "sm",
    stagger: 0.18,
  },
  {
    src: "/images/site/IMG_7544_11zon.jpg",
    alt: "Khanal commercial building in Nepalgunj by NEBCO",
    angle: -28,
    radius: 0.46,
    size: "md",
    stagger: 0.24,
  },
  {
    src: "/images/site/1-81_11zon.jpg",
    alt: "Hotel Yatri Thamel built by NEBCO",
    angle: 4,
    radius: 0.52,
    size: "lg",
    stagger: 0.1,
  },
  {
    src: "/images/site/hata-guda-5.png",
    alt: "Hattigaunda residential project by NEBCO",
    angle: 34,
    radius: 0.47,
    size: "sm",
    stagger: 0.2,
  },
  {
    src: "/images/site/1_11zon.jpg",
    alt: "Hotel Mirage Regency commercial project by NEBCO",
    angle: 62,
    radius: 0.51,
    size: "md",
    stagger: 0.28,
  },
  {
    src: "/images/site/1-3-scaled.jpg",
    alt: "NEBCO Investment division development",
    angle: 92,
    radius: 0.45,
    size: "sm",
    stagger: 0.16,
  },
  {
    src: "/images/site/1-4-1-scaled.jpg",
    alt: "NEBCO Consulting division services",
    angle: 122,
    radius: 0.49,
    size: "md",
    stagger: 0.22,
  },
  {
    src: "/images/site/IMG_4349-scaled.jpg",
    alt: "Custom residence built by NEBCO",
    angle: 152,
    radius: 0.53,
    size: "lg",
    stagger: 0.14,
  },
  {
    src: "/images/site/1-1-3-scaled.jpg",
    alt: "Sitapaila residential development by NEBCO",
    angle: 182,
    radius: 0.46,
    size: "sm",
    stagger: 0.26,
  },
  {
    src: "/images/site/binod-ojha-1.jpg",
    alt: "Residential building project by NEBCO",
    angle: 212,
    radius: 0.5,
    size: "md",
    stagger: 0.2,
  },
  {
    src: "/images/josepmonter-cranes-7347888.jpg",
    alt: "Construction cranes on a NEBCO building site",
    angle: 242,
    radius: 0.44,
    size: "sm",
    stagger: 0.3,
  },
  {
    src: "/images/home3.jpg",
    alt: "NEBCO infrastructure and development project",
    angle: 272,
    radius: 0.48,
    size: "md",
    stagger: 0.18,
  },
  {
    src: "/images/home2.jpg",
    alt: "NEBCO commercial construction project",
    angle: 302,
    radius: 0.52,
    size: "lg",
    stagger: 0.24,
  },
];
