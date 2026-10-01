export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, key } = req.body || {};

  if (!process.env.CONTROL_KEY || key !== process.env.CONTROL_KEY) {
    return res.status(401).json({ error: "Invalid key" });
  }

  // Vercel serverless functions are stateless. This endpoint is a starter.
  // For persistent live text, connect this to Supabase/Redis.
  return res.status(200).json({
    ok: true,
    text: String(text ?? "")
  });
}
