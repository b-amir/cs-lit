import { IoSearch } from "react-icons/io5";
import { api } from "@/utils/api";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import { useDebounce } from "@/hooks/useDebounce";
import { Results } from "./Results";

export function Search() {
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [results, setResults] = useState<[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setShowResultsPanel(inputValue.length >= 1);
    setSearchQuery(inputValue);
  };

  // returns an array of possible matches that include the query as user types
  const { data: topicsData } = api.topic.searchByName.useQuery({
    query: searchQuery,
  });

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

  const homepage =
    typeof window !== "undefined" ? window.location.pathname === "/" : false;

  return (
    <>
      {/* search input */}
      <div
        className={`${
          homepage
            ? "relative z-50 flex items-start justify-start text-gray-600"
            : "relative z-50 flex w-36 items-end justify-end text-gray-600"
        }`}
      >
        <input
          type="search"
          name="search"
          placeholder="Find topics..."
          className={`${
            homepage
              ? "h-10 w-96 rounded-2xl border border-[#5c2c1d2a] bg-[#f9f9f9e5] px-5 py-6 pl-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-[28rem] focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none"
              : "h-10 w-36 rounded-full border border-[#2A2A2E22] bg-[#f9f9f98f] px-5 pr-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-64 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none"
          } ${showResultsPanel ? "w-64" : ""} `}
          onChange={handleInputChange}
          value={searchQuery}
          ref={searchInputRef}
        />
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
