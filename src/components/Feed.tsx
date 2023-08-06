import { api } from "@/utils/api";
import { AnalogyView } from "../components/AnalogyView";
import AnalogyViewWithLink from "./AnalogyView";
import { type Analogy } from "@prisma/client";

interface IFeedProps {
  topicAnalogies: Analogy[];
}

export const Feed: React.FC<IFeedProps> = ({ topicAnalogies }) => {
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
        {topicAnalogies?.map((analogy: Analogy) => (
          <AnalogyViewWithLink key={analogy.id}>
            <AnalogyView
              analogy={{
                id: analogy.id,
              }}
              key={analogy.id}
            />
          </AnalogyViewWithLink>
        ))}
      </div>
    </>
  );
};
