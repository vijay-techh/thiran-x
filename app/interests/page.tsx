import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function InterestsPage() {
  const { data: interests } = await supabase
    .from("interests")
    .select("id, name, category")
    .eq("is_active", true)
    .order("name");

  return (
    <div>
      <h1>Explore by Interest</h1>

      <div style={{ display: "grid", gap: "12px" }}>
        {interests?.map(i => (
          <Link key={i.id} href={`/interests/${i.id}`}>
            <div style={{ border: "1px solid #ddd", padding: "12px" }}>
              <h3>{i.name}</h3>
              <small>{i.category}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
  );
}
