import { MessageSquare, MoreVertical, Paperclip, Clock, StickyNote, Plus, BarChart3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  const columns = [
    { title: "Kotak Es", status: "Ice Box" },
    { title: "Sedang Dikerjakan", status: "In Progress" },
    { title: "Diskusi", status: "Discussion" },
    { title: "Selesai", status: "Completed" },
  ];

  return (
    <div>
      <div className="kanban-header">
        <div className="kanban-title-bar">
          <div className="kanban-title">
            <div className="kanban-icon"><BarChart3 size={24} /></div>
            <div>
              <h1>Ringkasan Catatan & Tugas</h1>
              <div className="kanban-meta">
                <span>Total {notes.length} Catatan</span>
              </div>
            </div>
          </div>
          
          <div className="kanban-tabs">
            <button className="kanban-tab active">Papan</button>
            <button className="kanban-tab">Daftar</button>
            <button className="kanban-tab">Kalender</button>
          </div>
        </div>
      </div>

      <div className="board-container">
        {columns.map((col) => {
          const colNotes = notes.filter(n => n.status === col.status);
          return (
            <div key={col.status} className="board-column">
              <div className="column-header">
                <div className="column-title">
                  {col.title} <span className="column-badge">{colNotes.length}</span>
                </div>
                <button className="column-add" title="Tambah Catatan">+</button>
              </div>

              <div className="flex flex-col gap-3">
                {colNotes.map((note) => (
                  <Link key={note.id} href={`/notes/${note.id}`} className="task-card block hover:no-underline">
                    <div className="task-header mb-2">
                      <h3 className="task-title flex items-center gap-2">
                        <StickyNote size={14} className="text-secondary" />
                        {note.title}
                      </h3>
                      <MoreVertical size={16} className="text-muted" />
                    </div>
                    {note.content && (
                      <p className="task-desc line-clamp-2 text-xs mb-3">
                        {note.content.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    <div className="task-footer mt-auto">
                      <div className="task-meta">
                        <span><Clock size={12} /> {new Date(note.updated_at).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {colNotes.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-color rounded-lg opacity-20">
                    <p className="text-[10px] uppercase font-bold tracking-widest">Kosong</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
