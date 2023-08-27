import Link from "next/link";
import { api } from "@/utils/api";
import { TiHome } from "react-icons/ti";
import { type User } from "@prisma/client";
import { useRouter } from "next/router";
import { routeHandler } from "@/utils/routeHandler";
import { getScreenName } from "@/utils/getScreenName";

export function Breadcrumbs() {
  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
    id: UrlProfile,
  } = router.query;

  const { data: topicsData } = api.topic.getBySlug.useQuery(
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

  const { data: categoryData } = api.category.getBySlug.useQuery(
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
            href={`${routeHandler(categoryData, "Categories") ?? ""}`}
            className="max-w-[calc(7vw)] truncate "
          >
            <span
              className={` cursor-pointer text-[#2A2A2E] transition-all hover:text-black ${
                UrlTopic ? "" : "font-semibold"
              }`}
            >
              {categoryData?.name}
            </span>
          </Link>
        </>
      )}
      {topicsData && (
        <>
          <span className="mx-2 text-[#69696975] ">/</span>
          <Link
            href={`${routeHandler(topicsData, "Topics") ?? ""}`}
            className="max-w-[calc(11vw)] truncate "
          >
            <span
              className={`cursor-pointer text-[#2A2A2E] transition-all hover:text-black ${
                UrlAnalogyId ? "" : "font-semibold"
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
            href={`${routeHandler(AnalogyData, "Analogies") ?? ""}`}
            className="max-w-[calc(12vw)] truncate"
          >
            <span className="cursor-pointer font-semibold text-[#2A2A2E] transition-all hover:text-black">
              {getScreenName(AnalogyData?.user as User)}&apos;s Analogy
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
