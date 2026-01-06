import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → redirect
  if (!user) {
    redirect("/login");
  }

  // ✅ MUST return JSX
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}
