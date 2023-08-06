import Head from "next/head";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import { AnalogyView } from "../../../../components/AnalogyView";
import { LoadingSpinner } from "@/components/loading";
import { FaArrowLeft } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { LuExternalLink } from "react-icons/lu";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { archivo } from "@/styles/customFonts";

export default function SingleAnalogyPage() {
  const [aboutIsHidden, setAboutIsHidden] = useState(true);
  const router = useRouter();
  const domainName =
    // avoid the ReferenceError and get the domain name of the current URL in the browser environment
    typeof window !== "undefined"
      ? window.location.origin.replace(/^https?:\/\//, "")
      : "";

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
  } = router.query;

  api.analogy.getAll.useQuery();

  const { data: singleAnalogyData, status } =
    api.analogy.getSingleAnalogyById.useQuery({
      id: UrlAnalogyId as string,
    });

  const { data: categoryData, isFetching: categoryFetching } =
    api.category.getBySlug.useQuery({
      slug: UrlCategory as string,
    });

  const { data: topicsData, isFetching: topicFetching } =
    api.topic.getBySlug.useQuery({
      slug: UrlTopic as string,
    });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>
          {`${topicsData?.title ?? ""} by ${
            singleAnalogyData.author?.name ?? ""
          }`}{" "}
          - CSLIT
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="mx-auto flex h-[calc(100dvh-0px)] max-w-[720px] flex-col justify-between pt-40">
          <div
            id="nav-share"
            className="mb-8 flex w-full flex-row justify-between text-[#2A2A2E]"
          >
            <button
              onClick={() => router.back()}
              className="align-center justify-middle group mr-auto inline-flex cursor-pointer flex-row items-center justify-center rounded-[12px] border border-transparent px-0 py-1 align-middle transition-all"
            >
              <FaArrowLeft className="mr-2  transition-all group-hover:-translate-x-0.5 " />
              back
            </button>
            <div className="flex flex-row items-center">
              {/* <FiShare />  */}
              Share As:{" "}
              <button className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]">
                <RiImageLine className="mr-1" />
                Image{" "}
              </button>{" "}
              or{" "}
              <button className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]">
                <AiOutlineLink className="mr-1" />
                Link
              </button>
            </div>
          </div>
          <div
            id="single-analogy"
            className="mb-auto rounded-[23px] bg-[#e8e5e2] bg-gradient-to-bl from-[#1e7cba] to-[#7c1db3] px-5 py-5"
          >
            {/* <div
            id="single-analogy"
            className="mb-auto rounded-[23px] bg-[#e8e5e2] bg-gradient-to-bl from-[#7a09d7] from-10%  via-[#b018f6] via-30% to-[#e00e46] to-90% px-5 py-5 "
          > */}
            <div className="flex flex-row justify-between px-7 pb-1 pt-8 align-baseline">
              <span className="text-lg font-semibold text-[#efefefc7]">
                {categoryData?.name} {topicsData && "/"} {topicsData?.title}
              </span>{" "}
              <br />
              <span className="text-sm text-[#efefefa7]">
                {/* <span className="font-bold text-[#efefefb6]">CS-LIT</span> */}
                {domainName}
              </span>
            </div>

            <AnalogyView
              analogy={{
                id: singleAnalogyData.id,
                description: singleAnalogyData.description,
              }}
              // needsLocationInfo
              author={{
                name: singleAnalogyData.author?.name ?? "",
                email: singleAnalogyData.author?.email ?? "",
                image: singleAnalogyData.author?.image ?? "",
                id: singleAnalogyData.author?.id ?? "",
              }}
            />
          </div>
          <div
            className="group flex cursor-pointer flex-col items-center py-8 text-[#a7a7a7]"
            onClick={() => {
              setAboutIsHidden(false);
              setTimeout(() => {
                window.scrollTo({
                  top: document.getElementById("what-is-footer")?.offsetTop,
                  behavior: "smooth",
                });
              }, 10);
            }}
          >
            <span className="mb-1 text-xs transition-all hover:text-[#2A2A2E]">
              About this website
            </span>{" "}
          </div>
        </div>
        {!aboutIsHidden && (
          <div
            id="what-is-footer"
            className="border-t-1 mt-auto w-full  border border-x-0 border-b-0 bg-[#2a2a2e3b]  px-20 pb-14 pt-12 text-[#656565]"
          >
            <span
              className={`${archivo.className}  font-extrabold`}
              // className="font-archivo font-extrabold"
            >
              {" "}
              What is CS LIT?
            </span>{" "}
            <br />
            <br />
            <span className="text-sm ">
              CS LIT is an abbreviation for Computer Science Like I&apos;m Ten.
              It simplifies computer science education for all ages through a
              collaborative learning environment. Explore complex concepts with
              ease and gain valuable experience in this field.
            </span>
            <br />
            <br />{" "}
            <Link href="/">
              <span className="inline-flex cursor-pointer flex-row text-sm font-semibold hover:underline ">
                {" "}
                <LuExternalLink className="mr-1 mt-0.5" /> See more analogies
                like this
              </span>
            </Link>
          </div>
        )}
      </PageLayout>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   const id = context.params?.id as string;
//   if (typeof id !== "string") throw new Error("slug is not a string");

//   const username = id.replace("@", "");
//   await ssg.analogy.getById.prefetch({ id });

//   return {
//     props: {
//       trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
//       id,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

// export default SingleAnalogyPage;
