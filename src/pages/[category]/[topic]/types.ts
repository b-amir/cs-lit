import { type Session } from "next-auth";
import { type RefObject, type Dispatch, type SetStateAction } from "react";
import {
  type TOPIC_STATUS,
  type ANALOGY_STATUS,
  type CATEGORY_STATUS,
} from "@prisma/client";
import {
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { type SpringValue } from "@react-spring/web";
import { type GetResult } from "@prisma/client/runtime/library";

type TopicData = GetResult<{
  id: string;
  name: string;
  slug: string;
  status: CATEGORY_STATUS;
  createdAt: Date;
  updatedAt: Date;
}, { [x: string]: () => unknown; }> & object;

type AnalogyData = {
  id: string;
  title: string;
  description: string;
  reference: string | null;
  status: ANALOGY_STATUS;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  topicId: string;
};

export type AnalogyInput = {
  id?: string;
  description: string;
  topicId: string | undefined;
  hasReference?: boolean | undefined;
  reference?: string | undefined;
};

type AnalogyEditorState = {
  entity: "analogy" | "topic" | null;
  shown: boolean;
  purpose: "Edit" | "Create" | null;
};

type TopicAnalogies = {
  pages: {
    items: AnalogyData[] | undefined;
    total: number;
    pageInfo: {
      hasNextPage: boolean | undefined;
      nextCursor: string | undefined | null;
    };
  }[] | undefined;
  pageParams: unknown[];
};

type SessionData = Session | null;

export type IHeaderSectionProps = {
  analogiesCount: number | undefined;
  analogiesFetchingStatus: "error" | "success" | "loading";
  sessionData: SessionData;
  topicFetchingStatus: "error" | "success" | "loading";
  topicData: {
    category: TopicData | null;
    status: TOPIC_STATUS;
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    url: string;
    starterId: string;
    categoryId: string;
  } | undefined;
};

export type IMainSectionProps = {
  topicFetchingStatus: "error" | "success" | "loading";
  analogiesFetchingStatus: "error" | "success" | "loading";
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  setAnalogyEditorState: Dispatch<SetStateAction<AnalogyEditorState>>;
  setAnalogyInput: Dispatch<SetStateAction<AnalogyInput>>;
  topicAnalogies: TopicAnalogies | undefined;
};

export type IEditorSectionProps = {
  analogyEditorState: AnalogyEditorState;
  analogyInput: AnalogyInput;
  animationProps: {
    height: SpringValue<number>;
  };
  contentRef: RefObject<HTMLDivElement>;
  newInput: AnalogyInput;
  setAnalogyEditorState: Dispatch<SetStateAction<AnalogyEditorState>>;
  setAnalogyInput: Dispatch<SetStateAction<AnalogyInput>>;
};

export type IAnalogyEditorFormProps = {
  input: AnalogyInput;
  setInput: Dispatch<SetStateAction<AnalogyInput>>;
  analogyEditorState: AnalogyEditorState;
  setAnalogyEditorState: Dispatch<SetStateAction<AnalogyEditorState>>;
};

export type IAnalogyEditorBodyProps = {
  analogyEditorState: AnalogyEditorState;
  input: AnalogyInput;
  setInput: Dispatch<SetStateAction<AnalogyInput>>;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};
