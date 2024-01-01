import { archivo } from "@/styles/customFonts";
import { PageLayout } from "@/components/PageLayout";
import { LatestTopicsSection } from "@/features/HomePage/LatestTopicsSection";
import { LatestCommentsSection } from "@/features/HomePage/LatestCommentsSection";
import { LatestAnalogiesSection } from "@/features/HomePage/LatestAnalogiesSection";

export default function HomePage({}) {
  return (
    <PageLayout>
      <div className={`grow-1 min-h-[calc(100dvh)] w-full [overflow:overlay]`}>
        <div className="mb-14 flex w-full flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-6 pb-12 pl-8 pt-28 sm:px-12 sm:pt-32 lg:px-[18%]">
          <h1
            className={`${archivo.className} mb-4 max-w-[720px] items-start justify-start truncate whitespace-pre-wrap break-words text-2xl font-extrabold tracking-tight text-dark-2 ![line-height:1.1] sm:text-4xl lg:text-5xl `}
          >
            Recent Analogies
          </h1>
        </div>

        <LatestAnalogiesSection />
        <div className="mx-auto mt-[92px] grid grid-cols-3 gap-4 border-y border-gray-300 bg-[#ffffff50] px-4 py-8 sm:px-10 lg:px-14 ">
          <LatestTopicsSection />
          <LatestCommentsSection />
        </div>
      </div>
      <div className="hidden content-center justify-center px-3 py-6 text-sm text-gray-500  sm:flex">
        You can explore categories for more analogies or create one!
      </div>
    </PageLayout>
  );
}
