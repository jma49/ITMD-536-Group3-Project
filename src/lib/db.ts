// src/lib/db.ts

import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}
