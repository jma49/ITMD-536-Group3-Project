// src/app/api/status/route.ts

import { NextRequest, NextResponse } from 'next/server';

// 使用一个简单的内存存储（注意：生产环境下应使用数据库）
let ciStatus: { stage: string; status: string; logs: string; time: string }[] = [];

// 从环境变量中获取 API_KEY
const API_KEY = process.env.API_KEY;

export async function GET() {
  return NextResponse.json(ciStatus);
}

export async function POST(req: NextRequest) {
  // 验证 API 密钥
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== API_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 解析请求体
  const body = await req.json();
  const { stage, status, logs } = body;

  ciStatus.push({
    stage,
    status,
    logs,
    time: new Date().toISOString(),
  });

  // 保留最近的 10 条记录
  if (ciStatus.length > 10) {
    ciStatus = ciStatus.slice(-10);
  }

  return NextResponse.json({ message: 'Status updated' });
}
