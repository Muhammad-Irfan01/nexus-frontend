
"use client";

import { useEffect } from "react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Layers, Activity, TrendingUp, Cpu } from "lucide-react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function AnalyticsScreen() {
  const { overview, fetchAnalytics, isLoading } = useAnalyticsStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      fetchAnalytics(workspaces[0].id);
    }
  }, [workspaces, fetchAnalytics]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Compute Allocation Metrics" />

      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">

        {/* Metric Card Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Documents", val: overview?.documents || 0, icon: Cpu },
            { label: "Conversations", val: overview?.conversationId || 0, icon: Layers },
            { label: "Messages", val: overview?.message || 0, icon: Activity },
            { label: "Agents", val: overview?.agent || 0, icon: TrendingUp },
          ].map((item, idx) => (
            <Card key={idx} className="!p-5">
              <div className="flex justify-between items-center text-text-secondary/40 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest">{item.label}</span>
                <item.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary">{item.val}</p>
            </Card>
          ))}
        </div>
        {/* ... Rest of the page ... */}
      </div>
    </div>
  );
}