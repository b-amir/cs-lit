import Link from "next/link";
import { api } from "@/utils/api";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { SidebarCategorySkeleton } from "@/components/Loading/Skeleton";

export function SidebarCategoriesSection({ hide }: { hide: () => void }) {
  const { width: windowWidth } = useWindowSize();

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
          {categories?.pages?.map((page) =>
            page?.items?.map((category) => (
              <li key={category.id}>
                <Link
                  className="flex items-center p-2 text-sm text-dark-2 hover:bg-gray-100 lg:rounded-lg"
                  href={`/${category.slug}`}
                  onClick={() => {
                    // only hide after click for mobile
                    if (windowWidth && windowWidth < 640) hide();
                  }}
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
