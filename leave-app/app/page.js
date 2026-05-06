'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import LeaveForm from './components/LeaveForm';
import Dashboard from './components/Dashboard';

export default function Home() {
  const { data: session, status } = useSession();

  // ⏳ Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔐 Not logged in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Leave Request System
        </h1>

        <p className="mb-6 text-gray-600">
          Please sign in to continue
        </p>

        <button
          onClick={() => signIn()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  // 👤 Logged in view
  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔝 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">
          Leave System
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {session.user.email}
          </span>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🎯 ROLE-BASED CONTENT */}
      <div className="p-6">

        {session.user.role === 'employee' && (
          <LeaveForm />
        )}

        {session.user.role === 'approver' && (
          <Dashboard />
        )}

      </div>
    </div>
  );
}