import { ToolsNavigation } from "@/components/dashboard/index";

export default function DashboardToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[90vh] rounded-2xl flex flex-col gap-4">
      <ToolsNavigation />
      {children}
    </main>
  );
}
