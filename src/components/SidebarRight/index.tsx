import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { UserSection } from "../UserSection";
import { AiFillControl } from "react-icons/ai";
import { WidgetsSection } from "./WidgetsSection";

interface ISidebarRightProps {
  visible: boolean;
  hide: () => void;
}
export function SidebarRight({ visible, hide }: ISidebarRightProps) {
  const { data: sessionData } = useSession();

  return (
    <div className="flex ">
      <aside
        id="sidebar-right"
        className={`fixed right-0 top-0 z-50 flex h-screen w-9/12 flex-col place-content-stretch items-stretch justify-between border-l border-white bg-white pt-0 shadow-md transition-transform sm:w-4/12 md:w-1/6 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto bg-white pb-0">
          <UserSection />
          <WidgetsSection hide={hide} />
        </div>
        {["ADMIN", "EDITOR"].includes(sessionData?.user.role ?? "") && (
          <AdminLink />
        )}
      </aside>

      {visible && (
        <div
          className="fixed right-0 top-0 z-[49] h-screen w-screen overscroll-y-none bg-[#0000003c] backdrop-blur-md md:hidden"
          onClick={hide}
        >
          <IoClose
            className="absolute left-6 top-6 h-10 w-10 cursor-pointer p-[0.4rem] text-[#4f4e4d97] hover:text-[#4f4e4dee]"
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

function AdminLink() {
  return (
    <Link
      href="/admin"
      className=" mx-2 mb-4 flex items-center space-y-2 overflow-x-clip truncate text-ellipsis whitespace-nowrap rounded-lg p-2 px-3 text-xs font-medium text-[#2a2a2e9a] hover:bg-gray-100"
    >
      <AiFillControl className="mb-0.5 mr-4 scale-125" /> Admin panel
    </Link>
  );
}
