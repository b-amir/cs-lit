// @ts-nocheck
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { archivo } from "@/styles/customFonts";
import { ActionMenu } from "./components/ActionMenu";
import { routeHandler } from "@/utils/routeHandler";
import { useUpdateItem } from "@/hooks/CRUD/useUpdateItem";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { TbUrgent as UrgentIcon } from "react-icons/tb";
import { MdDone as Approve, MdClose as Dismiss } from "react-icons/md";
import { type IPendingItemProps, type PendingItem } from "./types";

export function PendingSection({
  ActivityLogSectionCollapsed,
}: {
  ActivityLogSectionCollapsed: boolean;
}) {
  return (
    <div
      id="admin-sidepanel"
      className="relative z-20 mx-auto  h-[calc(100dvh-2rem-90px)] w-full overflow-x-clip overflow-y-clip border border-[#b5b5b511] bg-[#f6f6f6] transition-all sm:max-h-none sm:w-1/4"
    >
      <div
        id="pending-header"
        className="flex h-[96px] w-full select-none flex-col justify-between rounded-sm border-b border-b-[#5555552a] bg-gradient-to-br from-white to-[#f7f3ee00] px-6 py-4"
      >
        <h1
          className={`${archivo.className} flex flex-row items-center gap-1 text-2xl font-bold`}
        >
          <UrgentIcon className="mb-0.5" /> Pending
        </h1>
        <div className="w-full pt-1 text-xs font-light text-[#7a6a55]">
          following items need your attention.
        </div>
      </div>

      <PendingItems ActivityLogSectionCollapsed={ActivityLogSectionCollapsed} />
    </div>
  );
}

function PendingItems({
  ActivityLogSectionCollapsed,
}: {
  ActivityLogSectionCollapsed: boolean;
}) {
  const {
    data: pendingData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.pending.getAll.useInfiniteQuery(
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
      className={` flex h-full  w-full flex-col overflow-y-scroll ${
        ActivityLogSectionCollapsed
          ? "h-[calc(100dvh-3.5rem-90px-96px)]"
          : "h-[calc(100dvh-20dvh-90px-96px)]"
      }`}
    >
      {pendingData?.pages?.map((page) =>
        page?.items?.map((item) => (
          <SinglePendingItem key={item.id} item={item} />
        ))
      )}

      {pendingData?.pages[0]?.items.length === 0 && (
        <div className="flex w-full items-center justify-center ">
          <p className="select-none py-10 text-sm text-gray-400">
            Nothing is pending.
          </p>
        </div>
      )}

      {hasNextPage && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export function SinglePendingItem({ item }: IPendingItemProps) {
  const [showActionMenuDots, setShowActionMenuDots] = useState(false);
  const [showExtendedActionMenu] = useState(false);
  const [itemCopy, setItemCopy] = useState<PendingItem | null>(null);

  const itemType = item?.topicId
    ? "Analogies"
    : item?.analogyId
    ? "Comments"
    : item?.starterId
    ? "Topics"
    : "Categories";

  const updateItem = useUpdateItem(itemCopy, itemType);

  const handleStatusUpdate = (newStatus: string) => {
    setItemCopy({ ...item, status: newStatus });
  };

  useEffect(() => {
    if (itemCopy) {
      updateItem();
      setItemCopy(null);
    }
  }, [itemCopy, updateItem]);

  return (
    <div
      className=" flex h-14 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-[#00000012] py-6 pl-6 transition-all hover:bg-[#00000012]"
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-col items-start justify-start overflow-clip ">
        <Link
          href={`${routeHandler(item, itemType) ?? ""} `}
          className="w-11/12 overflow-clip overflow-ellipsis whitespace-nowrap"
        >
          <h1
            className={`${
              showExtendedActionMenu ? "max-w-[10%]" : "w-full"
            } font truncate pt-2 text-xs font-semibold`}
          >
            {item.title
              ? item.title
              : item.content
              ? item.content
              : item.name
              ? item.name
              : item.id}
          </h1>
        </Link>
        <span className="mt-1 text-xs text-gray-400">in {itemType}</span>
      </div>
      <div className={`${showActionMenuDots ? "visible " : "hidden"} `}>
        <ActionMenu>
          <Dismiss
            className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400"
            onClick={() => handleStatusUpdate("REJECTED")}
          />
          <Approve
            className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400"
            onClick={() => handleStatusUpdate("PUBLISHED")}
          />
        </ActionMenu>
      </div>
    </div>
  );
}
