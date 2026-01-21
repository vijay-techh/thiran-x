
"use client";

type Resource = {
  id: number;
  title: string;
  level: string;
  youtube_url: string;
};

export default function ResourceCard({
  resource,
  completed,
}: {
  resource: Resource;
  completed: boolean;
}) {
  const embedUrl = getYouTubeEmbedUrl(resource.youtube_url);

  return (
    <div className="border border-zinc-800 rounded p-4">
      <h3 className="text-lg font-semibold">{resource.title}</h3>
      <p className="text-sm text-gray-400">{resource.level}</p>

      {embedUrl && (
        <div className="mt-4 aspect-video">
          <iframe
            className="w-full h-full rounded"
            src={embedUrl}
            allowFullScreen
          />
        </div>
      )}

      {/* ✅ COMPLETED VS BUTTON */}
      {completed ? (
        <span className="inline-block mt-4 text-green-400 text-sm font-medium">
          ✓ Completed
        </span>
      ) : (
        <button
          onClick={async () => {
            await fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ resource_id: resource.id }),
            });

            window.location.reload(); // simple & reliable
          }}
          className="mt-4 px-4 py-2 bg-green-600 rounded"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
}

/* helper */
function getYouTubeEmbedUrl(url: string) {
  try {
    if (url.includes("embed")) return url;
    const u = new URL(url);
    const id = u.searchParams.get("v") || u.pathname.split("/").pop();
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return "";
  }
}
