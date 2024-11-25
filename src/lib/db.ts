// src/lib/db.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Cache the connection promise
let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    // If already connected, use the existing connection
    console.log('Using existing database connection');
    return mongoose;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseInstance) => {
        console.log('Successfully connected to database');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('Failed to connect to database:', error);
        cachedPromise = null; // Reset the promise if connection failed
        throw error;
      });
  } else {
    console.log('Waiting for database connection');
  }

  await cachedPromise;
  return mongoose;
}
