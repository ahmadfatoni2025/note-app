import { Briefcase, FolderPlus, ArrowRight, FileText } from "lucide-react";

export default function WorkspacesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-1 pt-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Ruang Kerja Anda</h1>
        <p className="text-text-secondary text-sm mt-1">Kelola semua ruang kerja dan proyek Anda di sini.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Workspace Card */}
        <div className="bg-bg-card rounded-xl p-5 sm:p-6 border border-border-main hover:border-accent-purple/40 transition-all duration-200 group">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center shrink-0 group-hover:bg-accent-purple/20 transition-colors">
              <Briefcase size={18} className="text-accent-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold mb-1 truncate">Ruang Kerja Utama</h3>
              <p className="text-text-secondary text-xs leading-relaxed">Ruang kerja default untuk catatan pribadi Anda.</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border-main/50">
            <div className="flex items-center gap-1.5 text-text-muted">
              <FileText size={12} />
              <span className="text-xs">0 catatan</span>
            </div>
            <button className="flex items-center gap-1.5 py-1.5 px-4 bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple rounded-lg text-xs font-semibold transition-colors">
              Buka <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Add Workspace Card */}
        <button className="flex flex-col items-center justify-center gap-3 bg-transparent rounded-xl p-6 border-2 border-dashed border-border-main hover:border-accent-purple/40 hover:bg-white/1 transition-all duration-200 min-h-[160px] cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent-purple/10 transition-colors">
            <FolderPlus size={18} className="text-text-muted group-hover:text-accent-purple transition-colors" />
          </div>
          <span className="text-sm text-text-muted group-hover:text-text-secondary font-medium transition-colors">Tambah Ruang Kerja</span>
        </button>
      </div>
    </div>
  );
}
