"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = ["vijayvijaayyyyy@gmail.com"];

export default function Navbar() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
      setLoading(false);
    });

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

  const isAdmin = userEmail && ADMIN_EMAILS.includes(userEmail);

  return (
    <header className="w-full border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="font-bold text-lg"
        >
          ThiranX
        </button>

        {userEmail ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-gray-300 hover:text-white"
            >
              Dashboard
            </button>

            {isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className="text-sm text-yellow-400 hover:text-yellow-300"
              >
                Admin
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
