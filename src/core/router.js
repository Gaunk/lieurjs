// src/core/router.js → ENGINE untuk modular routes

const modules = []; // daftar modul

// PASANG MODUL DI SINI: dipanggil dari server.js
export function enableModule(path, router, middlewares = []) {
    modules.push({ path, router, middlewares });
}

// engine router utama
export async function appRouter(req, res) {
    for (const mod of modules) {
        if (req.url.startsWith(mod.path)) {
            for (const mw of mod.middlewares) {
                const proceed = await mw(req, res);
                if (proceed === false) return; // stop chain
            }
            return await mod.router(req, res);
        }
    }

    // default welcome message
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to LieurFramework!' }));
}
