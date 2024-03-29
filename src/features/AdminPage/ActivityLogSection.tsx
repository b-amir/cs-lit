import React from "react";
import { api } from "@/utils/api";
import { TbActivity } from "react-icons/tb";
import { archivo } from "@/styles/customFonts";
import { IoIosArrowUp } from "react-icons/io";
import { RelativeTime } from "@/utils/relativeTime";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import {
  type IActivityLogItemProps,
  type IActivityLogSectionProps,
} from "./types";

export function ActivityLogSection({
  collapsed,
  setCollapsed,
}: IActivityLogSectionProps) {
  return (
    <div
      id="admin-footer"
      className={` bottom-0 z-20 w-full flex-col border-t border-t-[#cbcbcb] bg-[#f6f6f6] transition-all sm:absolute sm:w-4/6 ${
        collapsed
          ? "h-14 shadow-sm"
          : "h-[20dvh] shadow-[0px_-1.5px_2px_1px_#00000008]"
      }`}
    >
      <div
        id="activity-log-header"
        className={`${
          archivo.className
        } mx-auto flex w-[calc(100%-0px)] cursor-pointer flex-row items-center justify-center border-b border-b-[#4b4b4b3c] bg-[#ededed] text-sm font-bold text-gray-700 shadow-sm transition-all transition-all hover:bg-[#dfdfdf] ${
          collapsed ? "h-14" : "h-8"
        } `}
        onClick={() => setCollapsed(!collapsed)}
      >
        <TbActivity className="mb-0 mr-1 " /> Activity Log{" "}
        <IoIosArrowUp
          className={`mb-0 ml-1 scale-75 text-gray-400 transition-all delay-300 ${
            collapsed ? "" : "rotate-180"
          }`}
        />
      </div>
      {!collapsed && <ActivityLogs />}
    </div>
  );
}

function ActivityLogs() {
  const {
    data: activityData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.activity.getAll.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  return (
    <div
      id="activity-log-list "
      className="h-[calc(20dvh-2.05rem)] w-full overflow-y-scroll "
    >
      <div className="mx-auto w-full text-sm text-gray-600">
        {activityData?.pages?.map((page) =>
          page?.items?.map((item) => (
            <SingleActivityLogItem key={item.id} item={item} />
          ))
        )}

        {hasNextPage && (
          <LoadMoreButton
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
}

export function SingleActivityLogItem({ item }: IActivityLogItemProps) {
  const { data: userData } = api.profile.getProfileById.useQuery(
    {
      id: item.userId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div className=" flex h-8 w-full flex-row items-center justify-between border-b-[1px] border-[#00000012] px-6 py-4 transition-all hover:bg-[#00000012]">
      <div className="flex flex-row items-center justify-between overflow-clip overflow-ellipsis whitespace-nowrap">
        <h1 className={`w-full text-xs text-gray-500`}>
          <span className="font-bold ">{userData?.name} </span>
          <span className="">
            {item.action} this {item.entityType}:{" "}
          </span>

          <span className="font-bold">{item.entityTitle}</span>
        </h1>
      </div>
      <span className="ml-2 text-xs text-gray-500">
        {RelativeTime(item.timestamp)}
      </span>
    </div>
  );
}
