import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devmeet', {
      serverSelectionTimeoutMS: 2000 // Try for 2 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Could not connect to local MongoDB. Springing up an in-memory DB...`);
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host} at ${uri}`);
    } catch (inMemoryError) {
      console.error(`Error with In-Memory DB: ${inMemoryError.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
