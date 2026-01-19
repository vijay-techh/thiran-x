import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource_id } = await req.json();

  await supabase
    .from("user_resource_progress")
    .upsert({
      user_id: user.id,
      resource_id,
      completed: true,
      completed_at: new Date().toISOString(),
    });

  return NextResponse.json({ success: true });
}
