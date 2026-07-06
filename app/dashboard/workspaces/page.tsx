"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Briefcase, Plus, Trash2, Edit2, X, Sparkles, UserPlus } from "lucide-react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<any>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [inviteEmail, setInviteEmail] = useState("");

  const { workspaces, getMyWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace, inviteMember } = useWorkspaceStore();

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  const openCreateModal = () => {
    setEditingWorkspace(null);
    setFormData({ name: "", slug: "", description: "" });
    setIsModalOpen(true);
  };

  const openUpdateModal = (workspace: any) => {
    setEditingWorkspace(workspace);
    setFormData({ name: workspace.name, slug: workspace.slug, description: workspace.description || "" });
    setIsModalOpen(true);
  };

  const openInviteModal = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setInviteEmail("");
    setIsInviteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorkspace) {
      await updateWorkspace(editingWorkspace.id, formData);
    } else {
      await createWorkspace(formData);
    }
    setIsModalOpen(false);
    getMyWorkspaces(); // Refresh list
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWorkspace) {
      await inviteMember(selectedWorkspace.workspace.id, inviteEmail);
      setIsInviteModalOpen(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete workspace "${name}"?`)) {
        await deleteWorkspace(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Workspace Management" />

      <div className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-1">Active Workspaces</h2>
            <p className="text-xs text-text-secondary">Manage your collaborative environments.</p>
          </div>
          <Button onClick={openCreateModal} className="text-xs gap-2 !py-2.5">
            <Plus className="w-4 h-4" /> Create Workspace
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            
            <Card key={ws.id} className="group hover:border-white/15 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-accent-primary/30 transition-colors">
                    <Briefcase className="w-4 h-4 text-accent-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-text-secondary bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {ws.workspace.slug}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">{ws.workspace.name}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 mt-2">
                  {ws.workspace.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/5">
                <Button variant="ghost" onClick={() => openInviteModal(ws)} className="!p-2 text-text-secondary hover:text-text-primary">
                  <UserPlus className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" onClick={() => openUpdateModal(ws)} className="!p-2 text-text-secondary hover:text-text-primary">
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(ws.id, ws.name)} className="!p-2 text-text-secondary hover:text-system-error">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg glass-card glass-glow-border rounded-nexus p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-highlight" /> 
              {editingWorkspace ? "Update Workspace" : "Create New Workspace"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input 
                label="Name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
              />
              <Input 
                label="Slug" 
                value={formData.slug} 
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
                required 
                disabled={!!editingWorkspace}
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-bg-primary text-text-primary border border-white/8 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-primary/50"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs">Abort</Button>
                <Button type="submit" variant="primary" className="text-xs">Save Workspace</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm glass-card glass-glow-border rounded-nexus p-6 relative">
            <button onClick={() => setIsInviteModalOpen(false)} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-accent-primary" /> 
              Invite Member
            </h3>

            <form onSubmit={handleInvite} className="flex flex-col gap-4">
              <Input 
                label="Email Address" 
                type="email"
                value={inviteEmail} 
                onChange={(e) => setInviteEmail(e.target.value)} 
                required 
              />

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button type="button" variant="ghost" onClick={() => setIsInviteModalOpen(false)} className="text-xs">Abort</Button>
                <Button type="submit" variant="primary" className="text-xs">Send Invite</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
