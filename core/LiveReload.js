
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 35729 });
const clients = new Set();
wss.on('connection', ws => clients.add(ws));
export function reloadAllClients() {
  for (const ws of clients) { if (ws.readyState === 1) ws.send('reload'); }
}
