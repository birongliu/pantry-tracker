import { DocumentData, DocumentReference } from "firebase/firestore";

export interface InventoryItem {
    name: string;
    quantity: number;
    id: string;
    category: string;
    expiredAt: Date;
    createdAt: Date;
  }

  export interface OpenAIData {
    recipes: {
      recipeName: string
      serving: number,
      instruction: string[]
      ingredients: Ingredient[]
    }[]
  }

export interface Ingredient {
  item: string,
  amount: number
}  


export type InventoryWithRef = InventoryItem & { ref: DocumentReference<DocumentData, DocumentData> }