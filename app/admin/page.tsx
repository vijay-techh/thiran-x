export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <p className="text-gray-400">
          Manage ThiranX content
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/admin/videos"
            className="border border-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-900"
          >
            Manage Videos
          </a>

          {/* Future */}
          {/* <a href="/admin/degrees">Manage Degrees</a> */}
        </div>
      </div>
    </main>
  );
}
