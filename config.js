import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyCuajxjOmAga91XU70_bJTxFIujFsaTIh8",
  authDomain: "todo-app-24868.firebaseapp.com",
  projectId: "todo-app-24868",
  storageBucket: "todo-app-24868.appspot.com",
  messagingSenderId: "925534891200",
  appId: "1:925534891200:web:4379e352c88518d325d125",
  measurementId: "G-T91K6L3RLJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);