'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch data from backend
  const fetchRequests = async () => {
    const res = await fetch('/api/leave');
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve / Reject
  const updateStatus = async (id, status) => {
    await fetch('/api/leave', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });

    // Refresh data after update
    fetchRequests();
  };

  // 📊 Summary
  const approved = requests.filter(r => r.status === 'approved').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;
  const pending = requests.filter(r => r.status === 'pending').length;

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Pending</p>
          <p className="text-xl">{pending}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Approved</p>
          <p className="text-xl">{approved}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Rejected</p>
          <p className="text-xl">{rejected}</p>
        </div>
      </div>

      {/* 📄 Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}   // ✅ FIXED
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{req.name}</p>
                <p className="text-sm text-gray-600">
                  {req.start_date} → {req.end_date}
                </p>
                <p className="mt-1">{req.reason}</p>
                <p className="text-sm mt-1">
                  Status: <span className="font-semibold">{req.status}</span>
                </p>
              </div>

              {/* 🎯 Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(req.id, 'approved')}  // ✅ FIXED
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(req.id, 'rejected')}  // ✅ FIXED
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-center text-gray-500">
            No leave requests yet
          </p>
        )}
      </div>
    </div>
  );
}