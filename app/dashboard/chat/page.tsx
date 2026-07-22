"use client";

import { useEffect, useState, useRef } from "react";

import { useChatStore } from "@/store/chatStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Send, Paperclip, Plus, MessageSquare, Bot, User } from "lucide-react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const { conversations, getConversations, getConversation, createConversation, sendMessage } = useChatStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      getConversations(workspaces[0].workspace.id);
    }
  }, [workspaces, getConversations]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    try {
      const conversation = await getConversation(id);
      const loaded: Message[] = (conversation.messages || []).map((m: any) => ({
        role: m.role === 'ASSISTANT' ? 'assistant' : 'user',
        content: m.content,
      }));
      setMessages(loaded);
    } catch (error) {
      toast.error('Failed to load conversation.');
      console.error(error);
    }
  };

  const handleNewConversation = async () => {
    if (workspaces.length === 0) return;
    try {
      const conversation = await createConversation({
        workspaceId: workspaces[0].workspace.id,
        title: `Conversation ${new Date().toLocaleString()}`,
      });
      setActiveConversationId(conversation.id);
      setMessages([]);
    } catch (error) {
      toast.error('Failed to start conversation.');
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    if (!activeConversationId || !message.trim() || isSending) return;

    const userMessage = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsSending(true);

    try {
      const response = await sendMessage(activeConversationId, { message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      toast.error('Failed to send message.');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden">
      {/* Conversation Sidebar */}
      <div className="w-[280px] border-r border-white/8 bg-bg-secondary/40 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <Button onClick={handleNewConversation} className="w-full text-xs gap-2 justify-center">
            <Plus className="w-4 h-4" /> New Conversation
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scroller-thin">
          {conversations.length === 0 && (
            <p className="text-xs text-text-secondary text-center mt-6 px-2">No conversations yet. Start one above.</p>
          )}
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelectConversation(c.id)}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-2 text-xs ${activeConversationId === c.id ? 'bg-accent-primary/10 border border-accent-primary text-text-primary' : 'hover:bg-white/5 text-text-secondary border border-transparent'}`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{c.title || 'Untitled conversation'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Column */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Navbar title="AI Thread Canvas" />

        {/* Scrollable Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 max-w-4xl w-full mx-auto pb-32">

          {!activeConversationId && (
            <div className="text-center text-text-secondary mt-10">Select a conversation or start a new one.</div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-accent-primary" /></div>}
              <div className={`p-3 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-accent-primary text-white' : 'bg-bg-secondary text-text-primary'}`}>
                {m.content}
              </div>
              {m.role === 'user' && <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><User className="w-4 h-4 text-text-secondary" /></div>}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Persistent Chat Control Dock */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent px-8 pt-8 pb-6 z-10">
          <div className="max-w-4xl mx-auto glass-card rounded-nexus p-2 flex items-center gap-3 border border-white/10">
            <button className="p-3 text-text-secondary hover:text-text-primary transition-colors text-lg"><Paperclip /></button>
            <input
              type="text"
              placeholder={activeConversationId ? "Instruct Nexus Engine or paste code execution scripts..." : "Select or start a conversation to chat..."}
              className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none placeholder:text-text-secondary/40 px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!activeConversationId}
            />
            <div className="flex items-center gap-2 pr-2">
              <span className="text-[10px] font-mono text-text-secondary bg-white/5 border border-white/8 rounded px-1.5 py-0.5 uppercase">⌘Enter</span>
              <button
                className="bg-accent-primary hover:bg-[#6b4ae6] text-white p-2.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
                onClick={handleSendMessage}
                disabled={!activeConversationId}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}