"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Bot, Terminal, Plus, Trash2, Sliders, X, Sparkles } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { useAgentStore } from "@/store/agentStore";

export default function AgentsClusterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);

  const { agents, fetchAgents, createAgent, updateAgent, deleteAgent } = useAgentStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();

  // Form States
  const [formData, setFormData] = useState({ name: "", type: "Deep Research", systemPrompt: "" });

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      // GET /agents/workspace/:workspaceId
      fetchAgents(workspaces[0].workspace.id).catch(() => toast.error("Error linking configuration stream."));
    }
  }, [workspaces, fetchAgents]);

  const openCreateModal = () => {
    setEditingAgent(null);
    setFormData({ name: "", type: "Deep Research", systemPrompt: "" });
    setIsModalOpen(true);
  };

  const openUpdateModal = (agent: any) => {
    setEditingAgent(agent);
    setFormData({ name: agent.name, type: agent.type, systemPrompt: agent.systemPrompt });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgent) {
      // PATCH /agents/:agentId
      toast.promise(updateAgent(editingAgent.id, formData), {
        loading: "Patching agent cluster manifest...",
        success: "Configuration synced across active nodes.",
        error: "Failed to alter configuration mapping."
      });
    } else {
      if (workspaces.length === 0) {
        toast.error("No workspace selected.");
        return;
      }
      // POST /agents/workspace/:workspaceId
      toast.promise(createAgent(workspaces[0].workspace.id, formData), {
        loading: "Spawning isolated cluster sub-agent...",
        success: "Agent node initialized successfully.",
        error: "Workspace rejected spawning request."
      });
      fetchAgents(workspaces[0].workspace.id).catch(() => toast.error("Error linking configuration stream."));
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    // DELETE /agents/:agentId
    toast.promise(deleteAgent(id), {
      loading: `Wiping instance signature for ${name}...`,
      success: "Sub-node terminated and memory wiped safely.",
      error: "Node termination sequence locked."
    });
    fetchAgents(workspaces[0].workspace.id).catch(() => toast.error("Error linking configuration stream."));
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Intelligent Agent Clusters" />

      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-1">Agent Workspace Control Hub</h2>
            <p className="text-xs text-text-secondary">Deploy specific localized models with custom prompts and tools.</p>
          </div>
          <Button onClick={openCreateModal} className="text-xs gap-2 !py-2.5">
            <Plus className="w-4 h-4" /> Deploy Agent
          </Button>
        </div>

        {/* Existing Active Agents Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="group hover:border-white/15 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-accent-primary/30 transition-colors">
                    <Bot className="w-4 h-4 text-accent-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-accent-highlight bg-accent-highlight/5 border border-accent-highlight/10 px-2 py-0.5 rounded">
                    {agent.type}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">{agent.name}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 font-mono bg-bg-primary p-2.5 rounded border border-white/4 my-3 text-[11px]">
                  {agent.systemPrompt}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(agent.tools || []).map((tool: string, idx: number) => (
                    <span key={idx} className="text-[9px] font-mono bg-white/5 text-text-secondary px-1.5 py-0.5 rounded border border-white/5">
                      ⚙️ {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/5">
                <Button variant="ghost" onClick={() => openUpdateModal(agent)} className="!p-2 text-text-secondary hover:text-text-primary">
                  <Sliders className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(agent.id, agent.name)} className="!p-2 text-text-secondary hover:text-system-error">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Embedded High-Fidelity Custom Configuration Interface Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg glass-card glass-glow-border rounded-nexus p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-highlight" />
              {editingAgent ? "Alter Node Manifest" : "Configure Cluster Deployment Instance"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Agent Identity Call Sign"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Compliance-Inspector"
                required
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">System Node Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-bg-primary text-text-primary border border-white/8 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-primary/50"
                >
                  <option value="GENERAL">General</option>
                  <option value="SUPPORT">Support</option>
                  <option value="SALES">Sales</option>
                  <option value="HR">HR</option>
                  <option value="CUSTOM">Custom</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Core System Directive Prompt</label>
                <textarea
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  rows={4}
                  className="w-full bg-bg-primary text-text-primary border border-white/8 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-primary/50 placeholder:text-text-secondary/30 font-mono text-xs"
                  placeholder="You are an isolated telemetry node running on enterprise infrastructure. Your core prompt is..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs">Abort</Button>
                <Button type="submit" variant="primary" className="text-xs">Sync & Deploy Node</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}