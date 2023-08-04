import { type NextPage } from "next";
import { PageLayout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { archivo } from "../styles/customFonts";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { FiArrowDown } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { api } from "@/utils/api";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { AnalogyView } from "@/components/AnalogyView";
import { Footer } from "@/components/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

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

  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = api.category.getAll.useInfiniteQuery(
    { limit: 15 },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );

  return (
    <>
      <nav className=" top-0 flex h-[90px] w-full items-center justify-between bg-[#f7f7f700] px-40 pt-20 dark:bg-gray-800">
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <Image
              src={"/assets/logo16.svg"}
              width={180}
              height={0}
              alt={"CS LIT: like I'm 10"}
              // className="min-h-[50px] min-w-[100px]"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6">
          {/* user section */}
          <div
            className="flex items-center gap-2 rounded-full border border-[#5c2c1d2b] bg-[#ffffff36] px-2 py-2 pr-4  backdrop-blur-sm transition-all duration-300 
          hover:border-[#5c2c1d91] "
          >
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
        className="mt-[-90px] flex h-[calc(100dvh)]  w-full flex-col items-center justify-between bg-gradient-to-br from-white to-[#654a2e] px-40 
  pt-36 dark:bg-gray-800"
        style={{
          backgroundColor: "#fff",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='25' x2='600' y2='777'%3E%3Cstop offset='0' stop-color='%23FFFFFF'/%3E%3Cstop offset='1' stop-color='%23FFCCC9'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='650' y1='25' x2='650' y2='777'%3E%3Cstop offset='0' stop-color='%23fffafa'/%3E%3Cstop offset='1' stop-color='%23fdbbb6'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='700' y1='25' x2='700' y2='777'%3E%3Cstop offset='0' stop-color='%23fff6f5'/%3E%3Cstop offset='1' stop-color='%23fbaca3'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' gradientUnits='userSpaceOnUse' x1='750' y1='25' x2='750' y2='777'%3E%3Cstop offset='0' stop-color='%23fff1f0'/%3E%3Cstop offset='1' stop-color='%23f79f92'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' gradientUnits='userSpaceOnUse' x1='800' y1='25' x2='800' y2='777'%3E%3Cstop offset='0' stop-color='%23ffeceb'/%3E%3Cstop offset='1' stop-color='%23f39381'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' gradientUnits='userSpaceOnUse' x1='850' y1='25' x2='850' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe8e6'/%3E%3Cstop offset='1' stop-color='%23ee8871'/%3E%3C/linearGradient%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x1='900' y1='25' x2='900' y2='777'%3E%3Cstop offset='0' stop-color='%23ffe3e2'/%3E%3Cstop offset='1' stop-color='%23e77e63'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' gradientUnits='userSpaceOnUse' x1='950' y1='25' x2='950' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdfdd'/%3E%3Cstop offset='1' stop-color='%23e07555'/%3E%3C/linearGradient%3E%3ClinearGradient id='i' gradientUnits='userSpaceOnUse' x1='1000' y1='25' x2='1000' y2='777'%3E%3Cstop offset='0' stop-color='%23ffdad8'/%3E%3Cstop offset='1' stop-color='%23d86d48'/%3E%3C/linearGradient%3E%3ClinearGradient id='j' gradientUnits='userSpaceOnUse' x1='1050' y1='25' x2='1050' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd5d3'/%3E%3Cstop offset='1' stop-color='%23cf653c'/%3E%3C/linearGradient%3E%3ClinearGradient id='k' gradientUnits='userSpaceOnUse' x1='1100' y1='25' x2='1100' y2='777'%3E%3Cstop offset='0' stop-color='%23ffd1ce'/%3E%3Cstop offset='1' stop-color='%23c06036'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' gradientUnits='userSpaceOnUse' x1='1150' y1='25' x2='1150' y2='777'%3E%3Cstop offset='0' stop-color='%23FFCCC9'/%3E%3Cstop offset='1' stop-color='%23AB5D36'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill-opacity='0.04'%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' x='100' width='1100' height='800'/%3E%3Crect fill='url(%23c)' x='200' width='1000' height='800'/%3E%3Crect fill='url(%23d)' x='300' width='900' height='800'/%3E%3Crect fill='url(%23e)' x='400' width='800' height='800'/%3E%3Crect fill='url(%23f)' x='500' width='700' height='800'/%3E%3Crect fill='url(%23g)' x='600' width='600' height='800'/%3E%3Crect fill='url(%23h)' x='700' width='500' height='800'/%3E%3Crect fill='url(%23i)' x='800' width='400' height='800'/%3E%3Crect fill='url(%23j)' x='900' width='300' height='800'/%3E%3Crect fill='url(%23k)' x='1000' width='200' height='800'/%3E%3Crect fill='url(%23l)' x='1100' width='100' height='800'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="my-auto flex w-full flex-row justify-between gap-16">
          <div className="center my-auto flex flex-col items-start justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-6  py-12">
              <h1
                className={`${archivo.className} flex flex-col items-start align-middle text-7xl font-extrabold text-[#263238] dark:text-white`}
              >
                <span>Explain</span>
                <span className="flex flex-row items-center justify-center py-2 ">
                  {/* Use the carouselTransitions.map to loop through animated divs */}
                  {carouselTransitions((props, item) => (
                    <animated.div
                      key={item?.name}
                      style={props}
                      className="mb-1 h-16 w-24 whitespace-nowrap font-normal text-[#ff7263]"
                    >
                      {item?.name}
                    </animated.div>
                  ))}
                </span>
                <span>Like I&apos;m 10 </span>
              </h1>
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex flex-col items-start justify-center gap-2">
                {/* <input
                  type="text"
                  className="h-[50px] w-[500px] rounded-lg border border-gray-300 px-4 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:text-white dark:focus:ring-white"
                  placeholder="Search for topics"
                /> */}

                <div className="relative mx-auto flex flex-row pt-2 text-[#263238]">
                  <input
                    type="search"
                    name="search"
                    className="h-[50px] w-[500px] rounded-lg border border-[#5c2c1d2a] px-4 pr-10 text-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5c2c1d6a]  dark:text-white dark:focus:ring-white"
                    placeholder="Search for topics"
                  />
                  <button type="submit" className="absolute right-4 top-6">
                    <IoSearch className="scale-125 " />
                  </button>
                </div>
              </div>
              <p
                className="group  flex flex-row items-center justify-center px-2 py-2 text-sm  text-[#5c2c1dc4] dark:text-gray-400"
                onClick={() => {
                  const exampleSection =
                    document.getElementById("example-section");
                  exampleSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="cursor-pointer transition-all duration-300 group-hover:translate-x-1">
                  What exactly is it? See an example
                </span>
                <FiArrowDown className="mb-0.5 hidden -rotate-90 items-center transition-all duration-100  group-hover:block  group-hover:translate-x-2" />
              </p>
            </div>
          </div>
          <Image
            src="/assets/bulb2.svg"
            width={550}
            height={550}
            alt={"lightbulb"}
            className=" right-[10%] z-0 my-auto min-w-[500px]"
          />
        </div>
        {/* stick to the bottom  */}
        {/* <div className=" bottom-0 flex w-full items-center justify-center py-12 text-sm font-semibold opacity-60"> */}
        <div
          className="group bottom-0 z-10 flex h-20 w-full cursor-pointer flex-col items-center  justify-center px-2 py-4  text-[#5c2c1d7f]"
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
      <div
        id="category-section"
        className="relative flex h-screen w-full flex-row bg-gradient-to-tr from-[#9ca0ae] to-[#8e929e]"
        style={{
          backgroundColor: "#435A73",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%2353657c' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23626f84' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23717b8d' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23808695' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%238E929E' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%238e929e' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%238e929e' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%238e929e' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%238e929e' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%238E929E' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/assets/lighthouse2.svg"
          height={400}
          width={400}
          alt="lighthouse"
          className="absolute  bottom-0 z-0 mb-0 flex min-h-[450px] max-w-[calc(1*100vw/4)]  select-none flex-col"
        />
        <div className="absolute right-0 mx-24 my-10 flex h-full max-w-[calc(3*100vw/4)] flex-col text-[#292626]">
          <h2
            className={`${archivo.className} mx-auto my-14 flex h-1/6  flex-row justify-center text-3xl font-bold`}
          >
            So far we have these categories:
          </h2>

          <ul className="grid h-4/6 w-full grid-cols-3 grid-rows-4 gap-6 text-lg font-normal">
            {/* map through category items from database */}
            {categories?.pages?.map((page) =>
              page?.items?.map((category) => (
                <li key={category.id}>
                  <Link
                    className="p group flex max-w-md flex-row items-center justify-center overflow-x-clip overflow-ellipsis rounded-xl
                              border border-[#16161d26] bg-[#6267774f] px-6 py-7 
                              text-[#2A2A2E] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#d4d4d4d5]
                            hover:bg-[#d4d4d4a3] hover:shadow-md "
                    // onClick={() => {}}
                    href={`/${category.slug}`}
                  >
                    {getCategoryIcon(category?.slug)}

                    <span className="ml-4 flex-1 whitespace-nowrap  transition-all duration-300 group-hover:-translate-x-0.5">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
          <p className="font-regular mx-auto my-12 flex  h-1/6 flex-row items-center justify-center text-sm text-[#292626a9]">
            If you find a category missing, you can add it via GitHub
            contribution. It&apos;s an open-sourced project.
          </p>
        </div>
      </div>
      <div
        id="example-section"
        className="flex h-screen w-full flex-row bg-[#fff1f0]"
      >
        <div className=" mx-auto my-auto flex h-full max-w-[calc(3*100vw/4)] flex-col items-center justify-center text-[#292626]">
          <h2
            className={`${archivo.className} mx-auto my-3 flex  flex-row justify-center text-3xl font-bold`}
          >
            Here&apos;s an example
          </h2>
          <div
            id="vertical-line"
            className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
          />
          <p className="font-regular text-md mx-auto my-3 flex flex-row items-center justify-center text-center text-[#292626a9]">
            A user shared a helpful analogy about Closures in JavaScript,
            <br />
            making it easier for others to understand the concept.
          </p>
          <div
            id="vertical-line"
            className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
          />
          <div className="mx-auto my-[-4px] flex flex-row rounded-3xl border-[1px] border-[#5c2c1d2b] bg-[#5c2c1d09] p-10 ">
            <AnalogyView
              analogy={{
                id: "seiydzNj",
                description: "hey",
              }}
              author={{
                name: "Amir Bazgir",
                email: "theamirm@gmail.com",
                image: "https://avatars.githubusercontent.com/u/30746832?v=4",
                id: "ewHJFy3",
              }}
              key="seiydzNj"
            />
          </div>
          <div
            id="vertical-line"
            className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
          />
          <p className="font-regular text-md mx-auto my-3 flex  flex-row items-center justify-center text-[#292626a9]">
            Other people can also participate and post their analogies.
            <span className="italic">Especially you!</span>
          </p>
          <div
            id="vertical-line"
            className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
          />

          <button
            className="font-regular text-md group mx-auto mb-3 mt-[-4px] flex flex-row items-center justify-center 
          rounded-xl border border-[#5c2c1d2b] bg-[#ffffff98] px-8 py-2 text-sm font-semibold text-[#292626a9] shadow-sm
          transition-all duration-200 hover:border-[#5c2c1d66] hover:px-8 hover:shadow-md dark:text-gray-400"
          >
            <span className="cursor-pointer transition-all duration-300 group-hover:-translate-x-0.5">
              Explore Closure Topic
            </span>
          </button>
        </div>
      </div>

      <footer
        id="footer-section"
        className="mx-auto flex w-full flex-row items-center justify-center bg-[#263238] px-12 py-6 shadow-inner shadow-[#1d262b]"
      >
        <Image
          id="grayscaled-logo"
          src="/assets/logo16.svg"
          width={100}
          height={100}
          alt="logo"
          className="mr-6  opacity-70 brightness-200 grayscale"
        />
        <div
          id="vertical-line"
          className="mx-auto my-1 mr-6 flex h-16 w-[1px] flex-col items-center justify-center bg-[#e5e1e047]"
        />
        <div className="mx-auto flex w-full flex-col  text-xs  text-[#a5a5a5]">
          <div className="inline-flex ">
            <FaLinkedin className="mr-1.5 mt-0.5" />
            <span className="mr-1">Hey, I&apos;m</span>
            <a
              className="inline-flex  flex-wrap font-semibold hover:underline"
              href="#"
            >
              Amir Bazgir,
            </a>
          </div>

          <div className="inline-flex  py-1">
            <AiOutlineLink className="mr-1.5 mt-0.5" />
            And I make quirky things on the internet.
          </div>
          <div className="inline-flex  ">
            <FaGithub className="mr-1.5 mt-0.5" />
            <span className="mr-1"> You can</span>
            <a href="#" className="inline-flex font-semibold hover:underline">
              <span className="mr-1">contribute</span>
            </a>
            <span>to this project.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
