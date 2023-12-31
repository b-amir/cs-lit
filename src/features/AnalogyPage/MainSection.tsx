import { Analogy } from "@/components/Analogy";
import { useEffect, useState } from "react";
import { type IMainSectionProps } from "./types";

export function MainSection({ singleAnalogyData }: IMainSectionProps) {
  const [domainName, setDomainName] = useState("");
  useEffect(() => {
    // avoid the ReferenceError and get the domain name of the current URL in the browser environment
    typeof window !== "undefined"
      ? setDomainName(window.location.origin.replace(/^https?:\/\//, ""))
      : "";
  }, []);

  return (
    <div className="mb-auto rounded-md bg-gradient-to-bl  from-[#1e7cba] to-[#7c1db3] py-2 sm:rounded-[23px] sm:px-1 sm:py-7">
      {/* this div is a trick to hide the flicker when capturing image */}
      <div id="single-analogy" className="rounded-[23px] pb-1 sm:px-5">
        <div className="flex flex-row justify-between px-7 pb-1 pt-8 ">
          <span className="flex max-w-[95%] flex-row text-sm font-semibold text-[#efefefc7]">
            <span id="single-analogy-cat" className="  truncate">
              {singleAnalogyData?.category?.name}
            </span>
            <span className="mx-2"> {singleAnalogyData?.topic && "/"}</span>
            <span
              id="single-analogy-topic"
              className="max-w-[55%] truncate sm:max-w-[45%]"
            >
              {singleAnalogyData?.topic?.title}
            </span>
          </span>{" "}
          <span className="hidden max-w-[25%] truncate text-sm text-[#efefefa7] sm:flex">
            {domainName}
          </span>
        </div>

        <Analogy
          analogy={{
            id: singleAnalogyData?.id as string,
          }}
          // because in single analogy page the info row is rendered outside of analogy view for a cleaner look
          needsInfoRow={false}
        />
      </div>
    </div>
  );
}
