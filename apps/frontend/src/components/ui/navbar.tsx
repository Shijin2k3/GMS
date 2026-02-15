'use client';

import { Button } from '@/components/atoms/Button/button';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@lib';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push('/');
  };

  const isDashboard = pathname === '/dashboard';

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1
            className={cn(
              'text-xl font-semibold tracking-wide px-4 py-1 rounded-lg transition-all',
              isDashboard && 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
            )}
          >
            {isDashboard ? 'Members' : 'Dashboard'}
          </h1>
        </div>
        <Button
          label="Logout"
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
        />
      </div>
    </nav>
  );
}
