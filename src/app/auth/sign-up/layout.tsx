import React from "react";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container flex flex-col flex-wrap gap-4 py-12">
      {children}
    </main>
  );
}
