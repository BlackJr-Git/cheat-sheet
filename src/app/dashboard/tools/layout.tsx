import { ToolsNavigation } from "@/components/dashboard/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[70vh] rounded-2xl flex flex-col gap-4">
      <ToolsNavigation />
      {children}
    </main>
  );
}
