"use client";

import { Children, isValidElement } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
};

export function StaggerReveal({
  children,
  className,
  staggerMs = 90,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <ScrollReveal key={child.key ?? index} delay={index * staggerMs} className="h-full">
            {child}
          </ScrollReveal>
        );
      })}
    </div>
  );
}
