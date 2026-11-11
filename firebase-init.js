
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAuRUFgpLajP4XUSB-KwuThKCuYQ0cldI",
  authDomain: "project-ce9fcef6-6b2d-45b6-874.firebaseapp.com",
  projectId: "project-ce9fcef6-6b2d-45b6-874",
  storageBucket: "project-ce9fcef6-6b2d-45b6-874.firebasestorage.app",
  messagingSenderId: "946451978244",
  appId: "1:946451978244:web:ec5182fa221586f2757d51"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

console.log("MiniDrama Firebase initialized:", app.options.projectId);
