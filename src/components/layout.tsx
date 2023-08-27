import { Navbar } from "./Navbar";
import useNavbarVisibility from "@/hooks/useNavbarVisibility";
import useSidebarVisibility from "@/hooks/useSidebarVisibility";
import { AnimatedSidebars } from "./AnimatedSidebars";
import { type PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren<object>) => {
  const navbarVisible = useNavbarVisibility();
  const {
    visibleSidebars,
    mainWidthClass,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebarVisibility();

  return (
    <>
      <div className="flex items-center justify-center bg-[#EBEAE8] ">
        {navbarVisible && (
          <Navbar
            mainWidthClass={mainWidthClass}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
          />
        )}
        <AnimatedSidebars
          visibleR={visibleSidebars.right}
          hideR={toggleRightSidebar}
          visibleL={visibleSidebars.left}
          hideL={toggleLeftSidebar}
        />

        <main
          className={`flex min-h-[100dvh] ${mainWidthClass} flex-col items-center justify-center bg-[#EBEAE8]  `}
        >
          <div className="container top-0 min-h-[100dvh] ">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
};
