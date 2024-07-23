const knex = require('knex');
require('dotenv').config();

const config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
};

let dbInstance;

function getDb() {
    if (!dbInstance) {
        dbInstance = knex(config);
    }
    return dbInstance;
}

module.exports = {
    getDb
};
