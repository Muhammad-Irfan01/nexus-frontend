"use client";

import { useState, useEffect } from "react";
import { Cpu, Terminal, Play } from "lucide-react";
import { useRagStore } from "@/store/ragStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

export default function ResearchAgentScreen() {
  const { askQuestion, isLoading } = useRagStore();
  const { workspaces, getMyWorkspaces } = useWorkspaceStore();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    getMyWorkspaces();
  }, [getMyWorkspaces]);

  const handleResearch = async () => {
    if (workspaces.length === 0 || !question) return;
    try {
        const response = await askQuestion(workspaces[0].id, question);
        setAnswer(response.answer || JSON.stringify(response));
    } catch (err) {
        setAnswer('Failed to get answer.');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Deep Research Concurrency Agent" />
      
      <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Parameter Initialization Configuration */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">Execution Parameters</h3>
          <Card className="flex flex-col gap-4">
            <Input 
              label="Primary Research Objective" 
              placeholder="e.g. Market saturation vectors of alternative power lattices" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            
            <Button 
                variant="primary" 
                className="w-full mt-2 gap-2 text-xs"
                onClick={handleResearch}
                disabled={isLoading}
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {isLoading ? 'Instantiating...' : 'Instantiate Pipeline'}
            </Button>
          </Card>
        </div>

        {/* Center & Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="flex-1 min-h-[400px] flex flex-col justify-between">
            <h3 className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase">Research Output</h3>
            <div className="bg-bg-primary rounded-lg p-4 font-mono text-[11px] text-text-secondary/80 border border-white/5 mt-6 flex flex-col gap-1.5">
              <p className="text-accent-secondary flex items-center gap-2"><Terminal className="w-3.5 h-3.5" /> [SYSTEM LOG]</p>
              <p className="text-text-primary mt-2">{answer || 'Waiting for research objective...'}</p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
