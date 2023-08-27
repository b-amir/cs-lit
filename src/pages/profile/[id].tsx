import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/PageLayout";
import { CornerLoading } from "@/components/Loading";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnalogiesFeed } from "@/components/AnalogiesFeed";
import { getScreenName } from "@/utils/getScreenName";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
// import { generateSSGHelper } from "@/server/helpers/ssgHelper";

const ProfilePage: NextPage<object> = () => {
  const router = useRouter();
  const { id: UrlId } = router.query;

  const { data: profileData, status: profileFetchingStatus } =
    api.profile.getProfileById.useQuery(
      {
        id: UrlId as string,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const {
    data: userAnalogies,
    status: analogiesFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.analogy.getAnalogiesByUserId.useInfiniteQuery(
    {
      userId: UrlId as string,
      order: "desc",
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <>
      <Head>
        <title>
          {`${getScreenName(profileData)}'s
          Profile`}
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {profileFetchingStatus === "loading" ? (
          <CornerLoading />
        ) : profileFetchingStatus === "error" ? (
          <EntityNotFound entity="User" />
        ) : (
          <div
            id="profile-page"
            className="grow-1 min-h-[calc(100dvh)] w-full [overflow:overlay]"
          >
            <ProfileHeader profileData={profileData} />
            <AnalogiesFeed
              analogies={userAnalogies}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchingStatus={analogiesFetchingStatus}
              isProfile
            />
          </div>
        )}
      </PageLayout>
    </>
  );
};

export interface IProfileHeaderProps {
  profileData: {
    id: string;
    name: string;
    email: string;
    profileImageUrl: string | null;
  };
}
function ProfileHeader({ profileData }: IProfileHeaderProps) {
  return (
    <div
      id="profile-header"
      className="mt-0 flex w-full flex-col items-center justify-center"
    >
      <div className="mb-12 w-full border-b-2  border-[#827c7c2b]   ">
        <div className="flex w-full flex-col  justify-center gap-4 bg-gradient-to-tr from-[#ff73631a] to-transparent  px-4 pb-4 pt-28 text-center sm:flex-row sm:justify-start sm:gap-0 sm:px-12 sm:pb-12 sm:pt-32  sm:text-start lg:px-[18%]">
          <Image
            src={profileData?.profileImageUrl ?? "/assets/defaultpp.svg"}
            className="max-w-14 mx-auto -mt-1.5 max-h-14 rounded-full ring-1 ring-[#827c7cb8] sm:mx-0 sm:mr-4"
            alt={"Profile Picture"}
            width={42}
            height={42}
          />

          <p className=" text-md font-bold text-[#343437] sm:text-2xl ">
            {getScreenName(profileData)}
            <span className="font-semibold text-[#535357]">
              &apos;s Analogies
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   const userId = context.params?.userId as string;
//   if (typeof userId !== "string") throw new Error("slug is not a string");

//   // const userId = slug.replace("@", "");
//   await ssg.profile.getUserId.prefetch({ id: userId });

//   return {
//     props: {
//       trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
//       userId,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };
