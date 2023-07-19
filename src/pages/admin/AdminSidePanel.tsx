import React from "react";
import { api } from "@/utils/api";
import { TbUrgent } from "react-icons/tb";
import { archivo } from "@/styles/customFonts";
import { CgSpinner } from "react-icons/cg";
import { IoClose, IoCheckmark, IoEyeOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDone, MdClose, MdOutlineOpenInNew } from "react-icons/md";

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
      className="relative z-20 mx-auto h-full w-1/4   overflow-x-clip  border  border-[#b5b5b511] bg-[#f7f3ee] transition-all"
    >
      <div
        id="urgent-header"
        className="flex h-[96px] w-full flex-col justify-between  rounded-sm border-b border-b-[#5555552a] bg-gradient-to-br from-[#fff] to-[#f7f3ee00] px-6  py-4"
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

        {pendingsHasNextPage && (
          <button
            onClick={() => fetchNextpendingPage()}
            disabled={isFetchingNextpendingPage}
            className="w-full"
          >
            <div className="flex w-full items-center justify-center border-t border-t-[#55555538] bg-transparent py-6 font-semibold text-gray-500 shadow-[0px_2px_3px_0px_#00000009_inset] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#2c2c2c0c] hover:to-transparent hover:text-gray-800">
              {isFetchingNextpendingPage ? (
                // TODO: fix spinning issue
                <CgSpinner className="scale-150 transform  animate-spin " />
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
  const [showActionMenuDots, setShowActionMenuDots] = React.useState(false);
  const [showExtendedActionMenu, setShowExtendedActionMenu] =
    React.useState(false);
  return (
    <div
      className=" flex h-8 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-[#00000012] px-6 py-6 transition-all hover:bg-[#00000012]"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-row items-center overflow-clip overflow-ellipsis whitespace-nowrap">
        <h1
          className={`${
            showExtendedActionMenu ? "max-w-[10%]" : "w-full"
          }  font  text-sm font-bold`}
        >
          {item.title ? item.title : item.name ? item.name : item.id}
        </h1>
        <span className="ml-2 text-sm text-gray-500">
          {item?.category ?? ""}
        </span>
      </div>
      <div className={`${showActionMenuDots ? "visible " : "hidden"}  `}>
        {" "}
        <ActionMenu
          className=" "
          showExtendedActionMenu={showExtendedActionMenu}
          setShowExtendedActionMenu={setShowExtendedActionMenu}
        />
      </div>
    </div>
  );
}

export function ActionMenu({
  showExtendedActionMenu,
  setShowExtendedActionMenu,
}) {
  return (
    <div
      id="action-menu"
      className="flex flex-row items-center rounded-lg border border-transparent transition-all hover:border-[#5555552a] hover:bg-[#ffffff] hover:shadow-sm"
      onMouseLeave={() => setShowExtendedActionMenu(false)}
    >
      {showExtendedActionMenu && (
        <div
          id="action-menu-items"
          className="flex flex-row items-center rounded-l-lg bg-[#ffffff] p-2"
        >
          <MdClose className="mx-2 cursor-pointer text-[#c83535] hover:text-[#cd8a8a]" />
          <MdOutlineOpenInNew className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400" />
          <MdDone className="mx-2 cursor-pointer text-green-600 hover:text-green-400" />
        </div>
      )}

      <button
        onClick={() => setShowExtendedActionMenu(!showExtendedActionMenu)}
      >
        <HiOutlineDotsVertical
          className={`h-8 w-8 cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-[#ffffff6c] ${
            showExtendedActionMenu ? "rounded-l-none" : ""
          }`}
        />
      </button>
    </div>
  );
}
