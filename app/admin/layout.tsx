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
      }
    };

    checkAdmin();
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <a
        href="/admin/videos"
        className="inline-block border px-6 py-3 rounded-lg hover:bg-zinc-900"
      >
        Manage Videos
      </a>
    </div>
  );
}
