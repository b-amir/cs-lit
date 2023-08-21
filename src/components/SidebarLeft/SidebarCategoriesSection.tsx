import Link from "next/link";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { api } from "@/utils/api";
import { SidebarCategorySkeleton } from "@/components/Skeleton";

export function SidebarCategoriesSection({ hide }) {
  const { data: categories, status: categoryFetchingStatus } =
    api.category.getAll.useInfiniteQuery(
      { limit: 15 },
      {
        getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  return (
    <>
      {categoryFetchingStatus === "loading" ? (
        <SidebarCategorySkeleton />
      ) : (
        <ul className="mb-auto mt-6 space-y-2 px-3 text-sm font-medium">
          {/* map through category items from database */}
          {categories?.pages?.map((page) =>
            page?.items?.map((category) => (
              <li key={category.id}>
                <Link
                  className="flex items-center p-2 text-sm text-[#2A2A2E] hover:bg-gray-100 lg:rounded-lg"
                  // onClick={() => {}}
                  href={`/${category.slug}`}
                  onClick={hide}
                >
                  {getCategoryIcon(category?.slug)}
                  <span className="ml-3 flex-1 overflow-x-clip truncate text-ellipsis whitespace-nowrap">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
