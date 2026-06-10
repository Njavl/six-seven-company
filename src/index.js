import 'dotenv/config';
import { connectDb } from './db/connection.js';
import { app } from './server.js';

const PORT = process.env.PORT ?? 3000;

try {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exit(1);
}
