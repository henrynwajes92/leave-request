"use server"
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(formData: FormData) {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const type = formData.get("type") as string;
  const reason = formData.get("reason") as string;

  const mockUserId = "user_123"; // Replace with actual user session later

  try {
    // A clean, safe SQL injection-proof insert statement
    await sql`
      INSERT INTO leave_requests (start_date, end_date, type, reason, user_id, status)
      VALUES (${new Date(startDate)}, ${new Date(endDate)}, ${type}, ${reason}, ${mockUserId}, 'PENDING')
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message || "Failed to submit request" };
  }
}