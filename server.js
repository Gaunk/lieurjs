// server.js → ENTRY POINT aplikasi
// jalankan server, enable modul, dan serve static public

import path from 'path';
import { bootstrap } from './src/core/app.js';
import { enableModule } from './src/core/router.js';

// import middleware global
import { cors } from './src/middlewares/index.js';

// import static middleware untuk public folder (AdminLTE)
import { serveStatic } from './src/middlewares/serveStatic.js';

const publicMiddleware = serveStatic(path.resolve('./public'));

// ===============================
// ENABLE MODULES (SATU DULU)
// ===============================
import { homeRouter } from './src/modules/home/home.router.js';

// ROOT → HOME MODULE
enableModule('/', homeRouter, [cors]);

// ===============================
// BOOTSTRAP SERVER
// ===============================
bootstrap(3000, publicMiddleware);
