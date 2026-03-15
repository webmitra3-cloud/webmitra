import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = cached;
}

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  logger.info("MongoDB connected");
  return cached.conn;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
}
