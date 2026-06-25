import { connectDB } from "@/lib/db/connect";
import {
  Certificate,
  ContactInquiry,
  Division,
  Insight,
  Leader,
  PageSeo,
  Project,
  Redirect,
  Sector,
  SeoSettings,
  SiteContent,
  Stat,
  Testimonial,
  User,
  ValuePillar,
} from "@/lib/db/models";
import { hashPassword } from "@/lib/auth/password";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";
import { divisions } from "@/content/divisions";
import { divisionProfiles } from "@/content/division-profiles";
import { industrySectors, sectorProfiles } from "@/content/sectors";
import { valuePillars } from "@/content/pillars";
import { leaders, leaderProfiles } from "@/content/leadership";
import { companyStats, certificateSection, testimonials } from "@/content/homepage";
import { getDefaultSiteContent } from "@/lib/data/site-content-defaults";
import { siteConfig } from "@/config/site";
import { STATIC_PAGES } from "@/lib/data/seo";

export async function seedDatabase() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nebco.com.np";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@Nebco2024";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      name: "NEBCO Admin",
      role: "superadmin",
      isActive: true,
    });
    console.log(`Created admin user: ${adminEmail}`);
  }

  await SiteContent.findOneAndUpdate(
    { key: "global" },
    getDefaultSiteContent(),
    { upsert: true, new: true },
  );

  await SeoSettings.findOneAndUpdate(
    { key: "global" },
    {
      key: "global",
      titleTemplate: "%s | NEBCO",
      defaultDescription: siteConfig.description,
      defaultOgImage: siteConfig.ogImage,
      keywords: [
        "NEBCO",
        "NEBCO Construction",
        "construction company Nepal",
        "A-Class construction Nepal",
        "Kathmandu construction",
      ],
      googleSiteVerification: "",
      bingSiteVerification: "",
      ga4MeasurementId: "",
      gtmContainerId: "",
      clarityProjectId: "",
      facebookPixelId: "",
    },
    { upsert: true, new: true },
  );

  for (const page of STATIC_PAGES) {
    await PageSeo.findOneAndUpdate(
      { path: page.path },
      { path: page.path, label: page.label },
      { upsert: true, new: true },
    );
  }

  for (const [index, project] of projects.entries()) {
    await Project.findOneAndUpdate(
      { slug: project.slug },
      {
        legacyId: project.id,
        slug: project.slug,
        title: project.title,
        category: project.category,
        location: project.location,
        year: project.year,
        description: project.description,
        image: project.image,
        images: project.images,
        featured: index < 4,
        showcaseLayout: index === 0 ? "hero" : "auto",
        published: true,
        sortOrder: index,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, article] of insights.entries()) {
    await Insight.findOneAndUpdate(
      { slug: article.slug },
      {
        legacyId: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        category: article.category,
        date: article.date,
        readTime: article.readTime,
        image: article.image,
        status: "published",
        featured: index === 0,
        sortOrder: index,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, division] of divisions.entries()) {
    const profile = divisionProfiles[division.slug];
    await Division.findOneAndUpdate(
      { slug: division.slug },
      {
        legacyId: division.id,
        slug: division.slug,
        name: division.name,
        shortName: division.shortName,
        tagline: division.tagline,
        description: division.description,
        services: division.services,
        href: division.href,
        highlight: profile?.highlight ?? division.tagline,
        overview: profile?.overview ?? division.description,
        heroImage: profile?.heroImage,
        capabilities: profile?.capabilities ?? [],
        process: profile?.process ?? [],
        commitments: profile?.commitments ?? [],
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, sector] of industrySectors.entries()) {
    const profile = sectorProfiles[sector.id];
    await Sector.findOneAndUpdate(
      { legacyId: sector.id },
      {
        legacyId: sector.id,
        title: sector.title,
        description: sector.description,
        highlight: sector.highlight,
        image: sector.image,
        messageQuote: profile?.message.quote ?? "",
        messageBody: profile?.message.body ?? [],
        capabilities: profile?.capabilities ?? [],
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, pillar] of valuePillars.entries()) {
    await ValuePillar.findOneAndUpdate(
      { legacyId: pillar.id },
      {
        legacyId: pillar.id,
        title: pillar.title,
        description: pillar.description,
        icon: pillar.icon,
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, leader] of leaders.entries()) {
    const profile = leaderProfiles[leader.id];
    await Leader.findOneAndUpdate(
      { legacyId: leader.id },
      {
        legacyId: leader.id,
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        image: leader.image,
        linkedin: leader.linkedin,
        facebook: leader.facebook,
        email: leader.email,
        messageQuote: profile?.message.quote ?? "",
        messageBody: profile?.message.body ?? [],
        articles: profile?.articles ?? [],
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, testimonial] of testimonials.entries()) {
    await Testimonial.findOneAndUpdate(
      { legacyId: testimonial.id },
      {
        legacyId: testimonial.id,
        quote: testimonial.quote,
        author: testimonial.author,
        organization: testimonial.organization,
        role: testimonial.role,
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, stat] of companyStats.entries()) {
    await Stat.findOneAndUpdate(
      { legacyId: stat.id },
      {
        legacyId: stat.id,
        value: stat.value,
        label: stat.label,
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  for (const [index, cert] of certificateSection.certificates.entries()) {
    await Certificate.findOneAndUpdate(
      { legacyId: cert.id },
      {
        legacyId: cert.id,
        title: cert.title,
        subtitle: cert.subtitle,
        image: cert.image,
        alt: cert.alt,
        sortOrder: index,
        published: true,
      },
      { upsert: true, new: true },
    );
  }

  const counts = {
    projects: await Project.countDocuments(),
    insights: await Insight.countDocuments(),
    divisions: await Division.countDocuments(),
    sectors: await Sector.countDocuments(),
    pillars: await ValuePillar.countDocuments(),
    leaders: await Leader.countDocuments(),
    testimonials: await Testimonial.countDocuments(),
    stats: await Stat.countDocuments(),
    certificates: await Certificate.countDocuments(),
    inquiries: await ContactInquiry.countDocuments(),
    seoSettings: await SeoSettings.countDocuments(),
    pageSeo: await PageSeo.countDocuments(),
    redirects: await Redirect.countDocuments(),
  };

  return counts;
}
