"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { RefreshCw, Cpu, CheckCircle2, AlertTriangle, FileText, Loader2 } from "lucide-react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { useDocumentStore } from "@/store/documentStore";
import { useEmbeddingStore } from "@/store/embeddingStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function EmbeddingsPage() {
  const { documents, fetchWorkspaceDocuments } = useDocumentStore();
  const { generateEmbeddings, retryEmbeddings } = useEmbeddingStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      // Use the first workspace as default if no selection logic exists
      fetchWorkspaceDocuments(workspaces[0].workspace.id).catch(() => 
        toast.error("Failed to fetch documents for this workspace.")
      );
    }
  }, [workspaces, fetchWorkspaceDocuments]);

  const handleGenerate = async (id: string, name: string) => {
    // POST /embeddings/document/:id/generate
    toast.promise(generateEmbeddings(id), {
      loading: `Tokenizing contexts for ${name}...`,
      success: "Neural vectors written to workspace database.",
      error: "Failed to compile embedding maps."
    });
  };

  const handleRetry = async (id: string, name: string) => {
    // POST /embeddings/document/:id/retry
    toast.promise(retryEmbeddings(id), {
      loading: `Re-allocating shards for ${name}...`,
      success: "Vector sync stabilized successfully.",
      error: "Pipeline crash recurrent."
    });
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1.5 w-fit ";
    switch (status) {
      case "Completed": return <span className={`${base} bg-system-success/10 text-system-success`}><CheckCircle2 className="w-3 h-3"/> Synced</span>;
      case "Processing": return <span className={`${base} bg-accent-highlight/10 text-accent-highlight`}><Loader2 className="w-3 h-3 animate-spin"/> Processing</span>;
      case "Failed": return <span className={`${base} bg-system-error/10 text-system-error`}><AlertTriangle className="w-3 h-3"/> Interrupted</span>;
      default: return <span className={`${base} bg-white/5 text-text-secondary`}><RefreshCw className="w-3 h-3"/> Pending</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Vector Embedding Telemetry" />

      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Document Matrix Indexer</h2>
          <p className="text-xs text-text-secondary">Track real-time compilation vectors across chunked storage spaces.</p>
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.01] font-mono text-[10px] uppercase tracking-widest text-text-secondary/80">
                  <th className="p-4 pl-6 font-medium">Document Source Identifier</th>
                  <th className="p-4 font-medium">Allocation Size</th>
                  <th className="p-4 font-medium">Embedding Engine Status</th>
                  <th className="p-4 pr-6 font-medium text-right">Pipeline Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4 text-xs font-medium">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-2.5 text-text-primary">
                      <FileText className="w-4 h-4 text-text-secondary/40" />
                      {doc.name}
                    </td>
                    <td className="p-4 text-text-secondary font-mono">{doc.size}</td>
                    <td className="p-4">{getStatusBadge(doc.embeddingStatus)}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          className="!py-1.5 !px-3 !text-[11px]"
                          disabled={doc.embeddingStatus === "Processing" || doc.embeddingStatus === "Completed"}
                          onClick={() => handleGenerate(doc.id, doc.name)}
                        >
                          <Cpu className="w-3 h-3" /> Generate
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="!py-1.5 !px-3 !text-[11px] border-system-error/20 hover:bg-system-error/5 disabled:opacity-30 disabled:hover:bg-transparent"
                          disabled={doc.embeddingStatus !== "Failed"}
                          onClick={() => handleRetry(doc.id, doc.name)}
                        >
                          <RefreshCw className="w-3 h-3" /> Retry
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}