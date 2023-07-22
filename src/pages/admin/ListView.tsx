import React, { useState } from "react";
import { ActionMenu } from "./ActionMenu";
import { useDeleteItem } from "@/hooks/useDeleteItem";

import { archivo } from "@/styles/customFonts";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";
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
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
}
export function ListView({
  data,
  title,
  hasNextPage,
  fetchNextPage,
  isfetchingNextPage,
  setEditorModalInput,
  setEditorModalShown,
  setOrderBy,
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
              className="mr-2 max-w-[60%] rounded-md border border-[#6e3c2024] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6e3d2047]"
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

function RadioOptions({ setOrderBy }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-md bg-[#6e3c2024] px-[0] py-1 text-sm text-[#2f2f2f]">
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
          className="flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center transition-all peer-checked:translate-x-1 peer-checked:border-[#00000045] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-gray-800 peer-checked:shadow-lg peer-checked:duration-200"
        >
          <TbSortDescending2 className="mb-[3px]" /> Newest
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
          className=" flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center transition-all peer-checked:-translate-x-1 peer-checked:border-[#00000045] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-gray-800 peer-checked:shadow-sm peer-checked:duration-200"
        >
          <TbSortAscending2 className="mb-[4px]" />
          Oldest
        </label>
      </div>
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
