import { getSectorsList } from "@/lib/data/sectors";
import { SectorAtlas } from "./SectorAtlas";

export async function SectorShowcaseList() {
  const sectors = await getSectorsList();
  return <SectorAtlas sectors={sectors} />;
}
