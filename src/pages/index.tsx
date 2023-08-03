import { type NextPage } from "next";
import { PageLayout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { archivo } from "../styles/customFonts";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";

const carouselItems = [
  {
    name: "CS",
    color: "#F59E0B",
  },
  {
    name: "JavaScript",
    color: "#F472B6",
  },
  {
    name: "Data Structure",
    color: "#10B981",
  },
  {
    name: "React.js",
    color: "#3B82F6",
  },
  {
    name: "Next.js",
    color: "#6366F1",
  },
];

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const [currentCarouselItems, setCurrentCarouselItems] = useState([
    carouselItems[0],
    carouselItems[1],
    carouselItems[2],
  ]);
  const [firstCycleComplete, setFirstCycleComplete] = useState(false);
  // useTransition for the carousel items to animate slide-up
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

    unique: true, // Use the key to identify unique items
    // i want the first item to be still. no effects. and from the second item on i want effects
    trail: 200, // Stagger delay
  });

  useEffect(() => {
    if (!firstCycleComplete) {
      const interval = setInterval(() => {
        const currentIndex = carouselItems.findIndex(
          (item) => item === currentCarouselItems[0]
        );

        if (currentIndex < carouselItems.length - 2) {
          setCurrentCarouselItems([
            carouselItems[currentIndex + 1],
            carouselItems[currentIndex + 2],
            carouselItems[currentIndex + 3],
          ]);
        } else if (currentIndex === carouselItems.length - 2) {
          setCurrentCarouselItems([
            carouselItems[currentIndex + 1],
            carouselItems[currentIndex + 2],
            carouselItems[0],
          ]);
        } else if (currentIndex === carouselItems.length - 1) {
          setCurrentCarouselItems([
            carouselItems[0],
            carouselItems[1],
            carouselItems[2],
          ]);
          setFirstCycleComplete(true);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentCarouselItems, firstCycleComplete]);

  return (
    <>
      <nav className="fixed top-0 flex h-[90px] w-full items-center justify-between bg-[#f7f7f700] px-28 pt-20 dark:bg-gray-800">
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <Image
              src={"/assets/logo16.svg"}
              width={180}
              height={50}
              alt={"CS LIT: like I'm 10"}
              className="min-h-[50px] min-w-[100px]"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6">
          {/* user section */}
          <div className="flex items-center gap-2 rounded-full border bg-[#ffffffc6] px-2 py-2 pr-4 shadow-sm transition-all hover:border-[#a2a2a28c] hover:shadow-sm">
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <div className="flex items-center gap-2">
                  <Image
                    src={sessionData?.user.image}
                    width={30}
                    height={30}
                    alt={"profile picture"}
                    className="rounded-full"
                  />
                  <span className="hidden sm:block">
                    {sessionData?.user.name}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="flex h-[calc(100dvh)] w-full  flex-col items-start justify-between bg-gradient-to-br from-white to-[#654a2e] px-28 
  pt-36 dark:bg-gray-800"
        style={{
          backgroundColor: "#fff",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='25' x2='600' y2='777'%3E%3Cstop offset='0' stop-color='%23FFFFFF'/%3E%3Cstop offset='1' stop-color='%23FFCCC9'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='650' y1='25' x2='650' y2='777'%3E%3Cstop offset='0' stop-color='%23fffafa'/%3E%3Cstop offset='1' stop-color='%23fdbbb6'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='700' y1='25' x2='700' y2='777'%3E%3Cstop offset='0' stop-color='%23fff6f5'/%3E%3Cstop offset='1' stop-color='%23fbaca3'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' gradientUnits='userSpaceOnUse' x1='750' y1='25' x2='750' y2='777'%3E%3Cstop offset='0' stop-color='%23fff1f0'/%3E%3Cstop offset='1' stop-color='%23f79f92'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' gradientUnits='userSpaceOnUse' x1='800' y1='25' x2='800' y2='777'%3E%3Cstop offset='0' stop-color='%23ffeceb'/%3E%3Cstop offset='1' stop-color='%23f39381'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' gradientUnits='userSpaceOnUse' x1='850' y1='25' x2='850' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe8e6'/%3E%3Cstop offset='1' stop-color='%23ee8871'/%3E%3C/linearGradient%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x1='900' y1='25' x2='900' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe3e2'/%3E%3Cstop offset='1' stop-color='%23e77e63'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' gradientUnits='userSpaceOnUse' x1='950' y1='25' x2='950' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdfdd'/%3E%3Cstop offset='1' stop-color='%23e07555'/%3E%3C/linearGradient%3E%3ClinearGradient id='i' gradientUnits='userSpaceOnUse' x1='1000' y1='25' x2='1000' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdad8'/%3E%3Cstop offset='1' stop-color='%23d86d48'/%3E%3C/linearGradient%3E%3ClinearGradient id='j' gradientUnits='userSpaceOnUse' x1='1050' y1='25' x2='1050' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd5d3'/%3E%3Cstop offset='1' stop-color='%23cf653c'/%3E%3C/linearGradient%3E%3ClinearGradient id='k' gradientUnits='userSpaceOnUse' x1='1100' y1='25' x2='1100' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd1ce'/%3E%3Cstop offset='1' stop-color='%23c06036'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' gradientUnits='userSpaceOnUse' x1='1150' y1='25' x2='1150' y2='777'%3E%3Cstop offset='0' stop-color='%23FFCCC9'/%3E%3Cstop offset='1' stop-color='%23AB5D36'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill-opacity='0.04'%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' x='100' width='1100' height='800'/%3E%3Crect fill='url(%23c)' x='200' width='1000' height='800'/%3E%3Crect fill='url(%23d)' x='300' width='900' height='800'/%3E%3Crect fill='url(%23e)' x='400' width='800' height='800'/%3E%3Crect fill='url(%23f)' x='500' width='700' height='800'/%3E%3Crect fill='url(%23g)' x='600' width='600' height='800'/%3E%3Crect fill='url(%23h)' x='700' width='500' height='800'/%3E%3Crect fill='url(%23i)' x='800' width='400' height='800'/%3E%3Crect fill='url(%23j)' x='900' width='300' height='800'/%3E%3Crect fill='url(%23k)' x='1000' width='200' height='800'/%3E%3Crect fill='url(%23l)' x='1100' width='100' height='800'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col items-start justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-6  py-12 pt-20">
            <h1
              className={`${archivo.className} flex flex-col items-start align-middle text-7xl font-bold text-gray-900 dark:text-white`}
            >
              <span>Explain</span>
              <span className="flex flex-row items-center justify-center py-2 ">
                {/* Use the carouselTransitions.map to loop through animated divs */}
                {carouselTransitions((props, item) => (
                  <animated.div
                    key={item?.name}
                    style={props}
                    className=" h-16 w-24 whitespace-nowrap font-normal text-[#f77417]"
                  >
                    {item?.name}
                  </animated.div>
                ))}
              </span>
              <span>Like I&apos;m 10 </span>
            </h1>
          </div>
          {/* <p className="text-start text-lg text-gray-500 dark:text-gray-400">
            A collection of simple analogies to help you understand computer
            science concepts.
          </p> */}
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex flex-col items-start justify-center gap-2">
              <input
                type="text"
                className="h-[50px] w-[500px] rounded-lg border border-gray-300 px-4 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:text-white dark:focus:ring-white"
                placeholder="Search for topics"
              />
            </div>
            <p className="px-2 py-2 text-start text-sm text-gray-400 dark:text-gray-400">
              What exactly is it? See an example.
            </p>
          </div>
        </div>
        {/* stick to the bottom  */}
        <div className=" bottom-0 flex w-full items-center justify-center py-12 text-sm font-semibold opacity-60">
          Browse by category
        </div>
      </div>
    </>
  );
};

export default Home;
