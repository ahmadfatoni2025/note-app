import Link from "next/link";
import { signup } from "../auth/actions";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  
  // If already logged in, redirect to dashboard
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,#1a1a1a,#0a0a0a)]">
      <div className="w-full max-w-[440px] p-10 md:p-12 bg-bg-card rounded-lg border border-border-main shadow-main-lg transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-accent-purple"><BookOpen size={32} /></span>
            <h2 className="text-xl font-bold text-text-primary">NotesPro</h2>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Buat akun baru</h1>
          <p className="text-text-secondary text-sm">Mulai atur kehidupan akademik Anda hari ini</p>
        </div>

        {searchParams?.error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm mb-6 text-center">⚠️ {searchParams.error}</div>
        )}

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="full_name" className="block text-xs font-semibold text-text-primary">Nama Lengkap</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Budi Santoso"
              required
              className="w-full px-4 py-3 bg-white text-gray-900 border border-border-main rounded-lg text-sm outline-none transition-all focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold text-text-primary">Alamat Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nama@universitas.ac.id"
              required
              className="w-full px-4 py-3 bg-white text-gray-900 border border-border-main rounded-lg text-sm outline-none transition-all focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-semibold text-text-primary">Kata Sandi</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Buat kata sandi yang kuat"
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-border-main rounded-lg text-sm outline-none transition-all focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 placeholder:text-gray-400"
            />
          </div>
          <button formAction={signup} className="w-full py-3 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-md text-base font-semibold cursor-pointer transition-colors mt-2">
            Buat Akun
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-text-secondary">
          Sudah punya akun? <Link href="/login" className="text-accent-purple font-semibold hover:underline">Masuk saja</Link>
        </p>
      </div>
    </div>
  );
}
