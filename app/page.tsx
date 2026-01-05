import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function Home() {
  const { data: degrees } = await supabase
    .from("degrees")
    .select("*");

return (
  <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
    <div className="max-w-2xl w-full px-6 text-center space-y-6">

          {/* HERO TEXT */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      ThiranX
    </h1>

    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300">
      Skills that multiply careers
    </h2>

    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
      Structured skill pathways designed for your degree — curated from the best
      learning content and guided for real jobs.
    </p>


      {/* DEGREE BUTTONS */}
      <div className="mt-8 space-y-3">
        {degrees?.map((d) => (
          <a
            key={d.id}
            href={`/degree/${d.slug}`}
            className="block w-full bg-zinc-900 hover:bg-zinc-800 rounded-lg py-3 font-medium transition"
          >
            {d.name}
          </a>
        ))}
      </div>
    </div>
  </main>
);

}
