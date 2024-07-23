const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

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
