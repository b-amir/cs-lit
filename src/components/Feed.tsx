import { api } from "@/utils/api";
import { AnalogyView } from "../components/AnalogyView";
import AnalogyViewWithLink from "./AnalogyView";
import { type Analogy } from "@prisma/client";
import { CgSpinner } from "react-icons/cg";

interface IFeedProps {
  topicAnalogies: Analogy[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export const Feed: React.FC<IFeedProps> = ({
  topicAnalogies,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  // const {
  //   data,
  //   isLoading: analogiesLoading,
  //   refetch: refetchAnalogies,
  // } = api.analogy.getAll.useQuery();

  // if (analogiesLoading) return <>Loading analogies...</>;
  // if (!data) return <>Something went wrong. no data</>;
  return (
    <>
      <div id="analogies-array" className="flex flex-col items-center px-16">
        {topicAnalogies?.pages?.map((page) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          page?.items?.map((analogy: Analogy) => (
            // {topicAnalogies?.map((analogy: Analogy) => (
            <AnalogyViewWithLink key={analogy.id}>
              <AnalogyView
                analogy={{
                  id: analogy.id,
                }}
                key={analogy.id}
              />
            </AnalogyViewWithLink>
          ))
        )}

        {hasNextPage && (
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
                <CgSpinner className=" animate-spin " />
              ) : (
                "Load more"
              )}
            </div>
          </button>
        )}
      </div>
    </>
  );
};
