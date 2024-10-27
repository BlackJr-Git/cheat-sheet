import React from "react";
import { SideBar } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container flex h-screen w-screen justify-center items-center gap-4">
      <SideBar />
      {children}
    </main>
  );
}
