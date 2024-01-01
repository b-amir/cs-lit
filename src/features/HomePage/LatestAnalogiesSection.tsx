import { api } from "@/utils/api";
import { AnalogiesFeed } from "@/components/AnalogiesFeed";
import { AnalogySkeleton } from "@/components/Loading/Skeleton";

export function LatestAnalogiesSection() {
  const {
    data: latestAnalogies,
    status: analogiesFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.analogy.getAll.useInfiniteQuery(
    {
      order: "desc",
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div className="col-span-2 ">
      {analogiesFetchingStatus === "loading" ? (
        <>
          <AnalogySkeleton />
          <AnalogySkeleton />
          <AnalogySkeleton />
        </>
      ) : (
        <AnalogiesFeed
          setAnalogyInput={() => {}}
          // @ts-ignore
          analogies={latestAnalogies}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchingStatus={analogiesFetchingStatus}
          isProfile
        />
      )}
    </div>
  );
}
