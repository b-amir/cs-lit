import Link from "next/link";
import Image from "next/image";
import { archivo } from "../../styles/customFonts";
import { RiImageLine } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { AvatarSkeleton } from "@/components/Skeleton";

export function ShareSection() {
  const { data: sessionData, status: sessionStatus } = useSession();

  return (
    <div
      id="share-section"
      className="flex min-h-screen w-full flex-row bg-[#ffffff]"
    >
      <div className="mx-auto my-auto flex h-full flex-col items-center justify-center py-12 text-[#292626] lg:max-w-[calc(100vw*7/12)]">
        <h2
          className={`${archivo.className} mx-auto my-3 mb-12 flex flex-row justify-center px-6 text-center text-3xl font-bold sm:text-4xl`}
        >
          Share your insights within your social circles
        </h2>

        <p className="font-regular text-md mx-auto my-3 flex w-3/4 flex-row items-center justify-center px-4 text-center text-[#292626a9]">
          The thought structure that helped you understand this complex topic
          could add value to the world. Share it with your friends!
        </p>
        <div
          id="vertical-line"
          className="mx-auto my-1 flex h-12 w-[1px] flex-col items-center justify-center bg-[#5c2c1d2b]"
        />
        <div className="mb-20 mt-[-4px] flex w-full flex-col rounded-xl bg-[#e8e5e2] bg-gradient-to-bl from-[#1e7cba] to-[#7c1db3] py-0.5 sm:rounded-3xl sm:px-5 sm:py-5 md:max-w-[760px]">
          <div className="flex w-full flex-row items-center justify-end pt-4 text-xs text-white sm:px-5 sm:py-4 sm:text-sm">
            Share As:{" "}
            <button className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm text-gray-800 transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]">
              <RiImageLine className="mr-1" />
              Image{" "}
            </button>{" "}
            or{" "}
            <button className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm text-gray-800 transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]">
              <AiOutlineLink className="mr-1" />
              Link
            </button>
          </div>

          <div className=" relative z-20 my-5 w-full overflow-clip rounded-[17px] border border-gray-200 bg-white px-0 py-0 shadow-lg transition-all hover:border-[#c1c1c1] ">
            <div className="border-b-1 w-full cursor-default border border-x-0 border-t-0 border-gray-200 bg-[#F9F9F9] px-5 py-4">
              <div className="flex items-center justify-between align-middle">
                <div className="flex items-center justify-between align-middle">
                  {sessionStatus === "loading" ? (
                    <AvatarSkeleton />
                  ) : (
                    <div className="flex items-center align-middle text-xs ">
                      <Image
                        src={
                          sessionData?.user?.image
                            ? sessionData?.user?.image
                            : "/assets/defaultpp.svg"
                        }
                        className="ml-1 mr-4 h-8 w-8 rounded-full ring-[3px] ring-[#b2b2b232] transition-all duration-300 hover:ring-[#80808073]"
                        alt={"Profile Picture"}
                        width={42}
                        height={42}
                      />{" "}
                    </div>
                  )}

                  <div>
                    <div className="mb-0.5 flex items-center justify-between align-middle font-normal text-[#666666]">
                      <Link
                        href={
                          sessionData
                            ? `/profile/${sessionData?.user.id}`
                            : "https://en.wikipedia.org/wiki/Albert_Einstein"
                        }
                        className="flex items-center align-middle text-sm transition-all hover:text-gray-800"
                      >
                        {sessionData?.user.name
                          ? sessionData?.user?.name
                          : sessionData?.user?.email
                          ? sessionData?.user?.email
                          : "Albert Einstein"}
                      </Link>
                      <span className="text-sm font-normal">
                        &apos;s analogy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mx-auto min-h-[120px] w-full bg-white px-8 pb-7 pt-5">
              A revolutionary idea on how to escape from the clutches of
              Vim&apos;s mysterious world...
            </div>
          </div>
        </div>

        <button className="font-regular text-md text-md group mx-auto mb-1 flex flex-row content-center items-center justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ff7263] px-8 py-3 font-semibold text-[#ffffffd3] shadow-sm transition-all duration-200 hover:border-[#5c2c1d66] hover:px-8 hover:shadow-md">
          <span
            className="cursor-pointer transition-all duration-300 group-hover:-translate-x-0.5"
            onClick={() => {
              const categorySection =
                document.getElementById("category-section");
              categorySection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Contributing!
          </span>
        </button>

        <p className="font-regular mx-auto my-7 mb-12 flex flex-row items-center justify-center text-xs text-[#474343a9]">
          ( It&apos;s 100% free and open-source! )
        </p>
      </div>
    </div>
  );
}
