"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email);
        window.history.replaceState(null, "", "/dashboard");

      }
    };

    getUser();
  }, [router]);

  if (!email) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to ThiranX</h1>
        <p className="text-gray-400">{email}</p>
      </div>
    </main>
  );
}
