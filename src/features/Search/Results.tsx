import Link from "next/link";
import { animated } from "@react-spring/web";
import { CgSpinner } from "react-icons/cg";
import { type IExtendedTopic } from "./types";
import { IoSearch as SearchIcon } from "react-icons/io5";
import {
  type IHomeSearchInputProps,
  type IResultsProps,
  type IShownResultsProps,
} from "./types";

export function Results({
  panelAnimation,
  results,
  searchQuery,
  debouncedSearch,
  loading,
  setShowResultsPanel,
  handleInputChange,
  value,
  searchInputRef,
  setSearchQuery,
}: IResultsProps) {
  //
  const homepage =
    typeof window === "undefined" ? false : window.location.pathname === "/";
  //
  const haveResults =
    results && results?.length > 0 && !loading && searchQuery.length > 1;
  //
  const smallQuery = searchQuery.length < 2;

  return (
    <>
      <animated.div
        style={panelAnimation}
        className={`${
          homepage
            ? "fixed right-0 top-0 z-[51] h-[100dvh] w-full overflow-hidden border-x border-[#ffffff3a] bg-[#eaeaeab8] pt-[40px] shadow-lg backdrop-blur-lg backdrop-filter md:w-[460px]"
            : "absolute right-[0px] top-[0px] z-20 h-screen w-[360px] overflow-hidden border-x border-[#ffffff3a] bg-[#eaeaeaf8] pt-[40px] shadow-lg backdrop-blur-sm backdrop-filter"
        }`}
      >
        <div
          className={`${
            homepage
              ? "fixed right-0 top-0 h-[5rem] w-full items-center bg-[#b4b4b477] p-4 "
              : "top-0 mt-[-40px] h-[90px] border-b border-[#7c7c7c41] bg-[#b4b4b477] shadow-sm"
          }`}
        >
          {/* if on homepage, show a counter input in the right place */}
          {homepage ? (
            <HomeSearchInput
              searchInputRef={searchInputRef}
              value={value}
              homepage={homepage}
              setSearchQuery={setSearchQuery}
              handleInputChange={handleInputChange}
              setShowResultsPanel={setShowResultsPanel}
            />
          ) : null}
        </div>

        <ShownResults
          smallQuery={smallQuery}
          haveResults={haveResults}
          debouncedSearch={debouncedSearch}
          results={results}
          searchQuery={searchQuery}
          loading={loading}
        />
      </animated.div>
      <div
        className="fixed right-0 top-0 z-10 h-[100dvh] w-screen overscroll-y-none bg-[#000000b8] backdrop-blur-xl"
        onClick={() => setShowResultsPanel(false)}
      />
    </>
  );
}

function HomeSearchInput({
  searchInputRef,
  value,
  homepage,
  setSearchQuery,
  handleInputChange,
  setShowResultsPanel,
}: IHomeSearchInputProps) {
  return (
    <>
      <input
        type="search"
        name="search"
        id="counter-input"
        placeholder="Find topics..."
        className={`${
          homepage
            ? "h-10 w-full overscroll-y-none rounded-2xl border border-[#5c2c1d2a] bg-[#f9f9f9a8] px-5 py-6 pl-10 text-sm shadow-md shadow-[#6c6c6c0b] outline-none backdrop-blur-lg backdrop-filter transition-all duration-300 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none sm:w-96 lg:w-96 lg:focus:w-96"
            : "h-10 w-36 rounded-full border border-[#2A2A2E22] bg-[#f9f9f98f] px-5 pr-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-64 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none"
        } input[type=search] {-webkit-appearance: searchfield !important;} input[type=search]::-webkit-search-cancel-button {-webkit-appearance: searchfield-cancel-button !important;}`}
        onChange={handleInputChange}
        value={value}
        searchInputRef={searchInputRef}
      />

      <button
        className="clear-button absolute right-3 top-10 -translate-y-1/2 transform p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => {
          setSearchQuery("");
          setShowResultsPanel(false);
        }}
      >
        <svg
          className="h-10 w-10 p-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </button>

      <button type="submit" className="absolute left-8 top-5 mr-4 mt-3">
        <SearchIcon />
      </button>
    </>
  );
}
function ShownResults({
  smallQuery,
  haveResults,
  debouncedSearch,
  results,
  searchQuery,
  loading,
}: IShownResultsProps) {
  return (
    <div className="flex h-full flex-col items-start justify-start pt-6">
      {smallQuery ? (
        <div className="mx-auto my-10 inline-flex flex-row content-center items-center justify-center rounded-full border border-[#bcac22] bg-[#e8e09b33] px-6 py-2 text-center text-sm font-semibold text-[#896d12]">
          At least type 2 characters
        </div>
      ) : null}

      {haveResults ? (
        <div className="my-10 mb-6 flex w-full flex-row content-center justify-start text-center font-semibold text-[#2a2a2ec4]">
          <div className="mx-12 flex w-full flex-row content-start items-start justify-start text-start">
            Top results:
          </div>
        </div>
      ) : null}
      <ul
        id="search-result-items"
        className="flex w-full flex-col gap-5"
        data-testid="search-results"
      >
        {debouncedSearch?.length > 1 &&
          results &&
          results?.length > 0 &&
          results?.map((topic: IExtendedTopic) => (
            <li
              className="w-full"
              key={topic.id}
              data-testid={`result-${topic.id}`}
            >
              <Link
                href={`/${topic.category.slug}/${topic.slug}`}
                className="mx-12 flex flex-col rounded-[12px] border border-transparent bg-gray-100 px-6 py-5 shadow-sm transition-all hover:border-[#858585c2] hover:shadow-md"
              >
                <span className="text-md truncate pb-2 pt-1 font-bold text-dark-2">
                  {topic.title}
                </span>
                <span className="text-sm text-gray-400">
                  Posted in{" "}
                  <span className="font-semibold">{topic.category.name}</span>
                </span>
              </Link>
            </li>
          ))}
        {searchQuery.length > 1 && loading && (
          <CgSpinner className="mx-auto my-10 flex w-full animate-spin flex-row content-center justify-center text-center text-2xl font-semibold text-[#2a2a2ec4]" />
        )}
        {searchQuery && !loading && results?.length === 0 && (
          <div className="mx-auto my-10 flex w-full flex-col content-center justify-center gap-2 text-center ">
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
  );
}
