"use client";

import { useEffect, useState } from "react";
import { Key, ShieldCheck, User, CreditCard } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useBillingStore } from "@/store/billingStore";
import { Navbar } from "@/app/components/dashboard/Navbar";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

export default function SettingsScreen() {
  const { profile, fetchProfile, updateProfile, isLoading: isUserLoading } = useUserStore();
  const { subscription, fetchSubscription, createPortalSession, isLoading: isBillingLoading } = useBillingStore();
  const [activeTab, setActiveTab] = useState("User Profile");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetchProfile();
    // Assuming workspaceId is needed, but for simplicity we fetch generally if needed, 
    // or we might need it from a context provider. For now, skipping workspaceId dependency.
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

  const handleOpenPortal = async () => {
    // Assuming workspaceId is available, if not, this needs fixing.
    // For this prototype, using a mock workspaceId
    const url = await createPortalSession('mock-workspace-id');
    window.open(url, '_blank');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "User Profile":
        return (
          <div className="flex flex-col gap-6">
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
                  disabled={isUserLoading}
                >
                  {isUserLoading ? 'Updating...' : 'Commit Profile Updates'}
                </Button>
              </div>
            </Card>
          </div>
        );
      case "Billing Framework":
        return (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-1">Billing Framework</h3>
              <p className="text-xs text-text-secondary">Manage your subscription and billing details.</p>
            </div>
            <Card className="flex flex-col gap-4">
                <p className="text-sm">Status: {subscription?.status || 'No active subscription'}</p>
                <Button onClick={handleOpenPortal} disabled={isBillingLoading}>Manage Subscription</Button>
            </Card>
          </div>
        );
      default:
        return <div className="text-sm text-text-secondary">This section is currently under development.</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="System Settings & Token Control" />
      
      <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Inner Tab Control Column Layout */}
        <div className="flex flex-col gap-1">
          {[
            { name: "User Profile", icon: User },
            { name: "Cryptographic Keys", icon: Key },
            { name: "Access Protocols", icon: ShieldCheck },
            { name: "Billing Framework", icon: CreditCard },
          ].map((tab, i) => (
            <button 
              key={i}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium tracking-wide text-left transition-all ${
                activeTab === tab.name 
                  ? 'bg-white/5 text-text-primary border border-white/10 shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? 'text-accent-primary' : 'text-text-secondary/60'}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Right Active Worksurface Panel Workspace */}
        <div className="md:col-span-3">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}
