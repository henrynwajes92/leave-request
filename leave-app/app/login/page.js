'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    await signIn('credentials', {
      email,
      password: 'test',
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}