import type { Certificate, Stat, Testimonial } from "@/types";

export const companyOverview = {
  title: "3 Decades of Building Dreams with NEBCO",
  description:
    "Established in 1995, NEBCO is an A-Class construction company in Nepal. Under the esteemed Shah Group, we bring decades of expertise in real estate and construction, delivering residential, commercial, and infrastructure projects with excellence, professionalism, and customer satisfaction.",
};

export const heroContent = {
  headline: "Building the Projects You've Always Wanted",
  subheadline:
    "Quality, Integrity & Timely. NEBCO is Nepal's trusted A-Class construction partner for residential, commercial, and infrastructure projects, from concept to completion, for over three decades.",
  backgroundImage: "/images/home.jpg",
  primaryCta: { label: "Start your project", href: "/contact" },
  secondaryCta: { label: "Call Now", href: "/contact" },
};

export const companyStats: Stat[] = [
  { id: "years", value: "35+", label: "Years of Excellence" },
  { id: "clients", value: "500+", label: "Happy Clients" },
  { id: "completed", value: "200+", label: "Completed Projects" },
  { id: "running", value: "25+", label: "Running Projects" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "We recently entrusted our construction project to NEBCO, and we couldn't be happier with the outcome. They listened to our needs attentively and delivered beyond our expectations. The quality of their workmanship and attention to detail is evident in every aspect of our project.",
    author: "Binayak Bam Malla",
    organization: "Residential Client",
    role: "Homeowner",
  },
  {
    id: "2",
    quote:
      "Choosing NEBCO for our commercial project was one of the best decisions we made. Their attention to detail and commitment to meeting deadlines ensured a smooth construction process. The end result is stunning. Thank you, NEBCO for your outstanding work!",
    author: "Dr. Subash Ghimire",
    organization: "OM SAAN International Pvt. Ltd.",
    role: "Commercial Client",
  },
  {
    id: "3",
    quote:
      "I couldn't be happier with the quality of work and professionalism demonstrated by the team at NEBCO. From start to finish, they exceeded my expectations and turned my dream home into a reality. Highly recommend their services to anyone looking for top-notch craftsmanship.",
    author: "Shyam Babu Karki",
    organization: "NASA Scientist",
    role: "Residential Building, Naxal",
  },
  {
    id: "4",
    quote:
      "Choosing this construction company was the best decision we made for our project. They are committed to excellence. The team worked tirelessly. Their professionalism and expertise truly set them apart.",
    author: "Karma Gurung",
    organization: "Hotel Yatri",
    role: "Hospitality Client",
  },
];

export const certificateSection = {
  title: "Trust Earned",
  description:
    "NEBCO holds authorized certifications and maintains A-Class construction credentials recognized across Nepal.",
  certificates: [
    {
      id: "cnbm-authorized",
      title: "CNBM Authorized Agent",
      subtitle: "Official sales agent for CMAX products in Nepal",
      image: "/images/site/certificate-cnbm-authorized.png",
      alt: "CNBM International Corporation authorized certificate for Shah Trade Concern",
    },
    {
      id: "ghuran-mandal",
      title: "Mr. Ghuran Mandal Khang",
      subtitle: "Supervisor, Scaffolding & Form Work, 2013",
      image: "/images/site/certificate-ghuran-mandal-khang.png",
      alt: "Appreciation certificate awarded to Mr. Ghuran Mandal Khang",
    },
    {
      id: "birendra-mandal",
      title: "Er. Birendra Kumar Mandal",
      subtitle: "Site Supervisor to Civil Engineer, 2013",
      image: "/images/site/certificate-birendra-kumar-mandal.png",
      alt: "Appreciation certificate awarded to Er. Birendra Kumar Mandal",
    },
    {
      id: "maila-shrestha",
      title: "Mr. Maila Shrestha",
      subtitle: "Senior Mason, 20+ years of service, 2013",
      image: "/images/site/certificate-maila-shrestha.png",
      alt: "Appreciation certificate awarded to Mr. Maila Shrestha",
    },
  ] satisfies Certificate[],
};

export const aboutContent = {
  mission:
    "Our mission is to provide world-class construction services that exceed the expectations of our clients. We are dedicated to delivering projects on time, within budget, and to the highest standards of quality. By leveraging our expertise, experience, and collaborative approach, we aim to build iconic structures that inspire and leave a lasting impact on the built environment. We are driven by our passion for construction and a deep sense of responsibility to create spaces that enhance the lives of people around the globe.",
  vision:
    "Our vision is to be a globally recognized A-class construction company, known for our unwavering commitment to quality, customer satisfaction, and sustainable practices. We strive to be at the forefront of technological advancements and industry trends, continuously pushing the boundaries of construction excellence. Through our vision, we aim to contribute to the growth and development of communities worldwide.",
  ethos:
    "At NEBCO, we believe in fostering a culture of excellence, integrity, and innovation in everything we do. Our ethos is centered around delivering exceptional construction services while upholding the highest ethical standards. We are committed to building strong relationships with our clients, partners, and communities based on trust, transparency, and mutual respect.",
  values: [
    "Excellence",
    "Integrity",
    "Innovation",
    "Customer Focus",
    "Collaboration",
    "Safety and Sustainability",
  ],
  history:
    "National Estate Builders Co. Pvt. Ltd. (NEBCO) was established in 1995 and officially registered in 2001. Under the Shah Group, NEBCO has grown into one of Nepal's leading A-Class construction companies. From residential homes and commercial hotels to infrastructure projects in Bhutan, NEBCO has built a reputation for reliability, innovation, and quality craftsmanship trusted by clients across Nepal and beyond.",
};
