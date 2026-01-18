import url from 'url';
import { userRouter } from '../modules/user/user.router.js';
import { productRouter } from '../modules/product/product.router.js';
import { runMiddlewares } from './middleware.js';
import { cors, rateLimiter, auth } from '../middlewares/index.js';
import { sendResponse } from '../utils/response.js';
import { auth, cors, rateLimiter } from '../middlewares/index.js';


// Landing page welcome
async function welcomeRoute(req, res) {
    sendResponse(res, 200, {
        message: "Welcome to LieurFramework!",
        info: "Framework Node.js murni, modular, hot-reload config, multi-database support"
    });
}

const routes = {
    '/': { handler: welcomeRoute, middlewares: [cors] },
    '/users': { handler: userRouter, middlewares: [cors, rateLimiter, auth] },
    '/products': { handler: productRouter, middlewares: [cors, rateLimiter] }
};

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
