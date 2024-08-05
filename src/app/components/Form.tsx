import React from "react";
import { InventoryItem } from "../lib/interface";

export default function Form({
  handleAddItem,
  handleInputChange,
  form,
  showForm,
  edit,
  handleEditItem,
}: {
  handleAddItem: (e: React.FormEvent) => void;
  showForm: (value: (prev: boolean) => boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: InventoryItem;
  edit: boolean;
  handleEditItem: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 flex justify-center sm:ml-40 items-center bg-opacity-75 backdrop-blur-lg bg-slate-500">
      <div>
        <button
          onClick={() => showForm((prev) => !prev)}
          className="absolute right-12 top-28 w-7 h-7 rounded border"
        >
          <svg
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
        </button>
        <form
          onSubmit={!edit ? handleAddItem : handleEditItem}
          className="mb-4"
        >
          <div className="mb-2 flex items-start flex-col gap-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2 flex items-start flex-col gap-2">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2 flex items-start flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2 flex items-start flex-col gap-2">
            <label className="block text-sm font-medium">ExpiredAt</label>
            <input
              type="date"
              name="expiredAt"
              value={form.expiredAt.toString()}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded text-white flex justify-center w-full mt-4 items-center"
          >
            {edit ? "Edit Item" : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
