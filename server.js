import path from 'path';
import { bootstrap } from './src/core/app.js';
import { enableModule } from './src/core/router.js';
// import static middleware untuk public folder (AdminLTE)
import { serveStatic } from './src/middlewares/serveStatic.js';
import { cors, auth, rateLimiter } from './src/middlewares/index.js';
const publicMiddleware = serveStatic(path.resolve('./public'));

// ===== MODULE IMPORTS =====
import { homeRouter } from './src/modules/home/home.router.js';

// ===== ENABLE MODULES =====
enableModule('/', homeRouter, [cors]);

// bootstrap server
bootstrap(3000, publicMiddleware);


