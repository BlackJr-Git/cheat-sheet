"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="rounded-full bg-violet-500 p-2 font-semibold text-white hover:bg-violet-600"
      onClick={async () => await signIn("github")}
    >
      Se connecter avec GitHub
    </button>
  );
}
