import { Navbar } from "../components/dashboard/Navbar";
import { Card } from "../components/ui/Card";


export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Core Command Workspace" />
      
      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Welcome back, Operator</h2>
          <p className="text-xs text-text-secondary">System cluster operations healthy. All pipelines operational.</p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Token Allocation Used", val: "421,902 / 1M", color: "text-accent-primary" },
            { label: "Calculated Compute Cost", val: "$14.32", color: "text-accent-secondary" },
            { label: "Knowledge Vector Indices", val: "1,240 Nodes", color: "text-accent-highlight" },
          ].map((stat, i) => (
            <Card key={i} className="!p-5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary">{stat.label}</span>
              <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.val}</p>
            </Card>
          ))}
        </div>

        {/* Dynamic Splits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">Recent Conversational Threads</h3>
            <Card className="!p-0">
              <div className="divide-y divide-white/8">
                {[
                  { title: "Optimization loops on backend execution handlers", model: "Nexus-Omni", time: "12m ago" },
                  { title: "Vector map integration architecture analysis", model: "Deep-Research-v4", time: "2h ago" },
                  { title: "Financial analysis balance parsing matrices", model: "Claude-3.5", time: "1d ago" },
                ].map((row, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <span className="text-sm font-medium text-text-primary truncate">{row.title}</span>
                      <span className="text-[10px] font-mono text-text-secondary">{row.model}</span>
                    </div>
                    <span className="text-xs text-text-secondary/60">{row.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Quick Cards Actions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">System Operational Dispatches</h3>
            <Card>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-system-success"></span> All Nodes Connected
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Vectors are fully synched with primary isolated document instances. Core index execution latency is flat at 14ms.
              </p>
              <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent-primary h-full w-[72%] rounded-full"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}