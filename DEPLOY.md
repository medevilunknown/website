# Deploying OPYO STUDIO to opyostudio.com

**Site:** Cloudflare Pages (static React SPA) → `opyostudio.com`
**API:** FastAPI on Render (Docker) → `api.opyostudio.com`
**DB:** MongoDB Atlas (free tier)

Everything below is one-time setup. After it, `git push` auto-deploys both.

---

## 0. Prerequisites
- The repo is on GitHub (push this repo first).
- `opyostudio.com` is added to your **Cloudflare** account (nameservers pointed to Cloudflare). DNS is then managed in Cloudflare.

---

## 1. Database — MongoDB Atlas
1. Create a free cluster at https://cloud.mongodb.com.
2. Database Access → add a user (user/password).
3. Network Access → allow `0.0.0.0/0` (or Render's egress IPs).
4. Copy the connection string:
   `mongodb+srv://USER:PASS@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`

## 2. Backend — Render
1. https://render.com → **New → Blueprint** → pick this repo. It reads
   [`backend/render.yaml`](backend/render.yaml) and creates the `opyo-api` service
   (Docker, free plan, health check `/api/health`).
2. In the service **Environment**, set:
   - `MONGO_URL` = the Atlas URI from step 1
   - `DB_NAME` = `opyo`
   - `CORS_ORIGINS` = `https://opyostudio.com,https://www.opyostudio.com`
3. Deploy. Confirm `https://opyo-api.onrender.com/api/health` returns `{"status":"ok"}`.
4. Render → Settings → **Custom Domain** → add `api.opyostudio.com`. Render shows a
   CNAME target (e.g. `opyo-api.onrender.com`) — used in DNS below.

## 3. Frontend — Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → this repo.
2. Build settings:
   - **Root directory:** `frontend`
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Environment variables:**
     - `REACT_APP_BACKEND_URL` = `https://api.opyostudio.com`
     - `NODE_VERSION` = `20`
3. Deploy. SPA deep links (`/brand`) work via [`frontend/public/_redirects`](frontend/public/_redirects).
4. Pages → **Custom domains** → add `opyostudio.com` **and** `www.opyostudio.com`.
   Cloudflare auto-creates the records (apex via CNAME flattening).

## 4. DNS (Cloudflare → opyostudio.com → DNS)
Pages adds the apex/www records for you when you attach the custom domains. You only
add the API record manually:

| Type  | Name  | Target                        | Proxy |
|-------|-------|-------------------------------|-------|
| CNAME | `api` | `opyo-api.onrender.com`       | ON    |
| CNAME | `@`   | *(auto — added by Pages)*     | ON    |
| CNAME | `www` | *(auto — added by Pages)*     | ON    |

> If you host the API somewhere other than Render, point `api` at that host's target instead.

## 5. Verify
- `https://opyostudio.com` loads the hub.
- `https://opyostudio.com/brand` loads the brand book (no 404 on refresh).
- Careers form submit succeeds (writes to Atlas → `career_applications`).
- `https://api.opyostudio.com/api/health` → `{"status":"ok"}`.

---

## Notes
- The site works **without** the backend too (People falls back to local data; only
  the Careers submit needs the API).
- Update the real social handles in [`frontend/src/components/Socials.jsx`](frontend/src/components/Socials.jsx)
  before launch (currently placeholder `opyostudio` handles).
- Alternate one-off frontend deploy without Git:
  `cd frontend && npm run build && npx wrangler pages deploy build --project-name opyo-studio`
  (needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).
