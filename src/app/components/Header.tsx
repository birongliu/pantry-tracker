"use client";
import { useSession, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
export default function Header() {
  const session = useSession();
  return (
    <header className="px-10 py-5 bg-background flex justify-between items-center font-bold bg-slate-900 text-black-100">
      <div className="text-xl text-white-200 pt-2">Pantry Tracker</div>
      {!session.isSignedIn ? (
        <Link href={"/dashboard"}>
          <button className="rounded border p-2 w-20 bg-slate-700 hover:bg-slate-600 text-white-200 border-black-100">
            Login
          </button>
        </Link>
      ) : (
        <UserButton />
      )}
    </header>
  );
}
