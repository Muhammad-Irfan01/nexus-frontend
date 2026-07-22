import { Sidebar } from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-bg-primary text-text-primary pl-[280px]">
      <Sidebar />
      <main className="w-full h-screen overflow-y-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}