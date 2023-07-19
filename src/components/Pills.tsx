import React from "react";

interface IpillsRowProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
  pills: string[];
}

interface IPillProps {
  title: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
}

export function PillsRow({
  setActiveSection,
  activeSection,
  pills,
}: IpillsRowProps) {
  return (
    <div
      id="pills-row"
      className="flex max-h-[96px] flex-row items-start  gap-3 border-b border-[#5555552a] bg-[#F9F9F9] px-16 py-8"
    >
      {pills.map((pillName) => (
        <Pill
          key={pillName}
          title={pillName}
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
      ))}
    </div>
  );
}

export function Pill({ title, setActiveSection, activeSection }: IPillProps) {
  return (
    <div
      id="single-pill"
      className={`flex cursor-pointer items-center justify-center rounded-[12px] border px-5 py-1 shadow-sm ${
        activeSection === title
          ? "border-[#b5431a] bg-[#e95620] text-white "
          : "border-[#d1d1d1] bg-[#ffffff] text-[#2A2A2E]"
      }`}
      onClick={() => setActiveSection(title)}
    >
      <h3 className={` text-sm font-bold`}>{title}</h3>
    </div>
  );
}
