import React, { useEffect } from "react";
import { type GetResult } from "@prisma/client/runtime/library";
import { type TopicInput } from "@/pages/[category]/types";
import { IoClose as XIcon } from "react-icons/io5";
import { type AnalogyInput } from "@/pages/[category]/[topic]/types";
import { type CATEGORY_STATUS } from "@prisma/client";
import { CgFolderAdd as AddIcon } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPurpose,
  setShown,
  setEntity,
} from "@/components/EditorForm/editorSlice";
import { useRouter } from "next/router";

export function FormTrigger({ setInput, newInput }: IFormTriggerProps) {
  const router = useRouter();
  const editor = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        // Determine the entity based on the route structure
        const segments = router.pathname.split("/").filter(Boolean);
        const entity = segments.length === 1 ? "topic" : "analogy";
        dispatch(setEntity(entity));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    void fetchData();
  }, [dispatch, router]);

  return (
    <div
      id="add-topic-header"
      className={`inline-flex w-full cursor-pointer flex-row items-center rounded-[12px] border border-[#dcdcdca1] bg-[#efefef] px-10 py-4 text-xl font-bold shadow-sm transition-all duration-300 hover:border-[#8b8b8ba5] hover:bg-white sm:py-6 `}
      onClick={() => {
        dispatch(setPurpose("Create"));
        dispatch(setShown(!editor.shown));
        setInput(newInput);
      }}
    >
      <AddIcon className="mb-0.5 mr-2.5" />
      <span className=" grow select-none">
        <h2>
          {editor.purpose ?? "Create"} {editor.entity ?? ""}
        </h2>
      </span>
      <XIcon
        className={`mb-1 transform cursor-pointer text-2xl text-[#737373] transition-transform delay-500 duration-200 hover:text-black ${
          editor.shown ? "" : "rotate-45" // rotate + into x
        }`}
      />
    </div>
  );
}

// --- TYPES --- //

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
}
