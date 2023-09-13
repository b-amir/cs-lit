import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/web";
import { useSession } from "next-auth/react";
import { FormTrigger } from "@/components/EditorForm/FormTrigger";
import React, { useRef } from "react";
import { TopicEditorForm } from "./TopicEditorForm";
import { type IEditorSectionProps } from "../types";
import { useAppSelector } from "@/redux/hooks";

export function EditorSection({
  categoryData,
  setTopicInput,
  topicInput,
}: IEditorSectionProps) {
  //
  const { data: sessionData } = useSession();
  const editor = useAppSelector((state) => state.editor);

  // --- animation setup for editor --- //
  const contentRef = useRef<HTMLDivElement>(null);
  const editorAnimationProps = useSpring({
    height: !editor.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

  // --- a basic object that's passed to the form state whenever trigger is clicked --- //
  const newInput = {
    id: "",
    title: "",
    url: "",
    slug: "",
    category: categoryData,
    analogies: [{ id: "", description: "", reference: "" }],
    starter: { id: "" },
  };

  return (
    <div
      className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-dark-2 shadow-lg backdrop-blur-md sm:px-10 lg:px-[16.666667%]  ${
        editor.shown
          ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-gray-5 pb-5 pt-7 shadow-[0px_1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_11px_20px_2px_#00000005,0px_20px_55px_0px_#00000005]"
          : "sticky bottom-[-200px] bg-gray-5 py-5 sm:py-9"
      }`}
    >
      <FormTrigger newInput={newInput} setInput={setTopicInput} />

      <animated.div
        style={editorAnimationProps}
        ref={contentRef}
        className="w-full"
      >
        <TopicEditorForm
          categoryData={categoryData}
          input={topicInput}
          setInput={setTopicInput}
        />
      </animated.div>
    </div>
  );
}
