import { getSectorsList } from "@/lib/data/sectors";
import { SectorAtlasCard } from "./SectorAtlasCard";

export async function SectorShowcaseList() {
  const sectors = await getSectorsList();

  return (
    <div className="sector-atlas space-y-8 sm:space-y-10 lg:space-y-12">
      {sectors.map((sector, index) => (
        <SectorAtlasCard key={sector.id} sector={sector} index={index} />
      ))}
    </div>
  );
}
