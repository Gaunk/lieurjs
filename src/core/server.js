import http from 'http';
import { appRouter } from './router.js';
import { errorHandler } from './errorHandler.js';

export function createServer(port = 3000) {
    const server = http.createServer(async (req, res) => {
        try {
            await appRouter(req, res); // Panggil router
        } catch (err) {
            errorHandler(err, req, res);
        }
    });

    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    return server;
}
