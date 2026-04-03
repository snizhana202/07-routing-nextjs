// app/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesFilters({ params }: NotesFiltersProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? ["all"];
  const category = slug[0] === "all" ? "" : slug[0];

  const queryClient = new QueryClient();
  const response = await fetchNotes(1, 12, category);

  await queryClient.prefetchQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes(1, 12, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
        <h1>Notes List</h1>
          {response.notes.length > 0 && (
        <NoteList notes={response.notes} />
      )}
      </div>
    </HydrationBoundary>
  );
}

