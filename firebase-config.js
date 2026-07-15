/* =========================================================
   FIREBASE CONFIGURATION
   ---------------------------------------------------------
   1. Go to https://console.firebase.google.com and create a
      free project (or use an existing one).
   2. Add a "Web app" to the project (</> icon on the project
      overview page) and copy the config object it gives you.
   3. Paste the values below, replacing the placeholders.
   4. Enable "Firestore Database" (Build > Firestore Database
      > Create database, start in production mode).
   5. Enable "Authentication" > Sign-in method > Email/Password
      (only needed for admin.html — see README.md).
   6. Copy the rules from firestore.rules into the Firestore
      "Rules" tab and publish them.
   ========================================================= */

var firebaseConfig = {
  apiKey: "AIzaSyCfOqxMMIoKrE2o_J1Llc7k-cbfuz-_Uh0",
  authDomain: "jisan-portfolio.firebaseapp.com",
  projectId: "jisan-portfolio",
  storageBucket: "jisan-portfolio.firebasestorage.app",
  messagingSenderId: "421914705780",
  appId: "1:421914705780:web:835e90891bc5b35e867621"
};

// Initialize Firebase (compat SDK, loaded via <script> tags in the HTML).
// Wrapped defensively so the rest of the site still works — with graceful
// "coming soon" placeholders — if the SDK didn't load (offline, blocked, or
// the config above hasn't been filled in yet).
var db = null;
try {
  if (typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase did not initialize:", e);
  db = null;
}
