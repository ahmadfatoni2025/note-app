import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const notes = await prisma.note.findMany({
    where: { user_id: user.id },
    orderBy: { updated_at: 'desc' }
  });

  const workspaces = await prisma.workspace.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
    include: {
      _count: {
        select: { notes: true }
      }
    }
  });

  const folders = await prisma.folder.findMany({
    where: { workspace: { user_id: user.id } },
    orderBy: { created_at: 'desc' },
    include: {
      _count: {
        select: { notes: true }
      }
    }
  });

  // Serialize dates for client component
  const serializedNotes = notes.map(n => ({
    ...n,
    updated_at: n.updated_at.toISOString(),
    created_at: n.created_at.toISOString(),
  }));

  const serializedWorkspaces = workspaces.map(w => ({
    ...w,
    updated_at: w.updated_at.toISOString(),
    created_at: w.created_at.toISOString(),
  }));

  const serializedFolders = folders.map(f => ({
    ...f,
    updated_at: f.updated_at.toISOString(),
    created_at: f.created_at.toISOString(),
  }));

  return <DashboardClient 
    notes={serializedNotes} 
    workspaces={serializedWorkspaces}
    folders={serializedFolders}
  />;
}
