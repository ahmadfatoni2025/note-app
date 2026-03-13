export default function WorkspacesPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold">Ruang Kerja Anda</h1>
      <p className="text-secondary text-xs sm:text-sm">Kelola semua ruang kerja dan proyek Anda di sini.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="task-card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Ruang Kerja Utama</h3>
          <p className="text-secondary text-xs sm:text-sm mb-4">Ruang kerja default untuk catatan pribadi Anda.</p>
          <div className="flex justify-end">
            <button className="btn-auth py-2 px-4 text-xs w-auto">Buka</button>
          </div>
        </div>
      </div>
    </div>
  );
}
