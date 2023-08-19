import React, { useRef } from "react";
import { api } from "@/utils/api";
import slugify from "slugify";
import { useSession } from "next-auth/react";
import { type Topic } from "@prisma/client";
import { EditorLayout } from "@/components/EditorLayout";
import { useUpdateItem } from "@/hooks/useUpdateItem";
import { useCreateItem } from "@/hooks/useCreateItem";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { animated, useSpring } from "@react-spring/web";
import { NotSignedIn } from "../../components/NotSignedIn";

interface ITopicEditorFormProps {
  UrlCategory: string;
  categoryData: { id: string; name: string };
  input: Topic;
  setInput: React.Dispatch<React.SetStateAction<Topic>>;
  topicEditorState: {
    shown: boolean;
    purpose: "Create" | "Edit" | null;
  };
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "Create" | "Edit" | null;
    }>
  >;
}
interface ITopicEditorBodyProps {
  input: Topic;
  setInput: React.Dispatch<React.SetStateAction<Topic>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  topicEditorState: {
    shown: boolean;
    purpose: "Create" | "Edit" | null;
  };
  UrlCategory: string;
}

export function TopicEditorForm({
  UrlCategory,
  // categoryData,
  input,
  setInput,
  topicEditorState,
  setTopicEditorState,
}: ITopicEditorFormProps) {
  const ctx = api.useContext();
  const { data: sessionData } = useSession();
  const topicSlug = slugify(input.title, { lower: true });

  const item = input as Topic;
  const type = "Topics";

  const updateItem = useUpdateItem(item, type);
  const handleUpdate = (e) => {
    e.preventDefault();
    setTopicEditorState({ entity: "topic", shown: false, purpose: null });
    updateItem();
  };

  const createItem = useCreateItem(item, type);
  const handleCreate = (e) => {
    e.preventDefault();
    setTopicEditorState({ entity: "topic", shown: false, purpose: null });
    createItem();
  };

  const deleteItem = useDeleteItem(item, type);
  const handleDelete = (e) => {
    e.preventDefault();
    setTopicEditorState({ entity: "topic", shown: false, purpose: null });
    deleteItem();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => {
      return {
        ...prev,
        ...prev.item,
        [name]: value,
      };
    });
  };

  return (
    <div className="">
      {topicEditorState.shown ? (
        <>
          {sessionData &&
          ["ADMIN", "EDITOR", "USER"].includes(sessionData?.user.role) ? (
            <EditorLayout
              handleUpdate={handleUpdate}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
              // deleteTopicHandler={deleteTopicHandler}
              input={input}
              editorState={topicEditorState}
            >
              <TopicEditorBody
                topicEditorState={topicEditorState}
                input={input}
                setInput={setInput}
                UrlCategory={UrlCategory}
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
function TopicEditorBody({
  input,
  setInput,
  handleChange,
  //  isSubmitting,
  topicEditorState,
  UrlCategory,
}: ITopicEditorBodyProps) {
  // --- animation setup for reference ---> //
  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: input?.hasReference ? 0 : 80,
    opacity: input?.hasReference ? 0 : 1,
    visibility: input?.hasReference ? "hidden" : "visible",
    config: {
      // fast animation
      duration: 100,
      // smooth animation
    },
  });

  return (
    <>
      <div className="sm:col-span-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Topic title
        </label>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            className="mt-1 block w-full  max-w-[100%] rounded-[12px] border border-gray-300 px-3 py-2 shadow-sm !outline-none ring-0 focus:border-[#c1c1c1] focus:ring-[#c1c1c1] sm:text-sm"
            placeholder="Ex: Closure"
            // defaultValue={""}
            required
            defaultValue={input?.title ?? ""}
            // value={input?.title}
            onChange={handleChange}
            // disabled={isSubmitting}
          />
        </div>
        <p className="ml-2 mt-2.5 text-xs text-gray-500">
          Must be a subject related to {UrlCategory}.
        </p>
      </div>
      <div className="sm:col-span-1">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          Link to docs
        </label>
        <div className="mt-1">
          <input
            id="url"
            name="url"
            className="mt-1 block w-full  max-w-[100%] rounded-[12px] border border-gray-300 px-3 py-2 shadow-sm !outline-none ring-0 focus:border-[#c1c1c1] focus:ring-[#c1c1c1] sm:text-sm"
            placeholder="https://..."
            defaultValue={input?.url}
            required
            onChange={handleChange}
            // disabled={isSubmitting}
          />
        </div>
        <p className="ml-2 mt-2.5 text-xs text-gray-500">
          Provide a link to official documentations.
        </p>
      </div>

      {/* in creation mode, immediately add first analogy so the topic is not empty */}
      {topicEditorState?.purpose === "Create" && (
        <div className="sm:col-span-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            Your analogy for this topic
          </label>
          <div className="group mt-1 w-full rounded-[12px] border border-gray-200 bg-gray-50 shadow-sm transition-all hover:border-[#c1c1c1] focus:border-[#c1c1c1] dark:border-gray-600 dark:bg-gray-700">
            <div className="rounded-[12px] bg-white px-6 pb-2 pt-6 dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">
                Add your analogy
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full border-0 border-transparent bg-white px-0 text-sm text-[#2A2A2E] !outline-none  group-focus:border-[#c1c1c1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Add your analogy ..."
                required
                value={input?.firstAnalogy}
                onChange={(event) =>
                  setInput({
                    ...input,
                    firstAnalogy: event.target.value,
                  })
                }
                // disabled={isSubmitting || editorLayoutState?.purpose === "Edit"}
              ></textarea>
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
              <div className="flex space-x-1 pl-0 sm:pl-2">
                <a
                  href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                  target="_blank"
                  type="button"
                  className=" font-small inline-flex cursor-pointer justify-center rounded p-2 text-xs text-gray-500 hover:bg-gray-100 hover:text-[#2A2A2E] dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  how to write markdown?
                </a>
              </div>
            </div>
          </div>
          {/* {input?.hasReference ? null : ( */}
          <animated.div
            style={animationProps}
            ref={contentRef}
            className="z-0 select-none"
          >
            <p className="ml-6 mt-2.5 text-xs text-gray-500">
              <ul>
                <li className="list-disc py-1">
                  Each topic must have at least one analogy to get started.
                </li>
                <li className="list-disc py-1">
                  {/* define what an analogy is */}
                  An analogy is a short explanation of a topic that helps you
                  understand it better.
                </li>
                <li className="list-disc py-1">
                  After submition, analogies must be verified by admins to be
                  published.
                </li>
              </ul>
            </p>
          </animated.div>
          {/* )} */}

          {/* a checkmark to indicate if analogy has a reference link */}
          <div className="mt-8 flex w-fit items-center rounded-lg px-2 py-1 transition-all duration-200 hover:bg-gray-50 sm:mt-4">
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
              className="ml-2  block cursor-pointer text-sm text-gray-900  "
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
                  defaultValue={input?.reference ?? ""}
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
      )}
    </>
  );
}
