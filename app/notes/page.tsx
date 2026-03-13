import { prisma } from "@/lib/prisma";
import { Note } from "@/lib/types";
import Link from "next/link";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NotesPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const course = searchParams.course as string | undefined;
  const q = searchParams.q as string | undefined;

  let notes: Note[] = [];
  let error: string | null = null;

  try {
    // Build Prisma query with optional filters
    notes = await prisma.note.findMany({
      where: {
        ...(course ? { course_name: course } : {}),
        ...(q
          ? {
            OR: [
              { title: { contains: q, mode: "insensitive" as const } },
              { content: { contains: q, mode: "insensitive" as const } },
            ],
          }
          : {}),
      },
      orderBy: { created_at: "desc" },
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch notes";
    notes = [];
  }

  // Get unique courses for the filter dropdown
  let courses: string[] = [];
  try {
    const allNotes = await prisma.note.findMany({
      select: { course_name: true },
      distinct: ["course_name"],
      where: { course_name: { not: null } },
    });
    courses = allNotes
      .map((n) => n.course_name)
      .filter((c): c is string => c !== null);
  } catch {
    // Ignore — courses dropdown will just be empty
  }

  return (
    <main className="notes-page">
      <div className="notes-container">
        {/* Header */}
        <div className="notes-header">
          <div>
            <h1 className="notes-title">📚 Catatan Kuliah</h1>
            <p className="notes-subtitle">
              Kelola semua catatan perkuliahanmu di satu tempat
            </p>
          </div>
          <Link href="/notes/create" className="btn-create">
            + Buat Catatan
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <SearchBar courses={courses} currentCourse={course} currentQuery={q} />

        {/* Error State */}
        {error && (
          <div className="error-banner">
            <p>Gagal memuat catatan: {error}</p>
            <p className="error-hint">
              Pastikan DATABASE_URL di .env.local sudah benar dan tabel
              &quot;notes&quot; sudah ada di database.
            </p>
          </div>
        )}

        {/* Notes Grid */}
        {!error && notes && notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h2>Belum ada catatan</h2>
              <p>
                {q || course
                  ? "Tidak ditemukan catatan yang cocok dengan filter."
                  : "Mulai buat catatan pertamamu!"}
              </p>
              {!q && !course && (
                <Link href="/notes/create" className="btn-create">
                  + Buat Catatan Pertama
                </Link>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}
