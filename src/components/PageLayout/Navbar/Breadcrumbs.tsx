import Link from "next/link";
import { api } from "@/utils/api";
import { type User } from "@prisma/client";
import { useRouter } from "next/router";
import { routeHandler } from "@/utils/routeHandler";
import { getScreenName } from "@/utils/getScreenName";
import { TiHome as HomeIcon } from "react-icons/ti";

export function Breadcrumbs() {
  //
  const router = useRouter();
  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
    id: UrlProfile,
  } = router.query;

  const queryOptions = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  };

  const { data: topicsData } = api.topic.getBySlug.useQuery(
    { slug: UrlTopic as string },
    { ...queryOptions, enabled: !!UrlTopic }
  );
  const { data: categoryData } = api.category.getBySlug.useQuery(
    { slug: UrlCategory as string },
    { ...queryOptions, enabled: !!UrlCategory }
  );
  const { data: AnalogyData } = api.analogy.getSingleAnalogyById.useQuery(
    { id: UrlAnalogyId as string },
    { ...queryOptions, enabled: !!UrlAnalogyId }
  );
  const { data: profileData } = api.profile.getProfileById.useQuery(
    { id: UrlProfile as string },
    { ...queryOptions, enabled: !!UrlProfile }
  );

  return (
    <div
      id="breadcrumbs"
      className="my-auto hidden select-none text-sm sm:inline-flex "
    >
      <Link href="/home" aria-label="Home">
        <HomeIcon className="mt-[0px] cursor-pointer !text-lg text-dark-2 transition-all hover:text-black" />
      </Link>
      {router.pathname === "/home" && (
        <>
          <span className="mx-2 text-[#69696975]">-</span>
          <span className="font-semibold text-dark-2">
            Explain CS like I'm ten!
          </span>
        </>
      )}

      {router.pathname === "/admin" && (
        <>
          <span className="mx-2 text-[#69696975]">/</span>
          <span className="font-semibold text-dark-2">Admin panel</span>
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
              className={` cursor-pointer text-dark-2 transition-all hover:text-black ${
                UrlTopic ? "" : "font-semibold"
              }`}
            >
              {categoryData.name}
            </span>
          </Link>
        </>
      )}

      {topicsData ? (
        <>
          <span className="mx-2 text-[#69696975] ">/</span>
          <Link
            href={`${routeHandler(topicsData, "Topics") ?? ""}`}
            className="max-w-[calc(11vw)] truncate "
          >
            <span
              className={`cursor-pointer text-dark-2 transition-all hover:text-black ${
                UrlAnalogyId ? "" : "font-semibold"
              }`}
            >
              {topicsData.title}
            </span>
          </Link>
        </>
      ) : null}

      {AnalogyData && (
        <>
          <span className="mx-2 text-[#69696975]">/</span>
          <Link
            href={`${routeHandler(AnalogyData, "Analogies") ?? ""}`}
            className="max-w-[calc(12vw)] truncate"
          >
            <span className="cursor-pointer font-semibold text-dark-2 transition-all hover:text-black">
              {getScreenName(AnalogyData.user as User)}&apos;s Analogy
            </span>
          </Link>
        </>
      )}

      {profileData && (
        <>
          <span className="mx-2 text-[#69696975]">/</span>
          <span className="cursor-pointer font-semibold text-dark-2">
            {getScreenName(profileData)}
          </span>
        </>
      )}
    </div>
  );
}
