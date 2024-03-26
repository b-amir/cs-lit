import Image from "next/image";
import { Search } from "@/features/Search";
import { archivo } from "@/styles/customFonts";
import { FiArrowDown } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { animated, useTransition } from "@react-spring/web";

export function HeroSection() {
  // --- a list of keywords that slide-in and out in the hero section --- //
  const carouselItems = useMemo(
    () => [
      {
        name: "CS",
        color: "#ff7263",
      },
      {
        name: "JavaScript",
        color: "#a19753",
      },
      {
        name: "Data Structure",
        color: "#508f7a",
      },
      {
        name: "React.js",
        color: "#578894",
      },
      {
        name: "Next.js",
        color: "#977e52",
      },
    ],
    []
  );

  const [currentCarouselItems, setCurrentCarouselItems] = useState(
    carouselItems.slice(0, 3)
  );

  // --- using react-spring for the carousel items to slide-in --- //
  const carouselTransitions = useTransition([currentCarouselItems[0]], {
    from: {
      opacity: 0,
      transform: "translateX(30%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0%)",
    },
    leave: {
      opacity: 0,
      transform: "translateX(-30%)",
    },
    cancel: true,
    reset: true,
    config: { duration: 300, mass: 1, tension: 170, friction: 26 },

    unique: true,
    trail: 300,
    delay: 350, // Delay before the animation starts
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = carouselItems.indexOf(
        currentCarouselItems[0] as ICarouselItems
      );
      <div title="guardrails">🛡️ no matching repositories found</div>;
      const nextIndex = (currentIndex + 1) % carouselItems.length;
      setCurrentCarouselItems(carouselItems.slice(nextIndex, nextIndex + 3));
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselItems, currentCarouselItems]);

  return (
    <div
      id="hero-section"
      className="mt-[-60px] flex h-[100dvh] w-full flex-col items-center justify-between px-8 pt-20 sm:mt-[-90px] lg:px-40"
      style={{
        backgroundColor: "#fff",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundImage: `url("/assets/heroBg.svg")`,
      }}
    >
      <div
        id="top-part"
        className="my-auto mb-auto flex w-full max-w-[1360px] flex-auto  flex-wrap-reverse items-center justify-between gap-2 sm:flex-wrap lg:max-h-[75dvh] lg:gap-0 lg:py-20"
      >
        <div
          id="left-part"
          className="my-auto -mt-12 flex flex-col items-start justify-center sm:mt-auto lg:mr-auto lg:gap-6"
        >
          <div className="flex flex-col items-center justify-center gap-6 py-6">
            <h1
              className={`${archivo.className}  flex flex-col items-start align-middle text-4xl font-extrabold text-[#263238] sm:pt-0 sm:text-6xl lg:pt-4 lg:text-7xl`}
            >
              <span>Explain</span>
              <span className="flex flex-row items-center justify-center  lg:py-3 ">
                {/* Use the carouselTransitions.map to loop through animated divs */}
                {carouselTransitions((props, item) => (
                  <animated.div
                    key={item?.name}
                    style={{ ...props, color: item?.color }}
                    className={`lg:h-16" w-24  whitespace-nowrap font-normal lg:mb-1`}
                  >
                    {item?.name}
                  </animated.div>
                ))}
              </span>
              <span>Like I&apos;m 10 </span>
            </h1>
          </div>

          <div className="flex flex-col items-start justify-center pb-4">
            <Search />
          </div>
          <p
            className="group flex select-none flex-row items-center justify-center px-2  text-sm text-[#5c2c1dc4]"
            onClick={() => {
              const exampleSection = document.getElementById("example-section");
              exampleSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="cursor-pointer transition-all duration-300 group-hover:translate-x-1">
              What exactly is it? See an example
            </span>
            <FiArrowDown className="mb-0.5 hidden -rotate-90 items-center transition-all duration-100 group-hover:block group-hover:translate-x-2" />
          </p>
        </div>

        <Image
          id="right-part"
          className="z-0 mx-auto -mt-12 w-full min-w-[280px] max-w-[280px] px-0 sm:absolute sm:bottom-16 sm:right-1 sm:ml-auto sm:w-4/12 sm:min-w-[360px] sm:max-w-none lg:relative lg:mx-0 lg:mt-[12dvh] lg:max-h-[32rem] "
          src="/assets/lightbulb.svg"
          priority={true}
          width={512}
          height={512}
          alt={"lightbulb"}
        />
      </div>

      <div
        id="bottom-part"
        className="group  z-[9] hidden  w-[calc(100vw-1rem)] cursor-pointer flex-col items-center justify-center px-2 py-4 text-[#5c2c1d7f] sm:flex md:h-[10dvh]"
        onClick={() => {
          const categorySection = document.getElementById("category-section");
          categorySection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-sm font-semibold transition-all duration-200 group-hover:-translate-y-2">
          Browse by category
        </span>
        <FiArrowDown className="hidden animate-bounce duration-100 group-hover:block group-hover:-translate-y-2" />
      </div>
    </div>
  );
}

// --- TYPES --- //

interface ICarouselItems {
  name: string;
  color: string;
}
