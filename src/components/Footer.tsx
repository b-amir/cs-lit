import { useRef, useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import { useSpring, animated } from "@react-spring/web";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

export function Footer() {
  const [collapsed, setCollapsed] = useState(true);
  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: collapsed ? 0 : contentRef.current?.scrollHeight || 0,
    // smooth slide up/down animation. no bouncing
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const FooterCollapseHandler = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`border-t-1 mt-auto w-full border border-x-0 border-b-0 bg-[#F9F9F9] px-5 py-5 ${
        collapsed
          ? "shadow-sm"
          : "border-gray-300 shadow-[0px_-3px_6px_0px_#00000010] "
      } `}
    >
      <div className="line text-xs text-gray-500">
        <div className="flex flex-row items-center justify-between align-middle">
          <div className="inline-flex">
            <span className="mr-1">Hey, I'm</span>
            <a
              className="inline-flex  flex-wrap font-semibold hover:underline"
              href="#"
            >
              <FaLinkedin className="mr-0.5" /> Amir Bazgir
            </a>{" "}
            ...
          </div>
          <div
            className=" cursor-pointer rounded-full border bg-white p-2"
            onClick={FooterCollapseHandler}
          >
            <SlArrowUp
              className={`transform transition-transform delay-300 duration-300 ${
                !collapsed ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>{" "}
        {/* <div className="inline-flex "> */}
        <animated.div style={animationProps} ref={contentRef} className="">
          {" "}
          <br /> <br /> And I make{" "}
          <a
            className="inline-flex  flex-wrap font-semibold hover:underline"
            href="#"
          >
            {/* <AiOutlineLink className="mr-0.5" /> */}
            <span className="mr-1">quirky things</span>
          </a>
          on the internet.
          <br /> <br />
          <div className="inline-flex flex-wrap">
            <span className="mr-1"> You can</span>
            <a href="#" className="inline-flex font-semibold hover:underline">
              <FaGithub className="mr-0.5" />
              <span className="mr-1">contribute</span>
            </a>{" "}
            <span>to this project.</span>
          </div>
        </animated.div>
        {/* </div> */}
      </div>
    </div>
  );
}
