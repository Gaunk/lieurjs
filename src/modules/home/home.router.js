import { HomeController } from './home.controller.js';

export async function homeRouter(req, res) {
    const url = req.url.split('?')[0];

    // HANYA ROOT
    if (url === '/') {
        return await HomeController.index(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
}
