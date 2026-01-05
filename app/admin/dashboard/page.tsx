import { supabase } from "@/lib/supabaseAuthClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to ThiranX</h1>
        <p className="text-gray-400">{user.email}</p>
      </div>
    </main>
  );
}
