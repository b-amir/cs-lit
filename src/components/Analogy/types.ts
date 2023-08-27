import { type ExtendedAnalogy } from "../SidebarRight/types";
import { type Session } from "next-auth";
import { type Comment, type User } from "@prisma/client";
import { type InfiniteData } from "@tanstack/react-query";

export interface IAnalogyProps {
  analogy: {
    id: string;
  };
  needsInfoRow?: boolean;
  needsLink?: boolean;
  needsLocationInfo?: boolean;
  setAnalogyEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: string;
      shown: boolean;
      purpose: string;
    }>
  >;
  setAnalogyInput: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      description: string;
      reference: string;
      status: string;
      pinned: boolean;
      topicId: string;
      authorId: string;
    }>
  >;
  analogyData: ExtendedAnalogy | undefined;

  analogyStatus?: string;
  votingAverage: number;
  votingStatus?: string;
}
export interface IAnalogyBodyProps {
  analogy: {
    id: string;
  };
  analogyData: ExtendedAnalogy | undefined;

  analogyStatus?: string;
  needsInfoRow?: boolean;
  needsLocationInfo?: boolean;
  setAnalogyEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: string;
      shown: boolean;
      purpose: string;
    }>
  >;
  setAnalogyInput: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string;
    description: string;
    reference: string;
    status: string;
    pinned: boolean;
    topicId: string;
    authorId: string;
  }>>
  votingAverage: number;
  votingStatus?: string;
}
export interface IContentSectionProps {
  analogyData: ExtendedAnalogy | undefined;
  analogyStatus?: string;
}
export interface IHeaderSectionProps {
  analogy: {
    id: string;
  };
  analogyData: ExtendedAnalogy | undefined;
  analogyStatus: string | undefined;
  votingAverage: number;
  votingStatus: string | undefined;
}

export interface IInfoRowSectionProps {
  needsLocationInfo: boolean | undefined;
  analogyData: ExtendedAnalogy | undefined;
  setAnalogyInput: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string;
    description: string;
    reference: string;
    status: string;
    pinned: boolean;
    topicId: string;
    authorId: string;
  }>>
  setAnalogyEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: string;
      shown: boolean;
      purpose: string;
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
    items: ExtendedComment[];
    total: number;
    pageInfo: {
      count: number;
      nextCursor: string | undefined;
      hasNextPage: boolean | undefined
    };
  }> | undefined;
}

export interface IPostEditButtonProps {
  analogyData: ExtendedAnalogy | undefined;
  sessionData: Session | null
  setAnalogyEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: string;
      shown: boolean;
      purpose: string;
    }>
  >;
  setAnalogyInput: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string;
    description: string;
    reference: string;
    status: string;
    pinned: boolean;
    topicId: string;
    authorId: string;
  }>>

}