'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { useAuthStore } from '@/store/authStore';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="w-screen h-screen bg-bg-primary flex items-center justify-center relative px-4">
      <div className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      
      <Card className="w-full max-w-[420px] !p-8 z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center font-bold text-lg mb-4">N</div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">Welcome to Nexus Core</h2>
          <p className="text-xs text-text-secondary mt-1">Authenticate to access your secure environment</p>
        </div>

        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          <Input 
            label="Identity Gateway (Email)" 
            type="email" 
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            label="Security Key (Password)" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            variant="primary" 
            className="w-full mt-2" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Initialize Connection'}
          </Button>
        </div>
        <div>
          <p className="text-xs text-text-secondary mt-4">Don't have an account? <a href="/signup" className="text-accent-primary">Sign up</a></p>
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