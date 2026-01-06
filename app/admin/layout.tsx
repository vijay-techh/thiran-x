"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseAuthClient";

const ADMIN_EMAILS = ["vijayvijaayyyyy@gmail.com"];

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!ADMIN_EMAILS.includes(user.email!)) {
        router.replace("/dashboard");
        return;
      }
    };

    checkAdmin();
  }, [router]);

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
