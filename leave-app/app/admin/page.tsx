import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Forces Next.js to always fetch fresh data from Supabase on every page load
export const dynamic = "force-dynamic";

export default async function AdminPanel() {
  // Fetch all pending requests directly from Supabase
  const pendingRequests = await sql`
    SELECT id, start_date, end_date, type, reason, user_name, status 
    FROM leave_requests 
    WHERE status = 'PENDING' 
    ORDER BY created_at ASC
  `;

  // Server Action to process approvals/rejections immediately
  async function handleAction(formData: FormData) {
    "use server";
    const id = formData.get("id");
    const status = formData.get("status");

    try {
      await sql`
        UPDATE leave_requests 
        SET status = ${status as string} 
        WHERE id = ${Number(id)}
      `;
      
      // Refresh both layouts so data updates in real-time across views
      revalidatePath("/admin");
      revalidatePath("/"); 
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  return (
    <main className="p-4 md:p-12 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Approval Panel</h1>
        <p className="text-slate-500 text-sm">Review incoming team leave requests.</p>
      </div>

      {/* Main Request Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {pendingRequests.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">
            🎉 No pending leave requests to review!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingRequests.map((req: any) => (
              <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                
                {/* Request Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    {/* Displays the dynamic sender's name */}
                    <span className="font-bold text-slate-800 text-lg">
                      {req.user_name || "Unknown Employee"}
                    </span> 
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {req.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm italic">
                    "{req.reason || "No reason provided"}"
                  </p>
                  
                  <p className="text-xs text-slate-400 font-medium">
                    Requested Dates: {new Date(req.start_date).toLocaleDateString()} to {new Date(req.end_date).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Forms */}
                <div className="flex items-center gap-2 sm:self-end md:self-center">
                  {/* Approve Button Form */}
                  <form action={handleAction}>
                    <input type="hidden" name="id" value={req.id} />
                    <input type="hidden" name="status" value="APPROVED" />
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition shadow-xs cursor-pointer"
                    >
                      Approve
                    </button>
                  </form>

                  {/* Reject Button Form */}
                  <form action={handleAction}>
                    <input type="hidden" name="id" value={req.id} />
                    <input type="hidden" name="status" value="REJECTED" />
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition shadow-xs cursor-pointer"
                    >
                      Reject
                    </button>
                  </form>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}