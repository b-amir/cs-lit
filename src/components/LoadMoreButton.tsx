import { LoadingSpinner } from "@/components/Loading/Spinner";
import {
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export interface ILoadMoreButtonProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  isFetchingNextPage: boolean;
}

export function LoadMoreButton({
  fetchNextPage,
  isFetchingNextPage,
}: ILoadMoreButtonProps) {
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      className="w-full"
    >
      <div className="flex w-full items-center justify-center border-t-[#5555551d] py-8 font-semibold text-gray-500 transition-all duration-300 hover:text-gray-800">
        {isFetchingNextPage ? (
          <div className=" bottom-0 z-10 flex h-12 w-full items-center justify-center px-2 py-1">
            <LoadingSpinner size={28} />
          </div>
        ) : (
          <div className="group bottom-0 z-10 flex min-w-fit max-w-xl  cursor-pointer flex-row items-center justify-center rounded-lg border border-b-4 border-transparent border-b-transparent px-14 py-3 text-[#4d4d4d7f] backdrop-blur-3xl transition-all duration-300 hover:border-[#3c3c3c10] hover:bg-[#9b9b9b10] hover:text-[#0808087f]">
            <span className=" translate-y-0.5 text-sm font-semibold drop-shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-md">
              Load more
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
