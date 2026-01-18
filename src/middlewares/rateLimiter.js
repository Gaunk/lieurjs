const requests = {};

export async function rateLimiter(req, res) {
    const ip = req.socket.remoteAddress;
    const now = Date.now();

    if (!requests[ip]) requests[ip] = [];
    requests[ip] = requests[ip].filter(t => now - t < 10000); // 10 detik window

    if (requests[ip].length >= 5) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Too Many Requests' }));
        return false;
    }

    requests[ip].push(now);
    return true;
}
