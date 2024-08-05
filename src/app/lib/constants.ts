import { InventoryItem } from "./interface";

export const defaultCreateFormValue: InventoryItem = {
    name: "",
    quantity: 1,
    expiredAt: new Date(),
    category: "",
    createdAt: new Date(),
    id: "",
  };
  