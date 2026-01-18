export async function runMiddlewares(req, res, middlewares = []) {
    for (const mw of middlewares) {
        const proceed = await mw(req, res);
        if (!proceed) return false; // stop chain
    }
    return true;
}
