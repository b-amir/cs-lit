import React, { useState } from "react";
import { ActionMenu } from "./ActionMenu";
import { useDeleteItem } from "@/hooks/useDeleteItem";

import { archivo } from "@/styles/customFonts";
import { LuList } from "react-icons/lu";
import { MdAccessTime, MdOutlineModeEdit } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IListViewProps {
  title: string;
  data: any;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isfetchingNextPage: boolean;
  setEditorModalInput: React.Dispatch<React.SetStateAction<any>>;
  setEditorModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ListView({
  data,
  title,
  hasNextPage,
  fetchNextPage,
  isfetchingNextPage,
  setEditorModalInput,
  setEditorModalShown,
}: IListViewProps) {
  return (
    <div className=" relative z-20 mx-auto h-full  overflow-x-clip overflow-y-scroll  rounded-sm  bg-white px-0  transition-all ">
      <>
        <div className="flex flex-col gap-5  border-b border-[#5555552a] bg-gradient-to-tr from-[#f4e6e07d] to-[#f9ece57d] px-16 py-6">
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
              {title}
            </h1>
          </div>
          <div
            id="filters"
            className="flex w-full flex-row items-center justify-between"
          >
            <input
              type="text"
              placeholder="Search"
              className="mr-2 max-w-[60%] rounded-md border border-[#00000030] px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />

            <div className="grid grid-cols-2 gap-2 rounded-md bg-[#00000030] px-[2.5px] py-0.5 text-sm text-[#2f2f2f]">
              <div>
                <input
                  type="radio"
                  name="option"
                  id="all"
                  value="All"
                  className="peer hidden"
                  checked
                />
                <label
                  htmlFor="all"
                  className=" flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center peer-checked:border-[#0000006d] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-black peer-checked:shadow-sm"
                >
                  <LuList className="mb-[4px]" />
                  All
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="option"
                  id="pending"
                  value="Pending"
                  className="peer hidden"
                />
                <label
                  htmlFor="pending"
                  className="flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center peer-checked:border-[#0000006d] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-black peer-checked:shadow-sm"
                >
                  <MdAccessTime className="mb-[3px]" /> Pending
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex w-full flex-col ">
          <div className="flex w-full flex-col ">
            {data?.pages?.map((page) =>
              page?.items?.map((item) => (
                <ListItemView
                  key={item.id}
                  item={item}
                  title={title}
                  setEditorModalInput={setEditorModalInput}
                  setEditorModalShown={setEditorModalShown}
                />
              ))
            )}
          </div>
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isfetchingNextPage}
            >
              <div className="flex w-full items-center justify-center border-t border-t-[#55555538] bg-[#fff] py-6 font-semibold text-gray-500 shadow-[0px_2px_3px_0px_#00000010_inset] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#efefef7b] hover:to-white hover:text-gray-800">
                {isfetchingNextPage ? (
                  // TODO: fix spinning issue
                  <CgSpinner className="scale-150 transform  animate-spin " />
                ) : (
                  "Load more"
                )}
              </div>
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export function ListItemView({
  item,
  title,
  setEditorModalInput,
  setEditorModalShown,
}) {
  const [showActionMenuDots, setShowActionMenuDots] = useState(false);

  const deleteItem = useDeleteItem(item, title);

  return (
    <div
      className="z-0 flex h-8 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-gray-100  py-6 pl-16 transition-all hover:bg-gray-100"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-row items-center overflow-clip overflow-ellipsis whitespace-nowrap">
        <h1 className={`font text-sm font-bold`}>
          {item.title ? item.title : item.name ? item.name : item.id}
        </h1>
        <span className="ml-2 text-sm text-gray-500">{item?.status ?? ""}</span>
      </div>
      <div className={`${showActionMenuDots ? "visible" : "hidden"} `}>
        <ActionMenu>
          <RiDeleteBin6Line
            className="mx-2 cursor-pointer text-[#c83535] hover:text-[#cd8a8a]"
            onClick={() => deleteItem()}
          />
          <MdOutlineModeEdit
            className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400"
            onClick={() => {
              setEditorModalShown(true);
              setEditorModalInput({ type: title, item: item });
            }}
          />
        </ActionMenu>
      </div>
    </div>
  );
}