import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Select everything from your live Supabase table ordered by newest first
    const data = await sql`SELECT * FROM leave_requests ORDER BY created_at DESC`;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}