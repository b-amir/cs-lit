import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { LogoSection } from "./LogoSection";
import { SidebarCategoriesSection } from "./SidebarCategoriesSection";

const AddCategorySection = dynamic(() =>
  import("./AddCategorySection").then((mod) => mod.AddCategorySection)
);

interface ISidebarLeftProps {
  visible: boolean;
  hide: () => void;
}
export function SidebarLeft({ visible, hide }: ISidebarLeftProps) {
  return (
    <div className="flex ">
      <aside
        id="left-sidebar"
        className={`fixed left-0 top-0 z-50 flex h-screen w-9/12 select-none flex-col place-content-stretch items-stretch justify-between border-r border-white bg-white pt-0 shadow-md transition-transform duration-300 ease-in-out sm:w-4/12 md:w-1/6 ${
          visible ? "translate-x-0" : "-translate-x-full"
        } `}
        aria-label="Sidebar"
      >
        <LogoSection />
        <div className="align-around h-full overflow-y-auto bg-white px-0 pb-0 ">
          <SidebarCategoriesSection hide={hide} />
        </div>
        <AddCategorySection />
      </aside>

      {visible && (
        <div
          className="fixed right-0 top-0 z-[49] h-screen w-screen overscroll-y-none bg-[#0000003c] backdrop-blur-md sm:hidden"
          onClick={hide}
        >
          <IoClose
            className={`absolute right-6 top-6 h-10 w-10 cursor-pointer p-[0.4rem] text-[#4f4e4d97] hover:text-[#4f4e4dee]`}
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
