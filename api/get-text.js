import { supabaseRequest } from "./_supabase.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = await supabaseRequest(
      "unity_text?id=eq.1&select=id,text,updated_at&limit=1",
      { method: "GET" }
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Unity text row was not found. Run the supplied SQL first." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not read Unity text." });
  }
}