import { useEffect, useState } from "react";

export function useScrolledDown() {
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 50;
      setScrolledDown(scrolled);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolledDown;
}