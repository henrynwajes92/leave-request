"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Umbrella, Shield, Users } from "lucide-react";

export default function CustomLoginPage() {
  const [role, setRole] = useState<"EMPLOYEE" | "ADMIN">("EMPLOYEE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      role,
      redirect: true, // Let our route.ts custom redirect handling handle navigation
      callbackUrl: role === "ADMIN" ? "/admin" : "/",
    });

    if (result?.error) {
      setError("Invalid login credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="flex justify-center text-blue-600">
          <Umbrella className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">LeaveFlow Portal</h2>
        <p className="text-sm text-slate-500">Sign in to manage team scheduling & request approvals.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10 space-y-6">
          
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setRole("EMPLOYEE")}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition ${
                role === "EMPLOYEE" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Users className="w-4 h-4" />
              Employee
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition ${
                role === "ADMIN" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "ADMIN" ? "admin@company.com" : "employee@company.com"}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition shadow-xs text-sm mt-2"
            >
              {loading ? "Signing in..." : `Sign In as ${role === "ADMIN" ? "Admin" : "Employee"}`}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}