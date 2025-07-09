import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBA9p69FzX6qzWrtHg4AOX1k3ZEwOvwkGk",
  authDomain: "server-jamugenji.firebaseapp.com",
  databaseURL: "https://server-jamugenji-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "server-jamugenji",
  storageBucket: "server-jamugenji.firebasestorage.app",
  messagingSenderId: "618729618120",
  appId: "1:618729618120:web:36d558c96f534d48a783fd",
  measurementId: "G-JTCL4TT0K3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
