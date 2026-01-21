import Link from "next/link";

export default async function Home() {
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
              Structured skill pathways curated from the best learning
              content — focused on real jobs, real skills, and real growth.
            </p>

            <div className="space-y-4">
              <Link
                href="/path"
                className="block w-full py-4 text-center rounded-lg bg-zinc-900 hover:bg-zinc-800"
              >
                Explore Skill Paths
              </Link>

              <Link
                href="/interests"
                className="block w-full py-4 text-center rounded-lg bg-zinc-900 hover:bg-zinc-800"
              >
                Learn by Interest
              </Link>
            </div>
          </div>

          {/* RIGHT: INTEREST CARD */}
          <div className="border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
            <h3 className="text-xl font-semibold mb-2">
              Learn what actually matters
            </h3>

            <p className="text-gray-400 mb-4">
              Build in-demand skills at your own pace — no degree barriers,
              no unnecessary theory.
            </p>

            <div className="text-lg mb-4 text-gray-300">
              Web Development · Data Analytics · Finance · AI · Biology
            </div>

            <Link
              href="/interests"
              className="text-blue-400 hover:underline"
            >
              Start learning →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
