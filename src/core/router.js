import url from 'url';
import { sendResponse } from '../utils/response.js';
import { runMiddlewares } from './middleware.js';
import { cors, rateLimiter, auth } from '../middlewares/index.js';

// Landing page
async function welcomeRoute(req, res) {
    sendResponse(res, 200, {
        message: "Welcome to LieurFramework!",
        info: "Framework Node.js murni, modular, hot-reload config, multi-database support"
    });
}

// Enable module di sini
let routes = {
    '/': { handler: welcomeRoute, middlewares: [cors] },
    // '/users': { handler: userRouter, middlewares: [cors, rateLimiter, auth] },
    // '/products': { handler: productRouter, middlewares: [cors, rateLimiter] },
};

// Fungsi untuk enable module di runtime
export function enableModule(path, router, middlewares = []) {
    routes[path] = { handler: router, middlewares };
}

// Router utama
export async function appRouter(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const route = routes[parsedUrl.pathname];

    if (!route) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
        return;
    }

    const { handler, middlewares } = route;
    const proceed = await runMiddlewares(req, res, middlewares);
    if (proceed) await handler(req, res);
}
