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
import { EmailAccount } from "../types"; // ajuste o caminho conforme seu projeto

// Referência à coleção 'emails' no Firestore
const collectionRef = collection(db, "emails");

// Buscar todos os emails
//export async function getAllEmailsFromFirebase() {
 // const snapshot = await getDocs(collectionRef);
 // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
 export async function getAllEmailsFromFirebase(): Promise<EmailAccount[]> {
  const snapshot = await getDocs(collectionRef);
  const data = snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      name: d.name,
      email: d.email,
      department: d.department,
      description: d.description,
    };
  });
  return data;
}


// Adicionar um novo email
export async function addEmailToFirebase(data: {
  name: string;
  email: string;
  department: string;
  description: string;
}) {
  const docRef = await addDoc(collectionRef, data);
  return { id: docRef.id, ...data }; // retorna o novo email já com ID
}

// Atualizar um email existente
export async function updateEmailInFirebase(id: string, data: {
  name: string;
  email: string;
  department: string;
  description: string;
}) {
  const ref = doc(db, "emails", id);
  return await updateDoc(ref, data);
}

// Deletar um email
export async function deleteEmailFromFirebase(id: string) {
  const ref = doc(db, "emails", id);
  return await deleteDoc(ref);
}
