import { type Session } from "next-auth";
import { type InfiniteData } from "@tanstack/react-query";
import { type ExtendedAnalogy } from "../PageLayout/SidebarRight/types";
import { type Dispatch, type SetStateAction } from "react";
import { type ANALOGY_STATUS, type Comment, type User } from "@prisma/client";

export type Analogy = {
  id: string;
};
export type AnalogyEditorState = {
  entity: string;
  shown: boolean;
  purpose: string;
};
export type AnalogyInput = {
  id: string;
  title: string;
  description: string;
  reference: string;
  status: ANALOGY_STATUS;
  pinned: boolean;
  topicId: string;
  authorId: string;
};
export interface IAnalogyProps {
  analogy: Analogy;
  needsInfoRow?: boolean;
  needsLink?: boolean;
  needsLocationInfo?: boolean;
  setAnalogyEditorState?: React.Dispatch<React.SetStateAction<AnalogyEditorState>>;
  setAnalogyInput?: React.Dispatch<React.SetStateAction<AnalogyInput>>;
  analogyData?: ExtendedAnalogy | undefined;
  analogyStatus?: string;
  votingAverage?: number;
  votingStatus?: string;
}
export type IAnalogyBodyProps = IAnalogyProps
export interface IContentSectionProps {
  analogyData: ExtendedAnalogy | undefined;
  analogyStatus?: string;
}
export type IHeaderSectionProps = IAnalogyProps
export interface IInfoRowSectionProps {
  needsLocationInfo?: boolean;
  analogyData?: ExtendedAnalogy;
  setAnalogyInput: Dispatch<SetStateAction<AnalogyInput>> | undefined;
  setAnalogyEditorState: Dispatch<
    SetStateAction<{ entity: string; shown: boolean; purpose: string }>
  > | undefined;
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
      hasNextPage: boolean | undefined;
    };
  }> | undefined;
}
export interface IPostEditButtonProps {
  analogyData: ExtendedAnalogy | undefined;
  sessionData: Session | null;
  setAnalogyEditorState: Dispatch<
    SetStateAction<AnalogyEditorState>
  > | undefined;
  setAnalogyInput: Dispatch<SetStateAction<AnalogyInput>> | undefined;
}