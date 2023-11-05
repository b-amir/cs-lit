import { type Session } from "next-auth";
import { type InfiniteData } from "@tanstack/react-query";
import { type ExtendedAnalogy } from "../PageLayout/SidebarRight/types";
import { type Dispatch, type SetStateAction } from "react";
import { USER_STATUS, type ANALOGY_STATUS, type Comment, type User, USER_ROLE, COMMENT_STATUS, TOPIC_STATUS, CATEGORY_STATUS } from "@prisma/client";
import { type SingleAnalogyData } from "@/features/AnalogyPage/types";
import { GetResult } from "@prisma/client/runtime/library";

export type Analogy = {
  id: string;
};

export type AnalogyInput = {
  id: string;
  title: string;
  description: string;
  reference: string;
  status: ANALOGY_STATUS;
  // pinned: boolean;
  topicId: string;
  authorId: string;
};
export interface IAnalogyProps {
  analogy: Analogy;
  needsInfoRow?: boolean;
  needsLink?: boolean;
  needsLocationInfo?: boolean;
  setAnalogyInput?: Dispatch<
    SetStateAction<{
      description: string;
      topicId: string | undefined;
    }>
  >;
  analogyData?: {
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
  analogyStatus?: string;
  votingAverage?: number;
  votingStatus?: string;
}
export type IAnalogyBodyProps = IAnalogyProps
export interface IContentSectionProps {
  analogyData: {
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
  analogyStatus?: string;
}
export type IHeaderSectionProps = IAnalogyProps
export interface IInfoRowSectionProps {
  needsLocationInfo?: boolean;
  analogyData?: {
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
  setAnalogyInput?: Dispatch<
    SetStateAction<{
      description: string;
      topicId: string | undefined;
    }>
  >;
}
export interface IPostTimeProps {
  analogyData: ExtendedAnalogy | undefined;
}
export interface ExtendedComment extends Comment {
  user: User | undefined;
}
export interface IPostCommentCountProps {
  analogyData: ExtendedAnalogy | undefined;
  commentsData: InfiniteData<{
    items: {
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
      id: string;
      content: string;
      status: COMMENT_STATUS;
      createdAt: Date;
      updatedAt: Date;
      commenterId: string;
      analogyId: string;
    }[];
    total: number;
    pageInfo: {
      hasNextPage: boolean;
      nextCursor: string | null | undefined;
    };
  }> | undefined
}
export interface IPostEditButtonProps {
  analogyData: ExtendedAnalogy | undefined;
  sessionData: Session | null;
  setAnalogyInput?: Dispatch<
    SetStateAction<{
      description: string;
      topicId: string | undefined;
    }>
  >;
}