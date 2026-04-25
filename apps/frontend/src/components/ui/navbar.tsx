'use client';

import { Button } from '@/components/atoms/Button/button';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@lib';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Members', path: '/members' },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-wide mr-4">GMS</h1>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
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
