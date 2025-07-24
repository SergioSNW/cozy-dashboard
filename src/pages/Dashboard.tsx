// src/pages/Dashboard.tsx
import React from 'react';

export default function Dashboard() {
  const user = {
    name: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/40',
  };

  return (
    // Remove rounded-xl from this to get full bleed background and header
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header full width, no rounding */}
      <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm w-full">
        <h1 className="text-2xl font-bold text-blue-700">Cozy Dashboard</h1>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">{user.name}</span>
          <img
            className="w-10 h-10 rounded-full border-2 border-blue-100"
            src={user.avatarUrl}
            alt={`${user.name} avatar`}
          />
        </div>
      </header>
      {/* <div className="bg-red-800">HI</div> */}
      {/* Main Content - Centers content, adds max width and margins */}
      <main className="flex justify-center items-start mt-10 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Your Widgets</h2>
          <p className="text-gray-600 mb-6">
            You haven’t created any widgets yet! Start by clicking below.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
            onClick={() => alert('TODO: Show widget creation modal!')}
          >
            + Create Widget
          </button>
        </div>
      </main>
    </div>
  );
}
