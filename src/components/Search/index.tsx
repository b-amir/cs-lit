import { IoSearch } from "react-icons/io5";
import { api } from "@/utils/api";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import { useDebounce } from "@/hooks/useDebounce";
import { Results } from "./Results";
import { useRouter } from "next/router";

export function Search() {
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [results, setResults] = useState<[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // --- check if in homepage. if so, render a different styling for search input --- //
  const router = useRouter();
  const homepage = router.pathname === "/";

  const searchInputRef = useRef(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setShowResultsPanel(inputValue.length >= 1);
    setSearchQuery(inputValue);
  };

  // returns an array of possible matches that include the query as user types
  const { data: topicsData } = api.topic.searchByName.useQuery(
    {
      query: searchQuery,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setResults([]);
      const fetchedTopics = await topicsData;
      // this delay is just gives the satisfaction of "searching"!
      // It's purely a UX desicion and obviously not to be used big projects.
      setTimeout(() => {
        setResults(fetchedTopics);
        setLoading(false);
      }, 800);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch, topicsData]);

  // Animation config
  const panelAnimation = useSpring({
    transform: showResultsPanel ? "translateX(0%)" : "translateX(100%)",
    config: {
      mass: 0.9,
      tension: 300,
      friction: 30,
    },
  });

  return (
    <>
      {/* search input */}
      <div className=" flex flex-col">
        {showResultsPanel && homepage ? (
          <div
            className="z-50 mt-[-100px] h-[100px] p-1 py-4 pl-2 [text-shadow:_0_2px_6px_rgb(0_0_0_/_25%)]"
            onClick={() => {
              setShowResultsPanel(false);
            }}
          >
            <p className="py-1 text-2xl font-semibold text-[#ffffffd1] ">
              Search for any topic
            </p>
            <p className="text-sm text-[#ffffffa7]">
              If it&apos;s not there, you can make it!
            </p>
          </div>
        ) : null}
        <div
          className={`${
            homepage
              ? "relative z-50 flex w-96 items-start justify-start text-gray-600"
              : "relative z-50 flex w-36 items-end justify-end text-gray-600"
          }`}
        >
          <input
            type="search"
            name="search"
            placeholder="Find topics..."
            className={`${
              homepage
                ? "h-10 w-96 rounded-2xl border border-[#5c2c1d2a] bg-[#f9f9f9a8] px-5 py-6 pl-10 text-sm shadow-md shadow-[#6c6c6c0b] outline-none backdrop-blur-lg backdrop-filter transition-all duration-300 focus:w-[28rem] focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none"
                : "h-10 w-36 rounded-full border border-[#2A2A2E22] bg-[#f9f9f98f] px-5 pr-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-64 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none"
            } ${
              showResultsPanel ? "w-64" : ""
            }  input[type=search] {-webkit-appearance: searchfield !important;} input[type=search]::-webkit-search-cancel-button {-webkit-appearance: searchfield-cancel-button !important;}`}
            onChange={handleInputChange}
            value={searchQuery}
            ref={searchInputRef}
          />
          {homepage && showResultsPanel && (
            <button
              className="clear-button absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => {
                setSearchQuery("");
                setShowResultsPanel(false);
              }}
            >
              <svg
                className="h-5 w-5"
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
          )}
          <button
            type="submit"
            className={`${
              homepage
                ? "absolute left-4 top-1 mr-4 mt-3"
                : "absolute right-0 top-0 mr-4 mt-3"
            }`}
          >
            {loading ? (
              // show spinner
              // <CgSpinner className="animate-spin" />
              <IoSearch className="animate-pulse cursor-not-allowed text-gray-400" />
            ) : (
              <IoSearch />
            )}
          </button>
        </div>
      </div>

      {/* search results */}
      {showResultsPanel && (
        <Results
          panelAnimation={panelAnimation}
          results={results}
          searchQuery={searchQuery}
          debouncedSearch={debouncedSearch}
          loading={loading}
          setShowResultsPanel={setShowResultsPanel}
        />
      )}
    </>
  );
}
