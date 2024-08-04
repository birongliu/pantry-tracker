"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
export default function Header({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  return (
    <header className="z-40 px-10 sticky top-0 py-5 bg-background flex justify-between items-center font-bold bg-slate-900 text-black-100">
      <div className="text-xl text-white-200 pt-2">Pantry Tracker</div>
      {!isSignedIn ? (
        <Link href={"/dashboard"}>
          <button className="rounded border p-2 w-20 bg-slate-700 hover:bg-slate-600 text-white-200 border-black-100">
            Login
          </button>
        </Link>
      ) : pathname === "/" ? (
        <Link href={"/dashboard"}>
          {" "}
          <button className="border border-blue-400 bg-blue-500 text-white p-1 rounded">
            DashBoard
          </button>
        </Link>
      ) : (
        <UserButton />
      )}
    </header>
  );
}
