import knex from 'knex';
import * as dotenv from 'dotenv';

const envFile = process.env.ENV_FILE;
dotenv.config({ path: envFile });

interface Config {
    client: string;
    connection: {
        host?: string;
        user?: string;
        password?: string;
        database?: string;
        filename?: string;
    },
    useNullAsDefault?: boolean;
}

const sqlite3Config: Config = {
    client: 'sqlite3',
    connection: {
        filename: process.env.DB_FILENAME || './.sqlite'
    },
    useNullAsDefault: true
}

const mysql2Config: Config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}

let config: Config;
switch (process.env.DB_CLIENT) {
    case 'mysql2':
        config = mysql2Config;
        break;
    case 'sqlite3':
        config = sqlite3Config;
        break;
    default:
        throw new Error("Unsupported DB client: " + process.env.DB_CLIENT);
}

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