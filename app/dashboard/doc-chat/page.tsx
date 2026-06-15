
import { Navbar } from "@/app/components/dashboard/Navbar";
import { FileText, Eye, Send, Bookmark } from "lucide-react";

export default function DocumentChatScreen() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Navbar title="Split-Plane Document Playground" />
      
      {/* 50/50 Split Master Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Hand Viewport: Render Component Placeholder */}
        <div className="flex-1 border-r border-white/8 bg-bg-secondary/40 p-6 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <span className="text-xs font-mono text-text-secondary flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-primary" /> ISO_9001_Fidelity_Declaration.pdf
            </span>
            <span className="text-[10px] text-text-secondary/40 font-mono">Page 1 of 42</span>
          </div>
          <div className="flex-1 bg-bg-primary rounded-xl border border-white/5 p-8 flex flex-col gap-4 shadow-inner">
            <div className="h-4 bg-white/10 rounded w-1/3"></div>
            <div className="h-3 bg-white/5 rounded w-full"></div>
            <div className="h-3 bg-white/5 rounded w-full"></div>
            <div className="h-3 bg-white/5 rounded w-5/6"></div>
            <div className="h-3 bg-white/5 rounded w-11/12"></div>
            <div className="h-4 bg-white/10 rounded w-1/4 mt-6"></div>
            <div className="h-3 bg-white/5 rounded w-full"></div>
            <div className="h-3 bg-white/5 rounded w-full"></div>
            <div className="h-3 bg-white/5 rounded w-4/5"></div>
          </div>
        </div>

        {/* Right Hand Viewport: Targeted Isolated AI Thread */}
        <div className="w-full md:w-[500px] flex flex-col bg-bg-primary justify-between relative">
          <div className="p-6 overflow-y-auto space-y-4 flex-1 pb-24">
            
            {/* Citation Snippet Component */}
            <div className="flex flex-col gap-2 bg-bg-card/50 border border-white/5 rounded-xl p-4">
              <span className="text-[9px] font-mono text-accent-highlight tracking-widest uppercase flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> Context Reference Page 14
              </span>
              <p className="text-xs text-text-secondary italic leading-relaxed">
                "...The structural operational clause 4.2 mandates that enterprise nodes must evaluate cryptographic keys at intervals no shorter than 84 hours..."
              </p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded bg-accent-highlight text-bg-primary flex items-center justify-center font-mono text-xs font-bold">N</div>
              <p className="text-xs text-text-primary leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-4">
                According to the clause parsed on Page 14, your rotation configuration interval settings are invalid. You must re-adjust the automation script down from 96 hours to meet the 84-hour threshold limit.
              </p>
            </div>
          </div>

          {/* Context Input Core Dock */}
          <div className="p-4 bg-bg-primary border-t border-white/8 absolute bottom-0 left-0 right-0">
            <div className="flex items-center gap-2 bg-bg-secondary border border-white/8 rounded-lg px-3 py-2">
              <input 
                type="text" 
                placeholder="Query metrics inside active document..." 
                className="flex-1 bg-transparent text-xs text-text-primary focus:outline-none placeholder:text-text-secondary/40"
              />
              <button className="text-text-secondary hover:text-text-primary"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}