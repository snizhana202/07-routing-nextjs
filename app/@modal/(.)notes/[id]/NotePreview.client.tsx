// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, FetchNoteResponse } from "@/lib/api";
import css from "@/components/NotePreview/NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<FetchNoteResponse>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = data?.note;

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note.</p>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <button onClick={() => router.back()}>Close</button>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
