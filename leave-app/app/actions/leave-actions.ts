"use server"
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLeaveStatus(requestId: string, newStatus: "APPROVED" | "REJECTED") {
  try {
    // Update the request status using plain SQL
    await sql`
      UPDATE leave_requests 
      SET status = ${newStatus} 
      WHERE id = ${requestId}
    `;

    // Note: If you want to deduct from a user's allowance here in the future,
    // you would run a second SQL query updating a 'users' table.

    // Refresh the admin page data instantly
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}