"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { FileText, Send, Bookmark } from "lucide-react";
import { useDocumentStore } from "@/store/documentStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useChatStore } from "@/store/chatStore";

export default function DocumentChatScreen() {
  const { documents, fetchWorkspaceDocuments } = useDocumentStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      fetchWorkspaceDocuments(workspaces[0].id);
    }
  }, [workspaces, fetchWorkspaceDocuments]);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Navbar title="Split-Plane Document Playground" />
      
      {/* 50/50 Split Master Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Hand Viewport: Render Component Placeholder */}
        <div className="flex-1 border-r border-white/8 bg-bg-secondary/40 p-6 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <span className="text-xs font-mono text-text-secondary flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-primary" /> Active Documents
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-bg-primary rounded-xl border border-white/5 shadow-inner cursor-pointer hover:border-accent-primary" onClick={() => setActiveDocId(doc.id)}>
                    <p className="text-sm font-semibold">{doc.name || 'Untitled'}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Right Hand Viewport: Targeted Isolated AI Thread */}
        <div className="w-full md:w-[500px] flex flex-col bg-bg-primary justify-between relative">
          <div className="p-6 overflow-y-auto space-y-4 flex-1 pb-24">
            
            {/* Citation Snippet Component */}
            <div className="flex flex-col gap-2 bg-bg-card/50 border border-white/5 rounded-xl p-4">
              <span className="text-[9px] font-mono text-accent-highlight tracking-widest uppercase flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> Context Reference
              </span>
              <p className="text-xs text-text-secondary italic leading-relaxed">
                {activeDocId ? `Analyzing document ${activeDocId.slice(0, 8)}...` : "Select a document to start analysis."}
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
