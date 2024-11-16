import { NextResponse } from 'next/server';

let ciStatus: { stage: string; status: string; logs: string; time: string }[] = [];

export async function GET() {
  return NextResponse.json(ciStatus);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { stage, status, logs } = body;

  ciStatus.push({
    stage,
    status,
    logs,
    time: new Date().toISOString(),
  });

  // 限制存储的状态条数
  if (ciStatus.length > 10) {
    ciStatus = ciStatus.slice(-10);
  }

  return NextResponse.json({ message: 'Status updated' });
}
