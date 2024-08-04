import { DocumentData, QuerySnapshot, Timestamp } from "firebase/firestore";
import { InventoryItem } from "./interface";

export function getRecord(docs: QuerySnapshot<DocumentData, DocumentData>) {
  const inventory: InventoryItem[] = [];
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
