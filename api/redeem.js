// Vercel Serverless Function
// POST /api/redeem
//
// Expected body:
// {
//   "code": "WELCOME2026",
//   "userId": "photon-user-id",
//   "playFabId": "playfab-id"
// }
//
// Response:
// {
//   "success": true,
//   "message": "CODE REDEEMED!",
//   "cosmetics": ["cosmetic_hat_01"]
// }
//
// Codes are configured with the REDEEM_CODES environment variable.
// Example:
// {
//   "welcome2026": {
//     "cosmetics": ["cosmetic_hat_01", "cosmetic_badge_01"],
//     "message": "CODE REDEEMED!",
//     "active": true
//   }
// }

function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function normalizeCode(value) {
  return String(value || "").trim().toLowerCase();
}

function loadCodes() {
  const raw = process.env.REDEEM_CODES;

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    throw new Error("REDEEM_CODES is not valid JSON.");
  }
}

function safeCosmetics(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 50);
}

module.exports = async function handler(req, res) {
  // Basic CORS support for testing/browser requests.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return json(res, 405, {
      success: false,
      message: "METHOD NOT ALLOWED.",
      cosmetics: []
    });
  }

  let body = req.body;

  // Vercel normally parses JSON automatically, but this also handles
  // string bodies safely.
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, {
        success: false,
        message: "INVALID JSON.",
        cosmetics: []
      });
    }
  }

  if (!body || typeof body !== "object") {
    return json(res, 400, {
      success: false,
      message: "INVALID REQUEST.",
      cosmetics: []
    });
  }

  const code = normalizeCode(body.code);
  const userId = String(body.userId || "").trim();
  const playFabId = String(body.playFabId || "").trim();

  if (!code) {
    return json(res, 400, {
      success: false,
      message: "ENTER A CODE.",
      cosmetics: []
    });
  }

  // At least one account identifier should be supplied by the Unity client.
  // This prevents totally anonymous browser requests from looking valid.
  if (!userId && !playFabId) {
    return json(res, 400, {
      success: false,
      message: "ACCOUNT IDENTIFIER REQUIRED.",
      cosmetics: []
    });
  }

  let codes;

  try {
    codes = loadCodes();
  } catch (error) {
    console.error(error);
    return json(res, 500, {
      success: false,
      message: "SERVER CONFIGURATION ERROR.",
      cosmetics: []
    });
  }

  const entry = codes[code];

  if (!entry || entry.active === false) {
    return json(res, 200, {
      success: false,
      message: "INVALID OR EXPIRED CODE.",
      cosmetics: []
    });
  }

  const cosmetics = safeCosmetics(entry.cosmetics);

  if (cosmetics.length === 0) {
    return json(res, 200, {
      success: false,
      message: "THIS CODE HAS NO REWARDS CONFIGURED.",
      cosmetics: []
    });
  }

  // Optional expiration timestamp:
  // "expiresAt": "2026-12-31T23:59:59.000Z"
  if (entry.expiresAt) {
    const expires = Date.parse(entry.expiresAt);
    if (!Number.isNaN(expires) && Date.now() >= expires) {
      return json(res, 200, {
        success: false,
        message: "INVALID OR EXPIRED CODE.",
        cosmetics: []
      });
    }
  }

  const message =
    typeof entry.message === "string" && entry.message.trim()
      ? entry.message.trim()
      : "CODE REDEEMED! CHECK YOUR COSMETICS.";

  // IMPORTANT:
  // This starter version validates codes but does not persist a redemption
  // database. Your Unity client already stores redeemed_<code> locally.
  //
  // If you want server-enforced one-time codes, connect a persistent store
  // such as Redis/Upstash and atomically record:
  //   code + userId/playFabId
  //
  // Do not put a secret/API key in the Unity client.

  return json(res, 200, {
    success: true,
    message,
    cosmetics
  });
};
