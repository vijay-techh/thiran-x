"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      },
    });

    if (error) setError(error.message);
    else setSent(true);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-bold">Login to ThiranX</h1>

        {sent ? (
          <p className="text-gray-400">
            Check your email for the login link.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send Login Link"}
            </button>

            {error && <p className="text-red-400">{error}</p>}
          </>
        )}
      </div>
    </main>
  );
}
