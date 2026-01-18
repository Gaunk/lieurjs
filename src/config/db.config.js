// src/config/db.config.js
// DB CONFIG → multi database (mysql2, pg, sqlite, dll)

import Knex from 'knex';
import { getEnv, reloadEnv } from './env.js';

let knexInstance = null;

// Fungsi untuk membuat koneksi DB
export function connectDb() {
    // reload env setiap dibutuhkan
    reloadEnv();

    const client = getEnv('DB_CLIENT', 'mysql2'); // default mysql2
    const host = getEnv('DB_HOST', '127.0.0.1');
    const user = getEnv('DB_USER', 'root');
    const password = getEnv('DB_PASS', '');
    const database = getEnv('DB_NAME', 'lieur');
    const port = getEnv('DB_PORT', client === 'pg' ? 5432 : 3306);

    knexInstance = Knex({
        client,
        connection: {
            host,
            user,
            password,
            database,
            port: Number(port)
        },
        pool: { min: 0, max: 10 },
        acquireConnectionTimeout: 10000
    });

    console.log(`DB connected using ${client} on ${host}:${port}`);
    return knexInstance;
}

// Fungsi untuk reload config & reconnect
export function reloadDbConfig() {
    if (knexInstance) {
        knexInstance.destroy(); // close koneksi lama
        knexInstance = null;
    }
    return connectDb();
}

// Export instance untuk model ORM Objection.js
export function getDb() {
    if (!knexInstance) {
        connectDb();
    }
    return knexInstance;
}
