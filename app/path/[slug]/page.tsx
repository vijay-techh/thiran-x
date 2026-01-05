import { supabase } from "@/lib/supabaseClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CareerPathPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: path } = await supabase
    .from("career_paths")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!path) {
    return <p>Career path not found</p>;
  }

        function getYouTubeId(url: string) {
      try {
        const parsed = new URL(url);

        // Standard YouTube URL
        if (parsed.hostname.includes("youtube.com")) {
          return parsed.searchParams.get("v");
        }

        // Short URL youtu.be
        if (parsed.hostname.includes("youtu.be")) {
          return parsed.pathname.substring(1);
        }

        return null;
      } catch {
        return null;
      }
    }

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .eq("career_path_id", path.id)
    .order("level", { ascending: true })
    .order("order_no", { ascending: true });

  const grouped = {
    beginner: videos?.filter(v => v.level === "beginner") || [],
    intermediate: videos?.filter(v => v.level === "intermediate") || [],
    advanced: videos?.filter(v => v.level === "advanced") || [],
  };

      const renderSection = (title: string, items: any[]) => (
      items.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2>{title}</h2>

          {items.map((v) => {
            const videoId = getYouTubeId(v.youtube_url);

            return (
              <div key={v.id} style={{ marginBottom: 20 }}>
                <h4>{v.order_no}. {v.title}</h4>

                {videoId ? (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allowFullScreen
                  />
                ) : (
                  <p style={{ color: "red" }}>Invalid YouTube URL</p>
                )}
              </div>
            );
          })}
        </section>
      )
    );

  return (
    <main style={{ padding: 40 }}>
      <h1>{path.name}</h1>
      <p>{path.description}</p>

      {renderSection("Beginner", grouped.beginner)}
      {renderSection("Intermediate", grouped.intermediate)}
      {renderSection("Advanced", grouped.advanced)}
    </main>
  );
}
