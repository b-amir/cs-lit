import { useSpring, animated } from "@react-spring/web";
import { useRef } from "react";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

export interface IAnimatedSidebarsProps {
  visibleL: boolean;
  hideL: () => void;
  visibleR: boolean;
  hideR: () => void;
}
export function AnimatedSidebars({
  visibleL,
  hideL,
  visibleR,
  hideR,
}: IAnimatedSidebarsProps) {
  // animation settings:
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarAnimation = useSpring({
    opacity: visibleL || visibleR ? 1 : 1,
    width: visibleL || visibleR ? sidebarRef.current?.offsetWidth || 0 : 0,
    config: {
      mass: 1,
      tension: 210,
      friction: 20,
    },
  });

  return (
    <animated.div style={sidebarAnimation} ref={sidebarRef}>
      <SidebarLeft visible={visibleL} hide={hideL} />
      <SidebarRight visible={visibleR} hide={hideR} />
    </animated.div>
  );
}
