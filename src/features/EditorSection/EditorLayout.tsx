import React from "react";
import { useSession } from "next-auth/react";
import { NotSignedIn } from "@/components/Messages/NotSignedIn";
import { useUpdateItem } from "@/hooks/CRUD/useUpdateItem";
import { useCreateItem } from "@/hooks/CRUD/useCreateItem";
import { useDeleteItem } from "@/hooks/CRUD/useDeleteItem";
import { useAppDispatch, useAppSelector } from "@/redux//hooks";
import { TopicFormInputs } from "./InputFields/TopicFormInputs";
import { AnalogyFormInputs } from "./InputFields/AnalogyFormInputs";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";
import { setAnalogyInput, setTopicInput } from "./inputSlice";
import {
  type IButtonsRowProps,
  type IEditorLayoutProps,
  AnalogyInput,
} from "./types";

export function EditorLayout({ type }: IEditorLayoutProps) {
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editor);

  const { data: sessionData } = useSession();

  return (
    <form
      className="mx-auto flex w-full flex-col items-start justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        type === "Topics"
          ? dispatch(setTopicInput(e.currentTarget))
          : dispatch(setAnalogyInput(e.currentTarget));
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {editor.shown ? (
        <>
          {sessionData &&
          ["ADMIN", "EDITOR", "USER"].includes(sessionData?.user.role) ? (
            <div className="mt-4 grid w-full gap-x-6 gap-y-8 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6 py-6 shadow-sm transition-all duration-300 hover:border-[#c1c1c1] sm:grid-cols-2">
              <>
                {type === "Topics" ? (
                  <TopicFormInputs
                    // handleChange={handleChange}
                    editor={editor}
                  />
                ) : null}
                {type === "Analogies" ? (
                  <AnalogyFormInputs
                  // handleChange={handleChange}
                  />
                ) : null}
                <ButtonsRow editor={editor} type={type} />
              </>
            </div>
          ) : (
            <NotSignedIn />
          )}
        </>
      ) : null}
    </form>
  );
}

function ButtonsRow({ editor, type }: IButtonsRowProps) {
  const input = useAppSelector((state) =>
    type === "Topics" ? state.input.topicInput : state.input.analogyInput
  );
  const item = input;
  // @ts-ignore
  const updateItem = useUpdateItem(item, type);
  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    updateItem();
  };
  // @ts-ignore
  const createItem = useCreateItem(item, type);
  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    createItem();
  };
  // @ts-ignore
  const deleteItem = useDeleteItem(item, type);
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteItem();
  };

  return (
    <div
      id="buttons-row"
      className="flex w-full flex-row items-center justify-end sm:col-span-2"
    >
      {/* show delete button only in edit mode */}
      {editor.purpose === "Edit" && (
        <button
          type="button"
          className="mx-3 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-dark-2 transition-all hover:text-[#bc2f2f]"
          onClick={handleDelete}
          data-testid="entity-delete-button"
        >
          <Delete className="mb-1 mr-2" /> Delete {editor.entity ?? ""}
        </button>
      )}
      <button
        type="submit"
        data-testid="submit-button"
        onClick={editor.purpose === "Edit" ? handleUpdate : handleCreate}
        className="group flex flex-row justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ff7263] px-6 py-1.5 text-sm font-semibold text-[#ffffffd3] shadow-sm transition-all duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:border-[#5c2c1d66] hover:shadow-md"
      >
        <span className="cursor-pointer transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[text-shadow:_0_2px_0_rgb(0_0_0_/_15%)]">
          {editor.purpose === "Edit"
            ? `Update ${editor.entity ?? ""}`
            : `Submit ${editor.entity ?? ""}`}
        </span>
      </button>
    </div>
  );
}
