"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseAuthClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // 🔐 AUTO-REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-bold">Login to ThiranX</h1>

        {sent ? (
          <p className="text-gray-400">
            We’ve sent a login link to your email.
            <br />
            Please check your inbox.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Login Link"}
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </>
        )}

        <p className="text-xs text-gray-500">
          No password required. Login via email.
        </p>
      </div>
    </main>
  );
}
