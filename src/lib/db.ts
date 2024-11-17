// src/lib/db.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false; // 连接状态

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI as string);
    isConnected = true;
    console.log('success connect to database');
  } catch (error) {
    console.error('connect to database error:', error);
    throw error;
  }
}
