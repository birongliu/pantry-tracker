"use client";
import SideBar from "@/app/components/SideBar";
import React, { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase/firebase";
import Form from "@/app/components/Form";
import { InventoryItem } from "@/app/lib/interface";
import { getRecord } from "@/app/lib/functions";


const defaultCreateFormValue: InventoryItem = {
  name: "",
  quantity: 1,
  expiredAt: new Date(),
  category: "",
  createdAt: new Date(),
  id: "",
};

export default function Page() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useState<InventoryItem>(defaultCreateFormValue);
  useEffect(() => {
    updateInventory();
  }, []);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    if (docs.size === 0) {
      setInventory([]);
      return;
    }
    setInventory(getRecord(docs))
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "quantity" ? (parseInt(value) < 1 ? 1 : value) : value,
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setInventory([...inventory, form]);
    addItem(form);
    setForm(defaultCreateFormValue);
    setEdit(false);
    handleShowForm();
  };

  const addItem = async (form: InventoryItem) => {
    const snapshot = collection(firestore, "inventory");
    await addDoc(snapshot, form);

    updateInventory();
  };

  const onEditItem = (index: number) => {
    const item = inventory[index];
    setForm(item);
    setEdit(true);
    handleShowForm();
  };
  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(collection(firestore, "inventory"), form.id);
    const docsSnap = await getDoc(docRef);
    if (docsSnap.exists()) {
      await setDoc(docRef, form);
    }
    setShowForm((prev) => !prev);
    setForm(defaultCreateFormValue);
    updateInventory();
  };

  const handleDeleteItem = async (index: number) => {
    const item = inventory[index];
    setSearch(item.name);
    const docRef = doc(collection(firestore, "inventory"), item.id);
    const docsSnap = await getDoc(docRef);
    if (docsSnap.exists()) {
      const { quantity, ...data } = docsSnap.data();
      if (quantity === 1) await deleteDoc(docRef);
      else
        await setDoc(docRef, {
          quantity: quantity - 1,
          ...data,
        });
    }
    updateInventory();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return updateInventory();
    const items = inventory.filter((k) => k.name.toLowerCase() === searchTerm);
    setInventory(items);
  };
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const onAddItem = () => {
    setEdit(false);
    setForm(defaultCreateFormValue);
    setShowForm((prev) => !prev);
  };

  return (
    <main className="sm:ml-64 text-white-200 h-full bg-slate-800">
      <SideBar />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <button
            onClick={onAddItem}
            className="p-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
          >
            Add Item
          </button>
        </div>
        {showForm && (
          <Form
            handleAddItem={handleAddItem}
            showForm={handleShowForm}
            handleEditItem={handleEditItem}
            handleInputChange={handleInputChange}
            form={form}
            edit={edit}
          />
        )}

        <div className="pt-5">
          <div className="pb-5">
            <form onSubmit={handleSearch} id="search-form">
              <input
                type="search"
                onChange={(e) => {
                  if (e.target.value === "") updateInventory();
                  setSearch(e.target.value);
                }}
                form="search-form"
                className="w-full rounded p-5 bg-gray-700 outline-none"
                placeholder="Search for item"
                name="searchbar"
                id="search"
              />
            </form>
          </div>
          <ul className="custom-scrollbar bg-slate-600 h-screen p-5 rounded overflow-y-auto scroll-smooth">
            {inventory.length === 0 && (
              <h1 className="flex justify-center items-center mt-48">
                Currently there no {search ? search : ""} item in inventory
              </h1>
            )}
            {inventory.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-2 rounded mb-2"
              >
                <span>
                  Name: {item.name} | Category: {item.category} | Quantity:{" "}
                  {item.quantity} | Expired: {item.expiredAt.toString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditItem(index)}
                    className="px-2 py-1 bg-green-500 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="px-2 py-1 bg-red-500 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
