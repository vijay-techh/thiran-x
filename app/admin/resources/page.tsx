"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";

export default function AdminResources() {
  const [interests, setInterests] = useState<any[]>([]);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [title, setTitle] = useState("");
  const [youtube, setYoutube] = useState("");
  const [level, setLevel] = useState("Beginner");

  useEffect(() => {
    supabase
      .from("interests")
      .select("id, name")
      .order("name")
      .then(({ data }) => setInterests(data || []));
  }, []);

  async function addResource() {
    if (!selectedInterest || !title) {
      return alert("Fill all fields");
    }

    const { data: resource } = await supabase
      .from("resources")
      .insert({
        title,
        type: "video",
        youtube_url: youtube,
        level,
      })
      .select()
      .single();

    await supabase.from("interest_resources").insert({
      interest_id: selectedInterest,
      resource_id: resource.id,
    });

    setTitle("");
    setYoutube("");
    alert("Resource added");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-4">Add Resource</h1>

      <select
className="border p-2 w-full mb-2 bg-white text-black"        value={selectedInterest}
        onChange={e => setSelectedInterest(e.target.value)}
      >
        <option value="">Select Interest</option>
        {interests.map(i => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
      </select>

      <input className="border p-2 w-full bg-white text-black" 

        placeholder="Video title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input className="border p-2 w-full bg-white text-black"

        placeholder="YouTube link"
        value={youtube}
        onChange={e => setYoutube(e.target.value)}
      />

      <select
className="border p-2 w-full mb-2 bg-white text-black"        value={level}
        onChange={e => setLevel(e.target.value)}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button
        onClick={addResource}
        className="border border-zinc-700 px-4 py-3 rounded hover:bg-zinc-900 text-left"
      >
        Add Resource
      </button>
    </div>
  );
}
