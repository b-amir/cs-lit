import Image from "next/image";
import { Search } from "@/components/Search";
import { archivo } from "../../styles/customFonts";
import { FiArrowDown } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { animated, useTransition } from "@react-spring/web";

export function HeroSection() {
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
      const currentIndex = carouselItems.indexOf(currentCarouselItems[0]);
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='25' x2='600' y2='777'%3E%3Cstop offset='0' stop-color='%23FFFFFF'/%3E%3Cstop offset='1' stop-color='%23FFCCC9'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='650' y1='25' x2='650' y2='777'%3E%3Cstop offset='0' stop-color='%23fffafa'/%3E%3Cstop offset='1' stop-color='%23fdbbb6'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='700' y1='25' x2='700' y2='777'%3E%3Cstop offset='0' stop-color='%23fff6f5'/%3E%3Cstop offset='1' stop-color='%23fbaca3'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' gradientUnits='userSpaceOnUse' x1='750' y1='25' x2='750' y2='777'%3E%3Cstop offset='0' stop-color='%23fff1f0'/%3E%3Cstop offset='1' stop-color='%23f79f92'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' gradientUnits='userSpaceOnUse' x1='800' y1='25' x2='800' y2='777'%3E%3Cstop offset='0' stop-color='%23ffeceb'/%3E%3Cstop offset='1' stop-color='%23f39381'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' gradientUnits='userSpaceOnUse' x1='850' y1='25' x2='850' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe8e6'/%3E%3Cstop offset='1' stop-color='%23ee8871'/%3E%3C/linearGradient%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x1='900' y1='25' x2='900' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe3e2'/%3E%3Cstop offset='1' stop-color='%23e77e63'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' gradientUnits='userSpaceOnUse' x1='950' y1='25' x2='950' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdfdd'/%3E%3Cstop offset='1' stop-color='%23e07555'/%3E%3C/linearGradient%3E%3ClinearGradient id='i' gradientUnits='userSpaceOnUse' x1='1000' y1='25' x2='1000' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdad8'/%3E%3Cstop offset='1' stop-color='%23d86d48'/%3E%3C/linearGradient%3E%3ClinearGradient id='j' gradientUnits='userSpaceOnUse' x1='1050' y1='25' x2='1050' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd5d3'/%3E%3Cstop offset='1' stop-color='%23cf653c'/%3E%3C/linearGradient%3E%3ClinearGradient id='k' gradientUnits='userSpaceOnUse' x1='1100' y1='25' x2='1100' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd1ce'/%3E%3Cstop offset='1' stop-color='%23c06036'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' gradientUnits='userSpaceOnUse' x1='1150' y1='25' x2='1150' y2='777'%3E%3Cstop offset='0' stop-color='%23FFCCC9'/%3E%3Cstop offset='1' stop-color='%23AB5D36'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill-opacity='0.04'%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' x='100' width='1100' height='800'/%3E%3Crect fill='url(%23c)' x='200' width='1000' height='800'/%3E%3Crect fill='url(%23d)' x='300' width='900' height='800'/%3E%3Crect fill='url(%23e)' x='400' width='800' height='800'/%3E%3Crect fill='url(%23f)' x='500' width='700' height='800'/%3E%3Crect fill='url(%23g)' x='600' width='600' height='800'/%3E%3Crect fill='url(%23h)' x='700' width='500' height='800'/%3E%3Crect fill='url(%23i)' x='800' width='400' height='800'/%3E%3Crect fill='url(%23j)' x='900' width='300' height='800'/%3E%3Crect fill='url(%23k)' x='1000' width='200' height='800'/%3E%3Crect fill='url(%23l)' x='1100' width='100' height='800'/%3E%3C/g%3E%3C/svg%3E")`,
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
                    style={{ ...props, color: item.color }}
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
          src="/assets/bulb2.svg"
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
