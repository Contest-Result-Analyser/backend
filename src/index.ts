import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import authenticateToken from './middleware/auth';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import contestRoutes from './routes/contestRoutes';
import callsignRoutes from './routes/callsignRoutes';
import cabrilloRoutes from './routes/cabrilloRoutes';
import categoryRoutes from './routes/categoryRoutes';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
        },
    },
    // Weitere Konfigurationen
    apis: ['./src/routes/*.ts'],
};

dotenv.config();

const app = express();

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/contest', authenticateToken, contestRoutes);
app.use('/api/callsign', authenticateToken, callsignRoutes);
app.use('/api/cabrillo', authenticateToken, cabrilloRoutes);
app.use('/api/category', authenticateToken, categoryRoutes);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Swagger UI is available at http://localhost:3000/api-docs');
});