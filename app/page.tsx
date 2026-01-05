import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function Home() {
  const { data: degrees } = await supabase
    .from("degrees")
    .select("*");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
  <div className="max-w-xl text-center space-y-6">
    <h1 className="text-4xl font-bold">
      Learn Skills for Your Degree
    </h1>

    <p className="text-gray-400">
      Structured learning paths curated for college students.
    </p>

    <div className="space-y-3">
      {degrees?.map((d) => (
        <a
          key={d.id}
          href={`/degree/${d.slug}`}
          className="block w-full bg-zinc-900 hover:bg-zinc-800 rounded-lg py-3 font-medium"
        >
          {d.name}
        </a>
      ))}
    </div>
  </div>
</main>

  );
}
