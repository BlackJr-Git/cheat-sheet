import React from "react";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="w-full h-[50vh] container flex rounded-xl bg-green-500">
        <div className="bg-red-500 w-1/2 h-full">bg-red</div>
        <div className="bg-blue-500 w-1/2 h-full">bg-blue</div>
      </section>
    </main>
  );
}
