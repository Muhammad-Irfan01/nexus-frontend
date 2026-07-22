'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { useAuthStore } from '@/store/authStore';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSignup = async () => {
    setError('');
    try {
      await register({ firstName, lastName, email, password });
      setSuccess(true);
      setTimeout(() => router.push('/signin'), 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    // ...
    <div className="w-screen h-screen bg-bg-primary flex items-center justify-center relative px-4">
      <div className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      
      <Card className="w-full max-w-[420px] !p-8 z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">Create Account</h2>
          <p className="text-xs text-text-secondary mt-1">Join the secure environment</p>
        </div>

        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-xs text-center mb-4">Registration successful! Redirecting...</p>}

        <div className="flex flex-col gap-4">
          <Input 
            label="First Name" 
            type="text" 
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <Input 
            label="Last Name" 
            type="text" 
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
         <Input 
            label="Email" 
            type="email" 
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            variant="primary" 
            className="w-full mt-2" 
            onClick={handleSignup}
            disabled={isLoading || success}
          >
            {isLoading ? 'Registering...' : 'Create Account'}
          </Button>
        </div>
        <div>
          <p className="text-xs text-text-secondary mt-4">Already have an account? <a href="/signin" className="text-accent-primary">Sign in</a></p>
        </div>
      </Card>
    </div>
  );
}
