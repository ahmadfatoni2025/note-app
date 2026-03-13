export default function ChatPage() {
  return (
    <div className="flex flex-col h-full bg-main">
      <div className="p-4 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Asisten AI</h1>
        <p className="text-secondary text-xs sm:text-sm">Tanyakan apa pun tentang catatan atau tugas Anda.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 text-center bg-card mx-4 sm:mx-8 mb-4 sm:mb-8 rounded-lg border border-color">
        <div className="text-4xl sm:text-5xl mb-4">🤖</div>
        <h3 className="text-lg sm:text-xl font-bold mb-2">Asisten AI Segera Hadir</h3>
        <p className="text-secondary text-sm sm:text-base max-w-md">Kami sedang membangun asisten cerdas untuk membantu Anda merangkum catatan dan mengelola tugas dengan bahasa alami.</p>
      </div>
    </div>
  );
}
