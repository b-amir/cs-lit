import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useSidebarVisibility = () => {
  const router = useRouter();
  const [visibleSidebars, setVisibleSidebars] = useState({ left: true, right: true });
  const [mainWidthClass, setMainWidthClass] = useState("w-4/6"); // Default width class

  useEffect(() => {
    const routesWithHiddenSidebars =
      // two types of pages that sidebar should be rendered in them:
      // 1- Single Analogy view page: If there are more than 3 dynamic segments in the route.
      // 2- home page: if we're in the root route.
      // Object.values(router.query).filter((segment) => segment !== undefined).length >= 3 ||
      router.route === "/";

    setVisibleSidebars({
      left: !routesWithHiddenSidebars,
      right: !routesWithHiddenSidebars,
    });


    const width = window.innerWidth ? window.innerWidth : 768; // Default width for server-side rendering

    // the types of pages that sidebar should be rendered in them:
    // 1- no sidebar for mobile devices < 640
    // 2- only left sidebar for tablets between 640 and 768
    // 3- both sidebars for laptops and bidder > 768
    setVisibleSidebars({
      left: width > 640,
      right: width > 768,
    });



    // Calculate mainWidthClass based on the visibility of sidebars
    setMainWidthClass(
      visibleSidebars.left && visibleSidebars.right
        ? "w-4/6" // Both sidebars are visible
        : visibleSidebars.left || visibleSidebars.right
          ? "w-5/6 right-0 top-0 absolute" // Either the left or right sidebar is hidden
          : "w-full" // Both sidebars are hidden
    );
  }, [router.query, router.route, visibleSidebars.left, visibleSidebars.right]);

  return { visibleSidebars, setVisibleSidebars, mainWidthClass };
};

export default useSidebarVisibility;