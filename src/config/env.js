import dotenv from 'dotenv';
dotenv.config();

export function getEnv(key, defaultValue = undefined) {
    return process.env[key] || defaultValue;
}

export function reloadEnv() {
    dotenv.config();
    console.log('Environment reloaded!');
}
