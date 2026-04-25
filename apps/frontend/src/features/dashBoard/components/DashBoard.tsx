'use client';

import Navbar from '@/components/ui/navbar';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">
            This is the main dashboard. Navigation to manage members is available in the top bar.
          </p>
        </div>
      </div>
    </div>
  );
}
