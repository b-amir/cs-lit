import React, { useState } from "react";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import Head from "next/head";

import { PillsRow } from "../../components/Pills";
import { ListView } from "./ListView";
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminFooter } from "./AdminFooter";
import { useDebounce } from "@/hooks/useDebounce";

import {
  EditorModal,
  CategoryEditForm,
  TopicEditForm,
  AnalogyEditForm,
  UserEditForm,
  CommentEditForm,
} from "./EditorModal";
import { useSession } from "next-auth/react";
import { AiFillLock } from "react-icons/ai";
import { CornerLoading } from "@/components/loading";

export default function AdminPage(props) {
  const [AdminFooterCollapsed, setAdminFooterCollapsed] = useState(false);
  const [orderBy, setOrderBy] = useState<"desc" | "asc" | null>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: categoriesData,
    hasNextPage: categoriesHasNextPage,
    fetchNextPage: fetchNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
  } = api.category.getAllWithQuery.useInfiniteQuery(
    {
      query: debouncedSearch,
      order: orderBy,
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  const {
    data: topicsData,
    hasNextPage: topicsHasNextPage,
    fetchNextPage: fetchNextTopicPage,
    isFetchingNextPage: isFetchingNextTopicPage,
  } = api.topic.getAllWithQuery.useInfiniteQuery(
    {
      query: debouncedSearch,
      order: orderBy,
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  const {
    data: analogiesData,
    hasNextPage: analogiesHasNextPage,
    fetchNextPage: fetchNextAnalogyPage,
    isFetchingNextPage: isFetchingNextAnalogyPage,
  } = api.analogy.getAllWithQuery.useInfiniteQuery(
    {
      query: debouncedSearch,
      order: orderBy,
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  const {
    data: usersData,
    hasNextPage: usersHasNextPage,
    fetchNextPage: fetchNextUserPage,
    isFetchingNextPage: isFetchingNextUserPage,
  } = api.profile.getAllWithQuery.useInfiniteQuery(
    {
      query: debouncedSearch,
      order: orderBy,
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );

  const {
    data: commentsData,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: fetchNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
  } = api.comment.getAllWithQuery.useInfiniteQuery(
    {
      query: debouncedSearch,
      order: orderBy,
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      manual: true,
    }
  );
  const [activeSection, setActiveSection] = useState("Categories");

  function getData(activeSection: string) {
    switch (activeSection) {
      case "Categories":
        return categoriesData;
      case "Topics":
        return topicsData;
      case "Analogies":
        return analogiesData;
      case "Users":
        return usersData;
      case "Comments":
        return commentsData;
      default:
        return [];
    }
  }

  function getHasNextPage(activeSection: string) {
    switch (activeSection) {
      case "Categories":
        return categoriesHasNextPage;
      case "Topics":
        return topicsHasNextPage;
      case "Analogies":
        return analogiesHasNextPage;
      case "Users":
        return usersHasNextPage;
      case "Comments":
        return commentsHasNextPage;
      default:
        return false;
    }
  }

  function getFetchNextPage(activeSection: string) {
    switch (activeSection) {
      case "Categories":
        return fetchNextCategoryPage;
      case "Topics":
        return fetchNextTopicPage;
      case "Analogies":
        return fetchNextAnalogyPage;
      case "Users":
        return fetchNextUserPage;
      case "Comments":
        return fetchNextCommentPage;
      default:
        return;
    }
  }

  function getIsFetchingNextPage(activeSection: string) {
    switch (activeSection) {
      case "Categories":
        return isFetchingNextCategoryPage;
      case "Topics":
        return isFetchingNextTopicPage;
      case "Analogies":
        return isFetchingNextAnalogyPage;
      case "Users":
        return isFetchingNextUserPage;
      case "Comments":
        return isFetchingNextCommentPage;
      default:
        return false;
    }
  }

  const [editorModalShown, setEditorModalShown] = useState(false);
  const [editorModalInput, setEditorModalInput] = useState("");

  const { data: sessionData, status: sessionStatus } = useSession();

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
        ) : sessionData?.user.role === "ADMIN" ? (
          <>
            <div
              id="admin=page"
              className="mt-[90px] flex h-[calc(100dvh-90px-2px)] w-full flex-col border border-y-[#5555552a]"
            >
              <div id="admin-page-columns" className=" flex ">
                <div
                  id="admin-lists"
                  className={` w-3/4 overflow-x-clip overflow-y-clip border border-r-[#5555552a] pb-[92px] transition-all ${
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
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}
                  />

                  <ListView
                    type={activeSection}
                    data={getData(activeSection)}
                    hasNextPage={getHasNextPage(activeSection)}
                    fetchNextPage={getFetchNextPage(activeSection)}
                    isFetchingNextPage={getIsFetchingNextPage(activeSection)}
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
                AdminFooterCollapsed={AdminFooterCollapsed}
                setAdminFooterCollapsed={setAdminFooterCollapsed}
              />
            </div>

            <EditorModal
              editorModalShown={editorModalShown}
              setEditorModalShown={setEditorModalShown}
            >
              {editorModalInput?.type === "Categories" ? (
                <CategoryEditForm
                  editorModalInput={editorModalInput}
                  setEditorModalShown={setEditorModalShown}
                  setEditorModalInput={setEditorModalInput}
                />
              ) : editorModalInput?.type === "Topics" ? (
                <TopicEditForm
                  editorModalInput={editorModalInput}
                  setEditorModalShown={setEditorModalShown}
                  setEditorModalInput={setEditorModalInput}
                />
              ) : editorModalInput?.type === "Analogies" ? (
                <AnalogyEditForm
                  editorModalInput={editorModalInput}
                  setEditorModalShown={setEditorModalShown}
                  setEditorModalInput={setEditorModalInput}
                />
              ) : editorModalInput?.type === "Users" ? (
                <UserEditForm
                  editorModalInput={editorModalInput}
                  setEditorModalShown={setEditorModalShown}
                  setEditorModalInput={setEditorModalInput}
                />
              ) : editorModalInput?.type === "Comments" ? (
                <CommentEditForm
                  editorModalInput={editorModalInput}
                  setEditorModalShown={setEditorModalShown}
                  setEditorModalInput={setEditorModalInput}
                />
              ) : (
                "There's an error"
              )}
            </EditorModal>
          </>
        ) : (
          <div
            // className="flex select-none flex-col items-center justify-center text-gray-500"
            className="mt-[90px] flex h-[calc(100dvh-90px-2px)] w-full flex-col items-center justify-center border border-y-[#5555552a] text-gray-500"
          >
            {" "}
            <AiFillLock />
            <span className="mt-2">Unauthorized Access</span>
          </div>
        )}
      </PageLayout>
    </>
  );
}
