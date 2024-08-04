"use client";
import SideBar from "@/app/components/SideBar";
import { firestore } from "@/app/lib/firebase/firebase";
import { getRecord } from "@/app/lib/functions";
import { openRouter } from "@/app/lib/openRouter/openRouter";
import { query, collection, getDocs } from "firebase/firestore";
import React, { lazy, Suspense, useEffect, useState } from "react";
const OpenAI = lazy(() => import("@/app/components/openRouter"));

export default function Recommandation() {
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    const fetch = async () => {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      openRouter(JSON.stringify(getRecord(docs).map(item => ({ name: item.name, quantity: item.quantity })))).then((k) =>
        setMessage(k)

      );
    };
    setTimeout(() => {
        fetch();
    }, 1000);
  }, []);
  return (
    <main className="sm:ml-64 text-white-200 h-screen bg-slate-800 overflow-auto">
      <SideBar />
      <div className="py-6 px-5">
        <h1 className="text-2xl font-bold">Recommandation</h1>
        <Suspense fallback={<div className="sm:ml-64 text-white-100">Loading</div>}> 
            {message !== "" && <OpenAI message={message as string}/>}      
        </Suspense>
      </div>
    </main>
  );
}
