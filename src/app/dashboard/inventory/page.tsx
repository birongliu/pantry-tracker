"use client";
import React from "react";
import SideBar from "@/app/components/SideBar";

const inventoryMockData = [
  {
    items: "Apple",
    quantity: 1,
    category: "technology",
    action: "DELETE",
  },
  {
    items: "Apple",
    quantity: 1,
    category: "technology",
    action: "DELETE",
  },
];

interface CreateForm {
  name: string;
  quantity: string;
  category: string;
}

const defaultCreateFormValue: CreateForm = {
  name: "",
  quantity: "",
  category: "",
};

export default function page() {
  return (
    <main className="sm:ml-64 text-white-200">
      <SideBar />
      inventory
    </main>
  );
}
