import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function Dashboard() {
const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // user is GUARANTEED here because layout protected it

  const { data: progress } = await supabase
    .from("user_resource_progress")
    .select(`
      completed,
      interest_resources (
        interest_id,
        interests (
          id,
          name
        )
      )
    `)
    .eq("user_id", user!.id);

  const interestMap = new Map<
    number,
    { name: string; total: number; completed: number }
  >();
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

progress?.forEach((p: ProgressRow) => {
  const ir = p.interest_resources?.[0];
  if (!ir) return;

  const interest = ir.interests?.[0];
  if (!interest) return;

  if (!interestMap.has(ir.interest_id)) {
    interestMap.set(ir.interest_id, {
      name: interest.name,
      total: 0,
      completed: 0,
    });
  }

  const entry = interestMap.get(ir.interest_id)!;
  entry.total += 1;
  if (p.completed) entry.completed += 1;
});


  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user!.email}
      </h1>

      {interestMap.size === 0 && (
        <p className="text-gray-400">
          You haven’t started learning yet.
        </p>
      )}

      <div className="space-y-6">
        {[...interestMap.entries()].map(([id, i]) => {
          const percent = Math.round((i.completed / i.total) * 100);

          return (
            <Link
              key={id}
              href={`/interests/${id}`}
              className="block border border-zinc-800 p-4 rounded hover:bg-zinc-900"
            >
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">{i.name}</h2>
                <span className="text-sm text-gray-400">
                  {i.completed}/{i.total}
                </span>
              </div>

              <div className="h-2 bg-zinc-800 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
