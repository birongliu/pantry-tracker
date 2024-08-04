import { collection, getDocs, query, Timestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase/firebase"; // Adjust the import based on your project structure

// Define the InventoryItem type
interface InventoryItem {
  id: string;
  category: string;
  createdAt: Date;
  quantity: number;
  name: string;
  expiredAt: Date;
}

// Define the initial state
const initialState = {
  inventory: [] as InventoryItem[],
  id: "",
};

// Define the action types
type Action =
  | { type: "FETCH"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "UPDATE"; id: string };

// Define the reducer function
export const inventoryReducer = async (state = initialState, action: Action) => {
  switch (action.type) {
    case "FETCH": {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      return {
        ...state,
        inventory: docs.docs.find((k) => k.id === action.id),
      };
    }

    case "DELETE": {
      return {
        ...state,
        inventory: state.inventory.filter((item) => item.id !== action.id),
      };
    }

    case "UPDATE": {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      if (docs.size === 0) {
        return { ...state, inventory: [] };
      }

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
      return { ...state, inventory };
    }

    default:
      return state;
  }
};

export default inventoryReducer;