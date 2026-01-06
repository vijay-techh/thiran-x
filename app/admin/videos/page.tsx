"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseAuthClient";

const ADMIN_EMAILS = ["vijayvijaayyyy@gmail.com"];

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

  /* 🔐 ADMIN CHECK */
  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

  /* ⏳ Prevent flash */
  if (checking) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking admin access...
      </main>
    );
  }

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchDegrees();
    fetchVideos();
  }, []);

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

  /* ---------------- ACTIONS ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <div style={{ padding: 40 }}>
      <h1>Manage Videos</h1>

      <select
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

      <br /><br />

      <select
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

      <br /><br />

      <select
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

      <br /><br />

      <input
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="YouTube URL"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />

      <br /><br />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <br /><br />

      <input
        type="number"
        value={orderNo}
        onChange={(e) => setOrderNo(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={addVideo}>Add Video</button>

      <hr />

      <h2>Existing Videos</h2>
      {videos.map((v) => (
        <div key={v.id}>
          {v.title}
          <button onClick={() => deleteVideo(v.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
