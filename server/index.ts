import express from 'express';
import cors from 'cors';
import stripeRoutes from './routes/stripeRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Register API routes
app.use('/api/stripe', stripeRoutes);

export default app;
