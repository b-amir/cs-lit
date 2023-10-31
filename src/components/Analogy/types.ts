import { type Session } from "next-auth";
import { type InfiniteData } from "@tanstack/react-query";
import { type ExtendedAnalogy } from "../PageLayout/SidebarRight/types";
import { type Dispatch, type SetStateAction } from "react";
import { USER_STATUS, type ANALOGY_STATUS, type Comment, type User, USER_ROLE, COMMENT_STATUS } from "@prisma/client";
import { type SingleAnalogyData } from "@/pages/[category]/[topic]/[analogy]/types";
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
  setAnalogyInput?: React.Dispatch<React.SetStateAction<AnalogyInput>>;
  analogyData?: SingleAnalogyData;
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
  analogyData?: SingleAnalogyData;
  setAnalogyInput?: Dispatch<SetStateAction<AnalogyInput>> | undefined;
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
      user: (GetResult<{
        id: string;
        username: string | null;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        status: USER_STATUS;
        role: USER_ROLE;
      }, { [x: string]: () => unknown; }> & {}) | null;
      id: string;
      status: COMMENT_STATUS;
      analogyId: string;
      createdAt: Date;
      updatedAt: Date;
      content: string;
      commenterId: string;
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
  setAnalogyInput: Dispatch<SetStateAction<AnalogyInput>> | undefined;
}