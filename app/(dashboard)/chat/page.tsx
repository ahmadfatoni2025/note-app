import { MessageSquare, Sparkles, Brain, FileSearch, Zap } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-1 pt-1 pb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Asisten AI</h1>
        <p className="text-text-secondary text-sm mt-1">Tanyakan apa pun tentang catatan atau tugas Anda.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 text-center bg-bg-card rounded-2xl border border-border-main mx-0">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center border border-accent-purple/10">
            <Brain size={36} className="text-accent-purple" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-green rounded-full flex items-center justify-center animate-pulse">
            <Sparkles size={10} className="text-white" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-linear-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
          Asisten AI Segera Hadir
        </h3>
        <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
          Kami sedang membangun asisten cerdas untuk membantu Anda bekerja lebih produktif.
        </p>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg w-full">
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/2 border border-border-main/50">
            <MessageSquare size={18} className="text-accent-purple" />
            <span className="text-xs text-text-secondary font-medium">Chat Interaktif</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/2 border border-border-main/50">
            <FileSearch size={18} className="text-accent-blue" />
            <span className="text-xs text-text-secondary font-medium">Ringkas Catatan</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/2 border border-border-main/50">
            <Zap size={18} className="text-accent-orange" />
            <span className="text-xs text-text-secondary font-medium">Pencarian Cerdas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
