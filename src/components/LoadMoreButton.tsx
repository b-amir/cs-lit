import { FiArrowDown } from "react-icons/fi";
import { LoadingSpinner } from "./Loading/Spinner";

export interface ILoadMoreButtonProps {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export function LoadMoreButton({
  fetchNextPage,
  isFetchingNextPage,
}: ILoadMoreButtonProps) {
  return (
    <button
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      className="w-full"
    >
      <div
        className="flex w-full items-center justify-center  border-t-[#5555551d] 
          py-6 font-semibold text-gray-500 transition-all duration-300 
          hover:text-gray-800"
      >
        {isFetchingNextPage ? (
          <div className=" bottom-0 z-10 flex h-12 w-full  items-center   justify-center px-2  py-1">
            <LoadingSpinner />
          </div>
        ) : (
          // <CgSpinner className=" animate-spin " />
          <div className="group bottom-0 z-10 flex h-12 w-full cursor-pointer flex-col items-center justify-center px-2  py-1 text-[#4d4d4d7f]  hover:text-[#0808087f]">
            <span className="text-sm font-semibold transition-all duration-200 group-hover:-translate-y-1">
              Load more
            </span>
            <FiArrowDown className="hidden  duration-100 group-hover:block group-hover:-translate-y-1" />
          </div>
        )}
      </div>
    </button>
  );
}
