import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB using provided URI or environment variable.
 * Throws if no URI provided.
 */
export async function connectDB(mongoUri?: string) {
  const uri = mongoUri || process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (isConnected) return mongoose.connection;

  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('MongoDB disconnected');
  });

  // Connect
  await mongoose.connect(uri);
  return mongoose.connection;
}

export async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
  }
}
