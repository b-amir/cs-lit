import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { TbBrandReact } from "react-icons/tb";
import { IoLogoCss3 } from "react-icons/io";
import { RiFlowChart } from "react-icons/ri";
import { GrSquare } from "react-icons/gr";
import { MdCategory } from "react-icons/md";

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
    case "next.js":
      return <SiNextdotjs />;
    case "react.js":
      return <TbBrandReact />;
    case "css":
      return <IoLogoCss3 />;
    case "algorithm":
      return <RiFlowChart />;
    case "data-structure":
      return <MdCategory />;
    default:
      return <GrSquare className="opacity-60" />;
  }
}
