import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DegreePage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch degree
  const { data: degree, error: degreeError } = await supabase
    .from("degrees")
    .select("*")
    .eq("slug", slug)
    .single();

  if (degreeError || !degree) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Degree not found</h1>
        <p>Please check the URL.</p>
        <Link href="/">Go back</Link>
      </main>
    );
  }

  // Fetch areas + paths
  const { data: areas } = await supabase
    .from("career_areas")
    .select(`
      id,
      name,
      career_paths ( id, name, slug )
    `)
    .eq("degree_id", degree.id);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
  <h1 className="text-3xl font-bold mb-6">{degree.name}</h1>

  <div className="space-y-8">
    {areas?.map((area) => (
      <div key={area.id}>
        <h2 className="text-xl font-semibold mb-3">
          {area.name}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {area.career_paths.map((path) => (
            <a
              key={path.id}
              href={`/path/${path.slug}`}
              className="bg-zinc-900 hover:bg-zinc-800 rounded-lg p-4"
            >
              {path.name}
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
</main>

  );
}

<h1 className="text-green-500 text-4xl font-bold">
  Tailwind Fixed
</h1>

