import mongoose from 'mongoose';
import { env, isProd } from './env';

let memoryServer: { stop: () => Promise<boolean> } | null = null;

export async function connectDB(): Promise<void> {
  let uri = env.MONGODB_URI;

  if (!uri) {
    if (isProd) {
      throw new Error('MONGODB_URI is required in production');
    }
    // Dev-only fallback: ephemeral in-memory MongoDB so the API runs without a local mongod.
    const { MongoMemoryReplSet } = await import('mongodb-memory-server');
    const replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
    memoryServer = replSet;
    uri = replSet.getUri('college_junction');
    console.warn('⚠️  MONGODB_URI not set — using in-memory MongoDB (data is NOT persisted).');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log(`✅ MongoDB connected (${mongoose.connection.name})`);
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
