import { NextRequest, NextResponse } from 'next/server';

let ciStatus: { stage: string; status: string; logs: string; time: string }[] = [];
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables.');
}

export async function GET() {
  console.log('Current CI/CD Status:', ciStatus);
  return NextResponse.json({
    success: true,
    data: ciStatus,
    count: ciStatus.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { stage, status, logs } = body;

    if (!stage || !status || !logs) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    ciStatus.push({
      stage,
      status,
      logs,
      time: new Date().toISOString(),
    });

    if (ciStatus.length > 10) {
      ciStatus = ciStatus.slice(-10);
    }

    console.log('Updated CI/CD Status:', ciStatus);
    return NextResponse.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
