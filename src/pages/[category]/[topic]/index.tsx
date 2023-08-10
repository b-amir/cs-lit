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
import { AnalogySkeleton, TableSkeleton } from "@/components/Skeleton";
import { useRef, useState } from "react";
import { FormTrigger } from "../../../components/FormTrigger";
import { animated, useSpring } from "@react-spring/web";
import { type Analogy } from "@prisma/client";

function TopicPage(props) {
  const router = useRouter();
  const { category: UrlCategory, topic: UrlTopic } = router.query;

  const [analogyEditorState, setAnalogyEditorState] = useState({
    entity: "analogy" as null | "analogy",
    shown: false,
    purpose: null as null | "Edit" | "Create",
  });

  const { data: topicsData, status: topicFetchingStatus } =
    api.topic.getBySlug.useQuery({
      slug: UrlTopic as string,
    });

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
      order: "desc",
      limit: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
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

  // console.log("topicAnalogies", topicAnalogies);
  // console.log("analogyInput", analogyInput);

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
        <div
          className={`grow-1 w-full [overflow:overlay] ${
            topicAnalogies && topicAnalogies.pages.length > 1
              ? " min-h-[calc(100dvh-0px)]"
              : " min-h-[calc(100dvh-160px)]"
          }`}
        >
          <div
            className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent 
          px-24 pb-6 pt-32"
          >
            {topicFetchingStatus === "loading" ? (
              <div className=" mb-4  h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" />
            ) : (
              <h1
                className={`${archivo.className}  max-w-[720px] truncate whitespace-pre-wrap break-words text-5xl font-extrabold  tracking-tight text-[#2A2A2E] sm:text-[2rem]`}
              >
                {topicsData?.title}
              </h1>
            )}
            <br />
            <div className="flex w-full flex-row justify-between py-1 align-middle text-sm text-[#808080] ">
              <p className="grow-1 inline-flex">
                {topicAnalogies?.pages[0].items.length}
                &nbsp;
                {!topicAnalogies?.pages[0].items.length && "No "}
                {topicAnalogies?.pages[0].items.length === 1
                  ? "analogy"
                  : "analogies"}
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
              setAnalogyInput={setAnalogyInput}
              setAnalogyEditorState={setAnalogyEditorState}
            />
          )}

          <div className="mx-auto my-12 flex w-full select-none flex-row justify-center px-6 py-1 align-middle text-sm text-[#808080ae]">
            <p className="grow-1 inline-flex text-lg font-light italic">
              - You can totally add your own analogy here! -
            </p>
          </div>
        </div>

        {/* {sessionData ? ( */}
        <div
          // handle form wrapper
          className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-16 text-[#2A2A2E] shadow-lg backdrop-blur-md backdrop-filter ${
            analogyEditorState.shown
              ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
              : "sticky bottom-[-200px] bg-[#2a2a2e3b] pb-7 pt-9"
          } ${analogyEditorState.purpose === "Edit" ? "" : ""}
                        ?`}
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
        {/* ) : (
            <div className="mx-auto mb-12 flex w-full  select-none flex-row justify-center px-6 py-1 align-middle text-sm text-[#808080ae]">
              <p
                className="grow-1 font-merriweathersans -mt-6 inline-flex cursor-pointer text-lg font-semibold transition-all hover:text-gray-600"
                onClick={() => signIn()}
              >
                Just sign in first.
              </p>
            </div>
          )} */}
      </PageLayout>
    </>
  );
}

export default TopicPage;
