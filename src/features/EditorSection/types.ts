import { type EditorState } from "./editorSlice";
import { type GeneralInputType } from "@/hooks/CRUD/types";
import { USER_ROLE, type Category, type TOPIC_STATUS, USER_STATUS, CATEGORY_STATUS, ANALOGY_STATUS } from "@prisma/client";
import { type Dispatch, type SetStateAction } from "react";

export interface IEditorLayoutProps {
  input: {
    user: {
      id: string;
      username: string | null;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      status: USER_STATUS;
      role: USER_ROLE;
    } | null;
    topic: {
      id: string;
      title: string;
      slug: string;
      status: TOPIC_STATUS;
      url: string;
      createdAt: Date;
      updatedAt: Date;
      starterId: string;
      categoryId: string;
    } | null;
    category: {
      id: string;
      name: string;
      slug: string;
      status: CATEGORY_STATUS;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    id: string;
    title: string;
    description: string;
    reference: string | null;
    status: ANALOGY_STATUS;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    topicId: string;
  } | undefined
  setInput: Dispatch<SetStateAction<GeneralInputType>>;
  type: string;
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

export type AnalogyInput = {
  id?: string;
  description: string;
  topicId: string | undefined;
  hasReference?: boolean | undefined;
  reference?: string | undefined;
};

export interface IButtonsRowProps {
  input: {
    user: {
      id: string;
      username: string | null;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      status: USER_STATUS;
      role: USER_ROLE;
    } | null;
    topic: {
      id: string;
      title: string;
      slug: string;
      status: TOPIC_STATUS;
      url: string;
      createdAt: Date;
      updatedAt: Date;
      starterId: string;
      categoryId: string;
    } | null;
    category: {
      id: string;
      name: string;
      slug: string;
      status: CATEGORY_STATUS;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    id: string;
    title: string;
    description: string;
    reference: string | null;
    status: ANALOGY_STATUS;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    topicId: string;
  } | undefined
  type: string;
  editor: EditorState
}

export interface IFormTriggerProps {
  newInput: {
    user: {
      id: string;
      username: string | null;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      status: USER_STATUS;
      role: USER_ROLE;
    } | null;
    topic: {
      id: string;
      title: string;
      slug: string;
      status: TOPIC_STATUS;
      url: string;
      createdAt: Date;
      updatedAt: Date;
      starterId: string;
      categoryId: string;
    } | null;
    category: {
      id: string;
      name: string;
      slug: string;
      status: CATEGORY_STATUS;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    id: string;
    title: string;
    description: string;
    reference: string | null;
    status: ANALOGY_STATUS;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    topicId: string;
  } | undefined
  setInput: React.Dispatch<React.SetStateAction<GeneralInputType>>;
}
