"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(formData: FormData) {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const type = formData.get("type") as string;
  const reason = formData.get("reason") as string;

  // In a real app, get the userId from the session
  const mockUserId = "user_123"; 

  try {
    await prisma.leaveRequest.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type: type as any,
        reason: reason,
        userId: mockUserId,
        status: "PENDING"
      }
    });

    // This refreshes the dashboard data without a full page reload
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to submit request" };
  }
}