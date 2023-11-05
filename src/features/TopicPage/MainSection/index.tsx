import { AnalogiesFeed } from "@/components/AnalogiesFeed";
import { AnalogySkeleton } from "@/components/Loading/Skeleton";
import { type IMainSectionProps } from "../types";

export function MainSection({
  analogiesFetchingStatus,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  setAnalogyInput,
  topicAnalogies,
  topicFetchingStatus,
}: IMainSectionProps) {
  return (
    <>
      {topicFetchingStatus === "loading" ||
      analogiesFetchingStatus === "loading" ? (
        <>
          <AnalogySkeleton />
          <AnalogySkeleton />
          <AnalogySkeleton />
        </>
      ) : (
        <AnalogiesFeed
          analogies={topicAnalogies}
          hasNextPage={hasNextPage}
          fetchingStatus={analogiesFetchingStatus}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          setAnalogyInput={setAnalogyInput}
        />
      )}
    </>
  );
}
