import { type PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";
import { useSession } from "next-auth/react";
import useSidebarVisibility from "@/hooks/useSidebarVisibility";
import useNavbarVisibility from "@/hooks/useNavbarVisibility";

export const PageLayout = (props: PropsWithChildren<object>) => {
  const { data: sessionData } = useSession();
  const { visibleSidebars, mainWidthClass } = useSidebarVisibility();
  const navbarVisible = useNavbarVisibility();

  return (
    <>
      <div className="flex items-center justify-center bg-[#EBEAE8] ">
        {navbarVisible && <Navbar />}
        {visibleSidebars.left && <SidebarLeft username={sessionData?.user} />}
        {visibleSidebars.right && <SidebarRight username={sessionData?.user} />}
        <main
          className={`flex min-h-[100dvh] ${mainWidthClass} flex-col items-center justify-center bg-[#EBEAE8]  `}
        >
          <div className="container top-0 min-h-screen ">{props.children}</div>
        </main>
      </div>
    </>
  );
};
