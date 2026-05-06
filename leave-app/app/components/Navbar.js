'use client';

import { signOut } from 'next-auth/react';

export default function Navbar({ user }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="font-bold text-xl text-blue-600">
        Leave System
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user.email}</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}