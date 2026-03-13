import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import NoteEditor from "@/app/notes/[id]/NoteEditor";

export default async function NotePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: { id, user_id: user.id },
  });

  if (!note) {
    notFound();
  }

  return <NoteEditor initialNote={note} />;
}
