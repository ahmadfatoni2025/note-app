"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNote(workspaceId?: string, folderId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Ensure user record exists in Prisma (Sync with Supabase)
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || null,
      }
    });
  }

  // Get first workspace if not provided
  let targetWorkspaceId = workspaceId;
  if (!targetWorkspaceId) {
    const ws = await prisma.workspace.findFirst({
      where: { user_id: user.id }
    });
    
    if (ws) {
      targetWorkspaceId = ws.id;
    } else {
      // Create a default workspace if none exists
      const defaultWs = await prisma.workspace.create({
        data: {
          name: "Ruang Kerja Utama",
          user_id: user.id,
          color: "#7c3aed",
          icon: "LayoutDashboard"
        }
      });
      targetWorkspaceId = defaultWs.id;
    }
  }

  const note = await prisma.note.create({
    data: {
      title: "Catatan Baru",
      content: "",
      user_id: user.id,
      workspace_id: targetWorkspaceId,
      folder_id: folderId || null,
      status: "Ice Box"
    }
  });

  revalidatePath("/dashboard");
  redirect(`/notes/${note.id}`);
}

export async function updateNote(id: string, data: { title?: string; content?: string; status?: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const note = await prisma.note.update({
    where: { id, user_id: user.id },
    data
  });

  revalidatePath("/dashboard");
  revalidatePath(`/notes/${id}`);
  return note;
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await prisma.note.delete({
    where: { id, user_id: user.id }
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getNotes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  return await prisma.note.findMany({
    where: { user_id: user.id },
    orderBy: { updated_at: 'desc' }
  });
}
