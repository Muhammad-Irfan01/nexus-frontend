"use client";

import { useEffect, useState } from "react";
import { Key, ShieldCheck, User, CreditCard } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

export default function SettingsScreen() {
  const { profile, fetchProfile, updateProfile, isLoading } = useUserStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    await updateProfile({ firstName, lastName });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="System Settings & Token Control" />
      
      <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Inner Tab Control Column Layout */}
        <div className="flex flex-col gap-1">
          {[
            { name: "User Profile", icon: User, active: true },
            { name: "Cryptographic Keys", icon: Key, active: false },
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
            <h3 className="text-base font-semibold text-text-primary mb-1">User Profile</h3>
            <p className="text-xs text-text-secondary">Update your profile information below.</p>
          </div>

          <Card className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input 
                label="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="primary" 
                className="text-xs" 
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Commit Profile Updates'}
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
