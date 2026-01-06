"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseAuthClient";

const ADMIN_EMAILS = ["vijayvijaayyyy@gmail.com"];

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 🔒 Not logged in
      if (!user) {
        router.replace("/login");
        return;
      }

      // 🔒 Not admin
      if (!ADMIN_EMAILS.includes(user.email!)) {
        router.replace("/dashboard");
        return;
      }

      // ✅ Admin verified
      setChecking(false);
    };

    checkAdmin();
  }, [router]);

  // ⏳ Prevent redirect flash
  if (checking) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking admin access...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <a
        href="/admin/videos"
        className="inline-block border border-zinc-700 px-4 py-2 rounded hover:bg-zinc-900"
      >
        Manage Videos
      </a>
    </main>
  );
}
