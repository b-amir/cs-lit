import Link from "next/link";
import Image from "next/image";
import { api } from "@/utils/api";
import { archivo } from "@/styles/customFonts";
import { MdOutlineInfo as InfoIcon } from "react-icons/md";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { HomeCategorySkeleton } from "@/components/Loading/Skeleton";

export function CategoriesSection() {
  const { data: categories, status: categoriesFetchingStatus } =
    api.category.getAll.useInfiniteQuery(
      { limit: 15 },
      {
        getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        cacheTime: 60000,
      }
    );
  return (
    <div
      id="category-section"
      className="relative flex min-h-screen w-full flex-row border-y border-[#222d3962] shadow-inner"
      style={{
        backgroundColor: "#435A73",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%2353657c' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23626f84' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23717b8d' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23808695' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%238E929E' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%238e929e' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%238e929e' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%238e929e' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%238e929e' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%238E929E' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Image
        className="absolute bottom-0 z-0 mb-0 flex max-h-[calc(250px)] select-none sm:max-h-[calc(95dvh)] sm:max-w-[calc(1*100vw/4)]"
        src="/assets/lighthouse.svg"
        height={400}
        width={400}
        alt="lighthouse"
      />
      <div className=" my-4 flex sm:min-h-screen w-full flex-col text-[#E6E6E6] sm:right-0 sm:my-10 md:max-w-[calc(5*100vw/5)] lg:right-0 lg:mx-24 lg:ml-auto lg:max-w-[calc(3*100vw/5)]">
        <h2
          className={`${archivo.className} h-3/12 mx-auto text-balance my-14 flex min-h-[calc(15dvh)] w-full flex-row justify-center px-6 text-center text-3xl font-bold [text-shadow:_0px_1px_5px_rgb(66_80_99_/_45%)] [text-shadow:_1px_1px_0px_rgb(66_80_99_/_30%)] sm:text-4xl`}
        >
          Choose a category and dive in:
        </h2>
        {categoriesFetchingStatus === "loading" ? (
          <HomeCategorySkeleton />
        ) : (
          <ul className="h-8/12 px-4 mx-auto mb-28 grid w-full justify-center gap-6 text-lg font-normal sm:mb-20 grid-cols-2 lg:grid-cols-3">
            {categories?.pages?.map((page) =>
              page?.items?.map((category) => (
                <li key={category.id} className="">
                  <Link
                    className="group flex max-w-[calc(100vw-10vw)] flex-row items-center justify-center overflow-x-clip rounded-2xl border border-[#d5d9df33] bg-[#d6e2f62c] bg-gradient-to-tr from-[#d6e2f60b] via-[#d6e2f60b] to-[#d4d4d432] px-6 py-3 text-[#29313d] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.15)_0px_1px_1px_0px] backdrop-blur-lg transition-shadow duration-300 [text-shadow:_0_1px_3px_rgb(255_255_255_/_25%)] hover:-translate-y-0.5 hover:border-[#d4d4d4d5] hover:bg-[#d4d4d4a3] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] sm:mx-auto sm:max-w-[calc(40vw)] sm:bg-[#d6e2f60b] sm:py-9"
                    href={`/${category.slug}`}
                  >
                    <span className="text-2xl">
                      {getCategoryIcon(category?.slug)}
                    </span>

                    <span className="ml-4 text-sm sm:text-lg flex-1 truncate text-ellipsis whitespace-nowrap font-semibold transition-all duration-200 ">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
        <div className=" h-1/12 absolute bottom-0 left-[5%] right-[5%] my-12 flex flex-col items-center sm:items-end">
          <p className="hidden font-regular z-10 sm:flex w-[max-content] flex-row items-center justify-center gap-1.5 rounded-lg border border-[#d5d9df33] bg-[#d6e2f634] px-4 py-2 text-sm text-[#292626a9] shadow-sm backdrop-blur-sm ">
            <InfoIcon className="mb-0.5" /> You can contribute by suggesting
            missing categories.
          </p>
        </div>
      </div>
    </div>
  );
}
