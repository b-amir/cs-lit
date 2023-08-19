import { CgFolderAdd } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import React from "react";
import { type Topic, type Category, type Analogy } from "@prisma/client";

export interface IFormTriggerProps {
  setInput: React.Dispatch<React.SetStateAction<Topic>>;
  newInput: object;
  editorState: {
    entity: null | "analogy" | "topic";
    shown: boolean;
    purpose: "Create" | "Edit" | null;
  };
  setEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: null | "analogy" | "topic";
      shown: boolean;
      purpose: "Create" | "Edit" | null;
    }>
  >;
}

export function FormTrigger({
  setInput,
  editorState,
  setEditorState,
  newInput,
}: IFormTriggerProps) {
  return (
    <div
      id="add-topic-header"
      className={` mb-4 inline-flex w-full cursor-pointer flex-row items-center rounded-[12px] border border-[#dcdcdca1] bg-[#efefef] px-10
                  py-4 text-xl font-bold shadow-sm transition-all duration-300 hover:border-[#8b8b8ba5] hover:bg-[#ffffff] sm:mb-4 sm:py-6 `}
      onClick={() => {
        setEditorState?.({
          ...editorState,
          shown: !editorState.shown,
          purpose: "Create",
        });
        setInput(newInput);
      }}
    >
      <CgFolderAdd className="mb-0.5 mr-2.5" />
      <span className=" grow select-none">
        <h2>
          {editorState.purpose ?? "Create"} {editorState.entity}
        </h2>
      </span>
      {/* rotate icon between X and + */}
      <IoClose
        className={`mb-1 transform cursor-pointer text-2xl text-[#737373] transition-transform delay-500 duration-200 hover:text-black ${
          editorState.shown ? "" : "rotate-45"
        }`}
      />
    </div>
  );
}
