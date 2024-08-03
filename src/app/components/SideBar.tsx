"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SideBar() {
  const path = usePathname();
  const [open, setOpen] = useState(false)
  return (
    <aside className={`absolute left-0 z-40 w-64 h-screen transition-transform ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>
     <button onClick={() => setOpen((prev) => !prev)} className="absolute text-white top-64 rounded-e left-64 bg-slate-900 h-36 sm:hidden ">
        <div className="rotate-90">{open ? "Close" : "Open"}</div>
     </button>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 text-white-100">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
            onClick={() => setOpen((prev) => !prev)}
              href="/dashboard"
              className={`flex ${
                path === "/dashboard" ? "bg-gray-700" : ""
              }  items-center p-2 text-white rounded-lg `}
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={`${path === "/dashboard" ? "white" : "currentColor"}`}
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
            onClick={() => setOpen((prev) => !prev)}
              href="/dashboard/inventory"
              className={`flex ${
                path === "/dashboard/inventory" ? "bg-gray-700" : ""
              }  items-center p-2 text-white rounded-lg `}
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 24 24"
                id="meteor-icon-kit__regular-inventory"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1V23C0 23.5523 0.447715 24 1 24C1.55228 24 2 23.5523 2 23V22H22V23C22 23.5523 22.4477 24 23 24C23.5523 24 24 23.5523 24 23V1C24 0.447715 23.5523 0 23 0C22.4477 0 22 0.447715 22 1V8H20V3C20 2.44772 19.5523 2 19 2H11C10.4477 2 10 2.44772 10 3V4H5C4.44772 4 4 4.44772 4 5V8H2V1ZM10 6H6V8H10V6ZM2 10V20H4V13C4 12.4477 4.44772 12 5 12H13C13.5523 12 14 12.4477 14 13V14H19C19.5523 14 20 14.4477 20 15V20H22V10H2ZM18 8V4H12V8H18ZM12 20H6V14H12V20ZM14 20V16H18V20H14Z"
                  fill={`${
                    path === "/dashboard/inventory" ? "white" : "currentColor"
                  }`}
                />
              </svg>
              <span className="ms-3">Inventory</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
