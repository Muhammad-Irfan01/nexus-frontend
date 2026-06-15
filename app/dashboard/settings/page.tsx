
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Key, ShieldCheck, User, CreditCard, Bell } from "lucide-react";

export default function SettingsScreen() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="System Settings & Token Control" />
      
      <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Inner Tab Control Column Layout */}
        <div className="flex flex-col gap-1">
          {[
            { name: "User Profile", icon: User, active: false },
            { name: "Cryptographic Keys", icon: Key, active: true },
            { name: "Access Protocols", icon: ShieldCheck, active: false },
            { name: "Billing Framework", icon: CreditCard, active: false },
          ].map((tab, i) => (
            <button 
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium tracking-wide text-left transition-all ${
                tab.active 
                  ? 'bg-white/5 text-text-primary border border-white/10 shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${tab.active ? 'text-accent-primary' : 'text-text-secondary/60'}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Right Active Worksurface Panel Workspace */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-1">Developer Credentials</h3>
            <p className="text-xs text-text-secondary">Inject authorization variables below to bypass sandboxes via localized API parameters.</p>
          </div>

          <Card className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-medium text-text-secondary tracking-wider uppercase">Active Key Ring</label>
              <div className="flex gap-4 items-center">
                <div className="flex-1 bg-bg-primary font-mono text-xs text-text-secondary border border-white/8 rounded-lg px-4 py-3 tracking-widest">
                  nx_live_••••••••••••••••••••4921
                </div>
                <Button variant="secondary" className="!py-3 !px-4 text-xs">Reveal</Button>
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Access Scope Parameters</h4>
              <div className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-medium text-text-primary">Restrict Read Vector Access Only</p>
                  <p className="text-[10px] text-text-secondary">Prevents mutating cluster vectors over third party APIs.</p>
                </div>
                <div className="w-8 h-4 bg-accent-primary rounded-full relative p-0.5 cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" className="text-xs">Cancel</Button>
              <Button variant="primary" className="text-xs">Commit Token Updates</Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}