"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'AI Chat', path: '/dashboard/chat', icon: '💬' },
  { name: 'Research Agent', path: '/dashboard/research', icon: '⚡' },
  { name: 'Knowledge Base', path: '/dashboard/knowledge', icon: '🗄️' },
  { name: 'Document Chat', path: '/dashboard/doc-chat', icon: '📄' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/signin');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-bg-secondary border-r border-white/8 flex flex-col fixed left-0 top-0 z-20">
      <div className="h-18 px-6 flex items-center border-b border-white/8 gap-3 min-h-[72px]">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center font-bold text-sm tracking-tighter">N</div>
        <span className="font-bold text-sm tracking-wider text-text-primary">NEXUS AI</span>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive 
                  ? 'bg-white/5 text-text-primary border-l-2 border-accent-primary' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/4'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent-highlight/20 border border-accent-highlight/30 flex items-center justify-center text-sm font-bold">
            {user?.name ? user.name[0].toUpperCase() : 'O'}
          </div>
          <div className="flex flex-col max-w-[140px]">
            <span className="text-xs font-medium text-text-primary truncate">{user?.name || 'Enterprise Node'}</span>
            <span className="text-[10px] text-system-success font-medium flex items-center gap-1">● Online</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          title="Disconnect Session" 
          className="text-text-secondary hover:text-red-400 p-1.5 rounded-md hover:bg-white/5 transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
        </button>
      </div>
    </aside>
  );
};
