import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { AnalogyView } from "@/components/AnalogyView";
import { PageLayout } from "@/components/layout";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import { CornerLoading } from "@/components/loading";
import Image from "next/image";
import { useRouter } from "next/router";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { useSession } from "next-auth/react";

// this is a page that is renderd when a user visits /profile/[id]
// the point of this page is to show a user's profile and all analogies that they created

const ProfileFeed = (props: { userId: string }) => {
  const { data: sessionData } = useSession();
  const isAdmin = sessionData?.user.role === "ADMIN" || "EDITOR";
  const isAuthor = sessionData?.user.id === props.userId;
  const canSeeUnpublished = isAdmin || isAuthor;

  const getAnalogiesByUserId = canSeeUnpublished
    ? "getAllAnalogiesByUserId"
    : "getPublishedAnalogiesByUserId";

  const {
    data: analogyData,
    status: analogyFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.analogy.getAnalogiesByUserId.useInfiniteQuery(
    {
      userId: props.userId,
      order: "desc",
      limit: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  if (analogyFetchingStatus === "loading") return <CornerLoading />;
  if (!analogyData || analogyData?.pages[0]?.length === 0) {
    return <>User has not posted any analogies.</>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-16">
      {analogyData?.pages?.map((page) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        page?.items?.map((analogy: Analogy) => (
          <AnalogyView
            analogy={{
              id: analogy.id,
            }}
            needsLink={true}
            needsLocationInfo
            key={analogy.id}
          />
        ))
      )}
      {hasNextPage && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

const ProfilePage: NextPage<object> = () => {
  // api.analogy.getAll.useQuery();

  // now we have to get the user id from the url
  // we can do this by using the useRouter hook

  const router = useRouter();
  const { id: UrlId } = router.query;

  const { data: profileData, status: profileFetchingStatus } =
    api.profile.getProfileById.useQuery({
      id: UrlId as string,
    });

  if (profileFetchingStatus === "loading") return <CornerLoading />;
  if (profileFetchingStatus === "error") return <div>User not found</div>;

  return (
    <>
      <Head>
        <title>
          {profileData?.name ? profileData?.name : profileData?.email}&apos;s
          Profile
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div
          id="profile-page"
          className="z-10 mx-auto mb-20 flex w-full flex-col items-start justify-between "
        >
          <div
            id="profile-header"
            className="mt-0 flex w-full flex-col items-center justify-center"
          >
            <div className="mb-12 w-full border-b-2  border-[#827c7c2b]   ">
              <div className="flex w-full flex-row  bg-gradient-to-tr from-[#ff73631a] to-transparent px-24 pb-12  pt-32">
                <Image
                  src={profileData.profileImageUrl ?? "/assets/defaultpp.svg"}
                  className="max-w-14 -mt-1.5 mr-4 max-h-14 rounded-full ring-1 ring-[#827c7cb8]"
                  alt={"Profile Picture"}
                  width={42}
                  height={42}
                />

                <p className=" text-2xl font-bold text-[#343437]">
                  {profileData?.name ? profileData?.name : profileData?.email}
                  <span className="font-semibold text-[#535357]">
                    &apos;s Analogies
                  </span>
                </p>
              </div>
            </div>
          </div>
          <ProfileFeed userId={profileData.id} />
        </div>
      </PageLayout>
    </>
  );
};

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
