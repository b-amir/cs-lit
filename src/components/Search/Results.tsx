import Link from "next/link";
import { animated } from "@react-spring/web";
import { CgSpinner } from "react-icons/cg";
import { MdClose } from "react-icons/md";

export function Results({
  panelAnimation,
  results,
  searchQuery,
  debouncedSearch,
  loading,
  setShowResultsPanel,
}) {
  const homepage =
    typeof window !== "undefined" ? window.location.pathname === "/" : false;
  const haveResults = results?.length > 0 && !loading && searchQuery.length > 1;
  const smallQuery = searchQuery.length < 2;

  return (
    <>
      <animated.div
        className={`${
          homepage
            ? "fixed  right-[0px] top-[0px] z-20 h-screen w-[360px] overflow-hidden border-x border-[#ffffff3a] bg-[#eaeaeab8] pt-[40px] shadow-lg backdrop-blur-lg backdrop-filter"
            : "absolute right-[0px] top-[0px] z-20 h-screen w-[360px] overflow-hidden border-x border-[#ffffff3a] bg-[#eaeaeaf8] pt-[40px] shadow-lg backdrop-blur-sm backdrop-filter"
        }`}
        style={panelAnimation}
      >
        <div
          className={`${
            homepage
              ? "top-0 -mb-4 mt-[-40px] h-12 bg-[#b4b4b477]  p-4 "
              : "top-0 mt-[-40px] h-[90px] border-b border-[#7c7c7c41] bg-[#b4b4b477] shadow-sm"
          }`}
        >
          {homepage ? (
            <MdClose
              className="my-auto flex cursor-pointer items-center justify-center rounded-full  transition-all hover:text-gray-500"
              onClick={() => setShowResultsPanel(false)}
            />
          ) : null}
        </div>
        <div className="flex h-full flex-col items-start justify-start pt-6">
          {smallQuery ? (
            <div className="mx-auto my-6 inline-flex flex-row  content-center items-center justify-center rounded-full border border-[#bcac22] bg-[#e8e09b33] px-6 py-2 text-center text-sm font-semibold text-[#896d12]">
              At least type 2 characters
            </div>
          ) : null}

          {haveResults ? (
            <div className="my-6 mb-6 flex w-full flex-row content-center justify-start text-center font-semibold text-[#2a2a2ec4]">
              <div className="mx-12 flex w-full flex-row content-start items-start justify-start text-start">
                Top results:
              </div>
            </div>
          ) : null}
          <ul id="search-result-items" className="flex w-full flex-col gap-5">
            {debouncedSearch?.length > 1 &&
              results?.length > 0 &&
              results?.map((topic: any) => (
                <li className="w-full" key={topic.id}>
                  <Link
                    href={`/${topic.category.slug}/${topic.title}`}
                    className="mx-12 flex flex-col rounded-[12px] border border-transparent bg-gray-100 px-6 py-5 shadow-sm transition-all hover:border-[#858585c2] hover:shadow-md"
                  >
                    <span className="text-md truncate pb-2 pt-1 font-bold text-[#2A2A2E]">
                      {topic.title}
                    </span>
                    <span className="text-sm text-gray-400">
                      Posted in{" "}
                      <span className="font-semibold">
                        {topic.category.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            {searchQuery.length > 1 && loading && (
              // show spinner
              <CgSpinner className="mx-auto my-4 flex w-full animate-spin flex-row content-center justify-center text-center text-2xl font-semibold text-[#2a2a2ec4]" />
            )}
            {searchQuery && !loading && results?.length === 0 && (
              <div className="mx-auto my-8 flex w-full flex-col content-center justify-center gap-2 text-center  ">
                <span className="font-semibold text-[#2a2a2ec4]">
                  No results found.
                </span>{" "}
                <span className="text-sm font-normal">
                  feel free to add it yourself.
                </span>
              </div>
            )}
          </ul>
        </div>
      </animated.div>
      <div
        className="fixed right-[0px] top-[0px] z-10 h-screen w-screen bg-[#00000093] backdrop-blur-xl "
        onClick={() => setShowResultsPanel(false)}
      />
    </>
  );
}
