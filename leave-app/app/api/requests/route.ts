import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Here you would normally use Prisma:
  // await prisma.leaveRequest.create({ data: { ... } })
  
  console.log("Received request:", data);

  return NextResponse.json({ message: "Request submitted successfully" }, { status: 201 });
}