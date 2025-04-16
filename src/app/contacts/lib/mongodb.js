// src/app/contacts/lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://aaqoo223goole:zMpOd7NACIGvAuIl@cluster0.mgjvwzy.mongodb.net/contactsDB?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('請定義 MONGODB_URI 環境變數');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;