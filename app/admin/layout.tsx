import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAILS = ["vijayvijaayyyy@gmail.com"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 Not logged in
  if (!user) {
    redirect("/login");
  }

  // 🔒 Logged in but NOT admin
  if (!ADMIN_EMAILS.includes(user.email!)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
