import { PageLayout } from "@/components/layout";
import { useRouter } from "next/router";
import { CgFolderAdd } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import React, { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { api } from "@/utils/api";
import { CornerLoading } from "@/components/loading";
import { FaGhost } from "react-icons/fa";
import Head from "next/head";
import { archivo } from "@/styles/customFonts";
import { useSession } from "next-auth/react";
import { TableSkeleton } from "@/components/Skeleton";
import { TopicEditorForm } from "./TopicEditorForm";
import { TopicsList } from "./TopicsList";
import { type Topic, type Category } from "@prisma/client";

export default function CategoryPage() {
  const [topicEditorState, setTopicEditorState] = useState({
    shown: false,
    purpose: null as null | "edit" | "create",
  });

  const { data: sessionData } = useSession();
  const [topicInput, setTopicInput] = useState({
    id: "",
    title: "",
    url: "",
    category: "",
    firstAnalogy: "",
    slug: "",
    status: "",
  });
  const [orderBy, setOrderBy] = useState<"desc" | "asc" | null>("desc");

  // --- get category slug from url --- //
  const router = useRouter();
  const UrlCategory = router.query.category as string;

  // --- get category data by slug obtained from url --- //
  const {
    data: categoryData,
    isFetching: categoryFetching,
    status: categoryFetchingStatus,
  } = api.category.getBySlug.useQuery({
    slug: UrlCategory,
  });

  // --- get topics by category id --- //
  const {
    data: topicsData,
    status: topicsFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.topic.getByCategoryId.useInfiniteQuery(
    {
      id: categoryData?.id as string,
      order: orderBy,
      limit: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  // --- animation setup for editor ---> //
  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: !topicEditorState.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

  console.log("topicsData", topicsData);
  console.log("topicInput", topicInput);

  return (
    <>
      <Head>
        <title>{`${categoryData?.name ?? "CS"}`} Like I&apos;m 10!</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {/* if category is not found */}
        {!categoryFetching && !categoryData && (
          <div className="flex h-screen items-center justify-center ">
            Category not found.
          </div>
        )}

        <div
          // if there's only 0-5 topics, include form trigger in viewport
          className={`grow-1 w-full [overflow:overlay] ${
            topicsData && topicsData.pages.length > 5
              ? " min-h-[calc(100dvh-0px)]"
              : " min-h-[calc(100dvh-160px)]"
          }`}
        >
          <CategoryHeader
            categoryFetchingStatus={categoryFetchingStatus}
            categoryData={categoryData as Category}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            setTopicEditorState={setTopicEditorState}
          />

          <div className="mx-auto mb-12 mt-8 flex px-16 ">
            {/* handle loading states */}
            {categoryFetching && <CornerLoading />}
            {topicsFetchingStatus === "loading" && <TableSkeleton />}

            {/* show a list of topics */}
            {topicsFetchingStatus === "success" &&
            topicsData.pages.length > 0 ? (
              <TopicsList
                topicsData={topicsData}
                UrlCategory={UrlCategory}
                hasNextPage={hasNextPage as boolean}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                setTopicInput={setTopicInput}
                setTopicEditorState={setTopicEditorState}
              />
            ) : null}

            {/* if there's no topics */}
            {topicsFetchingStatus === "success" &&
            topicsData.pages.length <= 0 ? (
              <NoTopics
                topicEditorState={topicEditorState}
                setTopicEditorState={setTopicEditorState}
              />
            ) : null}
          </div>
        </div>

        <div
          // handle form wrapper
          className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-16 text-[#2A2A2E] shadow-lg backdrop-blur-md backdrop-filter ${
            topicEditorState.shown
              ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
              : "sticky bottom-[-200px] bg-[#2a2a2e3b] pb-7 pt-9"
          } ${topicEditorState.purpose === "edit" ? "" : ""}
              ?`}
        >
          <FormTrigger
            setTopicInput={setTopicInput}
            topicEditorState={topicEditorState}
            setTopicEditorState={setTopicEditorState}
            categoryData={categoryData as Category}
          />

          <animated.div
            style={animationProps}
            ref={contentRef}
            className="w-full"
          >
            <TopicEditorForm
              UrlCategory={UrlCategory}
              categoryData={categoryData}
              input={topicInput}
              setInput={setTopicInput}
              topicEditorState={topicEditorState}
              setTopicEditorState={setTopicEditorState}
            />
          </animated.div>
        </div>
      </PageLayout>
    </>
  );
}

// ------------------ COMPONENTS ------------------

interface IFormTriggerProps {
  setTopicInput: React.Dispatch<React.SetStateAction<Topic>>;
  categoryData: Category;
  topicEditorState: { shown: boolean; purpose: "create" | "edit" | null };
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "create" | "edit" | null;
    }>
  >;
}
interface ICategoryHeaderProps {
  categoryFetchingStatus: string;
  categoryData: Category;
  setOrderBy: React.Dispatch<React.SetStateAction<"desc" | "asc" | null>>;
  orderBy: "desc" | "asc" | null;
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "create" | "edit" | null;
    }>
  >;
}
interface INoTopicsProps {
  topicEditorState: { shown: boolean; purpose: "create" | "edit" | null };
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "create" | "edit" | null;
    }>
  >;
}

function NoTopics({
  topicEditorState,
  setTopicEditorState,
}: INoTopicsProps): React.ReactNode {
  return (
    <div className="font-merriweathersans mx-auto mt-[20%] flex h-full flex-col items-center  justify-center gap-10 text-lg font-semibold text-[#8c8c8cdd]">
      <FaGhost className="text-9xl text-[#a3a3a380]" />
      <span>
        No topics yet.
        <span
          className="cursor-pointer hover:text-[#4a4a4add]"
          onClick={() => {
            setTopicEditorState({ shown: true, purpose: "create" });
          }}
        >
          Create one!
        </span>
      </span>
    </div>
  );
}
function CategoryHeader({
  categoryFetchingStatus,
  categoryData,
  setOrderBy,
  orderBy,
  setTopicEditorState,
}: ICategoryHeaderProps) {
  return (
    <div className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-24 pb-6 pt-32">
      {categoryFetchingStatus === "loading" ? (
        <div className=" mb-4 h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" /> // category name skeleton
      ) : (
        <h1
          className={`${archivo.className} mb-4 items-start justify-start text-5xl font-extrabold tracking-tight text-[#2A2A2E] sm:text-[2rem]`}
        >
          {categoryData?.name}
        </h1>
      )}
      <div className="flex flex-row items-end place-self-end pt-5 text-sm font-semibold text-[#2A2A2E]">
        <div className="mr-0 inline-flex items-center">
          <label htmlFor="sort-by" className="min-w-fit">
            Sort by:
          </label>
          <select
            style={{
              paddingLeft: "0.8rem",
              paddingRight: "1.5rem",
              paddingTop: "0.35rem",
              paddingBottom: "0.35rem",
              backgroundColor: "#fff",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%234a5568'%3E%3Cpath fill-rule='evenodd' d='M10.707 14.707a1 1 0 0 1-1.414 0L5.586 10.586a1 1 0 1 1 1.414-1.414L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat, no-repeat, no-repeat",
              backgroundPosition:
                "right 0.5em top 50%, right 1.5em top 50%, 0 0",
              backgroundSize: "0.65em auto, 1.5em auto, 100% 100%",
              transition: "all 0.2s ease-in-out",
              outline: "none",
            }}
            id="sort-by"
            name="sort-by"
            onChange={() => setOrderBy(orderBy === "desc" ? "asc" : "desc")}
            className="mx-2 inline-flex cursor-pointer appearance-none flex-row items-end rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <button
          // create topic button
          onClick={() =>
            setTopicEditorState({ shown: true, purpose: "create" })
          }
          className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1.5 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
        >
          <CgFolderAdd className="mb-0.5 mr-2" /> Create topic
        </button>
      </div>
    </div>
  );
}
function FormTrigger({
  setTopicInput,
  topicEditorState,
  setTopicEditorState,
  categoryData,
}: IFormTriggerProps) {
  return (
    <div
      id="add-topic-header"
      className={` mb-4 inline-flex w-full cursor-pointer flex-row items-center rounded-[12px] border border-[#dcdcdca1] bg-[#efefef] 
 px-10 text-xl font-bold shadow-sm transition-all duration-300 hover:border-[#8b8b8ba5] hover:bg-[#ffffff] ${
   topicEditorState.shown ? "py-6 " : "py-6 "
 } `}
      onClick={() => {
        setTopicEditorState?.({
          shown: !topicEditorState.shown,
          purpose: "create",
        });

        setTopicInput({
          id: "",
          title: "",
          url: "",
          slug: "",
          category: categoryData,
          analogies: [{ id: "", description: "" }],
          starter: { id: "" },
        });
      }}
    >
      <CgFolderAdd className="mb-1.5 mr-2.5" />
      <span className=" grow select-none">
        <h2>
          {topicEditorState.purpose === "edit"
            ? "Edit topic"
            : "Create new topic"}
        </h2>
      </span>
      {/* rotate icon between X and + */}
      <IoClose
        className={`mb-1 transform cursor-pointer text-2xl text-[#737373] transition-transform delay-500 duration-200 hover:text-black ${
          topicEditorState.shown ? "" : "rotate-45"
        }`}
      />
    </div>
  );
}
