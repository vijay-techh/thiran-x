"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseAuthClient";

const ADMIN_EMAILS = ["vijayvijaayyyyy@gmail.com"];

export default function AdminVideos() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const [level, setLevel] = useState("beginner");
  const [orderNo, setOrderNo] = useState(1);

  const [degrees, setDegrees] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [paths, setPaths] = useState<any[]>([]);

  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPath, setSelectedPath] = useState("");

  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  /* 🔐 ADMIN CHECK (always runs) */
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!ADMIN_EMAILS.includes(user.email!)) {
        router.replace("/dashboard");
        return;
      }

      setChecking(false);
    };

    checkAdmin();
  }, [router]);

  /* 📦 FETCH DATA — only after admin is confirmed */
  useEffect(() => {
    if (checking) return;

    fetchDegrees();
    fetchVideos();
  }, [checking]);

  const fetchDegrees = async () => {
    const { data } = await supabase.from("degrees").select("*");
    setDegrees(data || []);
  };

  const fetchAreas = async (degreeId: string) => {
    const { data } = await supabase
      .from("career_areas")
      .select("*")
      .eq("degree_id", degreeId);

    setAreas(data || []);
    setPaths([]);
    setSelectedArea("");
    setSelectedPath("");
  };

  const fetchPaths = async (areaId: string) => {
    const { data } = await supabase
      .from("career_paths")
      .select("*")
      .eq("area_id", areaId);

    setPaths(data || []);
    setSelectedPath("");
  };

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    setVideos(data || []);
  };

  const addVideo = async () => {
    if (!selectedPath) {
      alert("Select a career path");
      return;
    }

    await supabase.from("videos").insert({
      title,
      youtube_url: youtubeUrl,
      career_path_id: selectedPath,
      level,
      order_no: orderNo,
    });

    setTitle("");
    setYoutubeUrl("");
    setOrderNo(orderNo + 1);
    fetchVideos();
  };

  const deleteVideo = async (id: string) => {
    await supabase.from("videos").delete().eq("id", id);
    fetchVideos();
  };

  /* ⏳ SAFE conditional render (after hooks) */
  if (checking) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking admin access...
      </main>
    );
  }

  /* ---------------- UI ---------------- */
 return (
  <main className="min-h-screen bg-black text-white px-4 py-10">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Videos</h1>

      {/* FORM CARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">

        {/* DEGREE */}
        <select
          className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
          onChange={(e) => {
            setSelectedDegree(e.target.value);
            fetchAreas(e.target.value);
          }}
        >
          <option value="">Select Degree</option>
          {degrees.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* AREA */}
        <select
          className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
          disabled={!areas.length}
          onChange={(e) => {
            setSelectedArea(e.target.value);
            fetchPaths(e.target.value);
          }}
        >
          <option value="">Select Career Area</option>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* PATH */}
        <select
          className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
          disabled={!paths.length}
          onChange={(e) => setSelectedPath(e.target.value)}
        >
          <option value="">Select Career Path</option>
          {paths.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* TITLE */}
        <input
          className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* YOUTUBE */}
        <input
          className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        {/* LEVEL */}
        <div className="flex gap-4">
          <select
            className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            className="w-32 bg-black border border-zinc-700 rounded-lg px-4 py-3"
            type="number"
            min={1}
            value={orderNo}
            onChange={(e) => setOrderNo(Number(e.target.value))}
          />
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={addVideo}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Add Video
        </button>
      </div>

      {/* LIST */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Existing Videos</h2>

        <div className="space-y-3">
          {videos.map((v) => (
            <div
              key={v.id}
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
            >
              <span>{v.title}</span>

              <button
                onClick={() => deleteVideo(v.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);

}
