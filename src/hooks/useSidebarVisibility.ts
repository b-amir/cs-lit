import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const useSidebarVisibility = () => {
  // const router = useRouter();
  const [initialVisibleSidebars, setInitialVisibleSidebars] = useState({ left: true, right: true });
  const [visibleSidebars, setVisibleSidebars] = useState(initialVisibleSidebars);
  const [mainWidthClass, setMainWidthClass] = useState("w-4/6"); // Default width class

  const toggleLeftSidebar = () => {
    setVisibleSidebars(prevState => ({ ...prevState, left: !prevState.left }));
  };

  const toggleRightSidebar = () => {
    setVisibleSidebars(prevState => ({ ...prevState, right: !prevState.right }));
  };

  const width = typeof window !== "undefined" ? window.innerWidth : 769



  useEffect(() => {

    const handleResize = () => {
      const width = window.innerWidth;

      /* --- ROUTE BASED RULES 
 ------------------------- */
      // two types of pages that sidebar should be rendered in them:
      // 1- Single Analogy view page: If there are more than 3 dynamic segments in the route.
      // 2- home page: if we're in the root route.
      // const routesWithHiddenSidebars =
      // Object.values(router.query).filter((segment) => segment !== undefined).length >= 3 ||
      // router.route === "/";

      // setInitialVisibleSidebars({
      //   left: !routesWithHiddenSidebars,
      //   right: !routesWithHiddenSidebars,
      // });


      /* --- DEVICE BASED RULES 
      ------------------------- */
      // the types of pages that sidebar should be rendered in them:
      // 1- no sidebar for mobile devices < 640
      // 2- only left sidebar for tablets between 640 and 768
      // 3- both sidebars for laptops and wider > 768
      setInitialVisibleSidebars({
        left: width > 640,
        right: width > 768,
      });

      setVisibleSidebars({
        left: width > 640,
        right: width > 768,
      });

      // Calculate mainWidthClass based on the visibility of sidebars
      setMainWidthClass(
        initialVisibleSidebars.left && initialVisibleSidebars.right
          ? "w-8/12" // Both sidebars are visible
          : initialVisibleSidebars.left && !initialVisibleSidebars.right
            ? "w-8/12 absolute top-0 right-0"
            : initialVisibleSidebars.right && !initialVisibleSidebars.left
              ? "w-8/12 absolute top-0 left-0"
              : "w-full" // Both sidebars are hidden
      );
    };


    handleResize(); // Call the function once to set the initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };


  }, [
    width,
    initialVisibleSidebars.left,
    initialVisibleSidebars.right,
  ]);

  return { visibleSidebars, setVisibleSidebars, mainWidthClass, toggleLeftSidebar, toggleRightSidebar, initialVisibleSidebars };
};

export default useSidebarVisibility;