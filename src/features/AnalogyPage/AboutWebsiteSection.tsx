import Link from "next/link";
import { archivo } from "@/styles/customFonts";
import { useState } from "react";
import { FaArrowRight as ArrowIcon } from "react-icons/fa";

export function AboutWebsiteSection() {
  const [aboutIsHidden, setAboutIsHidden] = useState(true);

  return (
    <>
      <div
        className="group mt-14 flex cursor-pointer flex-col items-center py-8 text-[#a7a7a7]"
        onClick={() => {
          setAboutIsHidden(!aboutIsHidden);
          setTimeout(() => {
            window.scrollTo({
              top: document.getElementById("what-is-footer")?.offsetTop,
              behavior: "smooth",
            });
          }, 10);
        }}
      >
        <span className="mb-1 text-xs transition-all hover:text-dark-2">
          About this website
        </span>{" "}
      </div>
      {!aboutIsHidden && (
        <div
          id="what-is-footer"
          className="border-t-1 mt-auto w-full  border border-x-0 border-b-0 bg-gray-5 px-4 pb-14 pt-12 text-[#656565] sm:px-20"
        >
          <span className={`${archivo.className}  font-extrabold`}>
            What is CS LIT?
          </span>
          <br />
          <br />
          <span className="text-sm ">
            CS LIT is an abbreviation for Computer Science Like I&apos;m Ten. It
            simplifies computer science education for all ages through a
            collaborative learning environment. Explore complex concepts with
            ease and gain valuable experience in this field.
          </span>
          <br />
          <br />
          <Link href="/home">
            <span className="inline-flex cursor-pointer flex-row text-sm font-semibold hover:underline ">
              <ArrowIcon className="mr-2 mt-0.5" /> See more analogies like this
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
