// ─────────────────────────────────────────────────────────────
//  Gorilla Tag code redemption — KV-free version
//  Works without @vercel/kv. Uses an in-memory Map for dedupe
//  (resets on cold start — fine for testing, swap to KV later).
// ─────────────────────────────────────────────────────────────

// ── SINGLE_ITEMS ── name → PlayFab ItemId (from your DLC catalog)
const SINGLE_ITEMS = {
  // Pins/Badges
  "tree_pin": "LBAAA.", "bowtie": "LBAAB.", "basic_scarf": "LBAAC.",
  "admin_badge": "LBAAD.", "crystals_pin": "LBAAF.", "canyon_pin": "LBAAG.",
  "city_pin": "LBAAH.", "gorilla_pin": "LBAAI.", "neck_scarf": "LBAAJ.",
  "early_access_badge": "LBAAE.", "mod_stick": "LBAAK.",
  // Face
  "big_eyebrows": "LFAAA.", "nose_ring": "LFAAB.", "basic_earrings": "LFAAC.",
  "triple_earrings": "LFAAD.", "eyebrow_stud": "LFAAE.",
  "triangle_sunglasses": "LFAAF.", "skull_mask": "LFAAG.",
  "right_eyepatch": "LFAAH.", "left_eyepatch": "LFAAI.",
  "double_eyepatch": "LFAAJ.", "goggles": "LFAAK.", "surgical_mask": "LFAAL.",
  "tortoiseshell_sunglasses": "LFAAM.", "aviators": "LFAAN.",
  "round_sunglasses": "LFAAO.", "maple_leaf": "LFAAV.", "face_scarf": "LFAAW.",
  "santa_beard": "LFAAX.", "ornament_earrings": "LFAAY.", "2022_glasses": "LFAAZ.",
  "nose_snowflake": "LFABA.", "rosy_cheeks": "LFABB.", "boxy_sunglasses": "LFABC.",
  "heart_glasses": "LFABD.", "lightning_makeup": "LFABI.",
  "sunburn": "LFABN.", "sunscreen": "LFABO.",
  // Hats
  "banana_hat": "LHAAA.", "cat_ears": "LHAAB.", "party_hat": "LHAAC.",
  "ushanka": "LHAAD.", "sweatband": "LHAAE.", "baseball_cap": "LHAAF.",
  "forehead_mirror": "LHAAH.", "pineapple_hat": "LHAAI.", "witch_hat": "LHAAJ.",
  "coconut": "LHAAK.", "sunhat": "LHAAL.", "cloche": "LHAAM.",
  "cowboy_hat": "LHAAN.", "fez": "LHAAO.", "top_hat": "LHAAP.",
  "basic_beanie": "LHAAQ.", "white_fedora": "LHAAR.", "flower_crown": "LHAAS.",
  "golden_head": "LHAAG.", "paperbag_hat": "LHAAT.", "pumpkin_hat": "LHAAU.",
  "clown_wig": "LHAAV.", "vampire_wig": "LHAAW.", "werewolf_ears": "LHAAX.",
  "star_princess_tiara": "LHAAY.", "pirate_bandana": "LHAAZ.",
  "chefs_hat": "LHABC.", "santa_hat": "LHABD.", "snowman_hat": "LHABE.",
  "gift_hat": "LHABF.", "elf_hat": "LHABG.", "white_earmuffs": "LHABL.",
  "black_earmuffs": "LHABM.", "green_earmuffs": "LHABN.", "pink_earmuffs": "LHABO.",
  "headphones1": "LHABP.", "box_of_chocolates_hat": "LHABQ.",
  "heart_pompom_hat": "LHABR.", "plunger_hat": "LHABS.", "saucepan_hat": "LHABT.",
  "white_bunny_ears": "LHABU.", "brown_bunny_ears": "LHABV.",
  "leprechaun_hat": "LHABW.", "blue_lily_hat": "LHABX.", "purple_lily_hat": "LHABY.",
  "yellow_rain_hat": "LHABZ.", "painted_egg_hat": "LHACA.",
  "black_longhair_wig": "LHACB.", "red_longhair_wig": "LHACC.",
  "electro_helm": "LHACD.", "seagull": "LHACE.", "rockin_mohawk": "LHACF.",
  "spiked_helmet": "LHACG.", "cardboard_helmet": "LHACH.",
  // Holds
  "regular_wrench": "LBABB.", "gold_wrench": "LBABC.", "fork_knife": "LBABD.",
  "gold_fork_knife": "LBABE.", "cookie_jar": "LFABE.", "turkey_leg": "LBAAP.",
  "turkey_finger_puppet": "LBAAQ.", "candy_cane": "LBAAR.", "sparkler": "LBAAS.",
  "regular_slingshot": "LMAAV.", "shotgun": "SHOTGUN.", "chainsaw": "CHAINSAW.",
  "katana": "KATANA.", "fortnite_scar": "FORTNITESCAR.", "pencil": "PENCIL.",
  "ban_hammer": "LPIZN.", "pizza": "LPIZA.", "gold_dominus": "LPIZG.",
  "owner_dominus": "LPIZH.", "dominus_asterlight": "LPIZI.",
  "flamingo_head": "LPIZJ.", "clockwork_shades": "LPIZK.", "tazer": "LPIZL.",
  "deadly_dark_dominus": "LPIZM.", "valkery": "LPIZO.",
  "rainbow_dominus": "LPIZP.", "banana": "LPIZQ.", "roblox_hammer": "ROBLOXHAMMER.",
  "master_sword": "MASTERSWORD.", "lightsaber_blue": "LIGHTSABERBLUE.",
  "lightsaber_red": "LIGHTSABERRED.", "lightsaber_green": "LIGHTSABERGREEN.",
  "lightsaber_purple": "LIGHTSABERPURPLE.",
  // Backblings
  "gorilla_armor": "LBABT.", "cardboard_armor": "LBABS.", "spiked_armor": "LBABU.",
  "red_rose": "LBAAV.", "pink_rose": "LBAAW.", "black_rose": "LBAAX.",
  "gold_rose": "LBAAY.", "gt1_badge": "LBAAZ.", "thumb_partyhats": "LBABA.",
  "chest_heart": "LBAAU.", "spider_web_umbrella": "LBAVH.",
  "bulging_googly_eyes": "LBAVG.", "slinky_eyes": "LBAVK.", "sheriff_hat": "LBAVJ.",
  // Misc
  "acoustic_guitar": "LMAAI.", "gold_acoustic_guitar": "LMAAJ.",
  "electric_guitar": "LMAAK.", "gold_electric_guitar": "LMAAL.",
  "bubbler": "LMAAM.", "popsicle": "LMAAN.", "rubber_duck": "LMAAO.",
  "star_balloon": "LMAAP.", "diamond_balloon": "LMAAR.",
  "donut_balloon": "LMAAS.", "heart_balloon": "LMAAT.", "finger_flag": "LMAAU.",
  "cherry_blossom": "LMAAA.", "cherry_blossom_rose": "LMAAB.",
  "blue_umbrella": "LMAAF.", "colorful_umbrella": "LMAAG.", "golden_umbrella": "LMAAH.",
  // Trails
  "rainbow_trail": "RAINBOWTRAIL.", "purple_trail": "PURPLETRAIL.",
  "red_trail": "REDTRAIL.", "blue_trail": "BLUETRAIL.", "green_trail": "GREENTRAIL.",
  // Named bundles from catalog
  "early_access_pack": "Early Access Pack.",
  "clown_set": "LSAAA.", "vampire_set": "LSAAB.", "werewolf_set": "LSAAC.",
  "star_princess_set": "LSAAD.", "santa_set": "LSAAE.",
  "cardboard_armor_set": "LSAAF.", "spiked_armor_set": "LSAAG.",
  "sheriff_set": "LBAFJ.", "super_hero_set": "LBATR.",
  "unicorn_princess_set": "LBAUG.", "robot_set": "LBAGK.",
  "clown_22_set": "LBAYU.", "meta_quest_3_bundle": "METAQUEST3BUNDLE.",
  "fortnite_bundle": "FORTNITEBUNDLE.", "roblox_bundle": "ROBLOX.",
  "booster_pack": "BoosterPack.", "donator_bundle": "DonatorBundle",
  "everything_no_admin": "EVERYTHINGBUTNOADMINBADGE",
};

// ── NAMED_BUNDLES ── reusable groups
const NAMED_BUNDLES = {
  "starter_bundle": ["banana_hat", "cat_ears", "party_hat", "baseball_cap"],
  "spooky_bundle": ["witch_hat", "pumpkin_hat", "clown_wig", "vampire_wig", "werewolf_ears", "clown_set", "vampire_set", "werewolf_set"],
  "christmas_bundle": ["santa_hat", "snowman_hat", "gift_hat", "elf_hat", "santa_beard", "santa_set", "ornament_earrings"],
  "founder_bundle": ["early_access_badge", "golden_head", "admin_badge"],
  "trails_bundle": ["rainbow_trail", "purple_trail", "red_trail", "blue_trail", "green_trail"],
  "roblox_fan_bundle": ["roblox_hammer", "banana", "rainbow_dominus", "owner_dominus"],
};

// ── In-memory dedupe store (resets on cold start) ──
const REDEEMED = new Map();
const USES = new Map();

// ── Load codes from env, fall back to a built-in welcome code ──
function loadRedeemCodes() {
  const raw = process.env.REDEEM_CODES;
  if (!raw || raw.trim().length === 0) {
    console.warn("[redeem] REDEEM_CODES missing — using fallback.");
    return {
      "welcome2026": {
        cosmetics: ["banana_hat"],
        message: "WELCOME!",
        active: true,
      },
    };
  }

  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (e) {
    console.error("[redeem] REDEEM_CODES invalid JSON:", e.message);
    return {};
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    console.error("[redeem] REDEEM_CODES must be a JSON object.");
    return {};
  }

  const out = {};
  for (const [k, v] of Object.entries(parsed)) out[k.trim().toLowerCase()] = v;
  return out;
}

function resolveOne(entry) {
  if (typeof entry !== "string" || entry.length === 0) return null;
  if (SINGLE_ITEMS[entry]) return SINGLE_ITEMS[entry];
  if (/^[A-Z0-9 ]+\.?$/i.test(entry)) return entry;
  return null;
}

function resolveCosmetics(list) {
  if (!Array.isArray(list)) return [];
  const out = [], seen = new Set();
  const push = (id) => { if (id && !seen.has(id)) { seen.add(id); out.push(id); } };
  for (const entry of list) {
    if (typeof entry !== "string" || entry.length === 0) continue;
    if (NAMED_BUNDLES[entry]) {
      for (const inner of NAMED_BUNDLES[entry]) push(resolveOne(inner));
      continue;
    }
    push(resolveOne(entry));
  }
  return out;
}

function isExpired(entry) {
  if (entry.expires && Date.now() > entry.expires) return true;
  if (entry.expiresAt) {
    const t = Date.parse(entry.expiresAt);
    if (!Number.isNaN(t) && Date.now() > t) return true;
  }
  return false;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { code, userId, playFabId } = req.body || {};

    if (!code || typeof code !== "string") {
      return res.status(400).json({ success: false, message: "Missing code." });
    }
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Missing userId." });
    }

    const normalized = code.trim().toLowerCase();

    if (normalized.length === 0 || normalized.length > 24) {
      return res.status(200).json({ success: false, message: "Invalid code." });
    }

    const REDEEM_CODES = loadRedeemCodes();
    const entry = REDEEM_CODES[normalized];

    if (!entry) {
      await sleep(400);
      return res.status(200).json({ success: false, message: "Invalid or expired code." });
    }

    if (entry.active === false) {
      return res.status(200).json({
        success: false,
        message: entry.message || "This code is no longer active.",
      });
    }

    if (isExpired(entry)) {
      return res.status(200).json({
        success: false,
        message: entry.message || "This code has expired.",
      });
    }

    let rawList = entry.cosmetics;
    if (!rawList && entry.bundle) rawList = [entry.bundle];

    const cosmetics = resolveCosmetics(rawList);

    if (!cosmetics || cosmetics.length === 0) {
      console.error(`Code "${normalized}" resolved to zero cosmetics.`);
      return res.status(200).json({
        success: false,
        message: "This code is misconfigured. Contact an admin.",
      });
    }

    // Per-user dedupe (in-memory)
    const userKey = `${normalized}:${userId}`;
    if (REDEEMED.has(userKey)) {
      return res.status(200).json({
        success: false,
        message: "You already redeemed this code.",
      });
    }

    // Global use cap
    if (entry.maxUses != null) {
      const used = USES.get(normalized) || 0;
      if (used >= entry.maxUses) {
        return res.status(200).json({
          success: false,
          message: "This code has reached its limit.",
        });
      }
      USES.set(normalized, used + 1);
    }

    REDEEMED.set(userKey, Date.now());

    const defaultMsg = `Unlocked ${cosmetics.length} cosmetic${cosmetics.length === 1 ? "" : "s"}!`;
    return res.status(200).json({
      success: true,
      message: entry.message || defaultMsg,
      cosmetics,
    });
  } catch (err) {
    console.error("Redeem error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
}