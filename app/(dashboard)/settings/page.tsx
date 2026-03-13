import { User, Palette, Globe, Shield, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="px-1 pt-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-text-secondary text-sm mt-1">Sesuaikan preferensi akun dan tampilan aplikasi Anda.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-bg-card rounded-xl border border-border-main overflow-hidden">
        <div className="px-5 py-4 border-b border-border-main/50 flex items-center gap-3">
          <User size={16} className="text-accent-purple" />
          <h3 className="text-sm font-semibold">Profil Pengguna</h3>
        </div>
        <div className="divide-y divide-border-main/40">
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors">
            <span className="text-sm text-text-secondary">Nama</span>
            <span className="text-sm font-medium">—</span>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors">
            <span className="text-sm text-text-secondary">Email</span>
            <span className="text-sm font-medium">—</span>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-bg-card rounded-xl border border-border-main overflow-hidden">
        <div className="px-5 py-4 border-b border-border-main/50 flex items-center gap-3">
          <Palette size={16} className="text-accent-orange" />
          <h3 className="text-sm font-semibold">Tampilan</h3>
        </div>
        <div className="divide-y divide-border-main/40">
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors cursor-pointer group">
            <span className="text-sm text-text-secondary">Tema Tampilan</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-accent-purple">Gelap</span>
              <ChevronRight size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors cursor-pointer group">
            <span className="text-sm text-text-secondary">Bahasa</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Bahasa Indonesia</span>
              <ChevronRight size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-bg-card rounded-xl border border-border-main overflow-hidden">
        <div className="px-5 py-4 border-b border-border-main/50 flex items-center gap-3">
          <Shield size={16} className="text-accent-green" />
          <h3 className="text-sm font-semibold">Keamanan</h3>
        </div>
        <div className="divide-y divide-border-main/40">
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors cursor-pointer group">
            <span className="text-sm text-text-secondary">Ubah Kata Sandi</span>
            <ChevronRight size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/1.5 transition-colors cursor-pointer group">
            <span className="text-sm text-text-secondary">Sesi Aktif</span>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-accent-green/10 text-accent-green px-2 py-0.5 rounded-full font-medium">1 Aktif</span>
              <ChevronRight size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
