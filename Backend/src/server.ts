import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB, disconnectDB } from './db/mongoose';

const PORT = Number(process.env.PORT) || 4000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    const server = app.listen(PORT, () => {
      console.log(\`Server listening on http://localhost:\${PORT}\`);
    });

    const graceful = async () => {
      console.log('Graceful shutdown...');
      server.close(() => console.log('HTTP server closed'));
      await disconnectDB();
      process.exit(0);
    };

    process.on('SIGINT', graceful);
    process.on('SIGTERM', graceful);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
