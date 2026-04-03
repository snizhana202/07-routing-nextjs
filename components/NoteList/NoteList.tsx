// components/NoteList/NoteList.tsx

import css from "./NoteList.module.css";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "@/lib/api";
import Link from "next/link";

export interface NoteListProps {
  category: string;
}

export default function NoteList({ category }: NoteListProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes(1, 12, category),
  });
  
  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", category] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load notes</p>;
  if (!data || data.notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {data.notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
            >
               {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}