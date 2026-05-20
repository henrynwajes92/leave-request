"use server"
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(formData: FormData) {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    return { success: false, error: "You must be logged in to request leave." };
  }

  // Evaluate inputs cleanly into native primitives before passing to SQL
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const typeStr = formData.get("type") as string;
  const reasonStr = (formData.get("reason") as string) || null;
  const userEmail = session.user.email || "unknown@company.com";
  const userName = session.user.name || "Unknown Employee";

  try {
    // Standard Tagged Template syntax
    await sql`
      INSERT INTO leave_requests (start_date, end_date, type, reason, user_id, user_name, status)
      VALUES (
        ${startDateStr}, 
        ${endDateStr}, 
        ${typeStr}, 
        ${reasonStr}, 
        ${userEmail}, 
        ${userName}, 
        'PENDING'
      )
    `;

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}