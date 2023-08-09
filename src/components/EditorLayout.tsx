import { set } from "nprogress";
import React, {
  type Dispatch,
  type SetStateAction,
  useState,
  use,
} from "react";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";

interface IEditorLayoutProps {
  children: React.ReactNode;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDelete: (e: React.FormEvent<HTMLFormElement>) => void;
  editorState: {
    shown: boolean;
    purpose: "create" | "edit" | null;
  };
  // isSubmitting: boolean;
}

export function EditorLayout({
  children,
  handleUpdate,
  handleCreate,
  handleDelete,
  editorState,
}: // isSubmitting,
IEditorLayoutProps) {
  const { shown, purpose } = editorState;

  return (
    <form
      className="mx-auto flex w-full flex-col items-start justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mt-auto grid w-full grid-cols-2 gap-x-6 gap-y-14 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6  py-6 transition-all duration-300 hover:border-[#c1c1c1]">
        {children}
        <div
          id="buttons-row"
          className="flex w-full flex-row items-center justify-end sm:col-span-2"
        >
          {/* show delete button only in edit mode */}
          {purpose === "edit" && (
            <button
              type="button"
              className="mx-3  inline-flex items-center  justify-center px-4 py-2 text-sm font-semibold text-[#2a2a2e] transition-all hover:text-[#bc2f2f]"
              onClick={handleDelete}
              // disabled={isSubmitting}
            >
              <Delete className="mb-1 mr-2" /> Delete topic
            </button>
          )}

          <button
            type="submit"
            onClick={purpose === "edit" ? handleUpdate : handleCreate}
            // disabled={isSubmitting}
            className="group  flex flex-row justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ff7263] px-6 py-1.5 text-sm font-semibold text-[#ffffffd3] shadow-sm transition-all duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:border-[#5c2c1d66]  hover:shadow-md"
          >
            <span className="cursor-pointer transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[text-shadow:_0_2px_0_rgb(0_0_0_/_15%)]">
              {purpose === "edit" ? "Update topic" : "Submit topic"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
