import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";


export default function ChatScreen() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Navbar title="AI Thread Canvas" />
      
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl w-full mx-auto pb-32">
        
        {/* User Prompt */}
        <div className="flex gap-4 justify-end">
          <div className="max-w-[80%] bg-bg-card border border-white/8 rounded-nexus px-5 py-3.5 text-sm text-text-primary">
            Analyze the following vector layout file structure and suggest optimization passes for extreme contextual depth retrieval.
          </div>
        </div>

        {/* AI System Box */}
        <div className="flex gap-4">
          <div className="w-7 h-7 rounded-lg bg-accent-primary flex items-center justify-center text-xs font-mono font-bold shrink-0">Ω</div>
          <div className="flex flex-col gap-3 max-w-[85%]">
            
            {/* Source citations reminiscent of Perplexity */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-mono text-text-secondary mr-1 uppercase tracking-wider">Verified Sources:</span>
              <span className="bg-bg-card border border-accent-secondary/30 text-accent-secondary text-[10px] font-mono px-2 py-0.5 rounded-md">Vector_Map.idx [1]</span>
              <span className="bg-bg-card border border-accent-highlight/30 text-accent-highlight text-[10px] font-mono px-2 py-0.5 rounded-md">Cluster_Node_7.sys [2]</span>
            </div>

            <Card className="!p-5 bg-white/[0.01]">
              <p className="text-sm text-text-primary leading-relaxed">
                Based on parsing rules defined across your architecture index matrices, optimization targets can be extracted cleanly across two major systemic operational loops:
              </p>
              <ul className="list-mono list-decimal pl-4 mt-3 text-sm text-text-secondary space-y-2">
                <li>Deploy hierarchical token clustering layers dynamically based on frequency vector paths.</li>
                <li>Prune dead terminal leaf configurations below standard cosine matching weights of 0.72.</li>
              </ul>
            </Card>
          </div>
        </div>

      </div>

      {/* Persistent Chat Control Dock */}
      <div className="absolute bottom-0 left-[280px] right-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent px-8 pt-8 pb-6 z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-nexus p-2 flex items-center gap-3 border border-white/10">
          <button className="p-3 text-text-secondary hover:text-text-primary transition-colors text-lg">📎</button>
          <input 
            type="text" 
            placeholder="Instruct Nexus Engine or paste code execution scripts..." 
            className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none placeholder:text-text-secondary/40 px-2"
          />
          <div className="flex items-center gap-2 pr-2">
            <span className="text-[10px] font-mono text-text-secondary bg-white/5 border border-white/8 rounded px-1.5 py-0.5 uppercase">⌘Enter</span>
            <button className="bg-accent-primary hover:bg-[#6b4ae6] text-white p-2.5 rounded-lg text-xs font-bold transition-all">➔</button>
          </div>
        </div>
      </div>
    </div>
  );
}