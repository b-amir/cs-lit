import { EditorBodyBlueprint } from './EditorModal';
export interface BaseItem {
  id: string;
  status: 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'DELETED' | 'BANNED' | 'ACTIVE';
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
  pinned: boolean;
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
  setShown: (shown: boolean) => void;
  setInput: (input: FormInput) => void;
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

export interface EditorBodyBlueprint {
  input: {
    item: BaseItem;
    type: "category" | "user" | "comment" | "topic" | "analogy";
  };
  setShown: (shown: boolean) => void;
  setInput: (input: FormInput) => void;
  fields: FormField[];
  type: "topic" | "category" | "user" | "comment" | "analogy"

}
export interface IAdminFooterProps {
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