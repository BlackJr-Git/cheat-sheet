import { Button } from "@/components/ui/button";
import LoginButton from "./LoginButton";

// import { signIn } from "next-auth/react";
import authConfig from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(authConfig);

  if (session) {
    return (
      <div className="flex h-full w-full items-center justify-center mt-24">
        <p>Vous êtes connecté !</p>
        <p>{JSON.stringify(session)}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center mt-24">
      NON CONNECTE
      <LoginButton />
    </div>
  );
}
