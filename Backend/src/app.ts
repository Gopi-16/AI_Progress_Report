import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import reportRoutes from './routes/report.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// Health
app.get('/', (_req, res) => res.send('AI Progress Report API'));

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
