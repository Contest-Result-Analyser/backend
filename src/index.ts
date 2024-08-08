import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import contestRoutes from './routes/contestRoutes';
import callsignRoutes from './routes/callsignRoutes';
import cabrilloRoutes from './routes/cabrilloRoutes';
import categoryRoutes from './routes/categoryRoutes';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/contest', contestRoutes);
app.use('/api/callsign', callsignRoutes);
app.use('/api/cabrillo', cabrilloRoutes);
app.use('/api/category', categoryRoutes);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});