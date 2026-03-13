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
    <div className="dashboard-container">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="kanban-icon" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-purple)', color: 'white', borderRadius: '8px' }}>
            <BookOpen size={18} />
          </div>
          <h2 className="flex-1">NotesPro</h2>
          <button 
            className="lg:hidden action-icon" 
            onClick={() => setIsSidebarOpen(false)}
            style={{ width: 32, height: 32 }}
          >
            <X size={18} />
          </button>
        </div>

        <button 
          onClick={handleNewNote}
          disabled={isPending}
          className="btn-auth py-2 px-4 mb-6 flex items-center justify-center gap-2"
          style={{ width: '100%', borderRadius: '12px' }}
        >
          <Plus size={18} /> {isPending ? "Memuat..." : "Catatan Baru"}
        </button>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="nav-section">
            <div className="nav-section-title">Menu Utama</div>
            <Link href="/dashboard" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
              <Home size={18} /> Ringkasan
            </Link>
            <Link href="/workspaces" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/workspaces' ? 'active' : ''}`}>
              <Briefcase size={18} /> Ruang Kerja
            </Link>
            <Link href="/chat" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/chat' ? 'active' : ''}`}>
              <MessageSquare size={18} /> Asisten AI
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Catatan Terbaru</div>
            {dbUser?.notes?.slice(0, 5).map((note: Note) => (
              <Link key={note.id} href={`/notes/${note.id}`} onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === `/notes/${note.id}` ? 'active' : ''}`}>
                <StickyNote size={18} /> {note.title}
              </Link>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Ruang Kerja</div>
            {dbUser?.workspaces.map((ws: Workspace) => (
              <Link key={ws.id} href={`/workspaces/${ws.id}`} onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === `/workspaces/${ws.id}` ? 'active' : ''}`}>
                <LayoutDashboard size={18} /> {ws.name}
              </Link>
            ))}
            <Link href="/workspaces/new" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/workspaces/new' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)' }}>
              <FolderPlus size={18} /> Tambah Ruang Kerja
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Tag</div>
            <Link href="/tags/important" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/tags/important' ? 'active' : ''}`}>
              <Hash size={18} /> Penting <span className="nav-badge">2</span>
            </Link>
            <Link href="/tags/study" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/tags/study' ? 'active' : ''}`}>
              <Hash size={18} /> Belajar
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-color mt-auto">
          <form action={logout}>
            <button type="submit" className="nav-item" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}>
              <LogOut size={18} /> Keluar
            </button>
          </form>
          <Link href="/settings" onClick={() => setIsSidebarOpen(false)} className={`nav-item ${pathname === '/settings' ? 'active' : ''}`}>
            <Settings size={18} /> Pengaturan
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-wrapper">
        <header className="topbar">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden action-icon" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <div className="topbar-search hidden sm:block">
              <Search size={16} />
              <input type="text" placeholder="Cari catatan, file, atau tag..." />
            </div>
          </div>
          
          <div className="topbar-actions">
            <button className="sm:hidden action-icon">
              <Search size={18} />
            </button>
            <button className="action-icon">
              <MessageSquare size={18} />
            </button>
            <button className="action-icon">
              <Bell size={18} />
            </button>
            <div className="avatar ml-2 hidden xs:flex" title={userName}>
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="main-content">
          {children}
        </div>
      </main>
    </div>
  );
}
