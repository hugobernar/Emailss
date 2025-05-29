// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4e2HH1zM2Wgl8wz8rGKsN0GxZEhPSRg",
  authDomain: "e-mail-corporativo-7f6ab.firebaseapp.com",
  projectId: "e-mail-corporativo-7f6ab",
  storageBucket: "e-mail-corporativo-7f6ab.appspot.com",
  messagingSenderId: "604611638386",
  appId: "1:604611638386:web:7e2dc25b2c146bd9224b",
  measurementId: "G-NS1MGXK92V"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore
export const db = getFirestore(app);
