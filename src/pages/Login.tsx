// src/pages/Login.tsx
import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="p-4">
        <h1 className="text-xl" style={{}}>
          My Cozy Dashboard
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
        <h2 className="mb-4 text-xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-2 block w-full p-2 border rounded bg-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 block w-full p-2 border rounded bg-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
