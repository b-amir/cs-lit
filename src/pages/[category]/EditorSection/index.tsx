import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/web";
import { useSession } from "next-auth/react";
import { FormTrigger } from "@/components/EditorForm/FormTrigger";
import React, { useRef } from "react";
import { TopicEditorForm } from "./TopicEditorForm";
import { type IEditorSectionProps } from "../types";

export function EditorSection({
  categoryData,
  setTopicEditorState,
  setTopicInput,
  topicEditorState,
  topicInput,
}: IEditorSectionProps) {
  //
  const { data: sessionData } = useSession();

  // --- animation setup for editor --- //
  const contentRef = useRef<HTMLDivElement>(null);
  const editorAnimationProps = useSpring({
    height: !topicEditorState.shown ? 0 : sessionData ? 620 : 150,
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
      className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-[#2A2A2E] shadow-lg  backdrop-blur-md sm:px-10 lg:px-[16.666667%]  ${
        topicEditorState.shown
          ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
          : "sticky bottom-[-200px] bg-[#2a2a2e3b] py-2 sm:pb-7 sm:pt-9"
      }`}
    >
      <FormTrigger
        editorState={topicEditorState}
        setEditorState={setTopicEditorState}
        newInput={newInput}
        setInput={setTopicInput}
      />

      <animated.div
        style={editorAnimationProps}
        ref={contentRef}
        className="w-full"
      >
        <TopicEditorForm
          categoryData={categoryData}
          topicEditorState={topicEditorState}
          setTopicEditorState={setTopicEditorState}
          input={topicInput}
          setInput={setTopicInput}
        />
      </animated.div>
    </div>
  );
}
