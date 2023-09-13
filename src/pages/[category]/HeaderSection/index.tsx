import React from "react";
import { archivo } from "@/styles/customFonts";
import { CgFolderAdd } from "react-icons/cg";
import { useAppDispatch } from "@/redux/hooks";
import { setPurpose, setShown } from "@/components/EditorForm/editorSlice";
import { type ICategoryHeaderProps } from "../types";

// ------------------ COMPONENTS ------------------ //
export function HeaderSection({
  categoryFetchingStatus,
  categoryData,
  setOrderBy,
  orderBy,
}: ICategoryHeaderProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-6 pb-6 pl-8 pt-28 sm:px-12 sm:pt-32 lg:px-[18%]">
      {categoryFetchingStatus === "loading" ? (
        <div className=" mb-4 h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" /> // category name skeleton
      ) : (
        <h1
          className={`${archivo.className} mb-4 max-w-[720px] items-start justify-start truncate whitespace-pre-wrap break-words text-2xl font-extrabold tracking-tight text-dark-2 ![line-height:1.1] sm:text-4xl lg:text-5xl `}
        >
          {categoryData?.name}
        </h1>
      )}
      <div className="flex flex-row items-center place-self-end pt-5 text-sm font-semibold text-dark-2">
        <div className="mr-0 inline-flex items-center">
          <label htmlFor="sort-by" className="min-w-fit">
            Sort by:
          </label>
          <select
            style={{
              paddingLeft: "0.8rem",
              paddingRight: "1.5rem",
              paddingTop: "0.35rem",
              height: "2rem",
              paddingBottom: "0.35rem",
              backgroundColor: "#fff",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%234a5568'%3E%3Cpath fill-rule='evenodd' d='M10.707 14.707a1 1 0 0 1-1.414 0L5.586 10.586a1 1 0 1 1 1.414-1.414L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat, no-repeat, no-repeat",
              backgroundPosition:
                "right 0.5em top 50%, right 1.5em top 50%, 0 0",
              backgroundSize: "0.65em auto, 1.5em auto, 100% 100%",
              transition: "all 0.2s ease-in-out",
              outline: "none",
            }}
            id="sort-by"
            name="sort-by"
            onChange={() => setOrderBy(orderBy === "desc" ? "asc" : "desc")}
            className="mx-2 inline-flex cursor-pointer appearance-none flex-row items-end rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(setPurpose("Create"));
            dispatch(setShown(true));
          }}
          className="mx-2 inline-flex h-8 flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1.5 text-sm transition-all hover:border-[#c8c8c8] hover:bg-white"
        >
          <CgFolderAdd className="mb-0.5 sm:mr-2" />{" "}
          <span className="hidden sm:flex"> Create topic</span>
        </button>
      </div>
    </div>
  );
}
