import { type GetResult } from "@prisma/client/runtime/library";
import { type Comment, type ANALOGY_STATUS, type CATEGORY_STATUS, type TOPIC_STATUS, type USER_ROLE, type USER_STATUS, type User } from "@prisma/client";

export type SingleAnalogyData = {
  user: (GetResult<{
    id: string;
    username: string | null;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    status: USER_STATUS;
    role: USER_ROLE;
  }, { [x: string]: () => unknown; }> & object) | null;
  topic: (GetResult<{
    id: string;
    title: string;
    slug: string;
    status: TOPIC_STATUS;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    starterId: string;
    categoryId: string;
  }, { [x: string]: () => unknown; }> & object) | null;
  category: (GetResult<{
    id: string;
    name: string;
    slug: string;
    status: CATEGORY_STATUS;
    createdAt: Date;
    updatedAt: Date;
  }, { [x: string]: () => unknown; }> & object) | null;
  status: ANALOGY_STATUS;
  id: string;
  description: string;
  topicId: string;
  reference: string | null;
  title: string;
  // pinned: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
} | undefined;

export type ExtendedComment = Comment & { user: User | null };

export type CommentInput = {
  content: string;
  analogyId: string | undefined;
}
export interface IInfoSectionProps {
  singleAnalogyData: SingleAnalogyData;
}

export interface IMainSectionProps {
  singleAnalogyData: SingleAnalogyData;
}
export interface ICommentSectionProps {
  analogyId: string | undefined;
}

export interface ICommentEditorProps {
  analogyId: string | undefined;
}
