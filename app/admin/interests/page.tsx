"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseAuthClient";

export default function AdminInterests() {
  const [interests, setInterests] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadInterests() {
    const { data } = await supabase
      .from("interests")
      .select("*")
      .order("name");
    setInterests(data || []);
  }

  useEffect(() => {
    loadInterests();
  }, []);

  async function saveInterest() {
    if (!name) return alert("Name required");

    if (editingId) {
      // ✏️ UPDATE
      await supabase
        .from("interests")
        .update({ name, category })
        .eq("id", editingId);
    } else {
      // ➕ INSERT
      await supabase.from("interests").insert({
        name,
        category,
      });
    }

    setName("");
    setCategory("");
    setEditingId(null);
    loadInterests();
  }

  async function deleteInterest(id: number) {
    if (!confirm("Delete this interest?")) return;

    await supabase.from("interests").delete().eq("id", id);
    loadInterests();
  }

  function startEdit(i: any) {
    setEditingId(i.id);
    setName(i.name);
    setCategory(i.category || "");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-4">Manage Interests</h1>

      <input
        className="border p-2 w-full mb-2 bg-white text-black"
        placeholder="Interest name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2 bg-white text-black"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <button
        onClick={saveInterest}
        className="bg-white text-black px-4 py-2 mb-4"
      >
        {editingId ? "Update Interest" : "Add Interest"}
      </button>

      <ul className="space-y-2">
        {interests.map(i => (
          <li
            key={i.id}
            className="border border-zinc-700 p-3 flex justify-between items-center"
          >
            <div>
              <b>{i.name}</b>
              <div className="text-sm text-gray-400">{i.category}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(i)}
                className="text-yellow-400 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteInterest(i.id)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
