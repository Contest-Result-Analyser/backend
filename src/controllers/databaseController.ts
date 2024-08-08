import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
    client: string;
    connection: {
        host?: string;
        user?: string;
        password?: string;
        database?: string;
    };
}

const config: Config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
};

let dbInstance: knex.Knex | undefined;

const getDb = (): knex.Knex => {
    if (!dbInstance) {
        dbInstance = knex(config);
    }
    return dbInstance;
}

export {
    getDb
};