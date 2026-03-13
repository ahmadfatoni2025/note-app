"use client";

import { useState, useEffect, useCallback } from "react";
import { updateNote, deleteNote } from "../actions";
import dynamic from "next/dynamic";
import { ChevronLeft, Trash2, Clock, Globe, Share2, StickyNote, Search, Bell } from "lucide-react";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string | null;
  updated_at: Date | string;
  status: string;
}

interface NoteEditorProps {
  initialNote: any; // Using any for initial prop to avoid strict Prisma type issues
}

export default function NoteEditor({ initialNote }: NoteEditorProps) {
  const [note, setNote] = useState<Note>(initialNote);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date(initialNote.updated_at));
  const router = useRouter();

  // Debounced auto-save logic
  useEffect(() => {
    if (note.title === initialNote.title && note.content === initialNote.content) return;

    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateNote(note.id, {
          title: note.title,
          content: note.content || ""
        });
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to auto-save:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [note.title, note.content, note.id, initialNote.title, initialNote.content]);

  const onContentChange = (content: string) => {
    setNote((prev: Note) => ({ ...prev, content }));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNote((prev: Note) => ({ ...prev, title }));
  };

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      await deleteNote(note.id);
    }
  };

  return (
    <div className="flex h-screen bg-bg-main text-text-primary overflow-hidden font-sans">
      {/* Navigation and Layout handled by Tailwind classes */}


      {/* 1. Simplified Left Navigation */}
      <aside className="w-64 border-r border-border-main bg-bg-sidebar flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-3 font-bold text-base border-b border-border-main/50">
          <div className="w-6 h-6 bg-accent-purple rounded-lg flex items-center justify-center text-[11px] text-white shadow-lg shadow-purple-500/20">N</div>
          NotesPro
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[14px] font-medium text-text-secondary hover:bg-white/5 hover:text-white transition-all cursor-pointer">
            <ChevronLeft size={16} /> 
            <span>Dashboard</span>
          </Link>
          <div className="h-px bg-border-main my-4 mx-2" />
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[14px] font-medium text-white bg-white/5 cursor-default">
            <StickyNote size={16} className="text-accent-purple" /> 
            <span className="truncate">{note.title || "Catatan Saat Ini"}</span>
          </div>
        </div>
        
        <div className="p-4 border-t border-border-main/50">
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[14px] font-medium w-full text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
             <Trash2 size={16} /> <span>Hapus Catatan</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-bg-main">
        {/* Top Header */}
        <header className="h-14 border-b border-border-main/50 flex items-center justify-between px-6 bg-bg-main/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-2 text-[13px] font-medium text-text-secondary">
            <span className="hover:text-white cursor-pointer transition-colors">Workspace</span>
            <span className="opacity-30">/</span>
            <span className="text-white/80 truncate max-w-[150px]">{note.title || "Untitled"}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              {isSaving ? (
                <span className="flex items-center gap-2 text-accent-purple">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" /> Saving...
                </span>
              ) : (
                <span className="opacity-40 tracking-wider">Saved</span>
              )}
            </div>
            
            <div className="w-px h-4 bg-border-main" />
            
            <button className="p-2 text-text-secondary hover:text-white transition-colors" title="Share">
              <Share2 size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-card text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all shadow-sm md:hidden" onClick={() => router.push('/dashboard')}>
              <ChevronLeft size={20} />
            </button>
          </div>
        </header>

        {/* Editor Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar-hide">
          <div className="max-w-3xl mx-auto py-16 sm:py-24 px-6 sm:px-12">
            {/* Minimalist Title */}
            <h1 className="mb-12">
               <input
                type="text"
                value={note.title}
                onChange={onTitleChange}
                className="w-full bg-transparent border-none text-4xl sm:text-5xl font-bold tracking-tight placeholder:text-white/10 focus:outline-none focus:ring-0 text-white"
                placeholder="Judul Catatan..."
              />
            </h1>

            <div className="prose-container">
              <Editor
                content={note.content || ""}
                onChange={onContentChange}
                placeholder="Mulai menulis kisah hebat Anda..."
              />
            </div>
          </div>

          {/* Minimalist AI Floating Bar */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-40">
            <div className="bg-bg-card/90 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-2 flex items-center gap-3 ring-1 ring-white/5 ring-inset">
              <div className="w-9 h-9 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple shrink-0">
                 <Globe size={18} />
              </div>
              <input 
                 type="text" 
                 placeholder="Tanya AI..." 
                 className="flex-1 bg-transparent border-none outline-none text-[14px] placeholder:text-white/20 py-2"
              />
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/20 uppercase tracking-widest pr-2">
                 <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5">⌘</kbd>
                 <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5">K</kbd>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
