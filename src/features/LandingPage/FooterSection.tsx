import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

export function FooterSection() {
  return (
    <footer
      id="footer-section"
      className="mx-auto flex w-full flex-col items-center justify-center border-t border-t-white bg-[#1C282E] px-12 py-6 shadow-inner shadow-[#1d262b] sm:flex-row md:px-48"
    >
      <Image
        id="grayscaled-logo"
        src="/assets/logo-bw.svg"
        width={100}
        height={100}
        alt="logo"
        className="mb-6 sm:mb-0 sm:mr-6"
      />
      <div
        id="vertical-line"
        className="my-1 hidden h-16  w-[1px] flex-col items-center justify-center bg-[#e5e1e031] sm:flex"
      />
      {/* links: */}
      <div className="flex flex-col text-xs text-[#dadadac1] sm:ml-6">
        <div className="my-1 inline-flex">
          <FaLinkedin className="mr-1.5 mt-0.5" />
          <span className="mr-1">Hi, I&apos;m</span>
          <a
            className="inline-flex flex-wrap font-semibold hover:underline"
            href="https://www.linkedin.com/in/amirbazgir/"
            target="_blank"
          >
            Amir Bazgir,
          </a>
        </div>

        <a
          // href="https://github.com/b-amir?tab=repositories"
          href="https://b-amir.link/"
          target="_blank"
          className="my-1 inline-flex py-1 hover:underline"
        >
          <AiOutlineLink className="mr-1.5 mt-0.5" />
          And I make quirky things on the internet.
        </a>

        <div className="my-1 inline-flex">
          <FaGithub className="mr-1.5 mt-0.5" />
          <span className="mr-1"> You can</span>
          <a
            href="https://github.com/b-amir/cs-lit"
            target="_blank"
            className="inline-flex font-semibold hover:underline"
          >
            <span className="mr-1">contribute</span>
          </a>
          <span>to this project.</span>
        </div>
      </div>
      <div
        id="horizontal-spacer"
        className="mx-3 hidden shrink-0 flex-grow sm:flex"
      />

      <a
        href="https://www.producthunt.com/products/cs-lit"
        target="_blank"
        className="hidden sm:flex"
        rel="noreferrer"
        title="CS-LIT on ProductHunt"
      >
        <div
          id="producthunt-badge"
          className="mx-3  cursor-pointer rounded-xl border-2 border-[#FF615450] bg-[#FF615420] p-4 px-6 text-sm transition-all hover:border-[#FF6154] hover:bg-[#FF615440]"
        >
          <p className="text-balance text-center text-[#dadadac1] ">
            We're on&nbsp;
            <span className="font-bold text-[#FF6154]">ProductHunt</span>
          </p>
        </div>
      </a>
      <div
        id="vertical-line"
        className="mx-3 my-1 hidden h-16  w-[1px] flex-col items-center justify-center bg-[#e5e1e031] sm:flex"
      />
      <div
        id="go-to-top"
        title="Go to top"
        className="group mx-3 hidden cursor-pointer rounded-xl border-0 border-[#f1ccc950] bg-[#cca8a520] p-4  text-sm transition-all hover:border-[#ECECEC] hover:bg-[#ECECEC40] sm:flex"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp className="text-base text-[#dadadac1] duration-500 group-hover:-translate-y-0.5" />
      </div>
    </footer>
  );
}
