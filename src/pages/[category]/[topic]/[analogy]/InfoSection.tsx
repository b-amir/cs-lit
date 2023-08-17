import { AnalogyInfoRow } from "@/components/AnalogyView";
import { type Analogy } from "@prisma/client";

export function InfoSection({
  singleAnalogyData,
}: {
  singleAnalogyData: Analogy;
}) {
  return (
    <div className="mb-auto mt-8 rounded-md bg-[#d7d7d7] px-2 py-2  sm:rounded-[23px] sm:px-6">
      <AnalogyInfoRow
        needsLocationInfo={false}
        analogyData={singleAnalogyData}
      />
    </div>
  );
}
