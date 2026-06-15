import { Sidebar } from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pl-[280px]">
      <Sidebar />
      <main className="w-full min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
}