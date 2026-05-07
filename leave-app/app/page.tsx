"use client";
import React from 'react';
import { Umbrella, Clock, CheckCircle, Plus } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import Navbar from '@/components/Navbar';
// 1. Import the action we created
import { submitLeaveRequest } from "@/app/actions/submit-leave";

export default function LeaveDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar /> {/* Added the Navbar here */}
      
      <div className="p-4 md:p-12 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Employee Portal</h1>
            <p className="text-slate-500">Manage your time off and balance.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Annual Leave" value="14 Days" icon={Umbrella} color="bg-blue-500" />
          <StatCard title="Pending" value="1 Request" icon={Clock} color="bg-amber-500" />
          <StatCard title="Used YTD" value="6 Days" icon={CheckCircle} color="bg-emerald-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- STEP B: THE FORM SECTION --- */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4">Quick Request</h2>
            
            {/* The action attribute calls our server function directly */}
            <form action={async (formData) => {
              const res = await submitLeaveRequest(formData);
              if (res.success) {
                alert("Leave request submitted successfully!");
              } else {
                alert("Error: " + res.error);
              }
            }} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                <select 
                  name="type" 
                  required 
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="VACATION">Vacation</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="PERSONAL">Personal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start</label>
                  <input 
                    name="startDate" 
                    type="date" 
                    required 
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End</label>
                  <input 
                    name="endDate" 
                    type="date" 
                    required 
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea 
                  name="reason" 
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm" 
                  placeholder="Optional note..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </form>
          </section>
          {/* --- END OF STEP B --- */}

          {/* History Table (Same as before) */}
          <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             {/* ... table code from previous step ... */}
          </section>
        </div>
      </div>
    </main>
  );
}