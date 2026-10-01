export default function handler(req, res) {
  const text = process.env.UNITY_TEXT || "Hello from Vercel!";
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ text });
}
