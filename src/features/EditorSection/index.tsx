import { setShown } from "./editorSlice";
import useRouteChange from "@/hooks/useRouteChange";
import { FormTrigger } from "@/features/EditorSection/FormTrigger";
import { EditorLayout } from "@/features/EditorSection/EditorLayout";
import React, { useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { type IEditorSectionProps } from "../CategoryPage/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export function EditorSection({ newInput, type }: IEditorSectionProps) {
  //
  const editor = useAppSelector((state) => state.editor);

  // --- hide editor on route change --- //
  const dispatch = useAppDispatch();
  const hideEditor = () => dispatch(setShown(false));
  useRouteChange(hideEditor);

  // --- animation setup for editor --- //
  const contentRef = useRef<HTMLDivElement>(null);
  const targetHeight = editor.shown ? 100 : 0;
  const editorAnimationProps = useSpring({
    height: `${targetHeight}dvh`,
    config: {
      tension: 500,
      friction: 87,
    },
  });

  return (
    <div
      data-testid="editor-backdrop"
      className={`z-30 mx-auto flex max-h-screen w-full grow-0 flex-col items-center justify-center px-2 text-dark-2 shadow-lg backdrop-blur-xl sm:px-10 lg:px-[16.666667%] 
                ${
                  editor.shown
                    ? "sticky bottom-0 my-auto h-full max-h-[calc(100vh-90px-1px)] bg-gray-5 shadow-[0px_1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_11px_20px_2px_#00000005,0px_20px_55px_0px_#00000005]"
                    : "sticky bottom-[-200px] bg-gray-5 py-5 sm:py-9"
                } 
                ${
                  editor.entity === "single analogy" && !editor.shown
                    ? "hidden"
                    : ""
                }`}
      onClick={() => {
        hideEditor();
      }}
    >
      <animated.div
        style={editorAnimationProps}
        ref={contentRef}
        className={`flex w-full flex-col content-center items-center justify-center
                    ${editor.shown ? "pt-[90px]" : "pb-5 pt-7"}
        `}
      >
        <FormTrigger newInput={newInput} />
        <EditorLayout type={type} />
      </animated.div>
    </div>
  );
}
