import React from "react";
import { api } from "@/utils/api";
import { TbActivity } from "react-icons/tb";
import { CgSpinner } from "react-icons/cg";
import { archivo } from "@/styles/customFonts";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDone, MdClose, MdOutlineOpenInNew } from "react-icons/md";
import { date } from "zod";

export interface IAdminFooterProps {
  AdminFooterCollapsed: boolean;
  setAdminFooterCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdminFooter({
  AdminFooterCollapsed,
  setAdminFooterCollapsed,
}: IAdminFooterProps) {
  const {
    data: activityData,
    hasNextPage: activityHasNextPage,
    fetchNextPage: fetchNextActivityPage,
    isFetchingNextPage: isFetchingNextActivityPage,
  } = api.activity.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  return (
    <div
      id="admin-footer"
      className={`absolute bottom-0 z-20 w-4/6 border-t border-t-[#cbcbcb]  bg-[#f7f7f7] transition-all ${
        AdminFooterCollapsed
          ? "h-8 shadow-sm"
          : "h-[20dvh]  shadow-[0px_-1.5px_2px_1px_#00000008]"
      }`}
    >
      <div
        id="activity-log-header"
        className={`${archivo.className} mx-auto flex h-[1.95rem] w-[calc(100%-1px)] cursor-pointer flex-row items-center justify-center border-b border-r border-b-[#4b4b4b3c] border-r-[#5555551d] bg-[#f1f1f1] bg-gradient-to-b from-[#f0f0f0] to-[#ffffff4f] text-sm font-bold shadow-sm transition-all hover:bg-[#dddddd] `}
        onClick={() => setAdminFooterCollapsed(!AdminFooterCollapsed)}
      >
        <TbActivity className="mb-0 mr-1 " /> Activity Log{" "}
        <IoIosArrowUp
          className={`mb-0 ml-1 scale-75 text-gray-400 transition-all delay-300  ${
            AdminFooterCollapsed ? "" : "rotate-180"
          }`}
        />
      </div>
      {!AdminFooterCollapsed && (
        <div
          id="activity-log-list "
          className="h-[calc(20dvh-2.05rem)] w-full overflow-y-scroll "
        >
          <div className="mx-auto w-full text-sm text-gray-600">
            {activityData?.pages?.map((page) =>
              page?.items?.map((item) => (
                <ActivityItemView key={item.id} item={item} />
              ))
            )}

            {activityHasNextPage && (
              <button
                onClick={() => fetchNextActivityPage()}
                disabled={isFetchingNextActivityPage}
                className="w-full"
              >
                <div className="flex w-full items-center justify-center  border-t border-t-[#55555538] bg-transparent py-2 font-semibold text-gray-500 shadow-[0px_2px_3px_0px_#00000009_inset] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#2c2c2c0c] hover:to-transparent hover:text-gray-800">
                  {isFetchingNextActivityPage ? (
                    // TODO: fix spinning issue
                    <CgSpinner className=" animate-spin " />
                  ) : (
                    "Load more"
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ActivityItemView({ item }) {
  const { data: userData } = api.profile.getProfileById.useQuery({
    id: item.userId as string,
  });

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
        {new Date(item.timestamp).toLocaleString()}
      </span>
    </div>
  );
}
