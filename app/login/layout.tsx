import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ If already logged in, block /login
  if (user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
