import { type Session } from "next-auth";
import { type GetResult } from "@prisma/client/runtime/library";
import { type GeneralInputType, type ExtraInput } from "@/hooks/CRUD/types";
import { type Dispatch, type SetStateAction } from "react";
import { type Topic, type CATEGORY_STATUS, type TOPIC_STATUS, type Category } from "@prisma/client";
import { type InfiniteData, type FetchNextPageOptions, type InfiniteQueryObserverResult } from "@tanstack/react-query";
import { type EditorState } from "@/features/EditorSection/editorSlice";

export type ExtendedTopic = Topic & {
  category: Category;
  firstAnalogy: string;
}

export type EditorInput = ExtendedTopic & {
  hasReference?: boolean;
  reference?: string
}

export type TopicInput = {
  id: string;
  title: string;
  url: string;
  category: Category | string;
  firstAnalogy: string;
  slug: string;
  status: TOPIC_STATUS;
  hasReference?: boolean;
  reference?: string;
};

type GenericData<T extends Record<any, any>> = GetResult<T, { [x: string]: () => unknown; }> | undefined;

export type CategoryData = GenericData<{
  id: string;
  name: string;
  slug: string;
  status: CATEGORY_STATUS;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TopicsData = InfiniteData<{
  items: {
    category: (GetResult<{
      id: string;
      name: string;
      slug: string;
      status: CATEGORY_STATUS;
      createdAt: Date;
      updatedAt: Date;
    }, { [x: string]: () => unknown; }> & object) | null;
    id: string;
    title: string;
    slug: string;
    status: TOPIC_STATUS;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    starterId: string;
    categoryId: string;
  }[] | undefined;
  total: number;
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | null | undefined;
  };
}> | undefined


export interface ICategoryHeaderProps {
  categoryFetchingStatus: "error" | "success" | "loading";
  categoryData: CategoryData;
  setOrderBy: Dispatch<SetStateAction<"desc" | "asc" | null>>;
  orderBy: "desc" | "asc" | null;
}

export interface IEditorSectionProps {
  newInput: GeneralInputType;
  setInput: React.Dispatch<React.SetStateAction<GeneralInputType>>;
  Input: GeneralInputType;
  type: 'Analogies' | 'Topics';
}

export interface IMainSectionProps {
  categoryFetching: boolean;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  setTopicInput: React.Dispatch<React.SetStateAction<TopicInput>>;
  topicsData: TopicsData;
  topicsFetchingStatus: "error" | "success" | "loading";
}

export interface ITopicsListProps {
  topicsData: TopicsData;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  isFetchingNextPage: boolean;
  setTopicInput: React.Dispatch<React.SetStateAction<TopicInput>>;
}

export interface IInput {
  item: ExtraInput;
}

export interface ITopicEditorFormProps {
  categoryData: CategoryData;
  input: TopicInput;
  setInput: React.Dispatch<React.SetStateAction<TopicInput>>;
}

export interface ITopicFormInputsProps {
  input: GeneralInputType;
  setInput: Dispatch<SetStateAction<GeneralInputType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editor: EditorState
}

export interface ITitleRowProps {
  sessionData: Session | null
}

export interface INormalRowProps {
  handleEdit: (e: React.MouseEvent, topic: Topic) => void;
  sessionData: Session | null;
  topicsData: TopicsData;
}
