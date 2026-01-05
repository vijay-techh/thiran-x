"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <a href="/admin/videos">Manage Videos</a>
    </div>
  );
}
