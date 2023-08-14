import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { RiMenuAddFill } from "react-icons/ri";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { SidebarCategorySkeleton } from "@/components/Skeleton";
import { type Category } from "@prisma/client";
import { useCreateItem } from "@/hooks/useCreateItem";

export function SidebarLeft(props: { username: any }) {
  const { data: sessionData } = useSession();
  const { data: categories, status: categoryFetchingStatus } =
    api.category.getAll.useInfiniteQuery(
      { limit: 15 },
      {
        getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      }
    );

  return (
    <aside
      id="left-sidebar"
      className="fixed left-0 top-0 z-50 flex h-screen w-1/6 -translate-x-full flex-col place-content-stretch items-stretch 
        justify-between border-r border-white bg-white pt-0 shadow-md transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <LogoSection />
      <div className="align-around h-full overflow-y-auto  bg-white px-0 pb-0 dark:bg-gray-800">
        {categoryFetchingStatus === "loading" ? (
          <SidebarCategorySkeleton />
        ) : (
          <SidebarCategoriesList categories={categories} />
        )}
      </div>
      {["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
        <AddCategoryForm />
      )}
    </aside>
  );
}
function LogoSection() {
  return (
    <div className=" border-b-1 mb-0 flex h-[calc(90px+1.5px)] items-center justify-center gap-6 border border-x-0 border-t-0 bg-[#f8f8f8] py-5 pl-7 pr-9 shadow-sm">
      <Link href="/">
        <Image
          src={"/assets/logo17.svg"}
          width={130}
          height={50}
          alt={"CS LIT: like I'm 10"}
          className="min-h-[50px] min-w-[100px]"
        />
      </Link>
    </div>
  );
}
function SidebarCategoriesList({ categories }) {
  return (
    <ul className="mb-auto mt-6 space-y-2 px-3 text-sm font-medium">
      {/* map through category items from database */}
      {categories?.pages?.map((page) =>
        page?.items?.map((category) => (
          <li key={category.id}>
            <Link
              className="flex items-center rounded-lg p-2 text-[#2A2A2E] hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              // onClick={() => {}}
              href={`/${category.slug}`}
            >
              {getCategoryIcon(category?.slug)}
              <span className="elip ml-3 flex-1 overflow-x-clip truncate text-ellipsis whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
function AddCategoryForm() {
  const [input, setInput] = useState({
    name: "",
    slug: "",
    id: "",
  });
  const item = input as Category;
  const type = "Categories";
  const createItem = useCreateItem(item, type);
  const handleCreate = (e) => {
    e.preventDefault();
    createItem();
    setInput({ name: "", slug: "", id: "" });
  };
  return (
    <form
      className=" mx-auto my-4 flex w-full flex-row items-center justify-center gap-0 px-3 align-middle text-sm font-medium"
      onSubmit={handleCreate}
    >
      {input.name.length >= 3 ? (
        <button
          type="submit"
          className="w-1/6 text-lg font-bold"
          onClick={handleCreate}
        >
          +
        </button>
      ) : (
        <RiMenuAddFill className="w-1/6" />
      )}
      <input
        className="w-5/6 rounded-lg border border-[#2A2A2E00] bg-[#ffffff00] px-3 py-1 text-[#2A2A2E] placeholder-gray-500 outline-none transition-all placeholder:font-medium hover:border-[#2A2A2E23] hover:bg-[#e8e8e845] focus:outline-none"
        type="text"
        placeholder="Add category"
        value={input.name}
        onChange={(event) => setInput({ ...input, name: event.target.value })}
        // disabled={isSubmitting}
      />
    </form>
  );
}
