import { useSession } from "next-auth/react";
import { FormTrigger } from "@/components/EditorSection/FormTrigger";
import { EditorLayout } from "@/components/EditorSection/EditorLayout";
import React, { useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { animated, useSpring } from "@react-spring/web";
import { type IEditorSectionProps } from "../../pages/[category]/types";

export function EditorSection({
  newInput,
  setInput,
  Input,
  type,
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

  return (
    <div
      className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-dark-2 shadow-lg backdrop-blur-md sm:px-10 lg:px-[16.666667%]  ${
        editor.shown
          ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-gray-5 pb-5 pt-7 shadow-[0px_1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_11px_20px_2px_#00000005,0px_20px_55px_0px_#00000005]"
          : "sticky bottom-[-200px] bg-gray-5 py-5 sm:py-9"
      }`}
    >
      <FormTrigger newInput={newInput} setInput={setInput} />

      <animated.div
        style={editorAnimationProps}
        ref={contentRef}
        className="w-full"
      >
        <EditorLayout input={Input} setInput={setInput} type={type} />
      </animated.div>
    </div>
  );
}
