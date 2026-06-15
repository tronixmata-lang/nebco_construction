"use client";

import { createContext, useContext, useEffect, useState } from "react";

type BreadcrumbContextValue = {
  label?: string;
  setLabel: (label?: string) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [label, setLabel] = useState<string | undefined>();

  return (
    <BreadcrumbContext.Provider value={{ label, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbLabel() {
  return useContext(BreadcrumbContext);
}

/** Set a custom label for the current page breadcrumb (e.g. project title). */
export function SetBreadcrumbLabel({ label }: { label?: string }) {
  const context = useContext(BreadcrumbContext);

  useEffect(() => {
    context?.setLabel(label);
    return () => context?.setLabel(undefined);
  }, [context, label]);

  return null;
}
