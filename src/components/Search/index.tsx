import { api } from "@/utils/api";
import { Results } from "./Results";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSpring } from "@react-spring/web";
import { useDebounce } from "@/hooks/useDebounce";
import { type IExtendedTopic } from "./types";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

export function Search() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [results, setResults] = useState<IExtendedTopic[] | undefined>([]);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const searchInputRef = useRef(null);

  // --- check if in homepage. if so, render a different styling for search input --- //
  const router = useRouter();
  const homepage = router.pathname === "/";

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
    }
  );

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      setResults([]);
      // this delay is just gives the satisfaction of "searching"!
      // It's purely a UX decision and obviously not to be used big projects.
      setTimeout(() => {
        if (topicsData) {
          setResults(topicsData as IExtendedTopic[]);
        }
        setLoading(false);
      }, 800);
    }
    if (debouncedSearch) void fetchData();
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
      <div className=" flex flex-col">
        <div
          className={`${
            homepage
              ? "relative z-10 flex w-full items-start justify-start text-gray-600 lg:w-96"
              : "relative z-50 flex w-36 items-end justify-end text-gray-600"
          }`}
        >
          {/* in homepage a button will trigger the real input */}
          {homepage ? (
            <button
              className="flex h-10 w-72 cursor-pointer select-none items-center justify-start rounded-2xl border border-[#5c2c1d2a] bg-[#f9f9f9a8] px-5 py-6 pl-10 text-sm text-gray-400 shadow-md shadow-[#6c6c6c0b] outline-none backdrop-blur-lg backdrop-filter transition-all duration-300 hover:border-[#9e9e9ec0] focus:bg-white focus:shadow-sm focus:outline-none sm:w-96 lg:w-96 lg:focus:w-96"
              onClick={() => {
                setShowResultsPanel(true);
                // taking this task out of callstack until we have a "counter-input" in the DOM
                setTimeout(() => {
                  const counterInput =
                    document?.getElementById("counter-input");
                  if (counterInput) {
                    counterInput.focus();
                  }
                }, 0);
              }}
            >
              <IoSearch className="absolute left-4 top-4 " />
              <span> Find topics...</span>
            </button>
          ) : (
            <>
              <input
                type="search"
                name="search"
                placeholder="Find topics..."
                className={`focus:outline-none" h-10 w-36 rounded-full border border-[#2A2A2E22] bg-[#f9f9f98f] px-5 pr-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-64 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm
                ${
                  showResultsPanel ? "w-full lg:w-64" : ""
                }  input[type=search] {-webkit-appearance: searchfield !important;} input[type=search]::-webkit-search-cancel-button {-webkit-appearance: searchfield-cancel-button !important;}`}
                onChange={handleInputChange}
                value={searchQuery}
                ref={searchInputRef}
              />
              <button
                type="submit"
                className={`absolute right-0 top-0 mr-4 mt-3`}
              >
                {loading ? (
                  <IoSearch className="animate-pulse cursor-not-allowed text-gray-400" />
                ) : (
                  <IoSearch />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {showResultsPanel && (
        <Results
          panelAnimation={panelAnimation}
          results={results}
          searchQuery={searchQuery}
          debouncedSearch={debouncedSearch}
          loading={loading}
          setShowResultsPanel={setShowResultsPanel}
          handleInputChange={handleInputChange}
          value={searchQuery}
          ref={searchInputRef}
          setSearchQuery={setSearchQuery}
        />
      )}
    </>
  );
}
