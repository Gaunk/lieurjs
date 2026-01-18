// src/middlewares/serveStatic.js → serve static files (AdminLTE/public)
import fs from 'fs';
import path from 'path';
import url from 'url';

export function serveStatic(baseDir) {
    return async (req, res, next) => {
        try {
            const parsedUrl = url.parse(req.url);
            let pathname = `${baseDir}${parsedUrl.pathname}`;

            if (fs.existsSync(pathname) && fs.lstatSync(pathname).isDirectory()) {
                pathname = path.join(pathname, 'index.html');
            }

            if (!fs.existsSync(pathname)) return next ? await next() : true;

            const ext = path.parse(pathname).ext;
            const mimeTypes = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.gif': 'image/gif',
                '.ico': 'image/x-icon'
            };

            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const data = fs.readFileSync(pathname);

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            return false;
        } catch (err) {
            console.error('Static file error:', err);
            if (next) await next();
            else return true;
        }
    };
}
