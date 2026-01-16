import { supabase } from "@/lib/supabaseClient";

function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;

  try {
    // Already embed
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    // youtu.be short link
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      if (!id) return null;
      return `https://www.youtube.com/embed/${id}`;
    }

    // Normal watch URL
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");
    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}


export default async function InterestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const interestId = Number(id);

  // 1️⃣ Fetch interest
  const { data: interest } = await supabase
    .from("interests")
    .select("name, description")
    .eq("id", interestId)
    .single();

  // 2️⃣ Fetch mapped resources
  const { data: mappings } = await supabase
    .from("interest_resources")
    .select(`
      resources (
        id,
        title,
        youtube_url,
        level
      )
    `)
    .eq("interest_id", interestId);

const {
  data: { user },
} = await supabase.auth.getUser();

  const { data: progress } = await supabase
    .from("user_resource_progress")
    .select("resource_id, completed")
    .eq("user_id", user?.id);

    const progressMap = new Map(
    progress?.map(p => [p.resource_id, p.completed])
  );

  

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-2">
        {interest?.name}
      </h1>

      <p className="text-gray-400 mb-6">
        {interest?.description}
      </p>

      {/* EMPTY STATE */}
      {(!mappings || mappings.length === 0) && (
        <p className="text-gray-500">
          No resources added yet.
        </p>
      )}

      {/* VIDEOS */}
      <div className="space-y-8">
        {/* <pre className="text-xs text-gray-500">
  {JSON.stringify(mappings, null, 2)}
</pre> */}
          {mappings?.map((item: any) => {
            const r = item.resources;
            if (!r) return null;

            const embedUrl = getYouTubeEmbedUrl(r.youtube_url);
            if (!embedUrl) return null;

            return (
              <div
                key={r.id}
                className="border border-zinc-800 rounded p-4"
              >
                <h3 className="text-lg font-semibold">
                  {r.title}
                </h3>

                <span className="text-sm text-gray-400">
                  {r.level}
                </span>

                <div className="mt-4 aspect-video">
                  <iframe
                    className="w-full h-full rounded"
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          })}

      </div>
    </main>
  );
}
