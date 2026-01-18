import { dbConfig } from '../config/db.config.js';
import mysql from 'mysql2/promise';
import { Client } from 'pg';

let dbClient;

export async function connectDB() {
    if (dbConfig.client === 'mysql') {
        dbClient = await mysql.createPool({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });
        console.log('Connected to MySQL');
    } else if (dbConfig.client === 'postgres') {
        dbClient = new Client({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });
        await dbClient.connect();
        console.log('Connected to PostgreSQL');
    }
    return dbClient;
}

export function getDB() {
    if (!dbClient) throw new Error('Database not connected');
    return dbClient;
}
