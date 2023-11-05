import React, { useState, type ComponentType } from "react";
import Head from "next/head";
import { api } from "@/utils/api";
import { PillsRow } from "../../features/AdminPage/components/Pills";
import { PageLayout } from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import { useDebounce } from "@/hooks/useDebounce";
import { MainSection } from "../../features/AdminPage/MainSection";
import { CenteredLoading } from "@/components/Loading/Spinner";
import { PendingSection } from "../../features/AdminPage/PendingSection";
import { AiFillLock as Lock } from "react-icons/ai";
import { ActivityLogSection } from "../../features/AdminPage/ActivityLogSection";
import {
  EditorModal,
  CategoryEditForm,
  TopicEditForm,
  AnalogyEditForm,
  UserEditForm,
  CommentEditForm,
} from "../../features/AdminPage/components/EditorModal";
import {
  type FetchNextPage,
  type GeneralData,
  type IEditorModalInput,
} from "../../features/AdminPage/types";

export default function AdminPage({}) {
  const { data: sessionData, status: sessionStatus } = useSession();

  const [activeSection, setActiveSection] = useState("Categories");
  const [editorModalShown, setEditorModalShown] = useState(false);
  const [editorModalInput, setEditorModalInput] =
    useState<IEditorModalInput | null>(null);
  const [ActivityLogSectionCollapsed, setActivityLogSectionCollapsed] =
    useState(true);
  const [orderBy, setOrderBy] = useState<"desc" | "asc" | null>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  interface Api {
    category: typeof api.category;
    topic: typeof api.topic;
    analogy: typeof api.analogy;
    profile: typeof api.profile;
    comment: typeof api.comment;
  }
  const fetchData = (
    api: Api,
    entityType: "category" | "topic" | "analogy" | "profile" | "comment",
    query: string,
    order: "asc" | "desc" | null,
    limit: number
  ) => {
    return api[entityType].getAllWithQuery.useInfiniteQuery(
      {
        query,
        order,
        limit,
      },
      {
        getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // --- following items are used in mainListProps, despite what eslint thinks --- //
  const {
    data: categoriesData,
    hasNextPage: categoriesHasNextPage,
    fetchNextPage: fetchNextCategoriesPage,
    isFetchingNextPage: isFetchingNextCategoriesPage,
  } = fetchData(api, "category", debouncedSearch, orderBy, 15);
  const {
    data: topicsData,
    hasNextPage: topicsHasNextPage,
    fetchNextPage: fetchNextTopicsPage,
    isFetchingNextPage: isFetchingNextTopicsPage,
  } = fetchData(api, "topic", debouncedSearch, orderBy, 15);
  const {
    data: analogiesData,
    hasNextPage: analogiesHasNextPage,
    fetchNextPage: fetchNextAnalogiesPage,
    isFetchingNextPage: isFetchingNextAnalogiesPage,
  } = fetchData(api, "analogy", debouncedSearch, orderBy, 15);
  const {
    data: usersData,
    hasNextPage: usersHasNextPage,
    fetchNextPage: fetchNextUsersPage,
    isFetchingNextPage: isFetchingNextUsersPage,
  } = fetchData(api, "profile", debouncedSearch, orderBy, 15);
  const {
    data: commentsData,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: fetchNextCommentsPage,
    isFetchingNextPage: isFetchingNextCommentsPage,
  } = fetchData(api, "comment", debouncedSearch, orderBy, 15);

  // --- render correct editor form based on entity type --- //
  interface EditorModalInput {
    type: "Categories" | "Topics" | "Analogies" | "Users" | "Comments";
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorFormMap: Record<EditorModalInput["type"], ComponentType<any>> = {
    Categories: CategoryEditForm,
    Topics: TopicEditForm,
    Analogies: AnalogyEditForm,
    Users: UserEditForm,
    Comments: CommentEditForm,
  };
  const EditorForm =
    (editorModalInput && editorFormMap[editorModalInput.type]) ||
    (() => "There's an error");

  // --- recognize user roles with access --- //
  const isModerator = ["ADMIN", "EDITOR"].includes(
    sessionData?.user.role ?? ""
  );

  const pillsRowProps = {
    pills: ["Categories", "Topics", "Users", "Analogies", "Comments"],
    setActive: setActiveSection,
    active: activeSection,
  };
  const mainListProps = {
    type: activeSection,
    data: eval(`${activeSection.toLowerCase()}Data`) as GeneralData,
    hasNextPage: eval(
      `Boolean(${activeSection.toLowerCase()}HasNextPage)`
    ) as boolean,
    fetchNextPage: eval(`fetchNext${activeSection}Page`) as FetchNextPage,
    isFetchingNextPage: eval(`isFetchingNext${activeSection}Page`) as boolean,
    setEditorModalInput,
    setEditorModalShown,
    setOrderBy,
    searchQuery,
    setSearchQuery,
  };
  const activityLogProps = {
    collapsed: ActivityLogSectionCollapsed,
    setCollapsed: setActivityLogSectionCollapsed,
  };
  const editorModalProps = {
    shown: editorModalShown,
    setShown: setEditorModalShown,
  };
  const editorFormProps = {
    input: editorModalInput,
    setInput: setEditorModalInput,
    setShown: setEditorModalShown,
  };
  const pendingProps = { ActivityLogSectionCollapsed };

  return (
    <>
      <Head>
        <title>CSLIT - Admin Panel</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {sessionStatus === "loading" ? (
          <CenteredLoading />
        ) : isModerator ? (
          <>
            <div
              id="admin=page"
              className="mt-[90px] flex h-[calc(100dvh-90px-2px)] w-full flex-col border border-y-[#5555552a]"
            >
              <div
                id="admin-page-columns"
                className="flex flex-col sm:flex-row "
              >
                <div
                  id="admin-lists"
                  className={`w-full overflow-x-clip overflow-y-clip border border-r-[#5555552a] pb-[92px] transition-all sm:w-3/4 ${
                    ActivityLogSectionCollapsed
                      ? "h-[calc(100dvh-2rem-90px)]"
                      : "h-[calc(100dvh-20dvh-90px)]"
                  }`}
                >
                  <PillsRow {...pillsRowProps} />
                  <MainSection {...mainListProps} />
                </div>

                <PendingSection {...pendingProps} />
              </div>

              <ActivityLogSection {...activityLogProps} />
            </div>

            <EditorModal {...editorModalProps}>
              <EditorForm {...editorFormProps} />
            </EditorModal>
          </>
        ) : (
          <div className="mt-[90px] flex h-[calc(100dvh-90px-2px)] w-full flex-col items-center justify-center border border-y-[#5555552a] text-gray-500">
            <Lock />
            <span className="mt-2">Unauthorized Access</span>
          </div>
        )}
      </PageLayout>
    </>
  );
}
