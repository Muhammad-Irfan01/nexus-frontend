"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { FileText, Send, Bookmark, Upload, Bot, User, Trash2, RefreshCcw } from "lucide-react";
import { useDocumentStore } from "@/store/documentStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useChatStore } from "@/store/chatStore";
import { Button } from "@/app/components/ui/Button";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DocumentChatScreen() {
  const { documents, fetchWorkspaceDocuments, uploadDocument, deleteDocument, retryProcessing } = useDocumentStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const { sendMessage, createConversation } = useChatStore();
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0) {
      fetchWorkspaceDocuments(workspaces[0].workspace.id);
    }
  }, [workspaces, fetchWorkspaceDocuments]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  console.log('DEBUG documents:', documents.map(d => ({ id: d.id, name: d.originalName, status: d.status })));
}, [documents]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && workspaces.length > 0) {
      toast.info('Document extraction started...');
      await uploadDocument(workspaces[0].workspace.id, e.target.files[0]);
      toast.success('Document analysis complete!');
      fetchWorkspaceDocuments(workspaces[0].workspace.id);
    }
  };

  const handleRetry = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    await retryProcessing(docId);
    fetchWorkspaceDocuments(workspaces[0].workspace.id);
  };

  const handleDeleteDocument = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    await deleteDocument(docId);
    if (activeDocId === docId) {
        setActiveDocId(null);
    }
    fetchWorkspaceDocuments(workspaces[0].workspace.id);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !activeDocId || workspaces.length === 0) return;

    const userMessage = message;
    setMessage("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const conversation = await createConversation({ 
          workspaceId: workspaces[0].workspace.id, 
          title: `Chat with ${documents.find(d => d.id === activeDocId)?.name || 'Doc'}` 
      });
      const response = await sendMessage(conversation.id, { message: userMessage });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message.');
      console.error(error);
    }
  };

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
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUpload} 
              accept=".pdf,.docx,.txt"
            />
            <Button variant="ghost" onClick={() => fileInputRef.current?.click()} className="text-xs gap-2">
              <Upload className="w-3.5 h-3.5" /> Upload
            </Button>
            <Button variant="ghost" onClick={async () => {
                try {
                    const response = await fetch('http://localhost:3001/documents/chunks', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Corrected token key
                        }
                    });
                    const data = await response.json();
                    console.log('Document Chunks:', data);
                    toast.success('Chunks logged to console!');
                } catch (error) {
                    toast.error('Failed to fetch chunks.');
                    console.error(error);
                }
            }} className="text-xs gap-2">
              Debug Chunks
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
                <div key={doc.id} className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center ${activeDocId === doc.id ? 'bg-accent-primary/10 border-accent-primary' : 'bg-bg-primary border-white/5'}`} onClick={() => setActiveDocId(doc.id)}>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{doc.originalName || 'Untitled'}</p>
                        {doc.status === 'FAILED' && <span className="text-[10px] text-system-error">FAILED</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === 'FAILED' && (
                          <button onClick={(e) => handleRetry(e, doc.id)} className="text-text-secondary hover:text-accent-primary">
                              <RefreshCcw className="w-4 h-4" />
                          </button>
                      )}
                      <button onClick={(e) => handleDeleteDocument(e, doc.id)} className="text-text-secondary hover:text-system-error">
                          <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Right Hand Viewport: Targeted Isolated AI Thread */}
        <div className="w-full md:w-[500px] flex flex-col bg-bg-primary justify-between relative">
          <div className="p-6 overflow-y-auto space-y-4 flex-1 pb-24">
            
            {/* Citation Snippet Component */}
            <div className="flex flex-col gap-2 bg-bg-card/50 border border-white/5 rounded-xl p-4 mb-4">
              <span className="text-[9px] font-mono text-accent-highlight tracking-widest uppercase flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> Context Reference
              </span>
              <p className="text-xs text-text-secondary italic leading-relaxed">
                {activeDocId ? `Analyzing document ${activeDocId.slice(0, 8)}...` : "Select a document to start analysis."}
              </p>
            </div>

            {/* Chat History */}
            {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                    {m.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center"><Bot className="w-4 h-4 text-accent-primary" /></div>}
                    <div className={`p-3 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-accent-primary text-white' : 'bg-bg-secondary text-text-primary'}`}>
                        {m.content}
                    </div>
                    {m.role === 'user' && <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><User className="w-4 h-4 text-text-secondary" /></div>}
                </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Context Input Core Dock */}
          <div className="p-4 bg-bg-primary border-t border-white/8 absolute bottom-0 left-0 right-0">
            <div className="flex items-center gap-2 bg-bg-secondary border border-white/8 rounded-lg px-3 py-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={activeDocId ? "Query metrics inside active document..." : "Select a doc to chat..."}
                disabled={!activeDocId}
                className="flex-1 bg-transparent text-xs text-text-primary focus:outline-none placeholder:text-text-secondary/40"
              />
              <button onClick={handleSendMessage} disabled={!activeDocId} className="text-text-secondary hover:text-text-primary"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
