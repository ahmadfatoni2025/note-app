import { prisma } from "@/lib/prisma";
import EditNoteForm from "./EditNoteForm";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EditNotePage(props: { params: Params }) {
  const { id } = await props.params;

  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note) {
    notFound();
  }

  return <EditNoteForm note={note} />;
}
