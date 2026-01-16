import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function Home() {
  const { data: degrees } = await supabase
    .from("degrees")
    .select("*");
type ProgressRow = {
  completed: boolean;
  interest_resources: {
    interest_id: number;
    interests: {
      id: number;
      name: string;
    }[];
  }[];
};

return (
<div className="min-h-screen bg-black text-white">
  <div className="max-w-7xl mx-auto px-6 pt-24">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* LEFT: HERO */}
      <div>
        <h1 className="text-5xl font-bold mb-4">ThiranX</h1>

        <h2 className="text-2xl text-gray-300 mb-6">
          Skills that multiply careers
        </h2>

        <p className="text-gray-400 max-w-lg mb-8">
          Structured skill pathways designed for your degree — curated
          from the best learning content and guided for real jobs.
        </p>

        <div className="space-y-4">
          <button className="w-full py-4 rounded-lg bg-zinc-900 hover:bg-zinc-800">
            B.Tech Computer Science
          </button>

          <button className="w-full py-4 rounded-lg bg-zinc-900 hover:bg-zinc-800">
            B.Com
          </button>
        </div>
      </div>

      {/* RIGHT: INTEREST */}
      <div className="border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
        <h3 className="text-xl font-semibold mb-2">
          Explore by Interest
        </h3>

        <p className="text-gray-400 mb-4">
          Learn skills outside your degree and boost your career.
        </p>

        <div className="text-lg mb-4">
          Web Development · Finance · Data Analytics · Biology
        </div>

        <a
          href="/interests"
          className="text-blue-400 hover:underline"
        >
          Start learning →
        </a>
      </div>

      

    </div>
    
  </div>
  
</div>


);

}
