export interface Note {
  id: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  };
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
