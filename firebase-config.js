var firebaseConfig = {
  apiKey: "AIzaSyCfOqxMMIoKrE2o_J1Llc7k-cbfuz-_Uh0",
  authDomain: "jisan-portfolio.firebaseapp.com",
  projectId: "jisan-portfolio",
  storageBucket: "jisan-portfolio.firebasestorage.app",
  messagingSenderId: "421914705780",
  appId: "1:421914705780:web:835e90891bc5b35e867621"
};

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
