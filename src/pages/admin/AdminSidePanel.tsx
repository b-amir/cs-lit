import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { TbUrgent } from "react-icons/tb";
import { archivo } from "@/styles/customFonts";
import { CgSpinner } from "react-icons/cg";
import { MdDone as Approve, MdClose as Dismiss } from "react-icons/md";
import { ActionMenu } from "./ActionMenu";
import { useUpdateItem } from "@/hooks/useUpdateItem";
import Link from "next/link";
import { routeHandler } from "@/utils/routeHandler";

export function AdminSidePanel() {
  const {
    data: pendingData,

    hasNextPage: pendingsHasNextPage,
    fetchNextPage: fetchNextpendingPage,
    isFetchingNextPage: isFetchingNextpendingPage,
  } = api.pending.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  return (
    <div
      id="admin-sidepanel"
      className="relative z-20 mx-auto h-full w-1/4   overflow-x-clip  border  border-[#b5b5b511] bg-[#f6f6f6] transition-all"
    >
      <div
        id="urgent-header"
        className="flex h-[96px] w-full select-none flex-col justify-between  rounded-sm border-b border-b-[#5555552a] bg-gradient-to-br from-[#fff] to-[#f7f3ee00] px-6  py-4"
      >
        <h1
          className={`${archivo.className}   flex flex-row items-center  gap-1 text-3xl font-bold`}
        >
          <TbUrgent className="mb-0.5" /> Urgent
        </h1>
        <div className="w-full  pt-1 text-xs font-light text-[#7a6a55]">
          following items need your attention.
        </div>
      </div>

      <div className="h-[calc(100dvh-20dvh-90px-96px)] overflow-y-auto">
        {pendingData?.pages?.map((page) =>
          page?.items?.map((item) => (
            <PendingItemView key={item.id} item={item} />
          ))
        )}

        {pendingData?.pages[0]?.items.length === 0 && (
          <div className="flex w-full items-center justify-center ">
            <p className="select-none py-10 text-sm text-gray-400">
              Nothing is pending.
            </p>
          </div>
        )}

        {/* {console.log(pendingData)} */}

        {pendingsHasNextPage && (
          <button
            onClick={() => fetchNextpendingPage()}
            disabled={isFetchingNextpendingPage}
            className="w-full"
          >
            <div className="flex w-full items-center justify-center border-t border-t-[#55555538] bg-transparent py-6 font-semibold text-gray-500 shadow-[0px_2px_3px_0px_#00000009_inset] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#2c2c2c0c] hover:to-transparent hover:text-gray-800">
              {isFetchingNextpendingPage ? (
                // TODO: fix spinning issue
                <CgSpinner className="animate-spin " />
              ) : (
                "Load more"
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export function PendingItemView({ item }) {
  const [showActionMenuDots, setShowActionMenuDots] = useState(false);
  const [showExtendedActionMenu, setShowExtendedActionMenu] = useState(false);
  const [itemCopy, setItemCopy] = useState(null);

  const itemType = item?.topicId ? "Analogies" : "Topics";
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
      className=" flex h-14 w-full cursor-pointer flex-row items-center  justify-between border-b-[1px] border-[#00000012] py-6 pl-6 transition-all hover:bg-[#00000012]"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-col items-start justify-start overflow-clip ">
        <Link
          href={`${routeHandler(item, itemType)}  `}
          className="w-11/12 overflow-clip overflow-ellipsis whitespace-nowrap"
        >
          <h1
            className={`${
              showExtendedActionMenu ? "max-w-[10%]" : "w-full"
            }  font  truncate  pt-2 text-xs font-semibold`}
          >
            {item.title ? item.title : item.name ? item.name : item.id}
          </h1>
        </Link>
        <span className="mt-1 text-xs text-gray-400">in {itemType}</span>
      </div>
      <div className={`${showActionMenuDots ? "visible " : "hidden"}  `}>
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
