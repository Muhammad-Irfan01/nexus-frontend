
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="w-screen h-screen bg-bg-primary flex items-center justify-center relative px-4">
      {/* Background radial glow */}
      <div className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      
      <Card className="w-full max-w-[420px] !p-8 z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-accent-primary mb-4 shadow-[0_0_15px_rgba(124,92,252,0.1)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Reconfigure Security Key
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Establish a brand new secure token standard for your profile
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input 
            label="New Security Key (Password)" 
            type="password" 
            placeholder="••••••••" 
          />
          <Input 
            label="Confirm Security Key" 
            type="password" 
            placeholder="••••••••" 
          />
          
          <div className="space-y-1.5 p-3.5 bg-bg-secondary rounded-lg border border-white/5 text-[10px] font-mono text-text-secondary/70">
            <p className="text-text-primary font-medium text-[11px] mb-1">Passphrase Integrity Metrics:</p>
            <p className="flex items-center gap-2">✔ Minimum 10 characters embedded</p>
            <p className="flex items-center gap-2">✔ Complex alphanumeric strings mixed</p>
          </div>

          <Button variant="primary" className="w-full mt-2 text-xs">
            Commit Changes & Sync
          </Button>
        </div>
      </Card>
    </div>
  );
}