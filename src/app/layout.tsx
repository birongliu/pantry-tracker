import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ClerkProvider, useSession } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker App",
  description: "An application allow to keep track of items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header isSignedIn={userId !== null} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
