"use client";

import { useTransition } from "react";
import { createNote } from "@/app/notes/actions";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  ArrowRight,
  Briefcase,
  LayoutDashboard,
  FolderOpen,
  PieChart,
  FileText,
  Activity,
  Star,
  Clock,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string | null;
  status: string;
  updated_at: string;
  created_at: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  _count: { notes: number };
}

interface Folder {
  id: string;
  name: string;
  _count: { notes: number };
}

interface DashboardClientProps {
  notes: Note[];
  workspaces: Workspace[];
  folders: Folder[];
}

// Fallback icons if no icon is specified in the DB
const fallbackIcons = [Briefcase, LayoutDashboard, PieChart, Activity, FileText];

export default function DashboardClient({ notes, workspaces, folders }: DashboardClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleCreateNote = () => {
    startTransition(async () => {
      await createNote();
    });
  };

  const recentNotes = notes.slice(0, 4);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* 1. Header Area with Search */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">Beranda</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-bg-card border border-border-main rounded-xl px-3 py-2 w-full sm:w-auto">
            <Search size={14} className="text-text-muted" />
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-muted sm:w-48"
            />
            <kbd className="hidden sm:inline text-[10px] text-text-muted bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">⌘ F</kbd>
          </div>
          <button className="flex items-center justify-center bg-bg-card border border-border-main rounded-xl p-2 md:px-3 md:py-2 text-text-secondary hover:text-text-primary transition-colors h-10 w-10 md:w-auto">
            <Filter size={16} />
            <span className="hidden md:inline ml-2 text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* 2. ARSIP CATATAN (PALING ATAS & PENTING) */}
      <div className="flex flex-col gap-5 bg-gradient-to-b from-accent-purple/5 to-transparent p-6 rounded-3xl border border-accent-purple/20 shadow-lg shadow-accent-purple/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2.5">
              <div className="p-2 bg-accent-orange/10 rounded-lg">
                <Star className="text-accent-orange" size={22} fill="currentColor" />
              </div>
              Arsip Catatan Penting
            </h2>
            <p className="text-sm text-text-secondary mt-1.5">Akses cepat ke catatan terbaru Anda yang sedang aktif dikerjakan.</p>
          </div>
          <button
            onClick={handleCreateNote}
            disabled={isPending}
            className="flex items-center gap-2 hover:bg-accent-purple-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-md shadow-accent-purple/20 hover:scale-105 active:scale-95 shrink-0"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Buat Catatan Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {recentNotes.map((note) => (
            <div key={note.id} className="bg-bg-card border border-accent-purple/20 rounded-2xl p-5 hover:border-accent-purple/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-purple/10 transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-accent-purple" />
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 border border-border-main ${note.status === 'Completed' ? 'text-accent-green' :
                    note.status === 'In Progress' ? 'text-accent-orange' : 'text-text-muted'
                    }`}>
                    {note.status}
                  </span>
                </div>

                <Link href={`/notes/${note.id}`} className="block">
                  <h4 className="text-base font-bold text-text-primary group-hover:text-accent-purple transition-colors mb-2 line-clamp-1">
                    {note.title}
                  </h4>
                </Link>
                {note.content && (
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {note.content.replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-main/50">
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Clock size={12} />
                  <span className="text-[11px]">
                    {new Date(note.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <Link href={`/notes/${note.id}`} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-purple hover:text-white transition-colors group/btn">
                  <ArrowRight size={14} className="text-text-secondary group-hover/btn:text-white" />
                </Link>
              </div>
            </div>
          ))}

          {recentNotes.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-bg-card border border-dashed border-border-main rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                <FileText size={20} className="text-text-muted" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">Belum Ada Arsip Catatan</h3>
              <p className="text-sm text-text-secondary">Buat catatan baru untuk mulai mendokumentasikan pekerjaan Anda.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (Workspaces) */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">Docs / Ruang Kerja</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.map((ws, i) => {
                const Icon = fallbackIcons[i % fallbackIcons.length];
                const colorClasses = [
                  "text-accent-blue bg-accent-blue/10 border-accent-blue/20",
                  "text-accent-orange bg-accent-orange/10 border-accent-orange/20",
                  "text-accent-purple bg-accent-purple/10 border-accent-purple/20",
                  "text-accent-green bg-accent-green/10 border-accent-green/20"
                ];
                const cl = colorClasses[i % colorClasses.length];
                const [textColor, bgColor, borderColor] = cl.split(" ");

                return (
                  <div key={ws.id} className="bg-bg-card rounded-2xl p-5 border border-border-main hover:border-text-muted/30 transition-all duration-200 group flex flex-col justify-between min-h-[160px]">
                    <div>
                      <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border ${borderColor}`}>
                        <Icon size={16} className={textColor} />
                      </div>
                      <h3 className="text-base font-semibold mb-1.5 line-clamp-1">{ws.name}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
                        {ws.description || `${ws._count.notes} catatan tersimpan di ruang kerja ini.`}
                      </p>
                    </div>
                    <button className="self-start text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white transition-colors">
                      Connect
                    </button>
                  </div>
                );
              })}

              {workspaces.length === 0 && (
                <div className="bg-transparent rounded-2xl p-5 border-2 border-dashed border-border-main flex flex-col items-center justify-center min-h-[160px] text-text-muted">
                  <p className="text-sm font-medium">Belum ada Ruang Kerja</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">Folder & Shortcut</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {folders.map((folder) => (
                <Link key={folder.id} href={`#`} className="flex flex-col items-center gap-2 min-w-[100px] group">
                  <div className="w-16 h-[52px] bg-bg-card border border-border-main rounded-xl rounded-tr-sm relative flex items-center justify-center group-hover:-translate-y-1 group-hover:border-text-muted/30 transition-all duration-200">
                    <div className="absolute -top-1.5 left-0 w-8 h-2 bg-border-main rounded-t-xl group-hover:bg-text-muted/30 transition-colors" />
                    <FolderOpen size={18} className="text-text-muted group-hover:text-text-secondary transition-colors" />
                  </div>
                  <span className="text-xs text-text-secondary group-hover:text-text-primary text-center font-medium line-clamp-2 w-full leading-tight">
                    {folder.name}
                  </span>
                </Link>
              ))}

              {folders.length === 0 && (
                <div className="text-xs text-text-secondary flex items-center h-[52px]">
                  Kamu belum membuat folder di database.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (Data Visualizations / Analytics) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-text-primary">Statistik</h2>
          <div className="bg-bg-card rounded-2xl p-5 border border-border-main h-[220px] flex flex-col">
            <h3 className="text-sm font-semibold mb-4">Catatan Engagement Trend</h3>
            <div className="flex-1 flex items-end justify-between gap-1 w-full pt-4">
              {[4, 7, 3, 8, 5, 9, 6, 12, 8, 14].map((v, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full flex-1 group">
                  <div
                    className="w-full bg-border-main group-hover:bg-accent-purple transition-colors rounded-t-sm"
                    style={{ height: `${(v / 14) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-card rounded-2xl p-5 border border-border-main h-[220px] flex flex-col items-center justify-center relative mt-2">
            <h3 className="text-sm font-semibold absolute top-5 left-5">Proporsi Status</h3>
            <div className="w-24 h-24 rounded-full border-[12px] border-border-main border-r-accent-purple border-t-accent-blue rotate-45" />
          </div>
        </div>

      </div>
    </div>
  );
}
