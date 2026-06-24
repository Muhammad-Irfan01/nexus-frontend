
import Link from "next/link";
import { KeyRound, ArrowLeft } from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

export default function ForgotPasswordPage() {
  return (
    <div className="w-screen h-screen bg-bg-primary flex items-center justify-center relative px-4">
      {/* Background radial glow */}
      <div className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      
      <Card className="w-full max-w-[420px] !p-8 z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-accent-highlight mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Recover Account Node
          </h2>
          <p className="text-xs text-text-secondary mt-1 max-w-[280px]">
            Input your registered identity parameter to dispatch a recovery payload
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input 
            label="Account Identity (Email)" 
            type="email" 
            placeholder="operator@domain.com" 
          />
          
          <Button variant="primary" className="w-full mt-2 text-xs">
            Transmit Recovery Key
          </Button>
        </div>

        {/* Navigation Return Hook */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary transition-colors group mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Account Authorization
          </Link>
        </div>
      </Card>
    </div>
  );
}