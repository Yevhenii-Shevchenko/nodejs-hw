import mongoose from 'mongoose';
import { Note } from '../models/note';

export async function connectMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    await Note.syncIndexes();
    console.log('✅ MongoDB connection success!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
