import Link from "next/link";
import React, { useState } from "react";
import { archivo } from "@/styles/customFonts";
import { ActionMenu } from "./ActionMenu";
import { routeHandler } from "@/utils/routeHandler";
import { OrderByInput } from "./OrderByInput";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { MdOutlineModeEdit as Edit } from "react-icons/md";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";
import { type IListItemProps, type IListViewProps } from "./types";

export function AdminMainList({
  data,
  type,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setEditorModalInput,
  setEditorModalShown,
  setOrderBy,
  searchQuery,
  setSearchQuery,
}: IListViewProps) {
  return (
    <div className=" relative z-20 mx-auto h-full overflow-x-clip overflow-y-scroll rounded-sm bg-white px-0 transition-all ">
      <>
        <div className="flex flex-col gap-5 border-b border-[#5555552a] bg-gradient-to-tr from-[#f4e6e07d] to-[#f9ece57d] px-6 py-6 sm:px-16">
          <div
            id="count-title"
            className="flex flex-row items-center justify-start"
          >
            <span className="mr-3 rounded-md border border-[#73717180] bg-[#00000013] px-2 pt-0.5 text-sm text-gray-500 shadow-sm">
              {/* {data?.pages?.pageInfo.count ?? 0} */}
              {data?.pages ? data?.pages[0]?.total : 0}
            </span>
            <h1
              className={` ${archivo.className} flex flex-row items-center gap-1 text-3xl font-bold`}
            >
              {type}
            </h1>
          </div>
          <div
            id="filters"
            className="flex w-full flex-row items-center justify-between"
          >
            <input
              type="text"
              placeholder="Search"
              className="mr-2 max-w-[60%] rounded-md border border-[#6e3c2024] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6e3d2047]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <OrderByInput setOrderBy={setOrderBy} />
          </div>
        </div>
        <div className=" flex w-full flex-col ">
          <div className="flex w-full flex-col ">
            {data?.pages?.map((page) =>
              page?.items?.map((item) => (
                <AdminMainListItem
                  key={item.id}
                  item={item}
                  type={type}
                  setEditorModalInput={setEditorModalInput}
                  setEditorModalShown={setEditorModalShown}
                />
              ))
            )}
          </div>
          {hasNextPage && (
            <LoadMoreButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      </>
    </div>
  );
}
export function AdminMainListItem({
  item,
  type,
  setEditorModalInput,
  setEditorModalShown,
}: IListItemProps) {
  const [showActionMenuDots, setShowActionMenuDots] = useState(false);

  const deleteItem = useDeleteItem(item, type);

  return (
    <div
      className="z-0 flex h-8 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-gray-100 py-6 pl-16 transition-all hover:bg-gray-100"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-row items-center overflow-clip overflow-ellipsis whitespace-nowrap">
        <Link href={`${routeHandler(item, type)}`}>
          <h1 className={`font max-w-[360px] truncate text-sm font-bold`}>
            {item.title
              ? item.title
              : item.content
              ? item.content
              : item.name
              ? item.name
              : item.id}
          </h1>
        </Link>
      </div>
      <span className={`${showActionMenuDots ? "hidden" : "visible"} mr-14`}>
        {getStatusIcon(item.status)}
      </span>
      <div className={`${showActionMenuDots ? "visible" : "hidden"} `}>
        <ActionMenu>
          <Delete
            className="mx-2 cursor-pointer text-[#c83535] hover:text-[#cd8a8a]"
            onClick={() => deleteItem()}
          />
          <Edit
            className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400"
            onClick={() => {
              setEditorModalShown(true);
              setEditorModalInput({ type: type, item: item });
            }}
          />
        </ActionMenu>
      </div>
    </div>
  );
}
