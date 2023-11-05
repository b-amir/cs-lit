import React from "react";
import { type OrderByProps } from "../types";
import {
  TbSortAscending2 as SortAscIcon,
  TbSortDescending2 as SortDescIcon,
} from "react-icons/tb";

export function OrderBy({ setOrderBy }: OrderByProps) {
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
          className="flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center transition-transform peer-checked:translate-x-1 peer-checked:border-[#00000045] peer-checked:bg-gradient-to-r peer-checked:from-white peer-checked:to-[#f0efef] peer-checked:font-bold peer-checked:text-gray-800 peer-checked:shadow-lg peer-checked:duration-200"
        >
          <SortDescIcon className="mb-[3px] hidden sm:flex" /> Newest
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
          className=" flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center transition-transform peer-checked:-translate-x-1 peer-checked:border-[#00000045] peer-checked:bg-gradient-to-l peer-checked:from-white peer-checked:to-[#f0efef] peer-checked:font-bold peer-checked:text-gray-800 peer-checked:shadow-sm peer-checked:duration-200"
        >
          <SortAscIcon className="mb-[4px] hidden sm:flex" />
          Oldest
        </label>
      </div>
    </div>
  );
}
