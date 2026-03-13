"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

// ==================== CREATE ====================
export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const course_name = formData.get("course_name") as string;
  const semester = formData.get("semester") as string;
  const file = formData.get("file") as File | null;

  let file_url: string | null = null;

  // Upload file to Supabase Storage if provided
  if (file && file.size > 0) {
    try {
      const supabase = await createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("note-attachments")
        .upload(fileName, file);

      if (uploadError) {
        return { error: `File upload failed: ${uploadError.message}` };
      }

      const { data: urlData } = supabase.storage
        .from("note-attachments")
        .getPublicUrl(fileName);

      file_url = urlData.publicUrl;
    } catch {
      return { error: "File upload failed" };
    }
  }

  try {
    await prisma.note.create({
      data: {
        title,
        content: content || null,
        course_name: course_name || null,
        semester: semester || null,
        file_url,
      },
    });
  } catch (error) {
    return { error: `Failed to create note: ${error instanceof Error ? error.message : "Unknown error"}` };
  }

  revalidatePath("/notes");
  return { success: true };
}

// ==================== UPDATE ====================
export async function updateNote(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const course_name = formData.get("course_name") as string;
  const semester = formData.get("semester") as string;

  try {
    await prisma.note.update({
      where: { id },
      data: {
        title,
        content: content || null,
        course_name: course_name || null,
        semester: semester || null,
      },
    });
  } catch (error) {
    return { error: `Failed to update note: ${error instanceof Error ? error.message : "Unknown error"}` };
  }

  revalidatePath("/notes");
  return { success: true };
}

// ==================== DELETE ====================
export async function deleteNote(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    // Get the note first to check for attached file
    const note = await prisma.note.findUnique({
      where: { id },
      select: { file_url: true },
    });

    // Delete the attached file from Supabase Storage if it exists
    if (note?.file_url) {
      try {
        const supabase = await createClient();
        const fileName = note.file_url.split("/").pop();
        if (fileName) {
          await supabase.storage.from("note-attachments").remove([fileName]);
        }
      } catch {
        // Storage cleanup failure shouldn't block note deletion
      }
    }

    // Delete the note from the database
    await prisma.note.delete({
      where: { id },
    });
  } catch (error) {
    return { error: `Failed to delete note: ${error instanceof Error ? error.message : "Unknown error"}` };
  }

  revalidatePath("/notes");
  return { success: true };
}
