import { PageLayout } from "@/components/layout";
import { Feed } from "@/components/Feed";
import { PostEditor } from "@/components/PostEditor";
import { useRouter } from "next/router";
import { LuExternalLink } from "react-icons/lu";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";
import { archivo } from "@/styles/customFonts";

function TopicPage(props) {
  const router = useRouter();
  const { category: UrlCategory, topic: UrlTopic } = router.query;

  const { data: topicsData, isFetching: topicFetching } =
    api.topic.getBySlug.useQuery({
      slug: UrlTopic as string,
    });

  const {
    data: topicAnalogies,
    isLoading: analogiesLoading,
    refetch: refetchAnalogies,
  } = api.analogy.getAnalogiesByTopicId.useQuery({
    id: topicsData?.id as string,
  });

  return (
    <>
      <Head>
        <title>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          {`Analogies for ${topicsData?.title ?? ""}`}
          // CSLIT
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div
          id="feed-header"
          className="z-10 mx-auto mt-32 flex max-w-[640px] flex-col items-start justify-between overflow-clip overflow-ellipsis whitespace-nowrap"
        >
          <h1
            className={`${archivo.className} px-5  text-5xl font-extrabold  tracking-tight text-[#2A2A2E] sm:text-[2rem]`}
          >
            {topicsData?.title}
          </h1>
          <br />
          <div className="flex w-full max-w-[640px] flex-row justify-between px-6 py-1 align-middle text-sm text-[#808080] ">
            <p className="grow-1 inline-flex">
              {topicAnalogies?.length}
              &nbsp;
              {!topicAnalogies?.length && "No "}
              {topicAnalogies?.length === 1 ? "analogy" : "analogies"}
              &nbsp;for this topic.&nbsp;{" "}
              <span className="cursor-pointer hover:text-[#555555]">
                Add yours here!
              </span>
            </p>
            <Link href={`${topicsData?.url}`} target="_blank">
              <button className=" align-center justify-middle ml-auto flex grow-0 cursor-pointer items-center rounded-[17px] border border-transparent px-3 py-1 transition-all hover:border-[#d2d2d2] hover:bg-[#f0f0f0] hover:text-[#555555]">
                <LuExternalLink /> &nbsp;Open docs
              </button>
            </Link>
          </div>
        </div>

        <Feed topicAnalogies={topicAnalogies} />

        <div className="mx-auto my-12 flex w-full max-w-[640px] select-none flex-row justify-center px-6 py-1 align-middle text-sm text-[#808080ae]">
          <p className="grow-1 font-merriweathersans inline-flex text-lg font-light italic">
            - You can totally add your own analogy here! -
          </p>
        </div>
        <PostEditor topicId={topicsData?.id} topicTitle={topicsData?.title} />
      </PageLayout>
    </>
  );
}

export default TopicPage;
