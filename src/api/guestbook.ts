import { app } from "../config/firebase";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

type Entry = {
  message: string;
};

export async function getEntry(email: string) {
  const docRef = doc(db, "entries", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Entry;
  }
  return null;
}

export async function updateEntry(email: string, msg: string) {
  const docRef = doc(db, "entries", email);

  return await setDoc(docRef, { message: msg });
}
