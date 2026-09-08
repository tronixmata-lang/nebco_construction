import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";

export const pillarIcons: Record<string, ReactNode> = {
  quality: <BrandIcon name="quality" className="h-[170px] w-[170px]" alt="Quality" />,
  integrity: <BrandIcon name="integrity" className="h-[170px] w-[170px]" alt="Integrity" />,
  timely: <BrandIcon name="timelyDelivery" className="h-[170px] w-[170px]" alt="Timely delivery" />,
  innovation: <BrandIcon name="innovation" className="h-[170px] w-[170px]" alt="Innovation" />,
  value: <BrandIcon name="value" className="h-[170px] w-[170px]" alt="Value creation" />,
};
