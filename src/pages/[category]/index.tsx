import Head from "next/head";
import { api } from "@/utils/api";
import { archivo } from "@/styles/customFonts";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { TopicsList } from "./TopicsList";
import { useSession } from "next-auth/react";
import { CgFolderAdd } from "react-icons/cg";
import { FormTrigger } from "../../components/EditorForm/FormTrigger";
import { type Category } from "@prisma/client";
import { CenteredLoading } from "@/components/Loading/Spinner";
import { TableSkeleton } from "@/components/Loading/Skeleton";
import { EntityIsEmpty } from "@/components/Messages/EntityIsEmpty";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { TopicEditorForm } from "./TopicEditorForm";
import { animated, useSpring } from "@react-spring/web";
import React, { useRef, useState } from "react";

export default function CategoryPage() {
  const { data: sessionData } = useSession();
  const [topicEditorState, setTopicEditorState] = useState({
    entity: "topic" as null | "topic",
    shown: false,
    purpose: null as null | "Edit" | "Create",
  });
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
  } = api.category.getBySlug.useQuery(
    {
      slug: UrlCategory,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

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
      viewerId: sessionData?.user?.id as string,
      order: orderBy,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // --- animation setup for editor ---> //
  const contentRef = useRef<HTMLDivElement>(null);
  const editorAnimationProps = useSpring({
    height: !topicEditorState.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

  // --- a basic object that's passed to the form state whenever trigger is clicked --- //
  const newInput = {
    id: "",
    title: "",
    url: "",
    slug: "",
    category: categoryData,
    analogies: [{ id: "", description: "", reference: "" }],
    starter: { id: "" },
  };

  return (
    <>
      <Head>
        <title>{`${categoryData?.name ?? "CS"} Like I'm 10 !`}</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {/* if category is not found - invalid route */}
        {!categoryFetching && !categoryData ? (
          <EntityNotFound entity="Category" />
        ) : (
          <>
            <div
              className={`grow-1 min-h-[calc(100dvh-0px)] w-full [overflow:overlay]`}
            >
              <CategoryHeader
                categoryFetchingStatus={categoryFetchingStatus}
                categoryData={categoryData as Category}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                setTopicEditorState={setTopicEditorState}
              />

              <div className="mx-auto mb-12 mt-8 flex justify-center sm:px-10 lg:px-[16.666667%] ">
                {/* handle loading states */}
                {categoryFetching ||
                  (topicsFetchingStatus === "loading" && <CenteredLoading />)}
                {topicsFetchingStatus === "loading" && <TableSkeleton />}

                {/* show a list of topics */}
                {topicsFetchingStatus === "success" &&
                topicsData?.pages[0]?.items?.length > 0 ? (
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
                topicsData?.pages[0]?.items?.length <= 0 ? (
                  <EntityIsEmpty
                    entity="category"
                    action={() => {
                      setTopicEditorState({ shown: true, purpose: "Create" });
                    }}
                  />
                ) : null}
              </div>
            </div>

            <div
              // handle form wrapper
              className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-[#2A2A2E] shadow-lg  backdrop-blur-md sm:px-10 lg:px-[16.666667%]  ${
                topicEditorState.shown
                  ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
                  : "sticky bottom-[-200px] bg-[#2a2a2e3b] py-2 sm:pb-7 sm:pt-9"
              }`}
            >
              <FormTrigger
                setInput={setTopicInput}
                editorState={topicEditorState}
                setEditorState={setTopicEditorState}
                newInput={newInput}
              />

              <animated.div
                style={editorAnimationProps}
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
          </>
        )}
      </PageLayout>
    </>
  );
}

// ------------------ COMPONENTS ------------------ //

interface ICategoryHeaderProps {
  categoryFetchingStatus: string;
  categoryData: Category;
  setOrderBy: React.Dispatch<React.SetStateAction<"desc" | "asc" | null>>;
  orderBy: "desc" | "asc" | null;
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "Create" | "Edit" | null;
    }>
  >;
}
function CategoryHeader({
  categoryFetchingStatus,
  categoryData,
  setOrderBy,
  orderBy,
  setTopicEditorState,
}: ICategoryHeaderProps) {
  return (
    <div className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-6 pb-6 pl-8 pt-28 sm:px-12 sm:pt-32 lg:px-[18%]">
      {categoryFetchingStatus === "loading" ? (
        <div className=" mb-4 h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" /> // category name skeleton
      ) : (
        <h1
          className={`${archivo.className} mb-4 max-w-[720px] items-start justify-start truncate whitespace-pre-wrap break-words text-2xl font-extrabold tracking-tight text-[#2A2A2E] sm:text-4xl lg:text-5xl `}
        >
          {categoryData?.name}
        </h1>
      )}
      <div className="flex flex-row items-center place-self-end pt-5 text-sm font-semibold text-[#2A2A2E]">
        <div className="mr-0 inline-flex items-center">
          <label htmlFor="sort-by" className="min-w-fit">
            Sort by:
          </label>
          <select
            style={{
              paddingLeft: "0.8rem",
              paddingRight: "1.5rem",
              paddingTop: "0.35rem",
              height: "2rem",
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
            setTopicEditorState({ shown: true, purpose: "Create" })
          }
          className="mx-2 inline-flex h-8 flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1.5 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
        >
          <CgFolderAdd className="mb-0.5 sm:mr-2" />{" "}
          <span className="hidden sm:flex"> Create topic</span>
        </button>
      </div>
    </div>
  );
}
