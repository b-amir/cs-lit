import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

export function Voting() {
  return (
    <div className="flex flex-col">
      <SlArrowUp className="fill-[#b1b1b1]" />{" "}
      <SlArrowDown className="fill-[#b1b1b1]" />
    </div>
  );
}
