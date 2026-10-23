// ─────────────────────────────────────────────────────────────
//  Gorilla Tag code redemption — KV-free version
//  Works without @vercel/kv. Uses an in-memory Map for dedupe
//  (resets on cold start — fine for testing, swap to KV later).
//
//  NOW ACTUALLY GRANTS THE ITEMS via the PlayFab Server API.
//
//  Required env vars:
//    PLAYFAB_TITLE_ID      e.g. "1A2B3"      (Game Manager → Title ID)
//    PLAYFAB_SECRET_KEY    e.g. "ABC123..."  (Game Manager → Settings → API Features → Secret Keys)
//  Optional:
//    PLAYFAB_CATALOG_VERSION   only set this if your items live in a named catalog
// ─────────────────────────────────────────────────────────────

// ── SINGLE_ITEMS ── name → PlayFab ItemId (from your DLC catalog)
const SINGLE_ITEMS = {
  // ── Pins / Badges ──
  "tree_pin": "LBAAA.",
  "bowtie": "LBAAB.",
  "basic_scarf": "LBAAC.",
  "admin_badge": "LBAAD.",
  "administrator_badge": "LBAAD.",
  "early_access_badge": "LBAAE.",
  "early_access": "LBAAE.",
  "crystals_pin": "LBAAF.",
  "canyon_pin": "LBAAG.",
  "city_pin": "LBAAH.",
  "gorilla_pin": "LBAAI.",
  "neck_scarf": "LBAAJ.",
  "mod_stick": "LBAAK.",
  "gt1_badge": "LBAAZ.",
  "mountain_pin": "LBABH.",
  "ogbadge": "OGBADGE.",
  "og": "OG.",
  "ownerbadge": "OWNERBADGE",
  "coownerbadge": "COOWNERBADGE",
  "contentbadge": "CONTENTBADGE",
  "discordbadge": "DISCORDBADGE",
  "tier2badge": "TIER2BADGE",
  "trustedtag": "TRUSTEDTAG.",
  "milkbadge": "MILKBADGE.",
  "cofounder": "COFOUNDER.",
  "illustrator": "ILLUSTRATOR.",
  "forestguide": "FORESTGUIDE.",
  "donator": "DONATOR.",
  "donatortext": "DONATORTEXT.",
  "EVERY COSMETIC": "EVERY COSMETIC",

  // ── Face ──
  "big_eyebrows": "LFAAA.",
  "nose_ring": "LFAAB.",
  "basic_earrings": "LFAAC.",
  "triple_earrings": "LFAAD.",
  "eyebrow_stud": "LFAAE.",
  "triangle_sunglasses": "LFAAF.",
  "skull_mask": "LFAAG.",
  "right_eyepatch": "LFAAH.",
  "left_eyepatch": "LFAAI.",
  "double_eyepatch": "LFAAJ.",
  "goggles": "LFAAK.",
  "surgical_mask": "LFAAL.",
  "tortoiseshell_sunglasses": "LFAAM.",
  "aviators": "LFAAN.",
  "round_sunglasses": "LFAAO.",
  "maple_leaf": "LFAAV.",
  "face_scarf": "LFAAW.",
  "santa_beard": "LFAAX.",
  "ornament_earrings": "LFAAY.",
  "2022_glasses": "LFAAZ.",
  "nose_snowflake": "LFABA.",
  "rosy_cheeks": "LFABB.",
  "boxy_sunglasses": "LFABC.",
  "heart_glasses": "LFABD.",
  "lightning_makeup": "LFABI.",
  "sunburn": "LFABN.",
  "sunscreen": "LFABO.",
  "bite_onion": "LFABF.",
  "emperor_nose_butterfly": "LFABG.",
  "forehead_egg": "LFABH.",
  "clown_nose": "LFAAR.",
  "clown_nose_22": "LFABT.",
  "mummy_wrap": "LFAAQ.",
  "witch_nose": "LFAAP.",
  "vampire_fangs": "LFAAS.",
  "werewolf_face": "LFAAT.",
  "star_princess_glasses": "LFAAU.",
  "sheriff_mustache": "LFABU.",
  "slinky_eyes": "LBAVK.",
  "bulging_googly_eyes": "LBAVG.",
  "mouth_wheat": "LFABW.",

  // ── Hats ──
  "banana_hat": "LHAAA.",
  "cat_ears": "LHAAB.",
  "party_hat": "LHAAC.",
  "ushanka": "LHAAD.",
  "sweatband": "LHAAE.",
  "baseball_cap": "LHAAF.",
  "golden_head": "LHAAG.",
  "forehead_mirror": "LHAAH.",
  "pineapple_hat": "LHAAI.",
  "witch_hat": "LHAAJ.",
  "coconut": "LHAAK.",
  "sunhat": "LHAAL.",
  "cloche": "LHAAM.",
  "cowboy_hat": "LHAAN.",
  "fez": "LHAAO.",
  "top_hat": "LHAAP.",
  "basic_beanie": "LHAAQ.",
  "white_fedora": "LHAAR.",
  "flower_crown": "LHAAS.",
  "paperbag_hat": "LHAAT.",
  "pumpkin_hat": "LHAAU.",
  "clown_wig": "LHAAV.",
  "vampire_wig": "LHAAW.",
  "werewolf_ears": "LHAAX.",
  "star_princess_tiara": "LHAAY.",
  "pirate_bandana": "LHAAZ.",
  "chefs_hat": "LHABC.",
  "santa_hat": "LHABD.",
  "snowman_hat": "LHABE.",
  "gift_hat": "LHABF.",
  "elf_hat": "LHABG.",
  "white_earmuffs": "LHABL.",
  "black_earmuffs": "LHABM.",
  "green_earmuffs": "LHABN.",
  "pink_earmuffs": "LHABO.",
  "headphones1": "LHABP.",
  "box_of_chocolates_hat": "LHABQ.",
  "heart_pompom_hat": "LHABR.",
  "plunger_hat": "LHABS.",
  "saucepan_hat": "LHABT.",
  "white_bunny_ears": "LHABU.",
  "brown_bunny_ears": "LHABV.",
  "leprechaun_hat": "LHABW.",
  "blue_lily_hat": "LHABX.",
  "purple_lily_hat": "LHABY.",
  "yellow_rain_hat": "LHABZ.",
  "painted_egg_hat": "LHACA.",
  "black_longhair_wig": "LHACB.",
  "red_longhair_wig": "LHACC.",
  "electro_helm": "LHACD.",
  "seagull": "LHACE.",
  "rockin_mohawk": "LHACF.",
  "spiked_helmet": "LHACG.",
  "cardboard_helmet": "LHACH.",
  "clown_cap": "LHACI.",
  "pumpkin_head_happy": "LHACJ.",
  "pumpkin_head_scary": "LHACK.",
  "robot_head": "LHACL.",
  "sheriff_hat": "LHACM.",
  "unicorn_crown": "LHACN.",
  "super_hero_headband": "LHACO.",
  "pie_hat": "LHACP.",
  "scarecrow_hat": "LHACQ.",
  "chrome_cowboy_hat": "LHABB.",
  "orange_pompom_hat": "LHABH.",
  "blue_pompom_hat": "LHABI.",
  "stripe_pompom_hat": "LHABJ.",
  "pattern_pompom_hat": "LHABK.",
  "sunny_sunhat": "LHABA.",
  "halo": "HALO.",

  // ── Holds ──
  "regular_wrench": "LBABB.",
  "gold_wrench": "LBABC.",
  "fork_knife": "LBABD.",
  "regular_fork_and_knife": "LBABD.",
  "gold_fork_knife": "LBABE.",
  "gold_fork_and_knife": "LBABE.",
  "cookie_jar": "LFABE.",
  "turkey_leg": "LBAAP.",
  "turkey_finger_puppet": "LBAAQ.",
  "candy_cane": "LBAAR.",
  "sparkler": "LBAAS.",
  "regular_slingshot": "LMAAV.",
  "high_tech_s_lingshot": "LMAAV.",
  "high_tech_slingshot": "HIGH TECH SLINGSHOT",
  "shotgun": "SHOTGUN.",
  "chainsaw": "CHAINSAW.",
  "katana": "KATANA.",
  "fortnite_scar": "FORTNITESCAR.",
  "pencil": "PENCIL.",
  "ban_hammer": "LPIZN.",
  "pizza": "LPIZA.",
  "gold_dominus": "LPIZG.",
  "owner_dominus": "LPIZH.",
  "dominus_asterlight": "LPIZI.",
  "flamingo_head": "LPIZJ.",
  "clockwork_shades": "LPIZK.",
  "tazer": "LPIZL.",
  "deadly_dark_dominus": "LPIZM.",
  "valkery": "LPIZO.",
  "rainbow_dominus": "LPIZP.",
  "banana": "LPIZQ.",
  "roblox_hammer": "ROBLOXHAMMER.",
  "master_sword": "MASTERSWORD.",
  "lightsaber_blue": "LIGHTSABERBLUE.",
  "lightsaber_red": "LIGHTSABERRED.",
  "lightsaber_green": "LIGHTSABERGREEN.",
  "lightsaber_purple": "LIGHTSABERPURPLE.",
  "flashlight": "FLASHLIGHT.",
  "glock": "GLOCK.",
  "phone": "PHONE.",
  "clock": "CLOCK.",
  "kick": "KICK.",
  "fling": "FLING.",

  // ── Backblings ──
  "gorilla_armor": "LBABT.",
  "cardboard_armor": "LBABS.",
  "spiked_armor": "LBABU.",
  "red_rose": "LBAAV.",
  "pink_rose": "LBAAW.",
  "black_rose": "LBAAX.",
  "gold_rose": "LBAAY.",
  "thumb_partyhats": "LBABA.",
  "chest_heart": "LBAAU.",
  "spider_web_umbrella": "LBAVH.",
  "robot_body": "LBABW.",
  "vampire_collar": "LBAAM.",
  "werewolf_claws": "LBAAN.",
  "star_princess_wand": "LBAAO.",
  "sheriff_vest": "LBABX.",
  "spilled_ice_cream": "LBABO.",
  "flamingo_floatie": "LBABP.",
  "super_hero_body": "LBABY.",
  "unicorn_tutu": "LBABZ.",
  "pocket_gorilla_bun_yellow": "LBABJ.",
  "pocket_gorilla_bun_blue": "LBABK.",
  "pocket_gorilla_bun_pink": "LBABL.",
  "yellow_rain_shawl": "LBABI.",
  "clown_vest": "LBABV.",
  "clown_frill": "LBAAL.",
  "deadshot": "LMABB.",

  // ── Misc / Instruments ──
  "acoustic_guitar": "LMAAI.",
  "gold_acoustic_guitar": "LMAAJ.",
  "golden_acoustic_guitar": "LMAAJ.",
  "electric_guitar": "LMAAK.",
  "gold_electric_guitar": "LMAAL.",
  "golden_electric_guitar": "LMAAL.",
  "bubbler": "LMAAM.",
  "popsicle": "LMAAN.",
  "rubber_duck": "LMAAO.",
  "star_balloon": "LMAAP.",
  "diamond_balloon": "LMAAR.",
  "donut_balloon": "LMAAS.",
  "chocolate_donut_balloon": "LMAAS.",
  "heart_balloon": "LMAAT.",
  "finger_flag": "LMAAU.",
  "cherry_blossom": "LMAAA.",
  "cherry_blossom_branch": "LMAAA.",
  "cherry_blossom_rose": "LMAAB.",
  "cherry_blossom_branch_rose_gold": "LMAAB.",
  "blue_umbrella": "LMAAF.",
  "black_umbrella": "LMAAF.",
  "colorful_umbrella": "LMAAG.",
  "golden_umbrella": "LMAAH.",
  "yellow_hand_boots": "LMAAC.",
  "cloud_hand_boots": "LMAAD.",
  "golden_hand_boots": "LMAAE.",
  "bongos": "LBABM.",
  "drum_set": "LBABN.",
  "monkecandle": "MONKECANDLE.",
  "monkeplush": "MONKEPLUSH.",
  "balloon_turkey": "LMABH.",
  "candy_apple": "LMABI.",
  "caramel_apple": "LMABJ.",
  "candy_bar_fun_size": "LMAAZ.",
  "giant_candy_bar": "LMAAY.",
  "ghost_balloon": "LMAAX.",
  "cranberry_can": "LMABF.",
  "corn_on_the_cob": "LMABN.",
  "frying_pan": "LMABG.",
  "ladle": "LMABL.",
  "pie_slice": "LMABK.",
  "finger_olives": "LMABO.",
  "turkey_toy": "LMABE.",
  "turkey_leg_22": "LMABM.",
  "stickable_tar_get": "LMAAQ.",
  "unicorn_staff": "LMAAW.",
  "pink_donut_balloon": "LMABD.",
  "icicle": "LBAAT.",
  "yorick": "LMABC.",
  "four_leaf_clover": "LBABF.",
  "golden_four_leaf_clover": "LBABG.",
  "snowball": "SNOWBALL.",
  "rocket": "ROCKET.",
  "saber": "SABER.",
  "scar": "SCAR.",
  "cross": "CROSS.",
  "skullhat": "SKULLHAT.",
  "propeller": "PROPELLER.",
  "protector": "PROTECTOR.",
  "techno": "TECHNO.",
  "tempted": "TEMPTED.",
  "torches": "TORCHES.",
  "virus": "VIRUS.",
  "redgt": "REDGT.",
  "abyss": "ABYSS.",
  "aa": "AA.",
  "faceless": "FACELESS.",
  "horrorface": "HORRORFACE.",
  "no": "no",
  "milk": "MILK.",
  "mario": "MARIO.",
  "lucy": "LUCY.",
  "mmshirt": "MMSHIRT.",
  "fanart1": "FANART1",
  "daily_login": "DAILY LOGIN",
  "first_login": "FIRST LOGIN",
  "s_first_login": "S. FIRST LOGIN",

  // ── Trails ──
  "rainbow_trail": "RAINBOWTRAIL.",
  "purple_trail": "PURPLETRAIL.",
  "red_trail": "REDTRAIL.",
  "blue_trail": "BLUETRAIL.",
  "green_trail": "GREENTRAIL.",

  // ── Shiny rocks / boosters / promo ──
  "1000_shiny_rocks": "1000SHINYROCKS",
  "2200_shiny_rocks": "2200SHINYROCKS",
  "5000_shiny_rocks": "5000SHINYROCKS",
  "booster_donator_pack_aka_every_cosmetic": "BOOSTER/DONATOR PACK AKA EVERY COSMETIC",
  "boosteraa": "BOOSTERAA.",
  "boosterfg": "BOOSTERFG.",
  "boosterfp": "BOOSTERFP.",
  "boosterillu": "BOOSTERILLU.",
  "boosterstick": "BOOSTERSTICK.",
  "goldfp": "GOLDFP.",
  "goldillu": "GOLDILLU.",
  "goldlucy": "GOLDLUCY.",
  "goldstick": "GOLDSTICK.",
  "goldcandycane": "GOLDCANDYCANE.",
  "goldcowboy": "GOLDCOWBOY.",
  "bun_ny": "LBATS..",
  "early_access_supporter_pack": "Early Access Supporter Pack",
  "game_purchase_bundle": "game-purchase-bundle",

  // ── Named sets / bundles (direct ItemIds) ──
  "clown_set": "LSAAA.",
  "vampire_set": "LSAAB.",
  "werewolf_set": "LSAAC.",
  "star_princess_set": "LSAAD.",
  "santa_set": "LSAAE.",
  "cardboard_armor_set": "LSAAF.",
  "spiked_armor_set": "LSAAG.",
  "sheriff_set": "LBAFJ.",
  "super_hero_set": "LBATR.",
  "unicorn_princess_set": "LBAUG.",
  "robot_set": "LBAGK.",
  "clown_22_set": "LBAYU.",
  "early_access_pack": "Early Access Pack.",
  "meta_quest_3_bundle": "METAQUEST3BUNDLE.",
  "fortnite_bundle": "FORTNITEBUNDLE.",
  "roblox_bundle": "ROBLOX.",
  "booster_pack": "BoosterPack.",
  "donator_bundle": "DonatorBundle",
  "everything_no_admin": "EVERYTHINGBUTNOADMINBADGE",
  "everything_no_staff": "EVERYTHINGBUTNOSTAFFSTUFF.",
  "day_1_pack": "LSAAP2.",

  // ── Event markers (used as cosmetic entries by bundles) ──
  "1st_anniversary": "1ST ANNIVERSARY",
  "2nd_anniversary": "2ND ANNIVERSARY",
  "2021_fall": "2021 FALL",
  "2021_halloween": "2021 HALLOWEEN",
  "2021_holiday": "2021 HOLIDAY",
  "2022_fall": "2022 FALL",
  "2022_halloween": "2022 HALLOWEEN",
  "2022_holiday": "2022 HOLIDAY",
  "2022_household": "2022 HOUSEHOLD",
  "2022_launch": "2022 LAUNCH",
  "2022_music": "2022 MUSIC",
  "2022_paintbrawl": "2022 PAINTBRAWL",
  "2022_rainy": "2022 RAINY",
  "2022_spring": "2022 SPRING",
  "2022_summer": "2022 SUMMER",
  "2022_valentines": "2022 VALENTINES",
  "2022_winter": "2022 WINTER",
  "2023_2nd_winter": "2023 2ND WINTER",
  "2023_back_to_school": "2023 BACK TO SCHOOL",
  "2023_basement": "2023 BASEMENT",
  "2023_crystal_caverns": "2023 CRYSTAL CAVERNS",
  "2023_lava": "2023 LAVA",
  "2023_spring_cleaning": "2023 SPRING CLEANING",
  "2023_summer_celebration": "2023 SUMMER CELEBRATION",
  "2023_summer_splash": "2023 SUMMER SPLASH",
  "2023_valentines": "2023 VALENTINES",
  "2023_winter": "2023 WINTER",

  // ── Legacy auto-generated placeholder aliases (from HEAD) ──
  // These are just short-name → canonical-ItemId passthroughs. Kept so
  // any old code that referenced items by their internal short name still
  // resolves. Safe to trim later if nothing depends on them.
  "lbaca": "LBACA.", "lbacb": "LBACB.", "lbacc": "LBACC.", "lbacd": "LBACD.",
  "lbace": "LBACE.", "lbacf": "LBACF.", "lbacg": "LBACG.", "lbach": "LBACH.",
  "lbaci": "LBACI.", "lbacj": "LBACJ.", "lback": "LBACK.", "lbacl": "LBACL.",
  "lbacm": "LBACM.", "lbacn": "LBACN.", "lbaco": "LBACO.", "lbacp": "LBACP.",
  "lbacq": "LBACQ.", "lbacr": "LBACR.", "lbacs": "LBACS.", "lbact": "LBACT.",
  "lbacu": "LBACU.", "lbacv": "LBACV.", "lbacw": "LBACW.", "lbacx": "LBACX.",
  "lbacy": "LBACY.", "lbacz": "LBACZ.",
  "lbada": "LBADA.", "lbadb": "LBADB.", "lbadc": "LBADC.", "lbadd": "LBADD.",
  "lbade": "LBADE.", "lbadf": "LBADF.", "lbadg": "LBADG.", "lbadh": "LBADH.",
  "lbadi": "LBADI.", "lbadj": "LBADJ.", "lbadk": "LBADK.", "lbadl": "LBADL.",
  "lbadm": "LBADM.", "lbadn": "LBADN.", "lbado": "LBADO.", "lbadp": "LBADP.",
  "lbadq": "LBADQ.", "lbadr": "LBADR.", "lbads": "LBADS.", "lbadt": "LBADT.",
  "lbadu": "LBADU.", "lbadv": "LBADV.", "lbadw": "LBADW.", "lbadx": "LBADX.",
  "lbady": "LBADY.", "lbadz": "LBADZ.",
  "lbaea": "LBAEA.", "lbaeb": "LBAEB.", "lbaec": "LBAEC.", "lbaed": "LBAED.",
  "lbaee": "LBAEE.", "lbaef": "LBAEF.", "lbaeg": "LBAEG.", "lbaeh": "LBAEH.",
  "lbaei": "LBAEI.", "lbaej": "LBAEJ.", "lbaek": "LBAEK.", "lbael": "LBAEL.",
  "lbaem": "LBAEM.", "lbaen": "LBAEN.", "lbaeo": "LBAEO.", "lbaep": "LBAEP.",
  "lbaeq": "LBAEQ.", "lbaer": "LBAER.", "lbaes": "LBAES.", "lbaet": "LBAET.",
  "lbaeu": "LBAEU.", "lbaev": "LBAEV.", "lbaew": "LBAEW.", "lbaex": "LBAEX.",
  "lbaey": "LBAEY.", "lbaez": "LBAEZ.",
  "lbafa": "LBAFA.", "lbafb": "LBAFB.", "lbafc": "LBAFC.", "lbafd": "LBAFD.",
  "lbafe": "LBAFE.", "lbaff": "LBAFF.", "lbafg": "LBAFG.", "lbafh": "LBAFH.",
  "lbafi": "LBAFI.", "lbafj": "LBAFJ.", "lbafk": "LBAFK.", "lbafl": "LBAFL.",
  "lbafm": "LBAFM.", "lbafn": "LBAFN.", "lbafo": "LBAFO.", "lbafp": "LBAFP.",
  "lbafq": "LBAFQ.", "lbafr": "LBAFR.",
  "lbagm": "LBAGM.", "lbagn": "LBAGN.", "lbago": "LBAGO.", "lbagp": "LBAGP.",
  "lbagq": "LBAGQ.",
  "lfabx": "LFABX.", "lfaby": "LFABY.", "lfabz": "LFABZ.",
  "lfaca": "LFACA.", "lfacb": "LFACB.", "lfacc": "LFACC.", "lfacd": "LFACD.",
  "lface": "LFACE.", "lfacf": "LFACF.", "lfacg": "LFACG.", "lfach": "LFACH.",
  "lfaci": "LFACI.", "lfacj": "LFACJ.", "lfack": "LFACK.", "lfacl": "LFACL.",
  "lfacm": "LFACM.", "lfacn": "LFACN.", "lfaco": "LFACO.", "lfacp": "LFACP.",
  "lfacq": "LFACQ.", "lfacr": "LFACR.", "lfacs": "LFACS.", "lfact": "LFACT.",
  "lfacu": "LFACU.", "lfacv": "LFACV.", "lfacw": "LFACW.", "lfacx": "LFACX.",
  "lfacy": "LFACY.", "lfacz": "LFACZ.",
  "lfada": "LFADA.", "lfadb": "LFADB.", "lfadc": "LFADC.", "lfadd": "LFADD.",
  "lfade": "LFADE.", "lfadf": "LFADF.", "lfadg": "LFADG.", "lfadh": "LFADH.",
  "lfadi": "LFADI.", "lfadj": "LFADJ.", "lfadk": "LFADK.", "lfadl": "LFADL.",
  "lfadm": "LFADM.", "lfadn": "LFADN.", "lfado": "LFADO.",
  "lfadx": "LFADX.", "lfady": "LFADY.",
  "lhacr": "LHACR.", "lhacs": "LHACS.", "lhact": "LHACT.", "lhacu": "LHACU.",
  "lhacv": "LHACV.", "lhacw": "LHACW.", "lhacx": "LHACX.", "lhacy": "LHACY.",
  "lhacz": "LHACZ.",
  "lhada": "LHADA.", "lhadb": "LHADB.", "lhadc": "LHADC.", "lhadd": "LHADD.",
  "lhade": "LHADE.", "lhadf": "LHADF.", "lhadg": "LHADG.", "lhadh": "LHADH.",
  "lhadi": "LHADI.", "lhadj": "LHADJ.", "lhadk": "LHADK.", "lhadl": "LHADL.",
  "lhadm": "LHADM.", "lhadn": "LHADN.", "lhado": "LHADO.", "lhadp": "LHADP.",
  "lhadq": "LHADQ.", "lhadr": "LHADR.", "lhads": "LHADS.", "lhadt": "LHADT.",
  "lhadu": "LHADU.", "lhadv": "LHADV.", "lhadw": "LHADW.", "lhadx": "LHADX.",
  "lhady": "LHADY.", "lhadz": "LHADZ.",
  "lhaea": "LHAEA.", "lhaeb": "LHAEB.", "lhaec": "LHAEC.", "lhaed": "LHAED.",
  "lhaee": "LHAEE.", "lhaef": "LHAEF.", "lhaeg": "LHAEG.", "lhaeh": "LHAEH.",
  "lhaei": "LHAEI.", "lhaej": "LHAEJ.", "lhaek": "LHAEK.", "lhael": "LHAEL.",
  "lhaem": "LHAEM.", "lhaen": "LHAEN.", "lhaeo": "LHAEO.", "lhaep": "LHAEP.",
  "lhaeq": "LHAEQ.", "lhaer": "LHAER.", "lhaes": "LHAES.", "lhaet": "LHAET.",
  "lhaeu": "LHAEU.", "lhaev": "LHAEV.", "lhaew": "LHAEW.", "lhaex": "LHAEX.",
  "lhaey": "LHAEY.", "lhaez": "LHAEZ.",
  "lhafa": "LHAFA.", "lhafb": "LHAFB.", "lhafc": "LHAFC.", "lhafd": "LHAFD.",
  "lhafe": "LHAFE.", "lhaff": "LHAFF.", "lhafg": "LHAFG.", "lhafh": "LHAFH.",
  "lhafi": "LHAFI.", "lhafj": "LHAFJ.", "lhafk": "LHAFK.", "lhafl": "LHAFL.",
  "lhafm": "LHAFM.", "lhafn": "LHAFN.", "lhafo": "LHAFO.", "lhafp": "LHAFP.",
  "lhage": "LHAGE.",
  "lmabp": "LMABP.", "lmabq": "LMABQ.", "lmabr": "LMABR.", "lmabs": "LMABS.",
  "lmabt": "LMABT.", "lmabu": "LMABU.", "lmabv": "LMABV.", "lmabw": "LMABW.",
  "lmabx": "LMABX.", "lmaby": "LMABY.", "lmabz": "LMABZ.",
  "lmaca": "LMACA.", "lmacb": "LMACB.", "lmacc": "LMACC.", "lmacd": "LMACD.",
  "lmace": "LMACE.", "lmacf": "LMACF.", "lmacg": "LMACG.", "lmach": "LMACH.",
  "lmaci": "LMACI.", "lmacj": "LMACJ.", "lmack": "LMACK.", "lmacl": "LMACL.",
  "lmacm": "LMACM.", "lmacn": "LMACN.", "lmaco": "LMACO.", "lmacp": "LMACP.",
  "lmacq": "LMACQ.", "lmacr": "LMACR.", "lmacs": "LMACS.", "lmact": "LMACT.",
  "lmacu": "LMACU.", "lmacv": "LMACV.", "lmacw": "LMACW.", "lmacx": "LMACX.",
  "lmacy": "LMACY.", "lmacz": "LMACZ.",
  "lmada": "LMADA.", "lmadb": "LMADB.", "lmadc": "LMADC.", "lmadd": "LMADD.",
  "lmade": "LMADE.", "lmadf": "LMADF.", "lmadg": "LMADG.", "lmadh": "LMADH.",
  "lmadi": "LMADI.", "lmadj": "LMADJ.", "lmadk": "LMADK.", "lmadl": "LMADL.",
  "lmadm": "LMADM.", "lmadn": "LMADN.", "lmado": "LMADO.", "lmadp": "LMADP.",
  "lmadq": "LMADQ.", "lmadr": "LMADR.", "lmads": "LMADS.", "lmadt": "LMADT.",
  "lmadu": "LMADU.", "lmadv": "LMADV.", "lmadw": "LMADW.", "lmadx": "LMADX.",
  "lmady": "LMADY.", "lmadz": "LMADZ.",
  "lmaea": "LMAEA.", "lmaeb": "LMAEB.", "lmaec": "LMAEC.", "lmaed": "LMAED.",
  "lmaee": "LMAEE.", "lmaef": "LMAEF.", "lmaeg": "LMAEG.", "lmaeh": "LMAEH.",
  "lmaei": "LMAEI.", "lmaej": "LMAEJ.", "lmaek": "LMAEK.", "lmael": "LMAEL.",
  "lmaem": "LMAEM.", "lmaen": "LMAEN.", "lmaeo": "LMAEO.", "lmaep": "LMAEP.",
  "lmaeq": "LMAEQ.", "lmaer": "LMAER.", "lmaes": "LMAES.", "lmaet": "LMAET.",
  "lmaeu": "LMAEU.", "lmaev": "LMAEV.", "lmaew": "LMAEW.", "lmaex": "LMAEX.",
  "lmaey": "LMAEY.", "lmaez": "LMAEZ.",
  "lmafa": "LMAFA.", "lmafb": "LMAFB.", "lmafc": "LMAFC.", "lmafd": "LMAFD.",
  "lmafe": "LMAFE.", "lmaff": "LMAFF.", "lmafg": "LMAFG.", "lmafh": "LMAFH.",
  "lmafi": "LMAFI.", "lmafj": "LMAFJ.", "lmafk": "LMAFK.", "lmafl": "LMAFL.",
  "lmafm": "LMAFM.", "lmafn": "LMAFN.", "lmafo": "LMAFO.", "lmafp": "LMAFP.",
  "lmafq": "LMAFQ.", "lmafr": "LMAFR.", "lmafs": "LMAFS.", "lmaft": "LMAFT.",
  "lmafu": "LMAFU.", "lmafv": "LMAFV.", "lmafw": "LMAFW.", "lmafx": "LMAFX.",
  "lmafy": "LMAFY.", "lmafz": "LMAFZ.",
  "lmaga": "LMAGA.", "lmagb": "LMAGB.", "lmagc": "LMAGC.", "lmagd": "LMAGD.",
  "lmage": "LMAGE.", "lmagf": "LMAGF.", "lmagg": "LMAGG.", "lmagh": "LMAGH.",
  "lmagi": "LMAGI.", "lmagj": "LMAGJ.", "lmagk": "LMAGK.", "lmagl": "LMAGL.",
  "lmagm": "LMAGM.", "lmagn": "LMAGN.", "lmago": "LMAGO.", "lmagp": "LMAGP.",
  "lmagq": "LMAGQ.", "lmagr": "LMAGR.", "lmags": "LMAGS.", "lmagt": "LMAGT.",
  "lmagu": "LMAGU.", "lmagv": "LMAGV.", "lmagw": "LMAGW.", "lmagx": "LMAGX.",
  "lmagy": "LMAGY.", "lmagz": "LMAGZ.",
  "lmaha": "LMAHA.", "lmahb": "LMAHB.", "lmahd": "LMAHD.", "lmahe": "LMAHE.",
  "lmahf": "LMAHF.", "lmahg": "LMAHG.", "lmahi": "LMAHI.", "lmahj": "LMAHJ.",
  "lmahk": "LMAHK.", "lmahm": "LMAHM.", "lmahn": "LMAHN.", "lmaho": "LMAHO.",
  "lmahp": "LMAHP.", "lmahq": "LMAHQ.", "lmahr": "LMAHR.", "lmahs": "LMAHS.",
  "lmaht": "LMAHT.", "lmahu": "LMAHU.", "lmahv": "LMAHV.", "lmahw": "LMAHW.",
  "lmahx": "LMAHX.", "lmahy": "LMAHY.", "lmahz": "LMAHZ.",
  "lmaia": "LMAIA.", "lmaib": "LMAIB.", "lmaic": "LMAIC.", "lmaid": "LMAID.",
  "lmaie": "LMAIE.", "lmaif": "LMAIF.", "lmaig": "LMAIG.", "lmaih": "LMAIH.",
  "lmaii": "LMAII.", "lmaij": "LMAIJ.", "lmaik": "LMAIK.", "lmail": "LMAIL.",
  "lmaim": "LMAIM.", "lmain": "LMAIN.",
  "lmajr": "LMAJR.", "lmajs": "LMAJS.", "lmajt": "LMAJT.", "lmaju": "LMAJU.",
  "lmajv": "LMAJV.", "lmajw": "LMAJW.", "lmajx": "LMAJX.",
  "lsaan": "LSAAN.", "lsaao": "LSAAO.", "lsaap": "LSAAP.", "lsaaq": "LSAAQ.",
  "lsaar": "LSAAR.", "lsaas": "LSAAS.", "lsaat": "LSAAT.", "lsaau": "LSAAU.",
  "lsaav": "LSAAV.", "lsaaw": "LSAAW.", "lsaax": "LSAAX.", "lsaay": "LSAAY.",
  "lsaaz": "LSAAZ.",
  "lsaba": "LSABA.", "lsabb": "LSABB.", "lsabc": "LSABC.", "lsabd": "LSABD.",
  "lsabe": "LSABE.", "lsabf": "LSABF.", "lsabg": "LSABG.",
};

// Auto-generated NAMED_BUNDLES from DLC catalog + original hand-crafted bundles
// Mega 'everything' packs were excluded
const NAMED_BUNDLES = {
  "1st_anniversary": ["thumb_partyhats"],
  "2021_fall": ["face_scarf", "maple_leaf", "turkey_leg", "turkey_finger_puppet"],
  "2021_halloween": [
    "clown_set",
    "mummy_wrap",
    "witch_nose",
    "pirate_bandana",
    "pumpkin_hat",
    "paperbag_hat",
    "vampire_set",
    "werewolf_set",
    "star_princess_set"
  ],
  "2021_holiday": [
    "candy_cane",
    "sparkler",
    "ornament_earrings",
    "2022_glasses",
    "nose_snowflake",
    "snowman_hat",
    "gift_hat",
    "elf_hat",
    "santa_set",
    "rosy_cheeks"
  ],
  "2022_fall": [
    "pink_donut_balloon",
    "turkey_toy",
    "cranberry_can",
    "frying_pan",
    "balloon_turkey",
    "candy_apple",
    "caramel_apple",
    "pie_slice",
    "ladle",
    "turkey_leg_22",
    "pie_hat",
    "corn_on_the_cob",
    "finger_olives",
    "mouth_wheat",
    "scarecrow_hat"
  ],
  "2022_halloween": [
    "bulging_googly_eyes",
    "pumpkin_head_happy",
    "pumpkin_head_scary",
    "slinky_eyes",
    "unicorn_crown",
    "super_hero_headband",
    "unicorn_tutu",
    "unicorn_staff",
    "ghost_balloon",
    "giant_candy_bar",
    "candy_bar_fun_size",
    "spider_web_umbrella",
    "deadshot",
    "yorick",
    "sheriff_set",
    "robot_set",
    "clown_22_set",
    "super_hero_set",
    "unicorn_princess_set"
  ],
  "2022_holiday": [
    "lfabx",
    "lmacj",
    "lsaar",
    "lmacl",
    "lmacb",
    "lmacc",
    "lmack",
    "lhadd",
    "lfaby",
    "lsaap",
    "day_1_pack",
    "lmach",
    "lsaaq",
    "lhadh",
    "lhadg",
    "lmaci",
    "lmacg",
    "lbacj",
    "lmacd"
  ],
  "2022_household": ["regular_wrench", "gold_wrench", "fork_knife", "gold_fork_knife", "cookie_jar", "plunger_hat", "saucepan_hat"],
  "2022_launch": [
    "lhacx",
    "lmaca",
    "lhacw",
    "lhacr",
    "lmabv",
    "lbacg",
    "lmabx",
    "lsaan",
    "lmabw",
    "lmaby",
    "lmabq",
    "lmabs",
    "lmabu",
    "lhacs",
    "lmabt",
    "lbace",
    "lsaao"
  ],
  "2022_music": [
    "forehead_egg",
    "black_longhair_wig",
    "red_longhair_wig",
    "lightning_makeup",
    "bongos",
    "drum_set",
    "electro_helm",
    "acoustic_guitar",
    "golden_acoustic_guitar",
    "electric_guitar",
    "golden_electric_guitar"
  ],
  "2022_paintbrawl": [
    "star_balloon",
    "paintball_snow_vest",
    "paintball_forest_vest",
    "paintball_forest_visor",
    "paintball_snow_visor",
    "paintball_gorilla_visor",
    "rockin_mohawk",
    "spiked_armor",
    "gorilla_armor",
    "cardboard_armor",
    "stickable_tar_get",
    "cardboard_armor_set",
    "spiked_armor_set"
  ],
  "2022_rainy": [
    "yellow_rain_hat",
    "yellow_hand_boots",
    "cloud_hand_boots",
    "golden_hand_boots",
    "pocket_gorilla_bun_pink",
    "pocket_gorilla_bun_blue",
    "pocket_gorilla_bun_yellow",
    "painted_egg_hat",
    "yellow_rain_shawl",
    "blue_umbrella",
    "colorful_umbrella",
    "golden_umbrella"
  ],
  "2022_spring": [
    "white_bunny_ears",
    "brown_bunny_ears",
    "bite_onion",
    "emperor_nose_butterfly",
    "four_leaf_clover",
    "golden_four_leaf_clover",
    "leprechaun_hat",
    "blue_lily_hat",
    "purple_lily_hat",
    "cherry_blossom",
    "cherry_blossom_rose",
    "yellow_rain_hat",
    "painted_egg_hat",
    "pocket_gorilla_bun_yellow",
    "pocket_gorilla_bun_blue",
    "pocket_gorilla_bun_pink"
  ],
  "2022_summer": [
    "bubbler",
    "popsicle",
    "rubber_duck",
    "seagull",
    "blue_shutters",
    "black_shutters",
    "green_shutters",
    "red_shutters",
    "sunburn",
    "sunscreen",
    "spilled_ice_cream",
    "flamingo_floatie",
    "star_balloon"
  ],
  "2022_valentines": ["box_of_chocolates_hat", "heart_pompom_hat", "heart_glasses", "chest_heart", "red_rose", "pink_rose", "black_rose", "gold_rose"],
  "2022_winter": [
    "orange_pompom_hat",
    "rosy_cheeks",
    "blue_pompom_hat",
    "stripe_pompom_hat",
    "pattern_pompom_hat",
    "white_earmuffs",
    "black_earmuffs",
    "green_earmuffs",
    "pink_earmuffs",
    "icicle"
  ],
  "2023_2nd_winter": [
    "lface",
    "lmacz",
    "lmada",
    "lmadf",
    "lhado",
    "lbacv",
    "lmadj",
    "lmadg",
    "lhadp",
    "lbacw",
    "lmadk",
    "lmadb",
    "lmadc",
    "lhadn",
    "lbact",
    "lhadq",
    "lbacu",
    "lsaat",
    "lmadd",
    "lmadh",
    "lmade"
  ],
  "2023_back_to_school": [
    "lmaft",
    "lmagc",
    "lhaep",
    "lfadb",
    "lmafy",
    "lmafu",
    "lhaeo",
    "lfada",
    "lbadz",
    "lhaen",
    "lfadc",
    "lmaga",
    "lbadw",
    "lmafv",
    "lbady",
    "lfadd",
    "lmafz",
    "lmafx",
    "lbadx",
    "lmafw"
  ],
  "2023_basement": [
    "lsaax",
    "lmadr",
    "lmadn",
    "lfacj",
    "lmadu",
    "lbada",
    "lsaaw",
    "lmadt",
    "lsaay",
    "lhadu",
    "lmadm",
    "lsaav",
    "lmadv"
  ],
  "2023_crystal_caverns": [
    "lmafj",
    "lfacq",
    "lbadr",
    "lbads",
    "lhaej",
    "lbadt",
    "lmafk",
    "lmafl",
    "lmafm",
    "lbadu",
    "lhaek",
    "lmafp",
    "lmafq",
    "lmafr",
    "lfact",
    "lfacu",
    "lfacv",
    "lfacw",
    "lfacs",
    "lfacx",
    "lfacy",
    "lfacz",
    "lmafo",
    "lfacr",
    "lhael",
    "lmafs"
  ],
  "2023_lava": [
    "lhaer",
    "lmagi",
    "lhaeq",
    "lmagg",
    "lbaea",
    "lmagf",
    "lmagm",
    "lmagk",
    "lmago",
    "lmagj",
    "lhaes",
    "lbaec",
    "lmagl",
    "lmagp",
    "lhaet",
    "lbaee",
    "lmagq",
    "lhaeu",
    "lbaed"
  ],
  "2023_spring_cleaning": [
    "lmaeb",
    "lmaec",
    "lbadc",
    "lmadx",
    "lmaea",
    "lmaeg",
    "lhady",
    "lmaej",
    "lmady",
    "lbadd",
    "lhadw",
    "lfack",
    "lmaee",
    "lmaed",
    "lhadz",
    "lmaeh",
    "lmadw",
    "lmaef",
    "lmadz",
    "lhadx",
    "lmaei",
    "lmaek",
    "lmaem",
    "lhaea",
    "lfacl",
    "lhaeb",
    "lmaen",
    "lmael"
  ],
  "2023_summer_celebration": [
    "lmafa",
    "lbado",
    "lmafb",
    "lfaco",
    "lmafc",
    "lbadp",
    "lmaez",
    "lmafe",
    "lmaff",
    "lmafg",
    "lmafd",
    "lfacp",
    "lhaef",
    "lsabb",
    "lhaei",
    "lmafh",
    "lhaeh",
    "lmafi",
    "lbadq"
  ],
  "2023_summer_splash": [
    "lbadm",
    "lmaet",
    "lhaee",
    "lbadi",
    "lbadl",
    "lmaeq",
    "lbadh",
    "lsaaz",
    "lbadk",
    "lhaec",
    "lfacm",
    "lhaed",
    "lmaer",
    "lmaep",
    "lmaes"
  ],
  "2023_valentines": ["lbacs", "lhadm", "lmacw", "lmacv", "lmacy"],
  "2023_winter": ["lfacb", "lmacp", "lmaco", "lbaco", "lfacc", "lmacn", "lbacn", "lhadi"],
  "2nd_anniversary": ["lbacq", "lmact"],
  "cardboard_armor_set": ["cardboard_armor", "cardboard_helmet"],
  "christmas_bundle": ["santa_hat", "snowman_hat", "gift_hat", "elf_hat", "santa_beard", "santa_set", "ornament_earrings"],
  "clown_22_set": ["clown_cap", "clown_nose_22", "clown_vest"],
  "clown_set": ["clown_wig", "clown_nose", "clown_frill"],
  "day_1_pack": ["lbacf", "lmabz", "lhada"],
  "founder_bundle": ["early_access_badge", "golden_head", "admin_badge"],
  "lsaan": ["lhacu", "lbacc", "lmabr"],
  "lsaao": ["lhact", "lbacb"],
  "lsaap": ["lhade", "lbach", "lfabz"],
  "lsaaq": ["lhadf", "lbaci"],
  "lsaar": ["lhadc", "lback", "lfaca"],
  "lsaas": ["lbacr", "lmacx", "lmacu"],
  "lsaat": ["lmadi", "lfacf"],
  "lsaau": ["lmadl"],
  "lsaav": ["lhadr", "lfacg", "lbacx"],
  "lsaaw": ["lhads", "lmado", "lbacy"],
  "lsaax": ["lhadv", "lbacz"],
  "lsaay": ["lhadt", "lfach", "lmadp"],
  "lsaaz": ["lbadf", "lbadg"],
  "lsaba": ["lbadj", "lmaeo", "lfacn"],
  "lsabb": ["lhaeg", "lbadn"],
  "lsabc": ["lhaem", "lbadv", "lmafn"],
  "lsabd": ["lhaev", "lbaef", "lmagr"],
  "lsabe": ["lmahj", "lhafg", "lbaes"],
  "lsabf": ["lmahu", "lhafj", "lbaeu"],
  "lsabg": ["lbafi", "lmaig", "lhafk"],
  "roblox_fan_bundle": ["roblox_hammer", "banana", "rainbow_dominus", "owner_dominus"],
  "robot_set": ["robot_body", "robot_head"],
  "santa_set": ["santa_beard", "santa_hat"],
  "sheriff_set": ["sheriff_hat", "sheriff_mustache", "sheriff_vest"],
  "spiked_armor_set": ["spiked_armor", "spiked_helmet"],
  "spooky_bundle": ["witch_hat", "pumpkin_hat", "clown_wig", "vampire_wig", "werewolf_ears", "clown_set", "vampire_set", "werewolf_set"],
  "star_princess_set": ["star_princess_tiara", "star_princess_glasses", "star_princess_wand"],
  "starter_bundle": ["banana_hat", "cat_ears", "party_hat", "baseball_cap"],
  "super_hero_set": ["super_hero_body", "super_hero_headband"],
  "trails_bundle": ["rainbow_trail", "purple_trail", "red_trail", "blue_trail", "green_trail"],
  "unicorn_princess_set": ["unicorn_crown", "unicorn_tutu"],
  "vampire_set": ["vampire_wig", "vampire_fangs", "vampire_collar"],
  "werewolf_set": ["werewolf_ears", "werewolf_face", "werewolf_claws"],
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
//  PLAYFAB SERVER API
//  The secret key MUST stay server-side. Never ship it to a client.
// ─────────────────────────────────────────────────────────────
const PLAYFAB_TITLE_ID = process.env.PLAYFAB_TITLE_ID;
const PLAYFAB_SECRET_KEY = process.env.PLAYFAB_SECRET_KEY;
const PLAYFAB_CATALOG_VERSION = process.env.PLAYFAB_CATALOG_VERSION || "";

async function playFabServer(path, body) {
  if (!PLAYFAB_TITLE_ID || !PLAYFAB_SECRET_KEY) {
    const err = new Error(
      "PlayFab credentials are not configured (PLAYFAB_TITLE_ID / PLAYFAB_SECRET_KEY)."
    );
    err.code = "NO_CREDS";
    throw err;
  }

  const resp = await fetch(
    `https://${PLAYFAB_TITLE_ID}.playfabapi.com/Server/${path}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SecretKey": PLAYFAB_SECRET_KEY,
      },
      body: JSON.stringify(body),
    }
  );

  let json = null;
  try { json = await resp.json(); } catch { /* non-JSON body */ }

  // PlayFab returns HTTP 200 even for API errors — check `code`.
  const apiCode = json?.code;
  if (!resp.ok || (typeof apiCode === "number" && apiCode !== 200)) {
    const msg =
      json?.errorMessage ||
      json?.error?.errorMessage ||
      `PlayFab HTTP ${resp.status}`;
    const err = new Error(msg);
    err.code = json?.errorCode || apiCode || resp.status;
    err.playfab = json;
    throw err;
  }

  return json?.data ?? {};
}

/**
 * Grant a list of ItemIds to a PlayFab player.
 * Tries one batched call first (fast). If ANY item id is bad PlayFab rejects
 * the whole batch, so we fall back to granting them a few at a time and
 * report exactly which ones landed.
 *
 * @returns {{ granted: string[], failed: {id:string,error:string}[] }}
 */
async function grantItemsToUser(playFabId, itemIds) {
  const unique = [...new Set(itemIds.filter(Boolean))];
  if (unique.length === 0) return { granted: [], failed: [] };

  const base = {
    PlayFabId: playFabId,
    Annotation: "Code redemption",
  };
  if (PLAYFAB_CATALOG_VERSION) base.CatalogVersion = PLAYFAB_CATALOG_VERSION;

  // ── Fast path: single batched grant ──
  try {
    await playFabServer("GrantItemsToUser", { ...base, ItemIds: unique });
    return { granted: unique, failed: [] };
  } catch (batchErr) {
    console.warn("[redeem] batch grant failed, falling back to per-item:", batchErr.message);

    // ── Slow path: chunked individual grants ──
    const granted = [];
    const failed = [];
    const CHUNK = 5;

    for (let i = 0; i < unique.length; i += CHUNK) {
      const slice = unique.slice(i, i + CHUNK);
      const results = await Promise.all(
        slice.map(async (id) => {
          try {
            await playFabServer("GrantItemsToUser", { ...base, ItemIds: [id] });
            return { id, ok: true };
          } catch (e) {
            return { id, ok: false, error: e.message };
          }
        })
      );

      for (const r of results) {
        if (r.ok) granted.push(r.id);
        else {
          failed.push({ id: r.id, error: r.error });
          console.warn(`[redeem] could not grant "${r.id}":`, r.error);
        }
      }

      if (i + CHUNK < unique.length) await sleep(200); // be gentle on rate limits
    }

    if (granted.length === 0) {
      const err = new Error("No items could be granted.");
      err.code = "GRANT_ALL_FAILED";
      err.batchError = batchErr.message;
      err.failed = failed;
      throw err;
    }

    return { granted, failed };
  }
}

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

    // Who are we granting to?
    // Prefer an explicit PlayFabId; otherwise assume the client passed its
    // PlayFabId as `userId`.
    const targetPlayFabId =
      (typeof playFabId === "string" && playFabId.trim()) ||
      (typeof userId === "string" && userId.trim()) ||
      "";

    if (!targetPlayFabId) {
      return res.status(400).json({ success: false, message: "Missing PlayFab ID." });
    }

    if (!playFabId) {
      console.warn(
        "[redeem] no playFabId supplied — falling back to userId. " +
        "Make sure your client sends the PlayFabId from its login result."
      );
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

    // ── Per-user dedupe ──
    const userKey = `${normalized}:${userId}`;
    if (REDEEMED.has(userKey)) {
      return res.status(200).json({
        success: false,
        message: "You already redeemed this code.",
      });
    }

    // ── Global use cap ──
    if (entry.maxUses != null) {
      const used = USES.get(normalized) || 0;
      if (used >= entry.maxUses) {
        return res.status(200).json({
          success: false,
          message: "This code has reached its limit.",
        });
      }
    }

    // Reserve the slot so a double-click can't double-grant.
    REDEEMED.set(userKey, Date.now());

    // ── Actually deliver the goods ──
    let grant;
    try {
      grant = await grantItemsToUser(targetPlayFabId, cosmetics);
    } catch (grantErr) {
      // Roll back the reservation so they can retry.
      REDEEMED.delete(userKey);

      console.error("[redeem] PlayFab grant failed:", grantErr);

      if (grantErr.code === "NO_CREDS") {
        return res.status(500).json({
          success: false,
          message: "Server is not configured to grant items. Contact an admin.",
        });
      }

      return res.status(200).json({
        success: false,
        message: "We couldn't deliver your items right now. Please try again in a moment.",
        details: process.env.NODE_ENV === "production" ? undefined : grantErr.message,
      });
    }

    // Commit the use cap only after a successful grant.
    if (entry.maxUses != null) {
      const used = USES.get(normalized) || 0;
      USES.set(normalized, used + 1);
    }

    const n = grant.granted.length;
    const defaultMsg = `Unlocked ${n} cosmetic${n === 1 ? "" : "s"}! Restart Milk Tag to see them.`;

    return res.status(200).json({
      success: true,
      message: entry.message
        ? `${entry.message} Restart Milk Tag to see your items.`
        : defaultMsg,
      cosmetics: grant.granted,
      ...(grant.failed.length > 0 && {
        skipped: grant.failed.map((f) => f.id),
        warning: `${grant.failed.length} item(s) could not be delivered.`,
      }),
    });
  } catch (err) {
    console.error("Redeem error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
}
