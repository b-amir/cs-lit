import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
// import { Breadcrumbs } from "./Breadcrumbs";
import { useScrolledDown } from "@/hooks/useScrolledDown";
import { CgMenuLeft as MenuIcon } from "react-icons/cg";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";

const Search = dynamic(() =>
  import("@/features/Search").then((mod) => mod.Search)
);

const Breadcrumbs = dynamic(() =>
  import("./Breadcrumbs").then((mod) => mod.Breadcrumbs)
);

export interface INavbarProps {
  mainWidthClass: string;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

export function Navbar({
  mainWidthClass,
  toggleLeftSidebar,
  toggleRightSidebar,
}: INavbarProps) {
  //
  const scrolledDown = useScrolledDown();

  return (
    <nav
      className={`fixed top-0 z-40 mx-auto flex ${mainWidthClass} items-center justify-between bg-transparent bg-gradient-to-b from-gray-2 to-[#ebeae84a] px-2 backdrop-blur-lg backdrop-filter transition-all duration-500 ease-in-out sm:px-10 ${
        scrolledDown
          ? "min-h-[50px] border-b !border-[#ebe8e869] border-opacity-20 from-[#ebeae840] shadow-sm "
          : "min-h-[90px] "
      }}`}
    >
      <div className="flex w-full items-center justify-between px-3 py-1 sm:py-3 lg:px-5 ">
        <div className=" flex h-10 items-center justify-start rounded-full bg-[#EBEAE800] px-0 py-1 backdrop-filter-none">
          <MenuIcon
            className="flex h-12 w-12 cursor-pointer select-none rounded-lg p-[0.8rem] text-[#4f4e4d97] transition-all hover:bg-[#ffffff96] sm:hidden"
            onClick={toggleLeftSidebar}
          />
          <Breadcrumbs />
        </div>

        <div className="flex items-center justify-center sm:hidden">
          <Link href="/home">
            <Image
              priority={true}
              src={"/assets/logo.svg"}
              width={80}
              height={20}
              alt={"CS LIT: like I'm 10"}
              className="min-h-[50px] min-w-[100px]"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-end md:flex">
          <Search />
        </div>

        <UserIcon
          className="flex h-12 w-12 cursor-pointer select-none rounded-lg p-[0.88rem] text-[#4f4e4d97] transition-all hover:bg-[#ffffff96] md:hidden"
          onClick={toggleRightSidebar}
        />
      </div>
    </nav>
  );
}
