// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MainBody } from '../components/MainBody';
import { Sidebar } from '../components/Sidebar';
import Footer from '../components/Footer';
import { Widget } from '../components/widgets/Widget';
import { TimerWidget } from '../components/widgets/TimerWidget';

export default function Dashboard() {
  const user = {
    name: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/40',
  };
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    // Remove rounded-xl from this to get full bleed background and header
    <div className="flex flex-col min-h-[calc(100vh-80px)] max-h-screen bg-gray-200 max-w-8xl mx-10 my-8 rounded-2xl">
      <Header user={user} />
      <div className="flex flex-1">
        <Sidebar />

        <MainBody>
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Your Widgets
          </h2>
          <p className="text-gray-600 mb-6">
            You haven’t created any widgets yet! Start by clicking below.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
            onClick={() => alert('TODO: Show widget creation modal!')}
          >
            + Create Widget
          </button>
          <Widget id="1" title="Timer">
            <TimerWidget />
          </Widget>
        </MainBody>
      </div>
      <Footer />
    </div>
  );
}
