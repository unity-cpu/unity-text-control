# Unity Text Control — Vercel + Supabase

This project lets you type text into a Vercel website and have a Unity TextMeshPro object automatically change to that text.

## How it works

Browser
  -> Vercel `/api/set-text`
  -> Supabase `unity_text` row
  -> Unity polls `/api/get-text`
  -> TextMeshPro changes

The text is stored in Supabase, so it does not depend on Vercel server memory.

---

# PART 1 — Create the Supabase database

1. Go to https://supabase.com/
2. Create a Supabase project.
3. Open your project.
4. Open **SQL Editor**.
5. Create a new query.
6. Copy everything from `supabase.sql` into the query.
7. Run it.
8. The table `public.unity_text` should now exist with one row whose `id` is `1`.

---

# PART 2 — Get your Supabase API information

In Supabase:

1. Open **Project Settings**.
2. Open **API**.
3. Copy the **Project URL**.
4. Find the **service_role** secret key.

IMPORTANT:
- The service-role key is PRIVATE.
- Never put it inside Unity.
- Never put it directly into `public/index.html`.
- Never commit it into GitHub.

---

# PART 3 — Put this project on GitHub

Upload all files in this folder to your GitHub repository.

The repository should look like:

unity-text-control/
  api/
    _supabase.js
    get-text.js
    set-text.js
  public/
    index.html
  unity/
    UnityTextController.cs
  supabase.sql
  package.json
  vercel.json
  README.md

---

# PART 4 — Import into Vercel

1. Go to https://vercel.com/
2. Choose **Add New -> Project**.
3. Import your GitHub repository.
4. Deploy it.

No build command is needed.

---

# PART 5 — Add Vercel environment variables

Open:

Vercel Project
-> Settings
-> Environment Variables

Create these three variables:

SUPABASE_URL
Value: your Supabase Project URL

SUPABASE_SERVICE_ROLE_KEY
Value: your Supabase service_role key

CONTROL_KEY
Value: make up a long private password/key

Example CONTROL_KEY:

ChangeThisToYourOwnLongRandomKey123!

Do not use that example in a real project.

Enable the variables for Production, and Preview/Development if you want those deployments to work too.

Then redeploy the project.

---

# PART 6 — Test the API

Open this in your browser:

https://YOUR-PROJECT.vercel.app/api/get-text

You should see JSON similar to:

{"id":1,"text":"Hello from Unity!","updated_at":"..."}

If you see an error about environment variables, check the Vercel Environment Variables and redeploy.

---

# PART 7 — Use the website

Open:

https://YOUR-PROJECT.vercel.app/

Enter your text.

Enter the same value you used for CONTROL_KEY.

Press:

Update Unity Text

The text is now saved in Supabase.

---

# PART 8 — Add the Unity script

1. Open your Unity project.
2. Make sure TextMeshPro is available.
3. Copy `unity/UnityTextController.cs` into your Unity project's `Assets/Scripts/` folder.
4. In Unity, create or select a GameObject.
5. Add the `UnityTextController` component.
6. Create/select a TextMeshPro UI text object.
7. Drag the TextMeshPro object into the component's `Target Text` field.
8. Set `Api Url` to:

https://YOUR-PROJECT.vercel.app/api/get-text

9. Press Play.

Unity will check approximately once per second.

---

# PART 9 — Test it

With Unity running:

1. Open your Vercel website.
2. Type:

Hello Unity!

3. Enter your CONTROL_KEY.
4. Click Update Unity Text.
5. Within about one second, the Unity TextMeshPro object should say:

Hello Unity!

Change the website text again and Unity will update again.

---

# Troubleshooting

## Website says "Invalid control key"

The website key must exactly match the Vercel `CONTROL_KEY` environment variable.

After changing environment variables, redeploy.

## `/api/get-text` returns an error

Check:

SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

Make sure the Supabase project still exists and the SQL was executed.

## Unity says request failed

Open the `/api/get-text` URL in a normal browser first.

If the browser returns JSON, check the Unity `apiUrl` for typos.

## Unity text does not change

Make sure:

- `Target Text` is assigned.
- The Unity component is enabled.
- Unity is in Play mode.
- The Vercel URL is correct.
- `/api/get-text` returns the new text.

## GitHub security

Never commit:

- `.env`
- Supabase service-role keys
- private control keys

The Vercel environment variables should hold the secrets.

---

# Optional security improvement

The GET endpoint is intentionally public because Unity needs to read it without exposing a secret inside the Unity game.

If the text itself is sensitive, use a separate authenticated server architecture rather than putting a secret in the Unity client. Anything shipped inside a Unity game can potentially be extracted by someone who has the game.

---

# Done

Once deployed, the system is:

Website -> Vercel -> Supabase -> Unity

and the stored text survives Vercel function restarts.
