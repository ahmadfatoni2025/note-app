"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, 
  FolderPlus, 
  Briefcase, 
  LayoutDashboard, 
  Settings, 
  Search,
  MessageSquare,
  Bell,
  LogOut,
  Hash,
  Menu,
  X,
  BookOpen
} from "lucide-react";
import { logout } from "../auth/actions";
import { createNote } from "../notes/actions";
import { useTransition, useState } from "react";
import { Plus, StickyNote } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
}

interface User {
  id: string;
  email: string;
  full_name?: string | null;
}

interface Note {
  id: string;
  title: string;
}

export default function DashboardContent({
  children,
  dbUser,
  user
}: {
  children: React.ReactNode;
  dbUser: any;
  user: User;
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = dbUser?.full_name || user?.email?.split("@")[0] || "Pengguna";

  const handleNewNote = () => {
    startTransition(async () => {
      await createNote();
    });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-main text-text-primary">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-bg-sidebar border-r border-border-main flex flex-col p-6 shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 flex items-center justify-center bg-accent-purple text-white rounded-lg">
            <BookOpen size={18} />
          </div>
          <h2 className="flex-1 text-base font-bold tracking-tight">NotesPro</h2>
          <button 
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <button 
          onClick={handleNewNote}
          disabled={isPending}
          className="w-full py-2.5 px-4 mb-8 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <Plus size={18} /> {isPending ? "Memuat..." : "Catatan Baru"}
        </button>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold mb-2 px-2">Menu Utama</div>
            <Link 
              href="/dashboard" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/dashboard' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
            >
              <Home size={18} /> Ringkasan
            </Link>
            <Link 
              href="/workspaces" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/workspaces' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
            >
              <Briefcase size={18} /> Ruang Kerja
            </Link>
            <Link 
              href="/chat" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/chat' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
            >
              <MessageSquare size={18} /> Asisten AI
            </Link>
          </div>

          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold mb-2 px-2">Catatan Terbaru</div>
            {dbUser?.notes?.slice(0, 5).map((note: Note) => (
              <Link 
                key={note.id} 
                href={`/notes/${note.id}`} 
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === `/notes/${note.id}` ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
              >
                <StickyNote size={18} /> 
                <span className="truncate flex-1">{note.title}</span>
              </Link>
            ))}
          </div>

          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold mb-2 px-2">Ruang Kerja</div>
            {dbUser?.workspaces.map((ws: Workspace) => (
              <Link 
                key={ws.id} 
                href={`/workspaces/${ws.id}`} 
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === `/workspaces/${ws.id}` ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
              >
                <LayoutDashboard size={18} /> 
                <span className="truncate flex-1">{ws.name}</span>
              </Link>
            ))}
            <Link 
              href="/workspaces/new" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 text-text-secondary hover:bg-white/5 hover:text-text-primary`}
            >
              <FolderPlus size={18} /> Tambah Ruang Kerja
            </Link>
          </div>

          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold mb-2 px-2">Tag</div>
            <Link 
              href="/tags/important" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/tags/important' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
            >
              <Hash size={18} /> Penting 
              <span className="ml-auto bg-red-500 text-white text-[10px] py-[2px] px-[6px] rounded-full font-bold">2</span>
            </Link>
            <Link 
              href="/tags/study" 
              onClick={() => setIsSidebarOpen(false)} 
              className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/tags/study' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
            >
              <Hash size={18} /> Belajar
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-border-main mt-auto">
          <form action={logout}>
            <button 
              type="submit" 
              className="w-full flex items-center gap-3 p-[10px] rounded-md text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-white/5 hover:text-text-primary cursor-pointer text-left outline-none"
            >
              <LogOut size={18} /> Keluar
            </button>
          </form>
          <Link 
            href="/settings" 
            onClick={() => setIsSidebarOpen(false)} 
            className={`flex items-center gap-3 p-[10px] rounded-md text-sm font-medium transition-all duration-200 mb-1 ${pathname === '/settings' ? 'bg-accent-purple/10 text-accent-purple' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
          >
            <Settings size={18} /> Pengaturan
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[70px] flex items-center justify-between px-6 md:px-8 gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-bg-card text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all shadow-sm" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block flex-1 max-w-[400px] relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Cari catatan, file, atau tag..." 
                className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-border-main rounded-xl text-text-primary text-sm outline-none transition-all focus:ring-2 focus:ring-accent-purple/30"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full bg-bg-card text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all shadow-sm">
              <Search size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-card text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all shadow-sm">
              <MessageSquare size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-card text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all shadow-sm">
              <Bell size={18} />
            </button>
            <div 
              className="w-8 h-8 rounded-full bg-accent-orange text-white flex items-center justify-center font-bold text-sm ml-2 shrink-0 cursor-help" 
              title={userName}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
