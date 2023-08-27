import { InfoRowSection } from "@/components/Analogy/InfoRowSection";
import { type Analogy as AnalogyType } from "@prisma/client";

export function InfoSection({
  singleAnalogyData,
}: {
  singleAnalogyData: AnalogyType;
}) {
  return (
    <div className="mb-auto mt-8 rounded-md bg-[#d7d7d7] px-2 py-2  sm:rounded-[23px] sm:px-6">
      <InfoRowSection
        needsLocationInfo={false}
        analogyData={singleAnalogyData}
      />
    </div>
  );
}
