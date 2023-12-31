import { type GetResult } from "@prisma/client/runtime/library";
import { type Comment, type ANALOGY_STATUS, type CATEGORY_STATUS, type TOPIC_STATUS, type USER_ROLE, type USER_STATUS, type User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type SingleAnalogyData = {
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

export type ExtendedComment = Comment & { user: User | null };

export type CommentInput = {
  content: string;
  analogyId: string | undefined;
}
export interface IInfoSectionProps {
  singleAnalogyData: {
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
  } | undefined;
}

export interface IMainSectionProps {
  singleAnalogyData: {
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
  } | undefined;
}
export interface ICommentSectionProps {
  analogyId: string | undefined;
}

export interface ICommentEditorProps {
  analogyId: string | undefined;
}
