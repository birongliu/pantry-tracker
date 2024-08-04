"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { collection, getDocs, query, Timestamp } from "firebase/firestore";
import { firestore } from "../lib/firebase/firebase";
import { InventoryItem } from "./inventory/page";

interface ItemStatsData {
  total: number;
  todayAdded: number;
  nearExpire: number;
}
const defaultItemStats: ItemStatsData = {
  total: 0,
  todayAdded: 0,
  nearExpire: 0,
};
export default function Dashboard() {
  const [stats, setStats] = useState<ItemStatsData>(defaultItemStats);
  const handleStats = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
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
        expiredAt: data.expiredAt,
        name: data.name,
      });
      const nearExpire = inventory.filter((item) => {
        const today = new Date();
        const expiryDate = new Date(item.expiredAt);
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 7;
      });
      const todayAdded = inventory.filter((item) => {
        const today = new Date();
        const createdAt = item.createdAt;
        return (
          createdAt.getDate() === today.getDate() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      });
      setStats({
        total: docs.size,
        todayAdded: todayAdded.length,
        nearExpire: nearExpire.length,
      });
    });
  };
  useEffect(() => {
    handleStats();
  }, []);

  return (
    <main className="sm:ml-64 text-white-100 h-screen bg-slate-800">
      <SideBar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pantry Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Items</h2>
            <p className="text-3xl">{stats.total}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Items Added Today</h2>
            <p className="text-3xl">{stats.todayAdded}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Items Near Expiry</h2>
            <p className="text-3xl">{stats.nearExpire}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
