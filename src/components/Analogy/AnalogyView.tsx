import React from "react";
import { HeaderSection } from "./HeaderSection";
import { InfoRowSection } from "./InfoRowSection";
import { ContentSection } from "./ContentSection";
import { type IAnalogyBodyProps } from "./types";

export function AnalogyView({ ...AnalogyProps }: IAnalogyBodyProps) {
  //
  const {
    analogy,
    analogyData,
    analogyStatus,
    needsInfoRow,
    needsLocationInfo,
    setAnalogyInput,
    votingAverage,
    votingStatus,
  } = AnalogyProps;

  return (
    <div
      key={analogy?.id}
      className=" z-20  mx-auto my-5 flex  w-full max-w-[705px] flex-col overflow-clip rounded-[17px] border border-gray-200 bg-white px-0 py-0 shadow-lg transition-all hover:border-[#c1c1c1] "
    >
      <HeaderSection
        analogy={analogy}
        analogyData={analogyData}
        analogyStatus={analogyStatus}
        votingAverage={votingAverage}
        votingStatus={votingStatus}
      />
      <ContentSection analogyData={analogyData} analogyStatus={analogyStatus} />

      {needsInfoRow ? (
        <div
          id="analogy-chin"
          className="flex h-12 w-full cursor-default items-center justify-start rounded-b-[17px] border-t bg-gray-50 px-1 shadow-[inset_0px_3px_1px_0px_#00000003]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <InfoRowSection
            needsLocationInfo={needsLocationInfo}
            analogyData={analogyData}
            setAnalogyInput={setAnalogyInput}
          />
        </div>
      ) : null}
    </div>
  );
}
