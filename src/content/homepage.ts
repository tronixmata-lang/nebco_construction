import type { Certificate, Stat, Testimonial } from "@/types";

export const companyOverview = {
  title: "Building Dreams with Your Company",
  description:
    "Your Company is a licensed construction partner for residential, commercial, and infrastructure projects. Under Your Group, we deliver with clear timelines, transparent reporting, and workmanship you can inspect. Replace this copy in Admin → Settings.",
};

export const heroContent = {
  headline: "Building the Projects You've Always Wanted",
  subheadline:
    "Quality, Integrity & Timely. Your Company is a trusted construction partner for residential, commercial, and infrastructure projects, from concept to completion.",
  backgroundImage: "/images/home.jpg",
  primaryCta: { label: "Start your project", href: "/contact" },
  secondaryCta: { label: "Call Now", href: "/contact" },
};

export const companyStats: Stat[] = [
  { id: "years", value: "XX+", label: "Years of Excellence" },
  { id: "clients", value: "XX+", label: "Happy Clients" },
  { id: "completed", value: "XX+", label: "Completed Projects" },
  { id: "running", value: "XX+", label: "Running Projects" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "We entrusted our home build to Your Company and were impressed by the clear communication, site updates, and finish quality. Replace this sample quote with a real client review.",
    author: "Sample Homeowner",
    organization: "Residential Client",
    role: "Homeowner",
  },
  {
    id: "2",
    quote:
      "Our commercial fit-out stayed on schedule and on scope. The team coordinated trades professionally and handed over a space we could open with confidence.",
    author: "Sample Business Owner",
    organization: "Commercial Client",
    role: "Director",
  },
  {
    id: "3",
    quote:
      "From the first meeting through handover, Your Company treated our project with care. We recommend them to anyone who wants accountable construction.",
    author: "Sample Family Client",
    organization: "Residential Client",
    role: "Homeowner",
  },
  {
    id: "4",
    quote:
      "Reliable site leadership and transparent progress reporting made this hospitality project far less stressful than our previous builds.",
    author: "Sample Hospitality Partner",
    organization: "Hospitality Client",
    role: "Operator",
  },
];

export const certificateSection = {
  title: "Trust Earned",
  description:
    "Your Company holds authorized certifications and maintains A-Class construction credentials. Replace these sample cards with your own certificates in Admin → Certificates.",
  certificates: [
    {
      id: "sample-license",
      title: "A-Class Construction License",
      subtitle: "Your construction license or registration",
      image: "",
      alt: "Your certificate",
    },
    {
      id: "sample-authorization",
      title: "Authorized Partner Certificate",
      subtitle: "Your supplier or brand authorization",
      image: "",
      alt: "Your certificate",
    },
    {
      id: "sample-appreciation-1",
      title: "Team Appreciation Award",
      subtitle: "Sample award — replace with your staff recognition",
      image: "",
      alt: "Your certificate",
    },
    {
      id: "sample-appreciation-2",
      title: "Service Excellence Certificate",
      subtitle: "Sample award — replace with your company recognition",
      image: "",
      alt: "Your certificate",
    },
  ] satisfies Certificate[],
};

export const aboutContent = {
  mission:
    "Our mission is to provide world-class construction services that exceed the expectations of our clients. We are dedicated to delivering projects on time, within budget, and to the highest standards of quality. By leveraging our expertise, experience, and collaborative approach, we aim to build iconic structures that inspire and leave a lasting impact on the built environment. We are driven by our passion for construction and a deep sense of responsibility to create spaces that enhance the lives of people around the globe.",
  vision:
    "Our vision is to be a globally recognized A-class construction company, known for our unwavering commitment to quality, customer satisfaction, and sustainable practices. We strive to be at the forefront of technological advancements and industry trends, continuously pushing the boundaries of construction excellence. Through our vision, we aim to contribute to the growth and development of communities worldwide.",
  ethos:
    "At Your Company, we believe in fostering a culture of excellence, integrity, and innovation in everything we do. Our ethos is centered around delivering exceptional construction services while upholding the highest ethical standards. We are committed to building strong relationships with our clients, partners, and communities based on trust, transparency, and mutual respect.",
  values: [
    "Excellence",
    "Integrity",
    "Innovation",
    "Customer Focus",
    "Collaboration",
    "Safety and Sustainability",
  ],
  history:
    "Your Company was established to deliver licensed construction with clear communication and accountable site leadership. Replace this history with your founding story, registration details, and regions you serve in Admin → Settings.",
};
