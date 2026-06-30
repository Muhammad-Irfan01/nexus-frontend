"use client";

import { useEffect, useState } from "react";

import { useChatStore } from "@/store/chatStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Send, Paperclip } from "lucide-react";
import { Navbar } from "@/app/components/dashboard/Navbar";

export default function ChatScreen() {
  const { conversations, getConversations, sendMessage } = useChatStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      getConversations(workspaces[0].id);
    }
  }, [workspaces, getConversations]);

  const handleSendMessage = async () => {
    if (!activeConversationId || !message) return;
    await sendMessage(activeConversationId, { message });
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Navbar title="AI Thread Canvas" />
      
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl w-full mx-auto pb-32">
        
        {/* Placeholder for conversation */}
        {!activeConversationId && (
            <div className="text-center text-text-secondary mt-10">Select a conversation or start a new one.</div>
        )}

      </div>

      {/* Persistent Chat Control Dock */}
      <div className="absolute bottom-0 left-[280px] right-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent px-8 pt-8 pb-6 z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-nexus p-2 flex items-center gap-3 border border-white/10">
          <button className="p-3 text-text-secondary hover:text-text-primary transition-colors text-lg"><Paperclip /></button>
          <input 
            type="text" 
            placeholder="Instruct Nexus Engine or paste code execution scripts..." 
            className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none placeholder:text-text-secondary/40 px-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center gap-2 pr-2">
            <span className="text-[10px] font-mono text-text-secondary bg-white/5 border border-white/8 rounded px-1.5 py-0.5 uppercase">⌘Enter</span>
            <button 
                className="bg-accent-primary hover:bg-[#6b4ae6] text-white p-2.5 rounded-lg text-xs font-bold transition-all"
                onClick={handleSendMessage}
            >
                <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
