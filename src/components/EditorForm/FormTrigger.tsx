import React from "react";
import { type GetResult } from "@prisma/client/runtime/library";
import { type TopicInput } from "@/pages/[category]/types";
import { IoClose as XIcon } from "react-icons/io5";
import { type AnalogyInput } from "@/pages/[category]/[topic]/types";
import { type CATEGORY_STATUS } from "@prisma/client";
import { CgFolderAdd as AddIcon } from "react-icons/cg";

export interface IFormTriggerProps {
  setInput:
    | React.Dispatch<React.SetStateAction<TopicInput>>
    | React.Dispatch<React.SetStateAction<AnalogyInput>>;
  newInput:
    | {
        id: string;
        title: string;
        url: string;
        slug: string;
        category:
          | (GetResult<
              {
                id: string;
                name: string;
                slug: string;
                status: CATEGORY_STATUS;
                createdAt: Date;
                updatedAt: Date;
              },
              { [x: string]: () => unknown }
            > &
              object)
          | undefined;
        analogies: {
          id: string;
          description: string;
          reference: string;
        }[];
        starter: {
          id: string;
        };
      }
    | {
        description: string;
        topicId: string | undefined;
      };

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
      className={` mb-4 inline-flex w-full cursor-pointer flex-row items-center rounded-[12px] border border-[#dcdcdca1] bg-[#efefef] px-10 py-4 text-xl font-bold shadow-sm transition-all duration-300 hover:border-[#8b8b8ba5] hover:bg-[#ffffff] sm:mb-4 sm:py-6 `}
      onClick={() => {
        setEditorState?.({
          ...editorState,
          shown: !editorState.shown,
          purpose: "Create",
        });
        setInput(newInput);
      }}
    >
      <AddIcon className="mb-0.5 mr-2.5" />
      <span className=" grow select-none">
        <h2>
          {editorState.purpose ?? "Create"} {editorState.entity ?? ""}
        </h2>
      </span>
      <XIcon
        className={`mb-1 transform cursor-pointer text-2xl text-[#737373] transition-transform delay-500 duration-200 hover:text-black ${
          editorState.shown ? "" : "rotate-45" // rotate + into x
        }`}
      />
    </div>
  );
}
