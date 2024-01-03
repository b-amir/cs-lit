import { useRouter } from "next/router";
import React, { useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { type ITopicFormInputsProps } from "../../CategoryPage/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setTopicFirstAnalogy,
  setTopicHasReference,
  setTopicReference,
  setTopicTitle,
  setTopicUrl,
} from "../inputSlice";

export function TopicFormInputs({
  editor,
  isSubmitting,
}: ITopicFormInputsProps) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const UrlCategory = router.query.category as string;
  const input = useAppSelector((state) => state.input.topicInput);

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
            required
            defaultValue={input?.title ?? ""}
            onChange={(e) => dispatch(setTopicTitle(e.target.value))}
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
            onChange={(e) => dispatch(setTopicUrl(e.target.value))}
          />
        </div>
        <p className="ml-2 mt-2.5 text-xs text-gray-500">
          Provide a link to official documentations.
        </p>
      </div>

      {/* in creation mode, immediately add first analogy so the topic is not empty */}
      {editor?.purpose === "Create" && (
        <div className="sm:col-span-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            Your analogy for this topic
          </label>
          <div className="group mt-1 w-full rounded-[12px] border border-gray-200 bg-gray-50 shadow-sm transition-all hover:border-[#c1c1c1] focus:border-[#c1c1c1]">
            <div
              className={`rounded-[12px] px-6 pb-2 pt-6 ${
                isSubmitting ? "bg-gray-100" : "bg-white"
              }`}
            >
              <label htmlFor="comment" className="sr-only">
                Add your analogy
              </label>
              <textarea
                id="comment"
                rows={4}
                className={`max-h-[15dvh] w-full border-0 border-transparent  px-0 text-sm text-dark-2 !outline-none  group-focus:border-[#c1c1c1] ${
                  isSubmitting ? "bg-gray-100" : "bg-white"
                }`}
                placeholder="Add your analogy ..."
                required
                value={input?.firstAnalogy}
                onChange={(e) => dispatch(setTopicFirstAnalogy(e.target.value))}
                disabled={isSubmitting}
              ></textarea>
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2">
              <div className="flex space-x-1 pl-0 sm:pl-2">
                <a
                  href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                  target="_blank"
                  type="button"
                  className=" font-small inline-flex cursor-pointer justify-center rounded p-2 text-xs text-gray-500 hover:bg-gray-100 hover:text-dark-2"
                >
                  how to write markdown?
                </a>
              </div>
            </div>
          </div>
          <animated.div
            // @ts-ignore
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
                  An analogy is a short explanation of a topic that helps you
                  understand it better.
                </li>
                <li className="list-disc py-1">
                  After submission, analogies must be verified by admins to be
                  published.
                </li>
              </ul>
            </p>
          </animated.div>

          {/* a checkmark to indicate if analogy has a reference link */}
          <div className="mt-8 flex w-fit items-center rounded-lg px-2 py-1 transition-all duration-200 hover:bg-gray-50 sm:mt-4">
            <input
              id="hasReference"
              name="hasReference"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-dark-2 accent-[#6b6b6b] focus:ring-[#c1c1c1]"
              checked={input?.hasReference}
              onChange={(e) => dispatch(setTopicHasReference(e.target.checked))}
              disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  onChange={(e) => dispatch(setTopicReference(e.target.value))}
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
