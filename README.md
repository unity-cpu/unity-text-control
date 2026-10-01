# Gorilla Code Redeem — Vercel API

This project provides the endpoint used by the Unity `GorillaComputer` redemption code:

`POST /api/redeem`

## 1. Deploy to Vercel

Upload this folder to GitHub, import the repository into Vercel, and deploy.

No build command is required.

## 2. Add your codes

In Vercel, open:

**Project → Settings → Environment Variables**

Create:

**Name**
`REDEEM_CODES`

**Value**
```json
{"welcome2026":{"cosmetics":["cosmetic_hat_01"],"message":"WELCOME!","active":true}}
```

You can add multiple codes:

```json
{
  "welcome2026": {
    "cosmetics": ["cosmetic_hat_01", "cosmetic_badge_01"],
    "message": "WELCOME!",
    "active": true
  },
  "summer2026": {
    "cosmetics": ["summer_hat"],
    "message": "SUMMER CODE REDEEMED!",
    "active": true,
    "expiresAt": "2026-12-31T23:59:59.000Z"
  }
}
```

Because this is JSON stored in an environment variable, paste it as one line in Vercel.

After changing the variable, redeploy the project so the new environment variable is available to the function.

## 3. Put the Vercel URL into Unity

Change:

```csharp
public string cosmeticApiUrl = "https://YOUR-PROJECT.vercel.app/api/redeem";
```

to your actual deployment:

```csharp
public string cosmeticApiUrl = "https://your-project.vercel.app/api/redeem";
```

Your existing Unity request already sends:

```json
{
  "code": "welcome2026",
  "userId": "...",
  "playFabId": "..."
}
```

and the API returns:

```json
{
  "success": true,
  "message": "WELCOME!",
  "cosmetics": ["cosmetic_hat_01"]
}
```

## Important: one-time redemption

The Unity code currently prevents the same code from being redeemed twice on the same local installation by using:

`PlayerPrefs` → `redeemed_<code>`

That is NOT server-enforced. A user who clears PlayerPrefs or changes devices could submit the code again.

For real one-time codes, add a persistent database such as Redis/Upstash and atomically store a record keyed by:

`code + userId`

or:

`code + playFabId`

The server should perform the check and write atomically before returning success.

## Cosmetic IDs

The strings returned in `cosmetics` must match whatever IDs your cosmetic system understands.

For example:

```json
["cosmetic_hat_01", "cosmetic_badge_01"]
```

Your Unity event:

```csharp
OnCosmeticsRedeemed?.Invoke(cosmetics);
```

can then be handled by your cosmetic manager.

## Security

Do not put the `REDEEM_CODES` value, database credentials, or any server secret in the Unity client.

The client can send `userId` and `playFabId`, but the server should not trust those values as proof of identity if you need strong anti-abuse protection. For a production system, verify the account with an authenticated backend/PlayFab flow.

## Quick test

After deployment, a POST request to:

`https://YOUR-PROJECT.vercel.app/api/redeem`

with:

```json
{
  "code": "welcome2026",
  "userId": "test-user",
  "playFabId": "test-playfab"
}
```

should return:

```json
{
  "success": true,
  "message": "WELCOME!",
  "cosmetics": ["cosmetic_hat_01"]
}
```
