"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        className="rounded-full bg-violet-500 p-2 font-semibold text-white hover:bg-violet-600"
        onClick={async () => await signIn("github")}
      >
        Se connecter avec GitHub
      </button>
    </div>
  );
}
