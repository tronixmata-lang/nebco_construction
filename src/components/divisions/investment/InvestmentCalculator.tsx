"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { investmentPage } from "@/content/investment-page";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

type Currency = "NPR" | "USD";

function formatNpr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatPct(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function InvestmentCalculator() {
  const { locations, propertyTypes, usdToNpr, disclaimer } = investmentPage.calculator;
  type LocationId = (typeof locations)[number]["id"];
  type PropertyTypeId = (typeof propertyTypes)[number]["id"];
  const [currency, setCurrency] = useState<Currency>("NPR");
  const [budget, setBudget] = useState("15000000");
  const [locationId, setLocationId] = useState<LocationId>(locations[0].id);
  const [typeId, setTypeId] = useState<PropertyTypeId>(propertyTypes[0].id);

  const result = useMemo(() => {
    const parsed = Number(budget.replace(/,/g, ""));
    const amount = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    const npr = currency === "USD" ? amount * usdToNpr : amount;
    const location = locations.find((item) => item.id === locationId) ?? locations[0];
    const type = propertyTypes.find((item) => item.id === typeId) ?? propertyTypes[0];
    const annualYield = type.baseYield * location.yieldFactor;
    const yearlyRent = npr * annualYield;
    const monthlyRent = yearlyRent / 12;
    const appreciation = location.appreciation + type.appreciationBoost;
    const fiveYearValue = npr * (1 + appreciation) ** 5;

    return { npr, monthlyRent, annualYield, fiveYearValue, appreciation };
  }, [budget, currency, locationId, typeId, locations, propertyTypes, usdToNpr]);

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="ROI Calculator"
          title="See an indicative yield before the call"
          description="Enter a budget, city, and product. We convert USD at an illustrative rate and show monthly rent, annual yield, and a five-year value."
          align="center"
          compact
          className="mx-auto"
        />
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
        <form className="flex h-full flex-col gap-4 border border-neutral-border bg-neutral p-5" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend className="font-label text-[10px] text-accent">Currency</legend>
            <div className="mt-2 flex gap-2">
              {(["NPR", "USD"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={cn(
                    "font-label flex-1 border px-3 py-2 text-xs transition-colors",
                    currency === code
                      ? "border-primary bg-primary text-neutral"
                      : "border-neutral-border text-text-muted hover:border-primary/40 hover:text-secondary",
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="font-label text-[10px] text-accent">Budget</span>
            <input
              type="text"
              inputMode="decimal"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className={cn(fieldClass, "mt-2")}
              aria-label={`Budget in ${currency}`}
            />
          </label>
          <label className="block">
            <span className="font-label text-[10px] text-accent">Location</span>
            <select
              value={locationId}
              onChange={(event) => setLocationId(event.target.value as LocationId)}
              className={cn(fieldClass, "mt-2")}
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-label text-[10px] text-accent">Property type</span>
            <select
              value={typeId}
              onChange={(event) => setTypeId(event.target.value as PropertyTypeId)}
              className={cn(fieldClass, "mt-2")}
            >
              {propertyTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
        </form>

        <div className="flex h-full flex-col border border-neutral-border bg-secondary p-5 text-neutral">
          <p className="font-label text-[10px] text-accent">Indicative output</p>
          <dl className="mt-4 grid flex-1 gap-4">
            <div>
              <dt className="text-sm text-neutral/55">Monthly rental income</dt>
              <dd className="mt-1 font-display text-2xl">{formatNpr(result.monthlyRent)}</dd>
              {currency === "USD" ? (
                <p className="mt-1 text-xs text-neutral/45">{formatUsd(result.monthlyRent / usdToNpr)}</p>
              ) : null}
            </div>
            <div>
              <dt className="text-sm text-neutral/55">Annual yield</dt>
              <dd className="mt-1 font-display text-2xl">{formatPct(result.annualYield)}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral/55">5-year projected value</dt>
              <dd className="mt-1 font-display text-2xl">{formatNpr(result.fiveYearValue)}</dd>
              <p className="mt-1 text-xs text-neutral/45">
                About {formatPct(result.appreciation)} a year, compounded — illustrative only
              </p>
            </div>
          </dl>
          <Button href="#book-consultation" className="mt-6 w-full sm:w-auto">
            Talk through these numbers
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-text-muted">{disclaimer}</p>
    </div>
  );
}
