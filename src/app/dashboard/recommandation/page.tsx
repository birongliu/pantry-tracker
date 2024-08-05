"use client";
import OpenAI from "@/app/components/openRouter";
import SideBar from "@/app/components/SideBar";
import { getInventoryRecords } from "@/app/lib/functions";
import { AIResponse, openRouter } from "@/app/lib/openRouter/openRouter";
import React, { Suspense, useEffect, useState } from "react";

export default function Recommandation() {
  const [data, setData] = useState<AIResponse>();
  useEffect(() => {
    const fetch = async () =>
      setData(await openRouter(JSON.stringify(getInventoryRecords())));

    fetch();
  }, []);
  return (
    <main className="sm:ml-64 text-white-200 h-screen bg-slate-800 overflow-auto">
      <SideBar />
      <div className="py-6 px-5">
        <h1 className="text-2xl font-bold">Recommandation</h1>
        {data && data.statusCode === 429 && <div>{data.message}</div>}
        {data && data.statusCode === 200 && <OpenAI message={data.message} />}
      </div>
    </main>
  );
}
