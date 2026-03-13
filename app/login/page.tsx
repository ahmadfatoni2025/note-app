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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon text-accent-purple"><BookOpen size={32} /></span>
            <h2>NotesPro</h2>
          </div>
          <h1>Selamat datang kembali</h1>
          <p>Masukkan kredensial Anda untuk mengakses ruang kerja Anda</p>
        </div>

        {searchParams?.error && (
          <div className="auth-error">{searchParams.error}</div>
        )}

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Alamat Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nama@universitas.ac.id"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <div className="forgot-password">
              <Link href="#">Lupa kata sandi?</Link>
            </div>
          </div>
          <button formAction={login} className="btn-auth">
            Masuk
          </button>
        </form>

        <div className="auth-divider">
          <span>ATAU</span>
        </div>

        <button className="btn-oauth">
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
          Lanjutkan dengan Google
        </button>

        <p className="auth-footer">
          Belum punya akun? <Link href="/signup">Daftar gratis</Link>
        </p>
      </div>
    </div>
  );
}
