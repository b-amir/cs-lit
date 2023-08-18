import { FaArrowLeft } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { useState } from "react";
import { saveImage } from "@/utils/saveImage";

export function NavShare({ router }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000); // Reset copied state to false after 3 seconds
  };

  return (
    <div
      id="nav-share"
      className="mb-8 flex w-full flex-row justify-end text-sm text-[#2A2A2E] sm:justify-between sm:text-base"
    >
      <button
        onClick={() => router.back()}
        className="align-center justify-middle group mr-auto hidden cursor-pointer flex-row items-center justify-center rounded-[12px] border border-transparent px-0 py-1 align-middle transition-all sm:inline-flex"
      >
        <FaArrowLeft className="mr-2  transition-all group-hover:-translate-x-0.5 " />
        back
      </button>
      <div className="flex flex-row items-center ">
        {/* <FiShare />  */}
        Share As:{" "}
        <button
          className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-4 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
          onClick={saveImage}
        >
          <RiImageLine className="mr-1" />
          Image{" "}
        </button>{" "}
        or{" "}
        <button
          onClick={handleCopy}
          className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-4 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
        >
          {!copied ? <AiOutlineLink className="mr-1" /> : null}
          {copied ? "Copied" : "Link"}
        </button>
      </div>
    </div>
  );
}