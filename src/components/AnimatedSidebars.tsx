import { useSpring, animated } from "@react-spring/web";
import { useRef } from "react";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

export function AnimatedSidebars({ visibleL, hideL, visibleR, hideR }) {
  const sidebarRef = useRef(null);

  const sidebarAnimation = useSpring({
    opacity: visibleL || visibleR ? 1 : 1,
    width: visibleL || visibleR ? sidebarRef.current?.offsetWidth || 0 : 0,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  });
  return (
    <>
      <animated.div style={sidebarAnimation} ref={sidebarRef}>
        <SidebarLeft visible={visibleL} hide={hideL} />
        <SidebarRight visible={visibleR} hide={hideR} />
      </animated.div>
    </>
  );
}
