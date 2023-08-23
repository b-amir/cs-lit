import { useSpring, animated } from "@react-spring/web";
import { type ActionMenuProps } from "./types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { type PropsWithChildren, useRef, useState } from "react";

export function ActionMenu(props: PropsWithChildren<ActionMenuProps>) {
  const [showExtendedActionMenu, setShowExtendedActionMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationProps = useSpring({
    width: showExtendedActionMenu ? 80 || 0 : 0,
    config: { duration: 200, mass: 1, tension: 170, friction: 26 },
  });

  return (
    <div
      id="action-menu"
      className="z-10 flex h-11 flex-row items-center rounded-l-md rounded-r-sm border border-transparent transition-all hover:border-[#5555552a] hover:bg-[#ffffff6e] hover:shadow-sm"
      onMouseLeave={() => setShowExtendedActionMenu(false)}
    >
      <animated.div style={animationProps} ref={contentRef} className="">
        <div id="action-menu-items" className="flex flex-row items-center p-2">
          {props.children}
        </div>
      </animated.div>

      <button
        onClick={() => setShowExtendedActionMenu(!showExtendedActionMenu)}
      >
        <HiOutlineDotsVertical
          className={`h-8 w-8 cursor-pointer p-2 text-gray-400 ${
            showExtendedActionMenu ? "rounded-l-none" : ""
          }`}
        />
      </button>
    </div>
  );
}
