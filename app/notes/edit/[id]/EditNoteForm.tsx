"use client";

import { updateNote } from "../../actions";
import { Note } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function EditNoteForm({ note }: { note: Note }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("id", note.id);
    const result = await updateNote(formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push("/notes");
    }
  };

  return (
    <main className="notes-page">
      <div className="form-container">
        <div className="form-header">
          <Link href="/notes" className="btn-back">
            ← Kembali
          </Link>
          <h1 className="form-title">✏️ Edit Catatan</h1>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label htmlFor="title">Judul Catatan *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={note.title}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="course_name">Mata Kuliah</label>
              <input
                id="course_name"
                name="course_name"
                type="text"
                defaultValue={note.course_name || ""}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <input
                id="semester"
                name="semester"
                type="text"
                defaultValue={note.semester || ""}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Isi Catatan</label>
            <textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={note.content || ""}
              className="form-textarea"
            />
          </div>

          {note.file_url && (
            <div className="form-group">
              <label>Lampiran Saat Ini</label>
              <a
                href={note.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="note-attachment"
              >
                📎 Lihat Lampiran
              </a>
            </div>
          )}

          <div className="form-actions">
            <Link href="/notes" className="btn-cancel">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting ? "⏳ Menyimpan..." : "💾 Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
