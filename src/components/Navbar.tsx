import { TiHome } from "react-icons/ti";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";
import { Search } from "./Search";
import Image from "next/image";
import { CgMenuLeft } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { getScreenName } from "@/utils/getScreenName";

export function Navbar({
  mainWidthClass,
  toggleLeftSidebar,
  toggleRightSidebar,
}) {
  return (
    <nav
      className={`fixed top-0 z-40 mx-auto flex min-h-[90px] ${mainWidthClass} items-center justify-between border-b !border-[#ebe8e869] border-opacity-20 bg-transparent bg-gradient-to-b from-[#EBEAE8] to-[#ebeae84a] px-2 backdrop-blur-sm sm:px-10`}
    >
      <div className="flex w-full items-center justify-between px-3 py-1 sm:py-3 lg:px-5 ">
        <div className=" flex h-10 items-center  justify-start rounded-full bg-[#EBEAE800] px-0 py-1 backdrop-filter-none">
          <CgMenuLeft
            className="flex h-12 w-12 cursor-pointer select-none rounded-lg p-[0.8rem] text-[#4f4e4d97] transition-all hover:bg-[#ffffff96] sm:hidden"
            onClick={toggleLeftSidebar}
          />
          <Breadcrumbs />
        </div>
        <div className="flex items-center justify-center sm:hidden">
          <Link href="/">
            <Image
              src={"/assets/logo17.svg"}
              width={80}
              height={20}
              alt={"CS LIT: like I'm 10"}
              className="min-h-[50px] min-w-[100px]"
            />
          </Link>
        </div>
        <div className="hidden items-center justify-end md:flex">
          <Search />
        </div>
        <FaRegUserCircle
          className="flex h-12 w-12 cursor-pointer select-none rounded-lg p-[0.88rem] text-[#4f4e4d97] transition-all hover:bg-[#ffffff96] md:hidden"
          onClick={toggleRightSidebar}
        />
      </div>
    </nav>
  );
}

function Breadcrumbs() {
  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
    id: UrlProfile,
  } = router.query;

  const { data: topicsData, isFetching: topicFetching } =
    api.topic.getBySlug.useQuery(
      {
        slug: UrlTopic as string,
      },
      {
        enabled: !!UrlTopic,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const { data: categoryData, isFetching: categoryFetching } =
    api.category.getBySlug.useQuery(
      {
        slug: UrlCategory as string,
      },
      {
        enabled: !!UrlCategory,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const { data: AnalogyData } = api.analogy.getSingleAnalogyById.useQuery(
    {
      id: UrlAnalogyId as string,
    },
    {
      enabled: !!UrlAnalogyId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: profileData } = api.profile.getProfileById.useQuery(
    {
      id: UrlProfile as string,
    },
    {
      enabled: !!UrlProfile,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div id="breadcrumbs" className="my-auto hidden text-sm sm:inline-flex">
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
              {getScreenName(AnalogyData?.user)}'s Analogy
            </span>
          </Link>
        </>
      )}

      {profileData && (
        <>
          <span className="mx-2 text-[#69696975]">/</span>
          <span className="cursor-pointer font-semibold text-[#2A2A2E]">
            {getScreenName(profileData)}
          </span>
        </>
      )}
    </div>
  );
}
