'use client';

import { useEffect, useState } from 'react';

export default function ApproverDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/leave')
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch('/api/leave', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    });

    setRequests(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Approver Dashboard</h2>

      {requests.map((req) => (
        <div key={req._id} className="border p-3 mb-2">
          <p>{req.name}</p>
          <p>{req.reason}</p>
          <p>Status: {req.status || 'Pending'}</p>

          <button
            onClick={() => updateStatus(req._id, 'approved')}
            className="bg-green-500 text-white px-2 mr-2"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(req._id, 'rejected')}
            className="bg-red-500 text-white px-2"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}