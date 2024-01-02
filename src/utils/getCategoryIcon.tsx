import { FaCode } from "react-icons/fa";
import { GrSquare } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { IoLogoCss3 } from "react-icons/io";
import { RiFlowChart } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { TbBrandReact } from "react-icons/tb";

{
  /*  since there's only gonna be a few obvious topics,
      only some icons are suggested for less complexity for now  */
}

export function getCategoryIcon(categorySlug: string) {
  switch (categorySlug) {
    case "javascript":
      return <SiJavascript />;
    case "typescript":
      return <SiTypescript />;
    case "next":
      return <SiNextdotjs />;
    case "react":
      return <TbBrandReact />;
    case "css":
      return <IoLogoCss3 />;
    case "algorithm":
      return <RiFlowChart />;
    case "data-structure":
      return <MdCategory />;
    case "web-development":
      return <FaCode />;
    default:
      return <GrSquare className="opacity-60" />;
  }
}
