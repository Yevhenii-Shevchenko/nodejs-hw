import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connection success!');

  } catch (error) {
    console.error(error.messaga);
    process.exit(1);
  }

}
