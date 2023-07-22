import React, { useState } from "react";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import Head from "next/head";

import { PillsRow } from "../../components/Pills";
import { ListView } from "./ListView";
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminFooter } from "./AdminFooter";

import {
  EditorModal,
  CategoryEditForm,
  TopicEditForm,
  AnalogyEditForm,
  UserEditForm,
} from "./EditorModal";

export default function AdminPage(props) {
  const [AdminFooterCollapsed, setAdminFooterCollapsed] = useState(false);

  const {
    data: categoriesData,
    hasNextPage: categoriesHasNextPage,
    fetchNextPage: fetchNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
  } = api.category.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  const {
    data: topicsData,
    hasNextPage: topicsHasNextPage,
    fetchNextPage: fetchNextTopicPage,
    isFetchingNextPage: isFetchingNextTopicPage,
  } = api.topic.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  const {
    data: analogiesData,
    hasNextPage: analogiesHasNextPage,
    fetchNextPage: fetchNextAnalogyPage,
    isFetchingNextPage: isFetchingNextAnalogyPage,
  } = api.analogy.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  const {
    data: usersData,
    hasNextPage: usersHasNextPage,
    fetchNextPage: fetchNextUserPage,
    isFetchingNextPage: isFetchingNextUserPage,
  } = api.profile.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  // const { data: commentsData, isFetching: commentsAreFetching } =
  //   api.comment.getAll.useQuery();

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
      default:
        return false;
    }
  }

  const [editorModalShown, setEditorModalShown] = useState(false);
  const [editorModalInput, setEditorModalInput] = useState("");

  return (
    <>
      <Head>
        <title>CSLIT - Admin Panel</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
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
                title={activeSection}
                data={getData(activeSection)}
                hasNextPage={getHasNextPage(activeSection)}
                fetchNextPage={getFetchNextPage(activeSection)}
                isFetchingNextPage={getIsFetchingNextPage(activeSection)}
                setEditorModalInput={setEditorModalInput}
                setEditorModalShown={setEditorModalShown}
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
          ) : (
            "hey"
          )}
        </EditorModal>
      </PageLayout>
    </>
  );
}
