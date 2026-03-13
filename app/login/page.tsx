import Link from "next/link";
import { login } from "../auth/actions";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
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
          <h1 className="text-2xl font-bold text-text-primary mb-2">Selamat datang kembali</h1>
          <p className="text-text-secondary text-sm">Masukkan kredensial Anda untuk mengakses ruang kerja Anda</p>
        </div>

        {searchParams?.error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm mb-6 text-center">{searchParams.error}</div>
        )}

        <form className="space-y-5">
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
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-white text-gray-900 border border-border-main rounded-lg text-sm outline-none transition-all focus:border-accent-purple focus:ring-4 focus:ring-accent-purple/10 placeholder:text-gray-400"
            />
            <div className="text-right mt-1">
              <Link href="#" className="text-xs text-accent-purple hover:underline">Lupa kata sandi?</Link>
            </div>
          </div>
          <button formAction={login} className="w-full py-3 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-md text-base font-semibold cursor-pointer transition-colors mt-2">
            Masuk
          </button>
        </form>

        <div className="flex items-center my-6 before:flex-1 before:border-b before:border-border-main after:flex-1 after:border-b after:border-border-main">
          <span className="px-3 text-text-secondary text-xs font-medium">ATAU</span>
        </div>

        <button className="w-full py-3 bg-white text-[#1a1a1a] border border-border-main rounded-md text-[15px] font-medium cursor-pointer flex items-center justify-center gap-3 transition-all hover:bg-gray-50 hover:border-gray-300">
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
          Lanjutkan dengan Google
        </button>

        <p className="text-center mt-6 text-sm text-text-secondary">
          Belum punya akun? <Link href="/signup" className="text-accent-purple font-semibold hover:underline">Daftar gratis</Link>
        </p>
      </div>
    </div>
  );
}
