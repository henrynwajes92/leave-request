"use client";
import { useState, useEffect } from "react";
import { Check, X, User } from "lucide-react";

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([
    { id: "1", userName: "John Doe", type: "Vacation", days: 5, reason: "Family trip" },
    { id: "2", userName: "Jane Smith", type: "Sick Leave", days: 2, reason: "Flu" },
  ]);

  const handleAction = async (id: string, action: 'APPROVED' | 'REJECTED') => {
    // Logic: Call your API to update database status
    setPendingRequests(prev => prev.filter(req => req.id !== id));
    alert(`Request ${action.toLowerCase()} successfully.`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y">
        {pendingRequests.length === 0 ? (
          <p className="p-10 text-center text-slate-500">No pending requests to review.</p>
        ) : (
          pendingRequests.map((req) => (
            <div key={req.id} className="p-6 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="text-slate-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{req.userName}</p>
                  <p className="text-sm text-slate-500">{req.type} • {req.days} days</p>
                  <p className="text-xs italic text-slate-400 mt-1">"{req.reason}"</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(req.id, 'REJECTED')}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleAction(req.id, 'APPROVED')}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}