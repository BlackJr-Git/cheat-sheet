import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import LoginButton from "./LoginButton";

// import { signIn } from "next-auth/react";
import authConfig from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Login() {
  const session = await getServerSession(authConfig);

  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-center mt-12 bg-slate-100 md:p-8 p-4 rounded-3xl">
      <div className="md:w-1/2 h-96">
        <iframe
          className="w-full h-full"
          title="Login"
          src="https://lottie.host/embed/30f28a28-750f-4502-9384-0ec00587fee9/7zL6O4P665.json"
        ></iframe>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center md:border-l-2 md:border-violet-500">
        <div className="md:w-2/3 flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold">Bon retour 👋</h1>
          <p className="text-lg">
            Enregistrez vos ressources favorites pour y accéder facilement.
          </p>
        </div>
        <form
          action=""
          className="w-full flex flex-col justify-center items-center gap-2"
        >
          <div className="md:w-2/3 w-full">
            {/* <label htmlFor="email">Email</label> */}
            <Input
              type="email"
              id="email"
              placeholder="📧  Entrer votre mail"
              className="mt-2 w-full"
            />
          </div>
          <div className="md:w-2/3 w-full">
            {/* <label htmlFor="password">Password</label> */}
            <Input
              type="password"
              id="password"
              placeholder="🔐  Entrer votre mot de passe"
              className="mt-2 w-full"
            />
          </div>
          <p className="md:w-2/3 text-right">Mot de passe oublie ?</p>
          <div className="md:w-2/3 w-full">
            <Button className="w-full mt-2">Se connecter</Button>
          </div>
        </form>

        <div className="flex items-center justify-center md:w-1/2 my-8">
          <div className="h-[2px] w-full bg-slate-200"></div>
          <p className="mx-4"> ou </p>
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>

        <div className="md:w-2/3 w-full flex gap-4 items-center justify-center">
          <Button
            className="md:w-1/2 w-full flex items-center justify-center gap-2"
            variant={"outline"}
          >
            <Image src="/google.svg" width={20} height={20} alt="logo" /> Google
          </Button>
          <Button
            className="md:w-1/2 w-full flex items-center justify-center gap-2"
            variant={"outline"}
          >
            <Image src="/github.svg" width={20} height={20} alt="logo" /> GitHub
          </Button>
        </div>

        <div className="md:w-2/3 flex gap-4 items-center justify-center mt-6">
          <p className="text-center">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link
              href="/auth/sign-up"
              className="text-violet-500 font-semibold ml-4"
            >
              S&apos;inscrire
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
