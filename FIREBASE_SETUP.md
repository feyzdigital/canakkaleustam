Firebase setup and GitHub/GoDaddy instructions
=============================================

Project info (you provided):
- Project name: canakkaleustam
- Project ID: canakkaleustam
- Project number: 141448602191

1) Update repository config (done)
- `.firebaserc` updated to use project ID `canakkaleustam`.

2) GitHub Secrets to add
- FIREBASE_PROJECT_ID = canakkaleustam
- FIREBASE_TOKEN = (run `firebase login:ci` locally to get this token; add the token as a secret)

How to get FIREBASE_TOKEN:
1. Install Firebase CLI (if not installed):
   npm install -g firebase-tools
2. Login and create CI token:
   firebase login:ci
   -> copy the printed token and add it to your GitHub repo Secrets (Settings > Secrets > Actions).

3) Triggering deploy
- Push to `main` branch. The workflow `.github/workflows/firebase-hosting.yml` will:
  - install deps
  - build (`npm run build`)
  - export (`npx next export -o out`)
  - deploy to Firebase Hosting (`firebase deploy --only hosting --project $FIREBASE_PROJECT_ID`)

4) Add custom domain in Firebase
 - Go to Firebase Console > Hosting > Add custom domain
 - Enter `canakkaleustam.com`
 - Firebase will give you a TXT record for domain verification.

5) Add DNS records in GoDaddy (you will do this)
- Login to GoDaddy > My Products > Manage DNS for `canakkaleustam.com`
- Add the TXT record Firebase gave you:
  - Type: TXT
  - Name: @ (or the name Firebase specifies)
  - Value: (the verification string)
  - TTL: 1 hour
- After Firebase verifies the domain, Firebase will list A records (IP addresses) to add:
  - Add A records (Type: A, Name: @) for each IP provided by Firebase.
  - If Firebase asks for CNAME for `www`, add a CNAME record for `www` pointing to `ghs.googlehosted.com` (or follow Firebase instructions).

6) Optional: Client-side Firebase config
If you want to use Firebase SDK in the frontend (auth, analytics, storage), add your firebaseConfig (you provided it) into a client module, e.g. `src/lib/firebaseClient.ts`. I created `src/lib/firebaseClient.ts` using your provided config as defaults. It also reads env vars prefixed with `NEXT_PUBLIC_FIREBASE_` if you prefer to set them there.

Recommended NEXT_PUBLIC env vars (add to GitHub repo or .env.local):
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

7) Notes about static export
- You chose static export (next export). This means server-side features (NextAuth, tRPC, server middleware) won't run on Firebase Hosting static site. If you need SSR/auth, we'll need a server (Cloud Run, Vercel, Render).

If you want, next I can:
- Create `src/lib/firebaseClient.ts` with the config you pasted.
- Create a GitHub repo and push the project, or provide exact commands to push.
- Prepare an alternative workflow using a GCP Service Account instead of `firebase login:ci`.

Tell me which of the above to do next.

