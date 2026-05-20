"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Umbrella, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Get the role from our secure JWT session cookie
  const userRole = session?.user?.role; 

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Umbrella className="w-6 h-6" />
          <span>LeaveFlow</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {/* Only show Employee Dashboard link if they aren't an admin */}
          {userRole !== "ADMIN" && (
            <Link href="/" className={`p-2 rounded-md ${pathname === "/" ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900"}`}>
              Dashboard
            </Link>
          )}

          {/* Only show Admin Panel link to users flagged as ADMIN */}
          {userRole === "ADMIN" && (
            <Link href="/admin" className={`p-2 rounded-md ${pathname === "/admin" ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900"}`}>
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs bg-slate-100 font-bold px-2.5 py-1 rounded-full text-slate-600">
          {userRole === "ADMIN" ? "🛡️ Admin" : "👥 Employee"}
        </span>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-slate-500 hover:text-rose-600 transition p-2 rounded-lg"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}