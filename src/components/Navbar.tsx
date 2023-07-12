import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDebounce } from "@/hooks/useDebounce";
import { CgSpinner } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";

export function Navbar() {
  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
  } = router.query;

  const { data: topicsData, isFetching: topicFetching } =
    api.topic.getBySlug.useQuery({
      slug: UrlTopic as string,
    });

  const { data: categoryData, isFetching: categoryFetching } =
    api.category.getBySlug.useQuery({
      slug: UrlCategory as string,
    });

  const { data: AnalogyData } = api.analogy.getSingleAnalogyById.useQuery({
    id: UrlAnalogyId as string,
  });

  return (
    <nav className="fixed top-0 z-40 flex min-h-[90px] w-4/6 items-center justify-between border-b !border-[#ebe8e869] border-opacity-20 bg-transparent bg-gradient-to-b from-[#EBEAE8] to-[#ebeae84a] px-10 backdrop-blur-sm backdrop-filter">
      <div className="flex w-full items-center justify-between px-3 py-3 lg:px-5 ">
        <div className=" flex h-10 items-start  justify-start rounded-full bg-[#EBEAE800] px-0 py-1 backdrop-blur-none backdrop-filter-none">
          <div className="my-auto inline-flex text-sm">
            <Link href="/">
              <TiHome className="mt-[0px] cursor-pointer !text-lg text-[#2A2A2E]" />
            </Link>

            {categoryData && (
              <>
                <span className="mx-2 text-[#69696975]">/</span>
                <Link href={`/${UrlCategory}`}>
                  <span
                    className={`cursor-pointer text-[#2A2A2E] ${
                      !UrlTopic && "font-semibold"
                    }`}
                  >
                    {categoryData?.name}
                  </span>
                </Link>
              </>
            )}
            {topicsData && (
              <>
                <span className="mx-2 text-[#69696975]">/</span>
                <Link href={`/${UrlCategory}/${UrlTopic}`}>
                  <span
                    className={`cursor-pointer text-[#2A2A2E] ${
                      !UrlAnalogyId && "font-semibold"
                    }`}
                  >
                    {topicsData?.title}
                  </span>
                </Link>
              </>
            )}
            {AnalogyData && (
              <>
                <span className="mx-2 text-[#69696975]">/</span>
                <Link href={`/${UrlCategory}/${UrlTopic}`}>
                  <span className="cursor-pointer font-semibold text-[#2A2A2E]">
                    {AnalogyData?.author?.name
                      ? AnalogyData?.author?.name
                      : AnalogyData?.author?.email}
                    's Analogy
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center"></div>
        <div className="flex items-end justify-end">
          <SearchBar />

          {/* user profile */}
        </div>
      </div>
    </nav>
  );
}

export function SearchBar() {
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
  }, [debouncedSearch]);

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
      <div className="relative z-50 flex w-36 items-end justify-end text-gray-600">
        <input
          type="search"
          name="search"
          placeholder="Find topics..."
          className={`h-10 w-36 rounded-full border border-[#2A2A2E22] bg-[#f9f9f98f] px-5 pr-10 text-sm outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 focus:w-64 focus:border-[#9e9e9e] focus:bg-white focus:shadow-sm focus:outline-none ${
            showResultsPanel && "w-64"
          }`}
          onChange={handleInputChange}
          value={searchQuery}
          ref={searchInputRef}
        />
        <button type="submit" className="absolute right-0 top-0 mr-4 mt-3">
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
        <>
          <animated.div
            className="absolute right-[0px] top-[0px] z-10 h-screen w-[360px] overflow-hidden border-x border-[#ffffff3a] bg-[#eaeaeaf8] pt-[40px] shadow-lg backdrop-blur-sm backdrop-filter"
            style={panelAnimation}
            // onClick={
            //   // keep searchInputRef focused
            //   // () => searchInputRef?.current?.focus()
            // }
          >
            <div className="top-0 mt-[-40px] h-[90px] border-b border-[#7c7c7c41] bg-[#b4b4b477] shadow-sm"></div>
            <div className="flex h-full flex-col items-start justify-start pt-6">
              {results?.length !== 0 && (
                <div className="my-4 mb-6 flex w-full flex-row content-center justify-start text-center font-semibold text-[#2a2a2ec4]">
                  {searchQuery.length > 1 && results && results?.length > 0 ? (
                    <div className="mx-12 flex w-full flex-row content-start items-start justify-start text-start">
                      Top results:
                    </div>
                  ) : (
                    <div className="mx-auto inline-flex flex-row  content-center items-center justify-center rounded-full border border-[#bcac22] bg-[#e8e09b33] px-6 py-2 text-center text-sm font-semibold text-[#896d12]">
                      At least type 2 characters
                    </div>
                  )}
                </div>
              )}
              <ul
                id="search-result-items"
                className="flex w-full flex-col gap-6"
              >
                {results?.length !== 0 &&
                  results?.map((topic: any) => (
                    <li className="w-full" key={topic.id}>
                      <Link
                        href={`/${topic.category.slug}/${topic.title}`}
                        className="mx-12 flex flex-col rounded-[12px] border border-transparent bg-gray-100 px-6 py-5 shadow-sm transition-all hover:border-[#858585c2] hover:shadow-md"
                      >
                        <span className="text-md pb-2 pt-1 font-bold text-[#2A2A2E]">
                          {topic.title}{" "}
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
                {loading ? (
                  // show spinner
                  <CgSpinner className="mx-auto my-4 flex w-full animate-spin flex-row content-center justify-center text-center text-2xl font-semibold text-[#2a2a2ec4]" />
                ) : (
                  ""
                )}
                {searchQuery && !loading && results?.length === 0 && (
                  <div className="mx-auto my-4 flex w-full flex-row content-center justify-center text-center font-semibold text-[#2a2a2ec4]">
                    No results found. 😔
                  </div>
                )}
              </ul>
            </div>
          </animated.div>
          <div
            className="fixed right-[0px] top-[0px] z-0 h-screen w-screen bg-black opacity-70 !backdrop-blur-sm !backdrop-filter"
            onClick={() => setShowResultsPanel(false)}
          ></div>
        </>
      )}
    </>
  );
}
