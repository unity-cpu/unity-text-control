# Unity Text Control

This project is a Vercel-hosted control panel intended to send text to Unity.

## Important

Vercel serverless functions are stateless. The included API is a starter and does not permanently store updates.

For a fully persistent production version, connect `/api/set-text.js` and `/api/get-text.js` to Supabase, Vercel KV/Redis, or another database.

## Deploy

1. Upload this folder to GitHub.
2. Import the repository into Vercel.
3. Add an environment variable named `CONTROL_KEY`.
4. Set it to a private random value.
5. Deploy.

## Unity

1. Open your Unity project.
2. Install/use TextMeshPro.
3. Add `unity/UnityTextController.cs` to a GameObject.
4. Drag your TextMeshPro UI text into `Target Text`.
5. Change `apiUrl` to your deployed `/api/get-text` URL.
