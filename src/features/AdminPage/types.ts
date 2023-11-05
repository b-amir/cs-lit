import { type FetchNextPageOptions, type InfiniteQueryObserverResult } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction, type ReactNode } from "react";

export type AdminInputType = {
  item: BaseItem;
  type: "category" | "user" | "comment" | "topic" | "analogy";
}
export type FetchNextPage = (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
export type GeneralData = {
  pages: [{
    items: [
      ListItem
    ],
    pageInfo: {
      count: number
      hasNextPage: boolean
      nextCursor: string
    }
    total: number
  }]
}
// ADMIN EDITOR:
export interface BaseItem {
  id: string;
  status: 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'DELETED' | 'BANNED' | 'ACTIVE';
  item: "string";
  type: "string";
}
export interface Category extends BaseItem {
  name: string;
  slug: string;
}
export interface Topic extends BaseItem {
  title: string;
  slug: string;
  url: string;
}
export interface Analogy extends BaseItem {
  title: string;
  description: string;
  // pinned: boolean;
}
export interface User extends BaseItem {
  username: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
}
export interface Comment extends BaseItem {
  content: string;
}
export interface FormField {
  name: string;
  label: string;
  variety: 'text' | 'select' | 'checkbox';
  options?: {
    value: string;
    label: string;
  }[];
}
export interface FormProps {
  input: {
    item: BaseItem;
    type: "category" | "user" | "comment" | "topic" | "analogy";
  };
  setShown: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<FormInput>>;
  fields: FormField[];
  type: "category" | "user" | "comment" | "topic" | "analogy"
}
export interface FormInput {
  item: BaseItem;
  type: "category" | "user" | "comment" | "topic" | "analogy"
}
export interface EditorModalProps {
  setShown: (shown: boolean) => void;
  shown: boolean;
  children: React.ReactNode;


}
export interface IEditorModalInput {
  type: "Categories" | "Topics" | "Analogies" | "Users" | "Comments";
}

// ADMIN SIDEPANEL:
export interface EditorBodyBlueprint {
  input: {
    item: BaseItem;
    type: "category" | "user" | "comment" | "topic" | "analogy";
  };
  setShown: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<FormInput>>;
  fields: FormField[];
  type: "topic" | "category" | "user" | "comment" | "analogy"

}
export interface IActivityLogSectionProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IActivityLogItemProps {
  item: {
    id: string;
    userId: string;
    entityType: string;
    entityTitle: string;
    action: string;
    timestamp: Date;
  };
}

// ADMIN FOOTER:
export interface PendingItem {
  id: string;
  title: string;
  description: string;
  categoryId?: string;
  analogyId?: string;
  topicId?: string;
  starterId?: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  name: string;
  slug: string;
  url: string;
  category: string;
  firstAnalogy: string;
  status: string;
}
export interface IPendingItemProps {
  item: PendingItem;
}

// ACTION MENU:
export interface ActionMenuProps {
  children: ReactNode;
}

// LIST VIEW:
export interface ListItem {
  id: string;
  title: string;
  description: string;
  categoryId?: string;
  analogyId?: string;
  topicId?: string;
  starterId?: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  name: string;
  slug: string;
  url: string;
  category: string;
  firstAnalogy: string;
  status: "PENDING" | "PUBLISHED" | "REJECTED" | "DELETED";
  item: "string";
  type: "string";
}
export interface IListViewProps {
  type: string;
  hasNextPage: boolean | undefined;
  fetchNextPage: FetchNextPage;
  isFetchingNextPage: boolean;
  setEditorModalInput: React.Dispatch<React.SetStateAction<any>>;
  setEditorModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderBy: React.Dispatch<React.SetStateAction<"desc" | "asc" | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  data: GeneralData;
}
export interface IListItemProps {
  item: ListItem;
  setEditorModalInput: React.Dispatch<React.SetStateAction<any>>;
  setEditorModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

// ORDER BY INPUT:
export interface OrderByProps {
  setOrderBy: React.Dispatch<React.SetStateAction<"asc" | "desc" | null>>;
}