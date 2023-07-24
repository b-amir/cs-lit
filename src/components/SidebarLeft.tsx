import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { TbBrandReact } from "react-icons/tb";
import { IoLogoCss3 } from "react-icons/io";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { RiFlowChart, RiMenuAddFill } from "react-icons/ri";
import slugify from "slugify";
import toast from "react-hot-toast";
import { GrSquare } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { addActivityLog } from "@/utils/addActivityLog";

export function SidebarLeft(props: { username: any }) {
  const { data: sessionData, status } = useSession();
  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = api.category.getAll.useInfiniteQuery(
    { limit: 15 },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    }
  );
  const [showSidebar, setShowSidebar] = useState(true);
  const [input, setInput] = useState({
    name: "",
    slug: "",
  });
  const createActivityLogEntry = addActivityLog();

  const categorySlug = slugify(input.name, { lower: true });

  const { mutate, isLoading: isSubmitting } = api.category.create.useMutation({
    onSuccess: () => {
      setInput({
        name: "",
        slug: "",
      });

      createActivityLogEntry({
        entityType: "category",
        entityId: "",
        entityTitle: input.name,
        action: "created",
      });
      void ctx.category.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      console.log(errorMessage);
      if (errorMessage) {
        if (errorMessage.url) {
          toast.error(errorMessage?.url.join(" "));
        }
        if (errorMessage.name) {
          toast.error(errorMessage?.name.join(" "));
        }
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const ctx = api.useContext();
  // if (status === "loading") return <LoadingPage />;

  function getCategoryIcon(categorySlug: string) {
    switch (categorySlug) {
      case "javascript":
        return <SiJavascript />;
      case "typescript":
        return <SiTypescript />;
      case "next.js":
        return <SiNextdotjs />;
      case "react.js":
        return <TbBrandReact />;
      case "css":
        return <IoLogoCss3 />;
      case "algorithm":
        return <RiFlowChart />;
      case "data-structure":
        return <MdCategory />;
      default:
        return <GrSquare className="text-gray-300" />;
    }
  }

  return (
    <>
      {showSidebar && (
        <aside
          id="logo-sidebar"
          className="fixed left-0 top-0 z-50 flex h-screen w-1/6 -translate-x-full flex-col place-content-stretch items-stretch justify-between border-r border-white bg-white pt-0 shadow-md transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="align-around h-full overflow-y-auto bg-white px-0 pb-0 dark:bg-gray-800">
            <div className=" border-b-1 mb-0 flex h-[calc(90px+1.5px)] items-center justify-center gap-6 border border-x-0 border-t-0 bg-[#f8f8f8] py-5 pl-7 pr-9 shadow-sm">
              <Link href="/">
                <Image
                  src={"/assets/logo16.svg"}
                  width={130}
                  height={50}
                  alt={"CS LIT: like I'm 10"}
                  className="min-h-[50px] min-w-[100px]"
                />
              </Link>
            </div>
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
                      {/*  since there's only gonna be a few obvious topics,
                           only some icons are suggested for less complexity for now  */}
                      {getCategoryIcon(category?.slug)}

                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <form
            className=" mx-auto my-4 flex w-full flex-row items-center justify-center gap-0 px-3 align-middle text-sm font-medium"
            onSubmit={(event) => event.preventDefault()}
          >
            {input.name.length >= 3 ? (
              <button
                type="submit"
                className="w-1/6 text-lg font-bold"
                onClick={() =>
                  mutate({
                    name: input.name,
                    slug: categorySlug,
                    // a new cuid generated by the client
                    id: "",
                  })
                }
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
              onChange={(event) =>
                setInput({ ...input, name: event.target.value })
              }
              disabled={isSubmitting}
            />
          </form>
        </aside>
      )}
    </>
  );
}
