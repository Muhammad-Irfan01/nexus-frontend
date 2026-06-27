"use client";

import { useEffect, useRef } from "react";
import { Database, Search, FolderPlus, FileText, HardDrive, Trash2, Upload } from "lucide-react";
import { useDocumentStore } from "@/store/documentStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

export default function KnowledgeBaseScreen() {
  const { documents, fetchWorkspaceDocuments, uploadDocument, deleteDocument, isLoading } = useDocumentStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      fetchWorkspaceDocuments(workspaces[0].id);
    }
  }, [workspaces, fetchWorkspaceDocuments]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && workspaces.length > 0) {
      await uploadDocument(workspaces[0].id, e.target.files[0]);
      fetchWorkspaceDocuments(workspaces[0].id);
    }
  };

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
            {documents.length} Documents Indexed
          </span>
        </div>

        {/* Toolbar Frame */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-text-secondary/50" />
            <Input placeholder="Query indexed semantic tokens..." className="pl-10" />
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <Button variant="primary" className="w-full sm:w-auto text-xs gap-2" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
            <Upload className="w-4 h-4" /> Upload Document
          </Button>
        </div>

        {/* Collections Matrix Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <Card key={doc.id || idx} className="hover:border-white/20 transition-all cursor-pointer group relative">
              <button 
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg text-system-error opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteDocument(doc.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-accent-primary/40 transition-colors">
                  <Database className="w-5 h-5 text-accent-highlight" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2 truncate">{doc.name || 'Untitled Document'}</h3>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> ID: {doc.id.slice(0, 8)}</span>
                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> Status: {doc.status || 'Processed'}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
