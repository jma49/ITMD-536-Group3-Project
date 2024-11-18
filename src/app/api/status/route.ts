import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CIStatus from '@/models/CIStatus';
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables.');
}

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch the latest 10 CI/CD statuses from the database
    const statuses = await CIStatus.find().sort({ time: -1 }).limit(10);
    return NextResponse.json({
      success: true,
      data: statuses,
      count: statuses.length,
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to fetch data', error: errorMessage },
      { status: 500 },
    );
  }
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
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // Create a new CIStatus document and save it to the database
    const ciStatus = new CIStatus({
      stage,
      status,
      logs,
      time: new Date(),
    });

    await ciStatus.save();

    console.log('New CI/CD Status saved:', ciStatus);
    return NextResponse.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Error processing POST request:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 },
    );
  }
}
