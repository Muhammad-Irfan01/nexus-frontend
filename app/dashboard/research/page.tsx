
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Cpu, Terminal, ArrowRight, Play, Download, Layers } from "lucide-react";

export default function ResearchAgentScreen() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Deep Research Concurrency Agent" />
      
      <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Parameter Initialization Configuration */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">Execution Parameters</h3>
          <Card className="flex flex-col gap-4">
            <Input label="Primary Research Objective" placeholder="e.g. Market saturation vectors of alternative power lattices" />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Depth Execution Constraints</label>
              <select className="w-full bg-bg-primary text-text-primary border border-white/8 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-primary/50">
                <option>Level 3 (Comprehensive Synthesis - 12 Nodes)</option>
                <option>Level 5 (Deep Theoretical Penetration - 40 Nodes)</option>
              </select>
            </div>
            <Button variant="primary" className="w-full mt-2 gap-2 text-xs">
              <Play className="w-3.5 h-3.5 fill-current" /> Instantiate Pipeline
            </Button>
          </Card>
        </div>

        {/* Center & Right Column: Process Node Pipeline Graph Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">Agent Node Concurrency Map</h3>
            <span className="text-[10px] font-mono text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-ping"></span> 4 Agents Operational
            </span>
          </div>

          <Card className="flex-1 min-h-[400px] flex flex-col justify-between">
            {/* Horizontal Workflow Chain */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative items-center">
              {[
                { step: "01 / Web Discovery", task: "Querying active energy registers", state: "complete" },
                { step: "02 / Entity Extraction", task: "Parsing tabular performance ratios", state: "active" },
                { step: "03 / Synthesizing Report", task: "Compiling contextual thesis structures", state: "pending" },
              ].map((node, i) => (
                <div key={i} className={`p-4 rounded-xl border relative ${
                  node.state === 'active' ? 'bg-accent-primary/5 border-accent-primary' : 
                  node.state === 'complete' ? 'bg-white/[0.02] border-white/10 opacity-60' : 'bg-transparent border-dashed border-white/5 opacity-40'
                }`}>
                  <span className="text-[10px] font-mono block mb-1 text-accent-highlight">{node.step}</span>
                  <h4 className="text-xs font-semibold text-text-primary mb-1">{node.task}</h4>
                  <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                    <div className={`h-full ${node.state === 'complete' ? 'bg-system-success w-full' : node.state === 'active' ? 'bg-accent-primary w-1/2 animate-pulse' : 'w-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Core Terminal Logger Output */}
            <div className="bg-bg-primary rounded-lg p-4 font-mono text-[11px] text-text-secondary/80 border border-white/5 mt-6 flex flex-col gap-1.5">
              <p className="text-accent-secondary flex items-center gap-2"><Terminal className="w-3.5 h-3.5" /> [SYSTEM LOG: 23:09:41] Dispatching WebCrawler-Node-4B to index domain registries...</p>
              <p className="text-text-secondary pl-5">[INFO] Found 14 matching contextual documents. Executing spatial cosine parsing checks.</p>
              <p className="text-system-success pl-5">● Cosine parameters pass constraint boundary (score: 0.8912). Initializing download loop.</p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}