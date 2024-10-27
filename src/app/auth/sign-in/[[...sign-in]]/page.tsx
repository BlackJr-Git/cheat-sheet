import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b to-[#2e026d] from-[#ffffff] text-white">
      <SignIn signUpUrl="/auth/sign-in" />
    </main>
  );
}
