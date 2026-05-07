"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Umbrella, LayoutDashboard, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Admin Panel', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Umbrella className="w-8 h-8" />
          <span>LeaveFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === item.href 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-red-600 transition">
          <LogOut className="w-5 h-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200">
          JD
        </div>
      </div>
    </nav>
  );
}