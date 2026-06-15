
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Layers, Activity, TrendingUp, Cpu } from "lucide-react";

export default function AnalyticsScreen() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Compute Allocation Metrics" />
      
      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
        
        {/* Metric Card Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Cluster CPU Load", val: "24.12%", unit: "Avg Latency: 4ms", icon: Cpu },
            { label: "Vector Node Pipelines", val: "847 channels", unit: "12 active threads", icon: Layers },
            { label: "Inference Velocity", val: "142 tok/s", unit: "Optimized streaming", icon: Activity },
            { label: "Billing Trajectory", val: "$142.08", unit: "Target bounds: $500", icon: TrendingUp },
          ].map((item, idx) => (
            <Card key={idx} className="!p-5">
              <div className="flex justify-between items-center text-text-secondary/40 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest">{item.label}</span>
                <item.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary">{item.val}</p>
              <span className="text-[10px] font-mono text-text-secondary mt-1 block">{item.unit}</span>
            </Card>
          ))}
        </div>

        {/* Structural Matrix Line Chart Wrapper */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="min-h-[350px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Inference Volatility Matrix</h3>
              <p className="text-xs text-text-secondary">Tracking model generation calls across a rolling 24-hour window.</p>
            </div>
            
            {/* Visual Vector Grid Mocking a Line Chart */}
            <div className="w-full h-48 border-b border-l border-white/10 relative flex items-end px-2 my-4">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_30px]"></div>
              
              {/* Simulated Neon Stroke Paths using absolute divs */}
              <div className="absolute bottom-[40px] left-[10%] w-[30%] h-0.5 bg-gradient-to-r from-accent-primary to-accent-highlight transform rotate-[12deg] origin-left shadow-[0_0_12px_#7C5CFC]"></div>
              <div className="absolute bottom-[64px] left-[40%] w-[25%] h-0.5 bg-gradient-to-r from-accent-highlight to-accent-secondary transform rotate-[-22deg] origin-left shadow-[0_0_12px_#22D3EE]"></div>
              <div className="absolute bottom-[24px] left-[65%] w-[30%] h-0.5 bg-accent-secondary transform rotate-[35deg] origin-left shadow-[0_0_12px_#5EEAD4]"></div>
            </div>

            <div className="flex justify-between font-mono text-[9px] text-text-secondary/40 tracking-wider">
              <span>00:00 ISO</span>
              <span>06:00 ISO</span>
              <span>12:00 ISO</span>
              <span>18:00 ISO</span>
              <span>24:00 ISO</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}