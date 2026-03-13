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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon text-accent-purple"><BookOpen size={32} /></span>
            <h2>NotesPro</h2>
          </div>
          <h1>Buat akun baru</h1>
          <p>Mulai atur kehidupan akademik Anda hari ini</p>
        </div>

        {searchParams?.error && (
          <div className="auth-error">⚠️ {searchParams.error}</div>
        )}

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="full_name">Nama Lengkap</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Budi Santoso"
              required
            />
          </div>
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
              placeholder="Buat kata sandi yang kuat"
              required
              minLength={6}
            />
          </div>
          <button formAction={signup} className="btn-auth">
            Buat Akun
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '1.5rem' }}>
          Sudah punya akun? <Link href="/login">Masuk saja</Link>
        </p>
      </div>
    </div>
  );
}
