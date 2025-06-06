
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import laporanRoutes from './routes/laporanRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/login', authRoutes);
app.use('/laporan', laporanRoutes);

export default app;
