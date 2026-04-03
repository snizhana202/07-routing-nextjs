// app/@modal/(.)notes/[id]/page.tsx

import { getNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: { id: string };
};

export default async function NotePreview({ params }: Props) {
  const response = await getNote(params.id);

  return (
    <Modal>
      <NotePreviewClient note={response} />
    </Modal>
  );
};


