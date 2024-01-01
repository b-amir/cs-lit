import Link from "next/link";
import { api } from "@/utils/api";
import { routeHandler } from "@/utils/routeHandler";
import { FullWidthSkeleton } from "@/components/Loading/Skeleton";
import { MdTopic as TopicIcon } from "react-icons/md";

export function LatestTopicsSection() {
  const { data: latestTopics, status: topicsFetchingStatus } =
    api.topic.getAllWithQuery.useInfiniteQuery(
      {
        order: "desc",
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  return (
    <div className="col-span-3 flex w-full flex-col pb-8 sm:col-span-1 sm:pb-0">
      <div className="ml-1 flex w-full items-center justify-start gap-1.5 pb-6 pt-2 text-sm font-bold text-gray-800 ">
        <span className="flex select-none items-center gap-1.5 rounded-3xl border border-neutral-300 bg-neutral-200 px-4 py-2 text-xs font-semibold">
          <TopicIcon className="mb-0.5" /> Recent Topics
        </span>
      </div>

      {topicsFetchingStatus === "loading" ? (
        <>
          <FullWidthSkeleton />
          <FullWidthSkeleton />
          <FullWidthSkeleton />
          <FullWidthSkeleton />
          <FullWidthSkeleton />
        </>
      ) : (
        <div className="flex flex-col items-start overflow-clip ">
          {latestTopics?.pages?.map((page) =>
            page?.items?.map((item) => (
              <Link
                href={`${routeHandler(item, "Topics")}`}
                className="flex w-full cursor-pointer flex-row items-center gap-x-4 border-b border-[#cfcfcf7e] px-2 py-2 text-sm transition-all last:border-b-0 hover:rounded-sm hover:bg-[#cfcfcf86]"
              >
                <h1 className="max-w-[50%] truncate font-semibold text-gray-700">
                  {item.title}
                </h1>
                <p className=" max-w-[40%] truncate text-xs text-gray-500">
                  in {item.category?.name}
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
