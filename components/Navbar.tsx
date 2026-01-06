"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";
import { useRouter } from "next/navigation";


const ADMIN_EMAILS = ["vijayvijaayyyy@gmail.com"];

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return null;

  return (
    <header className="w-full border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="font-bold text-lg">
          ThiranX
        </a>

        {userEmail ? (
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-sm text-gray-300 hover:text-white"
            >
              Dashboard
            </a>

            <button
              onClick={handleLogout}
              className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
