import Link from "next/link";
import Image from "next/image";
import { Voting } from "./Voting";
import { useRouter } from "next/router";

interface IAnalogyViewProps {
  analogy: {
    id: string;
    description: string;
  };
  author: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}
export const AnalogyView = (props: IAnalogyViewProps) => {
  const { analogy, author } = props;

  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
  } = router.query;

  return (
    <Link href={`/${UrlCategory}/${UrlTopic}/${analogy?.id}`}>
      <div
        key={analogy?.id}
        className=" relative z-20 mx-5 my-5 w-[640px] overflow-clip rounded-[17px] border border-gray-200 bg-white px-0 py-0 shadow-lg transition-all hover:border-[#c1c1c1] "
        // className="my-2 block min-w-[500px] max-w-sm rounded-s border border-gray-200 bg-white p-6 shadow transition-all hover:bg-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="border-b-1 w-full border border-x-0 border-t-0 border-gray-200 bg-[#F9F9F9] px-5 py-4">
          <div className="flex items-center justify-between align-middle">
            <Link
              href={`/profile/${author?.id}`}
              className="flex items-center align-middle text-xs "
            >
              <Image
                src={author?.image! || "/assets/default-pp.svg"}
                className="mr-3 h-6 w-6 rounded-full"
                alt={"Profile Picture"}
                width={42}
                height={42}
              />
              <span className="font-bold text-sky-700">
                {
                  author?.name ? author?.name : author?.email
                  // ? author?.email
                  // : "Anonymous"
                }
              </span>
              <span className="text-[#2A2A2E]">'s analogy:</span>
            </Link>
            <Voting />
          </div>
        </div>
        <div className="h-min-400 p-x8 w-full bg-white px-5 py-4">
          <p className="my-10 text-gray-400">{analogy?.description}</p>
        </div>
        <div className="flex items-end justify-end py-5 pr-5 text-xs text-[#878787]">
          Based on votes, this analogy is&nbsp;
          <span className="font-bold text-[#3a8ba1]">Decent</span>&nbsp;!
        </div>
      </div>
    </Link>
  );
};
