// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter } from "next/navigation";
import css from "@/components/NotePreview/NotePreview.module.css";
import type { Note } from "@/types/note";

type Props = {
  note: Note;
};

export default function NotePreviewClient({ note }: Props) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <button onClick={() => router.back()}>Close</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.date}>
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
