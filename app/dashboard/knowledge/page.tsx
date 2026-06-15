
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Database, Search, FolderPlus, FileText, Share2, HardDrive } from "lucide-react";

export default function KnowledgeBaseScreen() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Vector Knowledge Repository" />
      
      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
        
        {/* Sync Status Banner */}
        <div className="w-full bg-system-success/10 border border-system-success/20 rounded-nexus p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-system-success animate-pulse"></div>
            <p className="text-xs font-mono text-system-success tracking-wide">
              SYSTEM STATUS: VECTOR DATABASE SYNCED & REAL-TIME EMBEDDINGS ACTIVE
            </p>
          </div>
          <span className="text-[10px] font-mono bg-system-success/20 text-system-success px-2 py-0.5 rounded">
            99.98% Index Fidelity
          </span>
        </div>

        {/* Toolbar Frame */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-text-secondary/50" />
            <Input placeholder="Query indexed semantic tokens..." className="pl-10" />
          </div>
          <Button variant="primary" className="w-full sm:w-auto text-xs gap-2">
            <FolderPlus className="w-4 h-4" /> Create Collection
          </Button>
        </div>

        {/* Collections Matrix Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Q3 Financial Audits", docs: 24, size: "142 MB", type: "PDF/XLSX" },
            { name: "Core Product Specifications", docs: 89, size: "12 MB", type: "Markdown" },
            { name: "Customer Behavioral Vectors", docs: 142, size: "1.2 GB", type: "JSON Strings" },
          ].map((col, idx) => (
            <Card key={idx} className="hover:border-white/20 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-accent-primary/40 transition-colors">
                  <Database className="w-5 h-5 text-accent-highlight" />
                </div>
                <span className="text-[10px] font-mono text-text-secondary/40 bg-white/5 px-2 py-0.5 rounded">
                  {col.type}
                </span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">{col.name}</h3>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {col.docs} units</span>
                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> {col.size}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}