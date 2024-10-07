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
      <iframe
        className="w-1/2 h-1/2"
        title="Login"
       src="https://lottie.host/embed/30f28a28-750f-4502-9384-0ec00587fee9/7zL6O4P665.json"></iframe>
      NON CONNECTE
      <LoginButton />
    </div>
  );
}
