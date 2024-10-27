import { CategoryNavigation } from "@/components/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[90vh] rounded-2xl flex flex-col gap-4">
      <CategoryNavigation />
      {children}
    </main>
  );
}
