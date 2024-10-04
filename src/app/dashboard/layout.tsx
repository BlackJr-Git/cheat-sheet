import React from "react";
import { SideBar } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mt-24 flex justify-center items-center gap-4 mb-24">
      <SideBar />
      {children}
    </main>
  );
}
