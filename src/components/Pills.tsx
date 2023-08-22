import React from "react";

interface IpillsRowProps {
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  pills: string[];
}

interface IPillProps {
  title: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
}

export function PillsRow({ setActive, active, pills }: IpillsRowProps) {
  return (
    <div
      id="pills-row"
      className="flex flex-row items-start  gap-3 overflow-x-scroll border-b border-[#5555552a] bg-[#F9F9F9] px-6 py-8 sm:max-h-[96px] sm:overflow-x-clip sm:px-16 "
    >
      {pills.map((pillName) => (
        <Pill
          key={pillName}
          title={pillName}
          setActive={setActive}
          active={active}
        />
      ))}
    </div>
  );
}

export function Pill({ title, setActive, active }: IPillProps) {
  return (
    <div
      id="single-pill"
      className={`flex cursor-pointer items-center justify-center rounded-[12px] border px-5 py-1 shadow-sm ${
        active === title
          ? "border-[#d15b4e] bg-[#ff7263] text-white "
          : "border-[#d1d1d1] bg-[#ffffff] text-[#2A2A2E]"
      }`}
      onClick={() => setActive(title)}
    >
      <h3 className={` text-sm font-bold`}>{title}</h3>
    </div>
  );
}
