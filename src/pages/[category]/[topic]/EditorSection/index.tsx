import { animated } from "@react-spring/web";
import { FormTrigger } from "@/components/EditorForm/FormTrigger";
import { AnalogyEditorForm } from "@/pages/[category]/[topic]/EditorSection/AnalogyEditorForm";
import { type IEditorSectionProps } from "../types";
import { useAppSelector } from "@/redux/hooks";

export function EditorSection({
  analogyInput,
  animationProps,
  contentRef,
  newInput,
  setAnalogyInput,
}: IEditorSectionProps) {
  const editor = useAppSelector((state) => state.editor);

  return (
    <div
      className={`z-30 mx-auto flex w-full grow-0 flex-col items-center justify-center px-2 text-dark-2 shadow-lg backdrop-blur-md sm:px-10 lg:px-[16.666667%] ${
        editor.shown
          ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-gray-5 pb-5 pt-7 shadow-[0px_1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_11px_20px_2px_#00000005,0px_20px_55px_0px_#00000005]"
          : "sticky bottom-[-200px] bg-gray-5 py-5 sm:py-9"
      } `}
    >
      <FormTrigger setInput={setAnalogyInput} newInput={newInput} />

      <animated.div style={animationProps} ref={contentRef} className="w-full">
        <AnalogyEditorForm input={analogyInput} setInput={setAnalogyInput} />
      </animated.div>
    </div>
  );
}
