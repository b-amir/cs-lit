import { animated } from "@react-spring/web";
import { FormTrigger } from "../../../../components/EditorForm/FormTrigger";
import { AnalogyEditorForm } from "@/pages/[category]/[topic]/EditorSection/AnalogyEditorForm";
import { type IEditorSectionProps } from "../types";

export function EditorSection({
  analogyEditorState,
  analogyInput,
  animationProps,
  contentRef,
  newInput,
  setAnalogyEditorState,
  setAnalogyInput,
}: IEditorSectionProps) {
  return (
    <div
      className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-[#2A2A2E] shadow-lg backdrop-blur-md sm:px-10 lg:px-[16.666667%] ${
        analogyEditorState.shown
          ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b] pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
          : "sticky bottom-[-200px] bg-[#2a2a2e3b] py-2 sm:pb-7 sm:pt-9"
      } `}
    >
      <FormTrigger
        setInput={setAnalogyInput}
        editorState={analogyEditorState}
        setEditorState={setAnalogyEditorState}
        newInput={newInput}
      />

      <animated.div style={animationProps} ref={contentRef} className="w-full">
        <AnalogyEditorForm
          analogyEditorState={analogyEditorState}
          setAnalogyEditorState={setAnalogyEditorState}
          input={analogyInput}
          setInput={setAnalogyInput}
        />
      </animated.div>
    </div>
  );
}