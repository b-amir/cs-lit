import React, { useState, type ComponentType } from "react";
import Head from "next/head";
import { api } from "@/utils/api";
import { PillsRow } from "../../components/Pills";
import { ListView } from "./ListView";
import { PageLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import { AiFillLock } from "react-icons/ai";
import { AdminFooter } from "./AdminFooter";
import { useDebounce } from "@/hooks/useDebounce";
import { CornerLoading } from "@/components/loading";
import { AdminSidePanel } from "./AdminSidePanel";
import {
  EditorModal,
  CategoryEditForm,
  TopicEditForm,
  AnalogyEditForm,
  UserEditForm,
  CommentEditForm,
} from "./EditorModal";

export default function AdminPage({}) {
  const { data: sessionData, status: sessionStatus } = useSession();

  const [activeSection, setActiveSection] = useState("Categories");
  const [editorModalShown, setEditorModalShown] = useState(false);
  const [editorModalInput, setEditorModalInput] = useState("");
  const [AdminFooterCollapsed, setAdminFooterCollapsed] = useState(false);
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
  const editorFormMap: Record<EditorModalInput["type"], ComponentType<any>> = {
    Categories: CategoryEditForm,
    Topics: TopicEditForm,
    Analogies: AnalogyEditForm,
    Users: UserEditForm,
    Comments: CommentEditForm,
  };
  const EditorForm =
    editorFormMap[editorModalInput?.type] || (() => "There's an error");

  // --- recognize user roles with access --- //
  const isModerator = ["ADMIN", "EDITOR"].includes(
    sessionData?.user.role ?? ""
  );

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
          <CornerLoading />
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
                    AdminFooterCollapsed
                      ? "h-[calc(100dvh-2rem-90px)]"
                      : "h-[calc(100dvh-20dvh-90px)]"
                  }`}
                >
                  <PillsRow
                    pills={[
                      "Categories",
                      "Topics",
                      "Users",
                      "Analogies",
                      "Comments",
                    ]}
                    setActive={setActiveSection}
                    active={activeSection}
                  />

                  <ListView
                    type={activeSection}
                    data={eval(`${activeSection.toLowerCase()}Data`) as object}
                    hasNextPage={
                      eval(
                        `Boolean(${activeSection.toLowerCase()}HasNextPage)`
                      ) as boolean
                    }
                    fetchNextPage={
                      eval(`fetchNext${activeSection}Page`) as () => void
                    }
                    isFetchingNextPage={
                      eval(`isFetchingNext${activeSection}Page`) as boolean
                    }
                    setEditorModalInput={setEditorModalInput}
                    setEditorModalShown={setEditorModalShown}
                    setOrderBy={setOrderBy}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </div>

                <AdminSidePanel />
              </div>
              <AdminFooter
                collapsed={AdminFooterCollapsed}
                setCollapsed={setAdminFooterCollapsed}
              />
            </div>

            <EditorModal
              shown={editorModalShown}
              setShown={setEditorModalShown}
            >
              <EditorForm
                setShown={setEditorModalShown}
                input={editorModalInput}
                setInput={setEditorModalInput}
              />
            </EditorModal>
          </>
        ) : (
          <div className="mt-[90px] flex h-[calc(100dvh-90px-2px)] w-full flex-col items-center justify-center border border-y-[#5555552a] text-gray-500">
            <AiFillLock />
            <span className="mt-2">Unauthorized Access</span>
          </div>
        )}
      </PageLayout>
    </>
  );
}
