import React from "react";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import { LuList } from "react-icons/lu";
import { TbUrgent } from "react-icons/tb";
import { archivo } from "@/styles/customFonts";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import Head from "next/head";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";

export default function AdminPage(props) {
  const {
    data: categoriesData,
    isFetching: categoriesAreFetching,
    hasNextPage: categoriesHasNextPage,
    fetchNextPage: fetchNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
  } = api.category.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );

  const {
    data: topicsData,
    isFetching: topicsAreFetching,
    hasNextPage: topicsHasNextPage,
    fetchNextPage: fetchNextTopicPage,
    isFetchingNextPage: isFetchingNextTopicPage,
  } = api.topic.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );

  const {
    data: analogiesData,
    isFetching: analogiesAreFetching,
    hasNextPage: analogiesHasNextPage,
    fetchNextPage: fetchNextAnalogyPage,
    isFetchingNextPage: isFetchingNextAnalogyPage,
  } = api.analogy.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );

  const {
    data: usersData,
    isFetching: usersAreFetching,
    hasNextPage: usersHasNextPage,
    fetchNextPage: fetchNextUserPage,
    isFetchingNextPage: isFetchingNextUserPage,
  } = api.profile.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );

  // const { data: commentsData, isFetching: commentsAreFetching } =
  //   api.comment.getAll.useQuery();

  const [activeSection, setActiveSection] = React.useState("Categories");

  return (
    <>
      <Head>
        <title>CSLIT - Admin Panel</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div
          id="admin-page"
          className="mt-[90px] flex min-h-[calc(100dvh-92px)] border border-y-[#55555556]"
        >
          <div
            id="admin-lists"
            className="w-3/4 overflow-clip border border-r-[#55555556]"
          >
            <PillsRow
              setActiveSection={setActiveSection}
              activeSection={activeSection}
            />
            <ListView
              title={activeSection}
              data={
                activeSection === "Categories"
                  ? categoriesData
                  : activeSection === "Topics"
                  ? topicsData
                  : activeSection === "Analogies"
                  ? analogiesData
                  : activeSection === "Users"
                  ? usersData
                  : []
                // : commentsData
              }
              hasNextPage={
                activeSection === "Categories"
                  ? categoriesHasNextPage
                  : activeSection === "Topics"
                  ? topicsHasNextPage
                  : activeSection === "Analogies"
                  ? analogiesHasNextPage
                  : activeSection === "Users"
                  ? usersHasNextPage
                  : false
              }
              fetchNextPage={
                activeSection === "Categories"
                  ? fetchNextCategoryPage
                  : activeSection === "Topics"
                  ? fetchNextTopicPage
                  : activeSection === "Analogies"
                  ? fetchNextAnalogyPage
                  : activeSection === "Users"
                  ? fetchNextUserPage
                  : () => {}
              }
              isfetchingNextPage={
                activeSection === "Categories"
                  ? isFetchingNextCategoryPage
                  : activeSection === "Topics"
                  ? isFetchingNextTopicPage
                  : activeSection === "Analogies"
                  ? isFetchingNextAnalogyPage
                  : activeSection === "Users"
                  ? isFetchingNextUserPage
                  : false
              }
            />
          </div>

          <div
            id="admin-sidepanel"
            className="relative z-20 mx-auto min-h-[calc(100dvh-92px)] w-1/4  overflow-clip   border  border-gray-200 bg-[#f7f3ee]  shadow-lg transition-all"
          >
            <div
              id="urgent-header"
              className="w-full  border-b border-b-[#55555550] bg-gradient-to-br from-[#fff] to-[#f7f3ee00] px-6  pb-4 pt-7"
            >
              <h1
                className={` ${archivo.className}  mb-2 flex flex-row items-center  gap-1 text-3xl font-bold`}
              >
                <TbUrgent className="mb-0.5" /> Urgent
              </h1>
              <div className="w-full  pt-1 text-sm text-gray-500">
                following items need your attention.
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

function PillsRow({
  setActiveSection,
  activeSection,
}: {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
}) {
  return (
    <div
      id="pills-row"
      className="flex flex-row items-start gap-3  bg-[#F9F9F9] px-16 py-8"
    >
      <Pill
        title="Categories"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <Pill
        title="Topics"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <Pill
        title="Users"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <Pill
        title="Analogies"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <Pill
        title="Comments"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
    </div>
  );
}

function Pill({
  title,
  setActiveSection,
  activeSection,
}: {
  title: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
}) {
  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-center rounded-[12px] border px-5 py-1 shadow-sm ${
          activeSection === title
            ? "border-[#b5431a] bg-[#e95620] text-white "
            : "border-[#d1d1d1] bg-[#ffffff] text-[#2A2A2E]"
        }`}
        onClick={() => setActiveSection(title)}
      >
        <h1 className={` text-sm font-bold`}>{title}</h1>
      </div>
    </>
  );
}

function ListView({
  data,
  title,
  hasNextPage,
  fetchNextPage,
  isfetchingNextPage,
}: {
  title: string;
  data: any;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isfetchingNextPage: boolean;
}) {
  return (
    <div className=" relative z-20 mx-auto h-full  overflow-clip   border  border-gray-200 bg-white px-0 shadow-lg transition-all ">
      <>
        <div className="flex flex-col gap-5 border-y border-l-0 border-[#5a5a5a2a] bg-gradient-to-tr from-[#eeeeee] to-[#dcdcdc] px-16 py-6">
          <div
            id="count-title"
            className="flex flex-row items-center justify-start"
          >
            <span className="mr-3 rounded-md border border-[#73717180] bg-[#00000013] px-2 pt-0.5 text-sm text-gray-500 shadow-sm">
              {data?.length ?? 0}
            </span>
            <h1
              className={` ${archivo.className}  flex flex-row items-center gap-1 text-3xl font-bold`}
            >
              {title}
            </h1>
          </div>
          <div
            id="filters"
            className="flex w-full flex-row items-center justify-between"
          >
            <input
              type="text"
              placeholder="Search"
              className="mr-2 max-w-[60%] rounded-md border border-[#00000030] px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />

            <div className="grid grid-cols-2 gap-2 rounded-md bg-[#00000030] px-[2.5px] py-0.5 text-sm text-[#2f2f2f]">
              <div>
                <input
                  type="radio"
                  name="option"
                  id="all"
                  value="All"
                  className="peer hidden"
                  checked
                />
                <label
                  htmlFor="all"
                  className=" flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center peer-checked:border-[#0000006d] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-black peer-checked:shadow-sm"
                >
                  <LuList className="mb-[4px]" />
                  All
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="option"
                  id="pending"
                  value="Pending"
                  className="peer hidden"
                />
                <label
                  htmlFor="pending"
                  className="flex cursor-pointer select-none flex-row items-center justify-center gap-1 rounded-md border border-transparent px-3 py-1 text-center peer-checked:border-[#0000006d] peer-checked:bg-gray-50 peer-checked:font-bold peer-checked:text-black peer-checked:shadow-sm"
                >
                  <MdAccessTime className="mb-[3px]" /> Pending
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          {data?.pages?.map((page) =>
            page?.items?.map((item) => (
              <ListItemView key={item.id} item={item} />
            ))
          )}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isfetchingNextPage}
            >
              {isfetchingNextPage ? "Loading more..." : "Load more"}
            </button>
          )}
          {console.log("data:", data)}
        </div>
      </>
    </div>
  );
}

function ListItemView({ item }) {
  const [showActionMenuDots, setShowActionMenuDots] = React.useState(false);

  return (
    <div
      className="z-0 flex h-8 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-gray-100  px-16 py-6 transition-all hover:bg-gray-100"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-row items-center">
        <h1 className={`font text-sm font-bold`}>
          {item.title ? item.title : item.name ? item.name : item.id}
        </h1>
        <span className="ml-2 text-sm text-gray-500">{item?.status ?? ""}</span>
      </div>
      <div className={`${showActionMenuDots ? "visible" : "hidden"} `}>
        <ActionMenu />{" "}
      </div>
    </div>
  );
}

function ActionMenu() {
  const [showExtendedActionMenu, setShowExtendedActionMenu] =
    React.useState(false);
  return (
    <div
      id="action-menu"
      className="z-10 flex flex-row items-center rounded-lg border transition-all hover:bg-[#ffffff6c] hover:shadow-sm"
      onMouseLeave={() => setShowExtendedActionMenu(false)}
    >
      {showExtendedActionMenu && (
        <div
          id="action-menu-items"
          className="flex flex-row items-center rounded-l-lg bg-[#ffffff6c] p-2"
        >
          <MdDelete className="mx-2 cursor-pointer text-[#c83535] hover:text-[#cd8a8a]" />
          <AiTwotoneEdit className="mx-2 cursor-pointer text-gray-600 hover:text-gray-400" />
        </div>
      )}

      <button
        onClick={() => setShowExtendedActionMenu(!showExtendedActionMenu)}
      >
        <HiOutlineDotsVertical
          className={`h-8 w-8 cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-[#ffffff6c] ${
            showExtendedActionMenu ? "rounded-l-none" : ""
          }`}
        />
      </button>
    </div>
  );
}
