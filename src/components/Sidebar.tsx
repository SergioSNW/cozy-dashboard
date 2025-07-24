import React, { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Open by default

  return (
    <div className="h-full flex flex-col my-4" style={{ height: 'auto' }}>
      {/** Collapse button, visible on mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-blue-600 text-white p-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      {/* Sidebar */}
      <aside
        className={`
          bg-white h-full fixed md:static top-0 left-0 z-30 
          transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          w-4/5 sm:w-2/5 md:w-1/5 max-w-xs 
          rounded-r-2xl shadow-md
          flex flex-col p-4
        `}
        style={{ minWidth: '180px' }}
      >
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4 text-black">Sidebar</h2>
          <nav>
            <ul className="space-y-3 text-gray-700">
              <li>Dashboard</li>
              <li>Settings</li>
              <li>Profile</li>
              {/* Add more navigation here */}
            </ul>
          </nav>
        </div>
      </aside>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}
    </div>
  );
};
