import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";


export default function Signin() {
  return (
    <div className="w-screen h-screen bg-bg-primary flex items-center justify-center relative px-4">
      <div className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      
      <Card className="w-full max-w-[420px] !p-8 z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center font-bold text-lg mb-4">N</div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">Welcome to Nexus Core</h2>
          <p className="text-xs text-text-secondary mt-1">Authenticate to access your secure environment</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input label="Identity Gateway (Email)" type="email" placeholder="name@domain.com" />
          <Input label="Security Key (Password)" type="password" placeholder="••••••••" />
          <Button variant="primary" className="w-full mt-2">Initialize Connection</Button>
        </div>

        <div className="relative flex py-5 items-center my-2">
          <div className="flex-grow border-t border-white/8"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-text-secondary/50 font-mono">OR TRANSLATE VIA</span>
          <div className="flex-grow border-t border-white/8"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="!py-2.5 !text-xs">Google</Button>
          <Button variant="secondary" className="!py-2.5 !text-xs">GitHub</Button>
        </div>
      </Card>
    </div>
  );
}