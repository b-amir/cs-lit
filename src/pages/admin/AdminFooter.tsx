import React from "react";
import { TbActivity } from "react-icons/tb";
import { archivo } from "@/styles/customFonts";
import { IoIosArrowUp } from "react-icons/io";

export interface IAdminFooterProps {
  AdminFooterCollapsed: boolean;
  setAdminFooterCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdminFooter({
  AdminFooterCollapsed,
  setAdminFooterCollapsed,
}: IAdminFooterProps) {
  return (
    <div
      id="admin-footer"
      className={`absolute bottom-0 z-20 w-4/6 border-t border-t-[#cbcbcb]  bg-[#e3e3e3] transition-all ${
        AdminFooterCollapsed
          ? "h-8 shadow-sm"
          : "h-[20dvh] shadow-[0px_-1.5px_2px_0px_#00000010]"
      }`}
    >
      <div
        id="activity-log-header"
        className={`${archivo.className} mx-auto flex h-8 w-[calc(100%-1px)] cursor-pointer flex-row items-center justify-center rounded-sm border-r border-[#5555552a] bg-[#f3f3f3] text-sm font-bold shadow-sm transition-all hover:bg-[#fdfdfd] `}
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
        <div id="activity-log-list " className="w-full p-4">
          <div className="mx-auto w-[98%] text-sm text-gray-600">
            Amir Bazgir Deleted a post:{" "}
          </div>
        </div>
      )}
    </div>
  );
}
