import { getDb } from './controllers/databaseController';
import dotenv from 'dotenv';

dotenv.config();

const db = getDb();

(async () => {
    try {
        await db.migrate.latest();
        console.log('Database successfully migrated');
    } catch (error) {
        console.error('Error by database migration:', error);
    } finally {
        await db.destroy();
    }
})();