// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 重新啟用 Firestore
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZmVR8uK8qkHlnJ8FU6BFRW4V-vxXSS6I",
  authDomain: "catcher-26e1d.firebaseapp.com",
  databaseURL: "https://catcher-26e1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catcher-26e1d",
  storageBucket: "catcher-26e1d.firebasestorage.app",
  messagingSenderId: "483645051805",
  appId: "1:483645051805:web:571cfa24ef6ceba1601574",
  measurementId: "G-5E3LM7QF00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // 僅瀏覽器端可用，Node.js 執行會出錯
const db = getFirestore(app); // Firestore database - 重新啟用
const realtimeDb = getDatabase(app); // Realtime Database
const auth = getAuth(app);
const storage = getStorage(app);

export { db, realtimeDb, auth, storage };
export default app;
