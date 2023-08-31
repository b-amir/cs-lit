import { useRef } from "react";
import { useSession } from "next-auth/react";
import { NotSignedIn } from "@/components/Messages/NotSignedIn";
import { EditorLayout } from "@/components/EditorForm/EditorLayout";
import { useCreateItem } from "@/hooks/CRUD/useCreateItem";
import { useUpdateItem } from "@/hooks/CRUD/useUpdateItem";
import { useDeleteItem } from "@/hooks/CRUD/useDeleteItem";
import { CornerLoading } from "@/components/Loading/Spinner";
import { animated, useSpring } from "@react-spring/web";
import {
  type IAnalogyEditorBodyProps,
  type IAnalogyEditorFormProps,
} from "../types";

export const AnalogyEditorForm = ({
  input,
  setInput,
  analogyEditorState,
  setAnalogyEditorState,
}: IAnalogyEditorFormProps) => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const item = input;
  const type = "Analogies";

  const updateItem = useUpdateItem(item, type);
  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnalogyEditorState({ entity: "analogy", shown: false, purpose: null });
    updateItem();
  };

  const createItem = useCreateItem(item, type);
  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    createItem();
    setAnalogyEditorState({ entity: "analogy", shown: false, purpose: null });
  };

  const deleteItem = useDeleteItem(item, type);
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnalogyEditorState({ entity: "analogy", shown: false, purpose: null });
    deleteItem();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Destructure the 'name' and 'value' properties from the event target (input element)
    const { name, value } = e.target as HTMLInputElement;
    // Update the state using the 'setInput' function and a callback
    setInput((prev) => {
      // Return a new object that merges the previous state ('prev') and the updated property
      return {
        ...prev, // Copy all properties from the previous state
        // ...prev.item, // Copy all properties from 'prev.item'
        [name]: value, // Update the property specified by 'name' with the new 'value'
      };
    });
  };

  if (sessionStatus === "loading") return <CornerLoading />;

  if (sessionData && !sessionData.user) {
    return <>Please sign in to post</>;
  } else {
    return (
      <div className="">
        {analogyEditorState.shown ? (
          <>
            {sessionData &&
            ["ADMIN", "EDITOR", "USER"].includes(sessionData?.user.role) ? (
              <EditorLayout
                handleUpdate={handleUpdate}
                handleCreate={handleCreate}
                handleDelete={handleDelete}
                editorState={analogyEditorState}
              >
                <AnalogyEditorBody
                  analogyEditorState={analogyEditorState}
                  input={input}
                  setInput={setInput}
                  // UrlCategory={UrlCategory}
                  handleChange={handleChange}
                />
              </EditorLayout>
            ) : (
              <NotSignedIn />
            )}
          </>
        ) : null}
      </div>
    );
  }
};

function AnalogyEditorBody({
  input,
  setInput,
  handleChange,
}: IAnalogyEditorBodyProps) {
  // --- animation setup for reference ---> //
  const contentRef = useRef<HTMLDivElement>(null);
  const animationProps = useSpring({
    height: input?.hasReference ? 0 : 80,
    opacity: input?.hasReference ? 0 : 1,
    visibility: input?.hasReference ? "hidden" : "visible",
    config: {
      duration: 100,
    },
  });
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700"
      >
        Your analogy
      </label>
      <div className="group mt-1 w-full rounded-[12px] border border-gray-200 bg-gray-50 shadow-sm transition-all hover:border-[#c1c1c1] focus:border-[#c1c1c1] ">
        <div className="rounded-[12px] bg-white px-6 pb-2 pt-6">
          <label htmlFor="comment" className="sr-only">
            Add your analogy
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full border-0 border-transparent bg-white px-0 text-sm text-[#2A2A2E] !outline-none  group-focus:border-[#c1c1c1] "
            placeholder="Add your analogy ..."
            required
            value={input?.description}
            onChange={(e) =>
              setInput({
                ...input,
                description: e.target.value,
              })
            }
            // disabled={isSubmitting || editorLayoutState?.purpose === "Edit"}
          ></textarea>
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2">
          <div className="flex space-x-1 pl-0 sm:pl-2">
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              target="_blank"
              type="button"
              className=" font-small inline-flex cursor-pointer justify-center rounded p-2 text-xs text-gray-500 hover:bg-gray-100 hover:text-[#2A2A2E] "
            >
              how to write markdown?
            </a>
          </div>
        </div>
      </div>
      <animated.div
        style={animationProps}
        ref={contentRef}
        className="z-0 select-none"
      >
        <p className="ml-6 mt-2.5 text-xs text-gray-500">
          <ul>
            <li className="list-disc py-1">
              An analogy is a short explanation of a topic that helps you
              understand it better.
            </li>
            <li className="list-disc py-1">
              You can use code snippets and markdown to format your analogy.
            </li>
            <li className="list-disc py-1">
              After submission, analogies must be verified by admins to be
              published.
            </li>
          </ul>
        </p>
      </animated.div>

      {/* a checkmark to indicate if analogy has a reference link */}
      <div className="mt-12 flex w-fit items-center rounded-lg px-2 py-1 transition-all duration-200 hover:bg-gray-50 sm:mt-4">
        <input
          id="hasReference"
          name="hasReference"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-[#2A2A2E] accent-[#6b6b6b] focus:ring-[#c1c1c1]"
          onChange={(e) =>
            setInput({
              ...input,
              hasReference: e.target.checked,
            })
          }
          // disabled={isSubmitting}
        />
        <label
          htmlFor="hasReference"
          className="ml-2 block cursor-pointer text-sm text-gray-900 "
        >
          This analogy has a reference link.
        </label>
      </div>

      {/* the reference link */}
      {input?.hasReference && (
        <div className="z-10 mt-4 sm:col-span-1">
          <label
            htmlFor="reference"
            className="block text-sm font-medium text-gray-700"
          >
            Reference link
          </label>
          <div className="mt-1">
            <input
              id="reference"
              name="reference"
              className="mt-1 block w-full  max-w-[800px] rounded-[12px] border border-gray-300 px-3 py-2 shadow-sm !outline-none ring-0 focus:border-[#c1c1c1] focus:ring-[#c1c1c1] sm:text-sm"
              placeholder="https://..."
              value={input?.reference ?? ""}
              required
              onChange={handleChange}
              // disabled={isSubmitting}
            />
          </div>
          <p className="ml-2 mt-2.5 text-xs text-gray-500">
            Link to the original source (video, article, etc.).
          </p>
        </div>
      )}
    </div>
  );
}
