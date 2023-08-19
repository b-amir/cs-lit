import React, { useState } from "react";
import { ActionMenu } from "./ActionMenu";
import { useDeleteItem } from "@/hooks/useDeleteItem";

import { archivo } from "@/styles/customFonts";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { MdOutlineModeEdit as Edit } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";
import Link from "next/link";
import { routeHandler } from "@/utils/routeHandler";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { LoadMoreButton } from "@/components/LoadMoreButton";

interface IListViewProps {
  type: string;
  data: any;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isfetchingNextPage: boolean;
  setEditorModalInput: React.Dispatch<React.SetStateAction<any>>;
  setEditorModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export function ListView({
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
    <div className=" relative z-20 mx-auto h-full  overflow-x-clip overflow-y-scroll  rounded-sm  bg-white px-0  transition-all ">
      <>
        <div className="flex flex-col gap-5  border-b border-[#5555552a] bg-gradient-to-tr from-[#f4e6e07d] to-[#f9ece57d] px-6 py-6 sm:px-16">
          <div
            id="count-title"
            className="flex flex-row items-center justify-start"
          >
            <span className="mr-3 rounded-md border border-[#73717180] bg-[#00000013] px-2 pt-0.5 text-sm text-gray-500 shadow-sm">
              {/* {data?.pages?.pageInfo.count ?? 0} */}
              {data?.pages ? data?.pages[0]?.total : 0}
            </span>
            <h1
              className={` ${archivo.className}  flex flex-row items-center gap-1 text-3xl font-bold`}
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

            <RadioOptions setOrderBy={setOrderBy} />
          </div>
        </div>
        <div className=" flex w-full flex-col ">
          <div className="flex w-full flex-col ">
            {data?.pages?.map((page) =>
              page?.items?.map((item) => (
                <ListItemView
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

function RadioOptions({ setOrderBy }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-md bg-[#6e3c2024] px-[0] py-1 text-xs text-[#2f2f2f] sm:text-sm">
      <div>
        <input
          type="radio"
          name="option"
          id="newest"
          value="newest"
          className="peer hidden"
          defaultChecked
          onClick={() => setOrderBy("desc")}
        />
        <label
          htmlFor="newest"
          className="flex cursor-pointer select-none flex-row items-center
           justify-center gap-1 rounded-md border border-transparent 
           px-3 py-1 text-center transition-transform peer-checked:translate-x-1
            peer-checked:border-[#00000045] 
            peer-checked:bg-gradient-to-r peer-checked:from-[#fff] peer-checked:to-[#f0efef]
             peer-checked:font-bold peer-checked:text-gray-800 
             peer-checked:shadow-lg peer-checked:duration-200"
        >
          <TbSortDescending2 className="mb-[3px] hidden sm:flex" /> Newest
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="option"
          id="oldest"
          value="oldest"
          className="peer hidden"
          onClick={() => setOrderBy("asc")}
        />
        <label
          htmlFor="oldest"
          className=" flex cursor-pointer select-none flex-row items-center 
          justify-center gap-1 rounded-md border border-transparent px-3 py-1 
          text-center transition-transform peer-checked:-translate-x-1
           peer-checked:border-[#00000045] 
           peer-checked:bg-gradient-to-l peer-checked:from-[#fff] peer-checked:to-[#f0efef]
           peer-checked:font-bold peer-checked:text-gray-800 
           peer-checked:shadow-sm peer-checked:duration-200
           "
        >
          <TbSortAscending2 className="mb-[4px] hidden sm:flex" />
          Oldest
        </label>
      </div>
    </div>
  );
}

export function ListItemView({
  item,
  type,
  setEditorModalInput,
  setEditorModalShown,
}) {
  const [showActionMenuDots, setShowActionMenuDots] = useState(false);

  const deleteItem = useDeleteItem(item, type);

  return (
    <div
      className="z-0 flex h-8 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-gray-100  py-6 pl-16 transition-all hover:bg-gray-100"
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
