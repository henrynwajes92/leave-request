'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import LeaveForm from './components/LeaveForm';
import ApproverDashboard from './components/ApproverDashboard';

export default function Home() {
  const { data: session, status } = useSession();

  // ⏳ Loading state
  if (status === 'loading') {
    return <p className="p-6">Loading...</p>;
  }

  // 🔐 Not logged in
  if (!session) {
    return (
      <div className="p-6">
        <p>You are not signed in</p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Sign In
        </button>
      </div>
    );
  }

  // 👤 Logged in
  return (
    <div>
      <div className="p-4 flex justify-between bg-gray-100">
        <p>{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-2"
        >
          Logout
        </button>
      </div>

      {/* 🎯 STEP 4: ROLE-BASED UI */}
      {session.user.role === 'employee' && <LeaveForm />}

      {session.user.role === 'approver' && <ApproverDashboard />}
    </div>
  );
}