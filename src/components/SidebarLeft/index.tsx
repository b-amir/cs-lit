import { useSession } from "next-auth/react";
import { SidebarCategoriesSection } from "./SidebarCategoriesSection";
import { AddCategorySection } from "./AddCategorySection";
import { LogoSection } from "./LogoSection";
import { IoClose } from "react-icons/io5";

export function SidebarLeft({ visible, hide }) {
  const { data: sessionData } = useSession();

  return (
    <div className="flex ">
      <aside
        id="left-sidebar"
        className={`fixed left-0 top-0 z-50 flex h-screen w-9/12  flex-col place-content-stretch items-stretch justify-between 
    border-r border-white bg-white pt-0 shadow-md transition-transform  duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 sm:w-1/6 
   ${visible ? "translate-x-0" : "-translate-x-full"}
    `}
        aria-label="Sidebar"
      >
        <LogoSection />

        <div className="align-around h-full overflow-y-auto  bg-white px-0 pb-0 dark:bg-gray-800">
          <SidebarCategoriesSection />
        </div>
        {["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
          <AddCategorySection />
        )}
      </aside>

      {visible && (
        <div
          className="absolute right-0 top-0 z-[49] h-screen w-screen bg-[#0000003c] backdrop-blur-md sm:hidden"
          onClick={hide}
        >
          <IoClose
            className="absolute right-4 top-4 h-10 w-10 cursor-pointer text-[#4f4e4d97] hover:text-[#4f4e4dee]"
            onClick={(e) => {
              e.preventDefault();
              hide;
            }}
          />
        </div>
      )}
    </div>
  );
}
