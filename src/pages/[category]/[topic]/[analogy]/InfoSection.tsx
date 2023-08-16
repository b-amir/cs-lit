import { AnalogyInfoRow } from "@/components/AnalogyView";
import { type Analogy } from "@prisma/client";

export function InfoSection({
  singleAnalogyData,
}: {
  singleAnalogyData: Analogy;
}) {
  return (
    <div className="mb-auto mt-8 rounded-[23px] bg-[#d7d7d7]  px-6 py-2">
      <AnalogyInfoRow
        needsLocationInfo={false}
        analogyData={singleAnalogyData}
      />
    </div>
  );
}
