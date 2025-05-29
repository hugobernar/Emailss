// src/services/emailService.ts
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Referência à coleção 'emails' no Firestore
const collectionRef = collection(db, "emails");

// Buscar todos os emails
export async function getAllEmailsFromFirebase() {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Adicionar um novo email
export async function addEmailToFirebase(data: {
  nome: string;
  email: string;
  departamento: string;
  descricao: string;
}) {
  const docRef = await addDoc(collectionRef, data);
  return { id: docRef.id, ...data }; // retorna o novo email já com ID
}

// Atualizar um email existente
export async function updateEmailInFirebase(id: string, data: {
  nome: string;
  email: string;
  departamento: string;
  descricao: string;
}) {
  const ref = doc(db, "emails", id);
  return await updateDoc(ref, data);
}

// Deletar um email
export async function deleteEmailFromFirebase(id: string) {
  const ref = doc(db, "emails", id);
  return await deleteDoc(ref);
}
