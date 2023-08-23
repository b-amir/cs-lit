import { type ReactNode } from "react";
import { type User, type Analogy, type Topic, type Category } from "@prisma/client";

export interface IWidgetsSectionProps {
  hide: () => void;
}
export interface IWidgetLayoutProps {
  isActive: boolean;
  widgetTitle: string;
  widgetIcon: ReactNode;
  onShow: () => void;
  children: ReactNode;
}
export interface ISingleWidgetProps {
  activeWidgetIndex: number[];
  hide: () => void;
  setActiveWidgetIndex: (activeWidgetIndex: number[]) => void;
}

export interface CONTRIBUTOR {
  id: string;
  name: string;
  analogiesCount: number | undefined;
}

export interface ExtendedAnalogy extends Analogy {
  user: User | null;
  topic: Topic | null;
  category: Category | null;
}