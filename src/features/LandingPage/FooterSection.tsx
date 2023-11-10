import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function FooterSection() {
  return (
    <footer
      id="footer-section"
      className="mx-auto flex w-full flex-col items-center justify-center border-t border-t-white bg-[#1C282E] px-12 py-6 shadow-inner shadow-[#1d262b] sm:flex-row"
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
          <span className="mr-1">Hey, I&apos;m</span>
          <a
            className="inline-flex flex-wrap font-semibold hover:underline"
            href="https://www.linkedin.com/in/amirbazgir/"
            target="_blank"
          >
            Amir Bazgir,
          </a>
        </div>

        <a
          href="https://github.com/b-amir?tab=repositories"
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
    </footer>
  );
}
