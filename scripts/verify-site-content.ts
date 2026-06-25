import { connectDB } from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";
import { getSiteContent } from "@/lib/data/content";
import {
  getDefaultSiteContent,
  mapSiteContentDocument,
  mergeSiteContentUpdate,
} from "@/lib/data/site-content-defaults";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function testMergePreservesNestedFields() {
  const defaults = getDefaultSiteContent();
  const merged = mergeSiteContentUpdate(defaults, {
    hero: {
      headline: "Merged Headline",
      primaryCta: { label: "Contact Us" },
    },
    siteConfig: {
      email: "updated@nebco.com.np",
      social: { facebook: "https://facebook.com/test" },
    },
  });

  assert(merged.hero.headline === "Merged Headline", "hero headline should update");
  assert(merged.hero.primaryCta.label === "Contact Us", "primary CTA label should merge");
  assert(
    merged.hero.primaryCta.href === defaults.hero.primaryCta.href,
    "primary CTA href should be preserved",
  );
  assert(
    merged.siteConfig.legalName === defaults.siteConfig.legalName,
    "legal name should be preserved on partial siteConfig save",
  );
  assert(merged.siteConfig.email === "updated@nebco.com.np", "email should update");
  assert(
    merged.siteConfig.social.facebook === "https://facebook.com/test",
    "facebook URL should update",
  );
  assert(
    merged.siteConfig.social.website === defaults.siteConfig.social.website,
    "website URL should be preserved",
  );
}

async function testDatabaseRoundTrip() {
  await connectDB();

  const existingDoc = await SiteContent.findOne({ key: "global" }).lean();
  const original = existingDoc
    ? mapSiteContentDocument(existingDoc)
    : getDefaultSiteContent();

  const testHeadline = `CMS Verify ${Date.now()}`;
  const testImage = "/uploads/verify-hero.jpg";
  const testOverviewTitle = `Overview ${Date.now()}`;

  const patched = mergeSiteContentUpdate(original, {
    hero: {
      ...original.hero,
      headline: testHeadline,
      backgroundImage: testImage,
    },
    companyOverview: {
      ...original.companyOverview,
      title: testOverviewTitle,
    },
  });

  await SiteContent.findOneAndUpdate(
    { key: "global" },
    { $set: patched },
    { upsert: true, runValidators: true },
  );

  const publicContent = await getSiteContent();
  assert(
    publicContent.hero.headline === testHeadline,
    `public hero headline mismatch: got "${publicContent.hero.headline}"`,
  );
  assert(
    publicContent.hero.backgroundImage === testImage,
    `public hero image mismatch: got "${publicContent.hero.backgroundImage}"`,
  );
  assert(
    publicContent.companyOverview.title === testOverviewTitle,
    `company overview title mismatch: got "${publicContent.companyOverview.title}"`,
  );
  assert(
    publicContent.siteConfig.legalName === original.siteConfig.legalName,
    "siteConfig.legalName should survive hero/overview update",
  );

  await SiteContent.findOneAndUpdate(
    { key: "global" },
    { $set: original },
    { upsert: true, runValidators: true },
  );
}

async function main() {
  console.log("Verifying site content merge logic...");
  testMergePreservesNestedFields();
  console.log("✓ Merge logic preserves nested fields");

  console.log("Verifying MongoDB round-trip for hero text and image...");
  await testDatabaseRoundTrip();
  console.log("✓ Database round-trip passed (original content restored)");

  console.log("\nAll site content checks passed.");
}

main().catch((error) => {
  console.error("\nSite content verification failed:");
  console.error(error);
  process.exit(1);
});
