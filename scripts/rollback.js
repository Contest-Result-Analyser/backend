const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'mysql2', // oder 'mysql' je nachdem, welches Paket du verwendest
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

(async () => {
    try {
        await db.migrate.rollback();
        console.log('Database migration rollback successfully');
    } catch (error) {
        console.error('Error by database migrations rollback:', error);
    } finally {
        await db.destroy();
    }
})();
