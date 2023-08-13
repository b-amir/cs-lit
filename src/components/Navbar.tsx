import { TiHome } from "react-icons/ti";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";
import { Search } from "./Search";

export function Navbar() {
  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
    id: UrlProfile,
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

  const { data: profileData } = api.profile.getProfileById.useQuery({
    id: UrlProfile as string,
  });

  // console.log("profileData", profileData);
  // console.log("urlProfile", UrlProfile);

  return (
    <nav className="fixed top-0 z-40 mx-auto flex min-h-[90px] w-4/6 items-center justify-between border-b !border-[#ebe8e869] border-opacity-20 bg-transparent bg-gradient-to-b from-[#EBEAE8] to-[#ebeae84a] px-10 backdrop-blur-sm backdrop-filter">
      <div className="flex w-full items-center justify-between px-3 py-3 lg:px-5 ">
        <div className=" flex h-10 items-start  justify-start rounded-full bg-[#EBEAE800] px-0 py-1 backdrop-blur-none backdrop-filter-none">
          <div className="my-auto inline-flex text-sm">
            <Link href="/">
              <TiHome className="mt-[0px] cursor-pointer !text-lg text-[#2A2A2E] transition-all hover:text-black" />
            </Link>

            {router.pathname === "/admin" && (
              <>
                <span className="mx-2 text-[#69696975]">/</span>
                <span className="cursor-pointer font-semibold text-[#2A2A2E]">
                  Admin panel
                </span>
              </>
            )}

            {categoryData && (
              <>
                <span className="mx-2 text-[#69696975] ">/</span>
                <Link
                  href={`/${UrlCategory}`}
                  className="max-w-[calc(7vw)] truncate  "
                >
                  <span
                    className={` cursor-pointer text-[#2A2A2E] transition-all hover:text-black ${
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
                <span className="mx-2 text-[#69696975]  ">/</span>
                <Link
                  href={`/${UrlCategory}/${UrlTopic}`}
                  className="max-w-[calc(11vw)] truncate "
                >
                  <span
                    className={`cursor-pointer text-[#2A2A2E] transition-all hover:text-black ${
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
                <Link
                  href={`/${UrlCategory}/${UrlTopic}`}
                  className="max-w-[calc(12vw)] truncate"
                >
                  <span className="cursor-pointer font-semibold text-[#2A2A2E] transition-all hover:text-black">
                    {AnalogyData?.author?.name
                      ? AnalogyData?.author?.name
                      : AnalogyData?.author?.email}
                    's Analogy
                  </span>
                </Link>
              </>
            )}

            {profileData && (
              <>
                <span className="mx-2 text-[#69696975]">/</span>
                <span className="cursor-pointer font-semibold text-[#2A2A2E]">
                  {profileData?.name || profileData?.email}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center"></div>
        <div className="flex items-end justify-end">
          <Search />
          {/* user profile */}
        </div>
      </div>
    </nav>
  );
}
