import { PageLayout } from "@/components/layout";
import { Feed } from "@/components/Feed";
import { AnalogyEditorForm } from "@/pages/[category]/[topic]/AnalogyEditorForm";
import { useRouter } from "next/router";
import { LuExternalLink } from "react-icons/lu";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";
import { archivo } from "@/styles/customFonts";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AnalogySkeleton,
  MediumSkeleton,
  TableSkeleton,
} from "@/components/Skeleton";
import { useRef, useState } from "react";
import { FormTrigger } from "../../../components/FormTrigger";
import { animated, useSpring } from "@react-spring/web";
import { type Analogy } from "@prisma/client";
import { EntityNotFound } from "../../../components/EntityNotFound";

export default function TopicPage(props) {
  const router = useRouter();
  const { topic: UrlTopic } = router.query;

  const [analogyEditorState, setAnalogyEditorState] = useState({
    entity: "analogy" as null | "analogy",
    shown: false,
    purpose: null as null | "Edit" | "Create",
  });

  const { data: topicsData, status: topicFetchingStatus } =
    api.topic.getBySlug.useQuery(
      {
        slug: UrlTopic as string,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        manual: true,
      }
    );

  const [analogyInput, setAnalogyInput] = useState({
    description: "",
    topicId: topicsData?.id,
    // reference: "",
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
      viewerId: sessionData?.user?.id as string,
      order: "desc",
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  // --- animation setup for editor ---> //
  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: !analogyEditorState.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

  // --- a basic object that's passed to the form state whenever trigger is clicked --- //
  const newInput = {
    description: "",
    topicId: topicsData?.id,
    // reference: "",
  };

  const analogiesCount = topicAnalogies?.pages[0].total;

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
        {/* if topic is not found - invalid route */}
        {topicFetchingStatus === "error" ? (
          <EntityNotFound entity="Topic" />
        ) : (
          <>
            <div
              className={`grow-1 w-full [overflow:overlay] ${
                topicAnalogies && topicAnalogies.pages.length > 1
                  ? " min-h-[calc(100dvh-0px)]"
                  : " min-h-[calc(100dvh-160px)]"
              }`}
            >
              <TopicHeader
                analogiesCount={analogiesCount}
                analogiesFetchingStatus={analogiesFetchingStatus}
                sessionData={sessionData}
                topicFetchingStatus={topicFetchingStatus}
                topicsData={topicsData}
              />

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
                  setAnalogyInput={setAnalogyInput}
                  setAnalogyEditorState={setAnalogyEditorState}
                />
              )}

              <div className="mx-auto my-12 flex w-full select-none flex-row justify-center px-6 py-1 text-center text-[#808080ae]">
                <p className="grow-1 inline-flex font-light italic sm:text-lg">
                  - You can totally add your own analogy here! -
                </p>
              </div>
            </div>

            {/* {sessionData ? ( */}
            <div
              // handle form wrapper
              className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-[#2A2A2E] shadow-lg  backdrop-blur-md sm:px-10 lg:px-16  ${
                analogyEditorState.shown
                  ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
                  : "sticky bottom-[-200px] bg-[#2a2a2e3b] py-2 sm:pb-7 sm:pt-9"
              }  `}
            >
              <FormTrigger
                setInput={setAnalogyInput}
                editorState={analogyEditorState}
                setEditorState={setAnalogyEditorState}
                newInput={newInput}
              />

              <animated.div
                style={animationProps}
                ref={contentRef}
                className="w-full"
              >
                <AnalogyEditorForm
                  analogyEditorState={analogyEditorState}
                  setAnalogyEditorState={setAnalogyEditorState}
                  topicId={topicsData?.id}
                  input={analogyInput}
                  setInput={setAnalogyInput}
                />
              </animated.div>
            </div>
          </>
        )}
      </PageLayout>
    </>
  );
}

function TopicHeader({
  analogiesCount,
  analogiesFetchingStatus,
  sessionData,
  topicFetchingStatus,
  topicsData,
}: {
  analogiesCount: unknown;
  analogiesFetchingStatus: unknown;
  sessionData: unknown;
  topicFetchingStatus: unknown;
  topicsData: unknown;
}) {
  return (
    <div className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-4 pb-6 pt-28 sm:px-12 sm:pt-32 lg:px-24">
      {topicFetchingStatus === "loading" ? (
        <div className=" mb-4  h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" />
      ) : (
        <h1
          className={`${archivo.className} max-w-[720px] truncate whitespace-pre-wrap break-words text-2xl font-extrabold tracking-tight text-[#2A2A2E]  sm:text-4xl lg:text-5xl`}
        >
          {topicsData?.title}
        </h1>
      )}
      <br />
      <div className="flex w-full flex-row justify-between py-1 align-middle text-sm text-[#808080] ">
        {analogiesFetchingStatus === "loading" ? (
          <div className="grow-1 flex h-5 w-24 animate-pulse rounded-md bg-[#b4b4b49f]" />
        ) : (
          <p className="grow-1 inline-flex">
            {analogiesCount ? analogiesCount : "No"}
            &nbsp;
            {
              sessionData?.user.role === "ADMIN" ? "published " : "" // admin can see unpublished analogies too. hence adding "published" so it's not confusing.
            }
            {analogiesCount === 1 ? "analogy" : "analogies"}
            <span className="hidden sm:flex">&nbsp;for this topic.&nbsp; </span>
          </p>
        )}
        <Link href={`${topicsData?.url}`} target="_blank">
          <button className=" align-center justify-middle ml-auto flex grow-0 cursor-pointer items-center rounded-[17px] border border-transparent px-3 py-1 transition-all hover:border-[#d2d2d2] hover:bg-[#f0f0f0] hover:text-[#555555]">
            <LuExternalLink className="mb-0.5" /> &nbsp;Official docs
          </button>
        </Link>
      </div>
    </div>
  );
}
