"use client";

import { createNote } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CreateNotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createNote(formData);

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
          <h1 className="form-title">📝 Buat Catatan Baru</h1>
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
              placeholder="Contoh: Ringkasan BAB 3 - Integral"
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
                placeholder="Contoh: Kalkulus"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <input
                id="semester"
                name="semester"
                type="text"
                placeholder="Contoh: Semester 3"
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
              placeholder="Tulis isi catatan kuliahmu di sini..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Lampiran (PDF, Gambar, dll.)</label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.ppt,.pptx"
              className="form-file"
            />
          </div>

          <div className="form-actions">
            <Link href="/notes" className="btn-cancel">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting ? "⏳ Menyimpan..." : "💾 Simpan Catatan"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
