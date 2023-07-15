// admin panel page

import React from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import { LoadingPage } from "@/components/loading";
import { FaArrowLeft } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { LuExternalLink } from "react-icons/lu";
import { archivo } from "@/styles/customFonts";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpring, animated } from "@react-spring/web";
import { CgSpinner } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import { Voting } from "@/components/Voting";
import { useSession } from "next-auth/react";
import { useToasterStore } from "react-hot-toast";
import Head from "next/head";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { set } from "nprogress";

export default function AdminPage(props) {
  // sections:
  // 1- list of categories with filter and search
  // 2- list of topics with filter and search
  // 3- list of analogies with filter and search
  // 4- list of users with filter and search
  // 5- list of comments with filter and search

  const router = useRouter();

  const { data: categoriesData, isFetching: categoriesFetching } =
    api.category.getAll.useQuery();

  const { data: topicsData, isFetching: topicsFetching } =
    api.topic.getAll.useQuery();

  const { data: analogiesData, isFetching: analogiesFetching } =
    api.analogy.getAll.useQuery();

  const { data: usersData, isFetching: usersFetching } =
    api.profile.getTopThree.useQuery();

  // const { data: commentsData, isFetching: commentsFetching } =
  //   api.comment.getAll.useQuery();

  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = React.useState([]);

  return (
    <>
      <Head>
        <title>CSLIT - Admin Panel</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="mt-32 grid grid-cols-1 gap-10 px-14 md:grid-cols-2 lg:grid-cols-2">
          <ListView title="Categories" data={categoriesData} />
          <ListView title="Topics" data={topicsData} />
          <ListView title="Users" data={usersData} />
          <ListView title="Analogies" data={analogiesData} />
          {/* <ListView  title="Comments" data={commentsData}/> */}
        </div>
      </PageLayout>
    </>
  );
}

function ListView({ data, title }: { data: any; title: string }) {
  return (
    <>
      <div className=" relative z-20  overflow-clip rounded-[17px]  border  border-gray-200 bg-white px-0 pb-8 shadow-lg transition-all hover:border-[#c1c1c1] ">
        <div className="flex w-full flex-col items-start justify-between border-b bg-gray-50 px-6 pb-4 pt-8">
          <div className="mb-4 flex flex-row items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <span className="ml-2 text-sm text-gray-500">
              {data?.length ?? 0}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="max-w-[60%] rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <select
              name="filter"
              id="filter"
              className=" ml-[-10px] rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="flex w-full flex-col">
          {data?.map((item) => (
            <ListItemView key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

function ListItemView({ item }) {
  const [showActionMenuDots, setShowActionMenuDots] = React.useState(false);

  return (
    <div
      className="z-0 flex h-6 w-full cursor-pointer flex-row items-center justify-between border-b-[1px] border-gray-100  px-6 py-5 transition-all hover:bg-gray-100"
      // key={item.id}
      onMouseEnter={() => setShowActionMenuDots(true)}
      onMouseLeave={() => setShowActionMenuDots(false)}
    >
      <div className="flex flex-row items-center">
        <h1 className="text-sm font-bold">
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
      className="z-10 flex flex-row items-center"
      onMouseLeave={() => setShowExtendedActionMenu(false)}
    >
      {showExtendedActionMenu && (
        <div id="action-menu-items" className="flex flex-row items-center">
          <MdDelete className="mr-2 cursor-pointer text-[#b95353] hover:text-[#f24a4a]" />
          <AiTwotoneEdit className="mr-2 cursor-pointer text-gray-400 hover:text-gray-500" />
        </div>
      )}

      <button
        onClick={() => setShowExtendedActionMenu(!showExtendedActionMenu)}
      >
        <HiOutlineDotsVertical className="h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200" />
      </button>
    </div>
  );
}
