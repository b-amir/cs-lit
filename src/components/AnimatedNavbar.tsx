import { useSpring, animated } from "@react-spring/web";
import { Navbar } from "./Navbar";
import useNavbarVisibility from "@/hooks/useNavbarVisibility";
import { useRef } from "react";

const AnimatedNavbar = () => {
  const navbarVisible = useNavbarVisibility();
  const contentRef = useRef(null);

  // Use react-spring to animate the Navbar
  const navbarAnimation = useSpring({
    opacity: navbarVisible ? 1 : 0,
    height: navbarVisible ? 90 : 0,
    // transform: navbarVisible ? "translateY(0)" : "translateY(-100%)",
    config: {
      mass: 0.9,
      tension: 300,
      friction: 30,
    },
  });

  return (
    <animated.div style={navbarAnimation} ref={contentRef}>
      <Navbar />
    </animated.div>
  );
};

export default AnimatedNavbar;
