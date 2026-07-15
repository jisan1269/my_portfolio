# Mehfujur Rahman Jisan — Portfolio

A dark/light, animated, Firebase-backed personal portfolio.

## Files

| File | Purpose |
|---|---|
| `index.html` | The public site |
| `admin.html` | Password-protected dashboard to add your photo, CV link, projects, research, recognition, certifications, and read contact messages |
| `styles.css` | All visual design (theme, layout, animation) |
| `admin.css` | Extra styling just for the admin dashboard |
| `script.js` | Public site logic (theme toggle, nav, Firestore rendering, contact form) |
| `admin.js` | Admin dashboard logic (login, add/delete content) |
| `firebase-config.js` | **You need to edit this** — your Firebase project keys |
| `firestore.rules` | Security rules to paste into Firebase |

The site works and looks complete even before you touch Firebase (everything shows tasteful "coming soon" placeholders). Once you connect Firebase, the admin panel lets you fill everything in without editing code again.

## 1. Create a Firebase project (free)

1. Go to https://console.firebase.google.com → **Add project** → follow the prompts (Google Analytics is optional, you can skip it).
2. On the project overview page, click the **`</>`** (web) icon to register a web app. Give it any nickname.
3. Firebase will show you a `firebaseConfig` object. Copy it.
4. Open `firebase-config.js` in this folder and paste your values in, replacing the placeholders (`YOUR_API_KEY`, etc.).

## 2. Turn on Firestore Database

1. In the left menu: **Build → Firestore Database → Create database**.
2. Choose a region close to you, start in **production mode**.
3. Go to the **Rules** tab, delete the default contents, and paste in everything from `firestore.rules` in this folder. Click **Publish**.

## 3. Turn on Authentication (so only you can edit content)

1. **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user** → enter the email and password you want to log into `admin.html` with. (This is *your* login only — visitors never see this.)

## 4. Host the site

Any static host works — GitHub Pages, Netlify, Vercel, Firebase Hosting itself, etc. Just upload/deploy the whole folder. Because it's plain HTML/CSS/JS, there's no build step.

- `index.html` → your public portfolio (this is the link you share)
- `admin.html` → your private dashboard (don't link to it from the public site; just bookmark it yourself, e.g. `yoursite.com/admin.html`)

## 5. Add your content

Open `admin.html`, log in with the email/password you created in step 3, and you can:

- **Site settings** — paste your photo URL, CV URL, and work-portfolio URL (host the actual image/PDF anywhere you like — e.g. Firebase Storage, Google Drive "anyone with the link" share, imgur, etc. — and paste the direct link here). Also set your live Codeforces/CodeChef solved counts.
- **Projects** — add each project's title, description, tags/languages, GitHub link, and optional live demo link.
- **Research** — add entries once you start publishing; until then the site shows an "in progress" note automatically.
- **Recognition** — add awards or leadership roles as they happen.
- **Certifications** — add courses/certificates with an optional link to the certificate image/PDF.
- **Messages** — read messages sent through your public contact form, mark them read, or delete them.

Everything appears on the live site immediately — no redeploy needed, since it's all read from Firestore at page load.

## Notes on the photo animation

The hero photo sits inside a rotating gradient "compile ring" with a soft morphing frame, a scanning highlight, and small orbiting nodes — this shows even before you add a photo (using your initials as a placeholder), so once you paste a photo URL in the admin panel it simply appears inside the same animated frame.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). No build tools, frameworks, or npm install required — just open `index.html` or upload the folder to any static host.
