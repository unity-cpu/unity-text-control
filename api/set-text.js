import { supabaseRequest } from "./_supabase.js";

function getRequestBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  try {
    return JSON.parse(req.body || "{}");
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, key } = getRequestBody(req);

    if (typeof text !== "string") {
      return res.status(400).json({ error: "Text must be a string." });
    }

    if (!process.env.CONTROL_KEY || key !== process.env.CONTROL_KEY) {
      return res.status(401).json({ error: "Invalid control key." });
    }

    const cleanText = text.slice(0, 2000);

    const rows = await supabaseRequest(
      "unity_text?id=eq.1",
      {
        method: "PATCH",
        headers: {
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          text: cleanText,
          updated_at: new Date().toISOString()
        })
      }
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        error: "Unity text row was not found. Run the supplied SQL first."
      });
    }

    return res.status(200).json({
      ok: true,
      text: rows[0].text,
      updated_at: rows[0].updated_at
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Could not update Unity text."
    });
  }
}