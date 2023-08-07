import { PageLayout } from "@/components/layout";
import { Feed } from "@/components/Feed";
import { PostEditor } from "@/components/PostEditor";
import { useRouter } from "next/router";
import { LuExternalLink } from "react-icons/lu";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";
import { archivo } from "@/styles/customFonts";
import { signIn, signOut, useSession } from "next-auth/react";
import { AnalogySkeleton, TableSkeleton } from "@/components/Skeleton";

function TopicPage(props) {
  const router = useRouter();
  const { category: UrlCategory, topic: UrlTopic } = router.query;

  const { data: topicsData, status: topicFetchingStatus } =
    api.topic.getBySlug.useQuery({
      slug: UrlTopic as string,
    });

  const { data: sessionData } = useSession();

  const {
    data: topicAnalogies,
    status: analogiesFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.analogy.getByTopicId.useInfiniteQuery(
    {
      id: topicsData?.id as string,
      order: "desc",
      limit: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  return (
    <>
      <Head>
        <title>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          {`${topicsData?.title ?? "CS"}`} Like I&apos;m 10!
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <>
          <div
            className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent 
          px-24 pb-6 pt-32"
          >
            {/* <div
            id="feed-header"
            
            className="z-10 mx-auto mt-32 flex w-full flex-col items-start justify-between overflow-clip overflow-ellipsis whitespace-nowrap px-16"
          > */}
            {topicFetchingStatus === "loading" ? (
              <div className=" mb-4  h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" />
            ) : (
              <h1
                className={`${archivo.className}   text-5xl font-extrabold  tracking-tight text-[#2A2A2E] sm:text-[2rem]`}
              >
                {topicsData?.title}
              </h1>
            )}
            <br />
            <div className="flex w-full flex-row justify-between py-1 align-middle text-sm text-[#808080] ">
              <p className="grow-1 inline-flex">
                {topicAnalogies?.pages.length}
                &nbsp;
                {!topicAnalogies?.pages.length && "No "}
                {topicAnalogies?.pages.length === 1 ? "analogy" : "analogies"}
                &nbsp;for this topic.&nbsp;{" "}
              </p>
              <Link href={`${topicsData?.url}`} target="_blank">
                <button className=" align-center justify-middle ml-auto flex grow-0 cursor-pointer items-center rounded-[17px] border border-transparent px-3 py-1 transition-all hover:border-[#d2d2d2] hover:bg-[#f0f0f0] hover:text-[#555555]">
                  <LuExternalLink className="mb-0.5" /> &nbsp;Official docs
                </button>
              </Link>
            </div>
          </div>

          {analogiesFetchingStatus === "loading" ? (
            <>
              <AnalogySkeleton />
              <AnalogySkeleton />
              <AnalogySkeleton />
            </>
          ) : (
            <Feed
              topicAnalogies={topicAnalogies}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}

          <div className="mx-auto my-12 flex w-full select-none flex-row justify-center px-6 py-1 align-middle text-sm text-[#808080ae]">
            <p className="grow-1 font-merriweathersans inline-flex text-lg font-light italic">
              - You can totally add your own analogy here! -
            </p>
          </div>
          {sessionData ? (
            <PostEditor
              topicId={topicsData?.id}
              topicTitle={topicsData?.title}
            />
          ) : (
            <div className="mx-auto mb-12 flex w-full  select-none flex-row justify-center px-6 py-1 align-middle text-sm text-[#808080ae]">
              <p
                className="grow-1 font-merriweathersans -mt-6 inline-flex cursor-pointer text-lg font-semibold transition-all hover:text-gray-600"
                onClick={() => signIn()}
              >
                Just sign in first.
              </p>
            </div>
          )}
        </>
      </PageLayout>
    </>
  );
}

export default TopicPage;
