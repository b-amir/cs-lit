import { AnalogyView } from "@/components/AnalogyView";
import { useEffect, useState } from "react";

// interface IMainSectionProps {
//   categoryData?: {
//     name: string;
//   };
//   topicsData?: {
//     title: string;
//   };
//   singleAnalogyData: {
//     id: string;
//   };
// }
export function MainSection({ singleAnalogyData }) {
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
          <span className="flex flex-row text-sm font-semibold text-[#efefefc7]">
            <span id="single-analogy-cat" className=" max-w-[8rem] truncate">
              {singleAnalogyData?.category?.name}
            </span>
            <span className="mx-2"> {singleAnalogyData?.topic && "/"}</span>
            <span id="single-analogy-topic" className=" max-w-[16rem] truncate">
              {singleAnalogyData?.topic?.title}
            </span>
          </span>{" "}
          <span className="text-sm text-[#efefefa7]">{domainName}</span>
        </div>

        <AnalogyView
          analogy={{
            id: singleAnalogyData?.id,
          }}
          // because in single analogy page the info row is rendered outside of analogy view for a cleaner look
          needsInfoRow={false}
        />
      </div>
    </div>
  );
}
