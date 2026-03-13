export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold">Pengaturan</h1>
      <p className="text-secondary text-xs sm:text-sm">Sesuaikan preferensi akun dan tampilan aplikasi Anda.</p>
      
      <div className="task-card max-w-2xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Profil Pengguna</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-color py-3 sm:py-2 gap-1">
            <span className="text-sm">Tema Tampilan</span>
            <span className="text-sm font-medium text-accent-purple">Gelap (Default)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-color py-3 sm:py-2 gap-1">
            <span className="text-sm">Bahasa</span>
            <span className="text-sm">Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
