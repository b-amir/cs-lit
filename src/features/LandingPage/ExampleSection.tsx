import dynamic from "next/dynamic";
import { api } from "@/utils/api";
import { archivo } from "@/styles/customFonts";
import Link from "next/link";

export function ExampleSection() {
  const { data: analogyData } = api.analogy.getById.useQuery(
    {
      id: "6h9_DqiI", // A specific analogy to showcase in homepage.
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const Analogy = dynamic(() =>
    import("@/components/Analogy").then((mod) => mod.Analogy)
  );
  return (
    <div
      id="example-section"
      className="flex min-h-screen w-full flex-row bg-[#fff1f0]"
    >
      <div className="mx-auto my-auto flex h-full w-full flex-col items-center justify-center py-12 text-[#292626] lg:max-w-[calc(100vw*7/12)]">
        <h2
          className={`${archivo.className} mx-auto my-3 flex flex-row justify-center px-6 text-center text-3xl font-bold sm:text-4xl`}
        >
          Here&apos;s an example
        </h2>

        <VerticalLine />

        <p className="font-regular text-md mx-auto my-3 flex flex-row items-center justify-center px-4 text-center text-[#292626a9]">
          A user shared a helpful analogy about Closures in JavaScript,
          <br />
          making it easier for others to understand the concept.
        </p>

        <VerticalLine />

        <div className="mx-auto my-[-4px] flex w-full max-w-[760px] flex-row rounded-xl border-[1px] border-[#5c2c1d2b] bg-[#5c2c1d09] py-0.5 sm:rounded-3xl sm:px-5 sm:py-10 ">
          <Analogy
            analogy={{
              id: analogyData?.id ?? "",
            }}
            needsLink={true}
            needsInfoRow={false}
            key={analogyData?.id}
          />
        </div>

        <VerticalLine />

        <p className="font-regular text-md mx-auto my-3 flex flex-col items-center justify-center px-4 text-center text-[#292626a9] sm:flex-row">
          Other people can also participate and post their analogies.
          <span className="pt-3 italic text-[#292626c6] sm:pt-0">
            &nbsp;Especially you!
          </span>
        </p>

        <VerticalLine />

        <Link
          href={"/javascript/closure"}
          className="font-regular text-md group mx-auto mb-3 mt-[-4px] flex flex-row content-center items-center justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ffffff98] px-8 py-2 text-sm font-semibold text-[#292626a9] shadow-sm transition-all duration-200 hover:border-[#5c2c1d66] hover:px-8 hover:shadow-md"
        >
          <span className="cursor-pointer transition-all duration-300 group-hover:-translate-x-0.5">
            Explore Closure Topic
          </span>
        </Link>
      </div>
    </div>
  );
}
function VerticalLine() {
  return (
    <div
      id="vertical-line"
      className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
    />
  );
}
