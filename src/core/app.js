// src/core/app.js → CORE ENGINE framework
// bootstrap HTTP server + middleware chain + hot-reload .env/dbConfig

import http from 'http';
import { appRouter } from './router.js';
import { reloadEnv } from '../config/env.js';
import { reloadDbConfig } from '../config/db.config.js';
import fs from 'fs';

export function bootstrap(port = 3000, staticMiddleware = null) {
    const server = http.createServer(async (req, res) => {
        // PASANG STATIC MIDDLEWARE DI SINI: sebelum route
        if (staticMiddleware) {
            const handled = await staticMiddleware(req, res);
            if (!handled) return; // jika static file ditemukan, stop chain
        }

        // jalankan router modular
        await appRouter(req, res);
    });

    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    // PASANG HOT-RELOAD .env dan DB config
    fs.watch('.env', (eventType) => {
        if (eventType === 'change') {
            reloadEnv();
            reloadDbConfig();
            console.log('Environment and DB config reloaded!');
        }
    });
}
