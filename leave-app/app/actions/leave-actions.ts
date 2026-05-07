"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeaveStatus(requestId: string, newStatus: "APPROVED" | "REJECTED") {
  // 1. Update the request
  const request = await prisma.leaveRequest.update({
    where: { id: requestId },
    data: { status: newStatus },
  });

  // 2. If approved, deduct from user's balance
  if (newStatus === "APPROVED") {
    // Basic logic to calculate days between dates
    const days = 5; // Replace with actual date diff logic
    await prisma.user.update({
      where: { id: request.userId },
      data: { totalAllowance: { decrement: days } }
    });
  }

  revalidatePath('/admin');
  revalidatePath('/dashboard');
}