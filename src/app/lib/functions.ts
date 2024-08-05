import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, setDoc, Timestamp } from "firebase/firestore";
import { InventoryItem, InventoryWithRef } from "./interface";
import { firestore } from "./firebase/firebase";

export async function getInventoryRecords() {
  const snapshot = query(collection(firestore, "inventory"));
  const docs = await getDocs(snapshot);

  const inventory: InventoryItem[] = [];

  if(docs.empty) return inventory

  docs.forEach((result) => {
    const data = result.data();
    inventory.push({
      id: result.id,
      category: data.category,
      createdAt: new Timestamp(
        data.createdAt.seconds,
        data.createdAt.nanoseconds
      ).toDate(),
      quantity: data.quantity,
      name: data.name,
      expiredAt: data.expiredAt,
    });
  });
  return inventory;
}




export async function getInventoryRecord(id: string): Promise<InventoryWithRef | null> {
  const docRef = doc(collection(firestore, "inventory"), id);
  const docsSnap = await getDoc(docRef);
  if(docsSnap.exists()) return {...docsSnap.data(), id, ref: docRef } as InventoryWithRef
  return null
}


export async function createInventoryItem(data: InventoryItem) {
  const docRef = doc(collection(firestore, "inventory"), data.id);
  const record = await getInventoryRecord(data.id)
  if(!record) await setDoc(docRef, data);
  return { ref: docRef, ...((await getDoc(docRef)).data() as InventoryItem) }

}