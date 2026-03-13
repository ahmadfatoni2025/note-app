"use client";

import { Note } from "@/lib/types";
import { deleteNote } from "../actions";
import Link from "next/link";
import { useState } from "react";

export default function NoteCard({ note }: { note: Note }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus catatan ini?")) return;
    setIsDeleting(true);

    const formData = new FormData();
    formData.append("id", note.id);
    await deleteNote(formData);
  };

  const formattedDate = new Date(note.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`note-card ${isDeleting ? "note-card-deleting" : ""}`}>
      {/* Card Header */}
      <div className="note-card-header">
        <div className="note-card-meta">
          {note.course_name && (
            <span className="note-badge course">{note.course_name}</span>
          )}
          {note.semester && (
            <span className="note-badge semester">{note.semester}</span>
          )}
        </div>
        <span className="note-date">{formattedDate}</span>
      </div>

      {/* Card Body */}
      <h3 className="note-card-title">{note.title}</h3>
      {note.content && (
        <p className="note-card-content">
          {note.content.length > 150
            ? note.content.substring(0, 150) + "..."
            : note.content}
        </p>
      )}

      {/* File attachment indicator */}
      {note.file_url && (
        <a
          href={note.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="note-attachment"
        >
          📎 Lihat Lampiran
        </a>
      )}

      {/* Card Actions */}
      <div className="note-card-actions">
        <Link href={`/notes/edit/${note.id}`} className="btn-edit">
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn-delete"
        >
          {isDeleting ? "⏳ Menghapus..." : "🗑️ Hapus"}
        </button>
      </div>
    </div>
  );
}
