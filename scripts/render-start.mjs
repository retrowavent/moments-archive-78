import http from 'node:http';
import { Readable } from 'node:stream';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const CLIENT_DIR = join(process.cwd(), 'dist', 'client');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const mod = await import(new URL('../dist/server/server.js', import.meta.url));
const app = mod.default;

if (!app || typeof app.fetch !== 'function') {
  throw new Error('dist/server/server.js does not export a fetch handler');
}

function tryServeStatic(req, res) {
  const rawPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (!rawPath.startsWith('/assets/') && rawPath !== '/favicon.ico') return false;

  const safePath = normalize(rawPath).replace(/^\/+/, '');
  const filePath = join(CLIENT_DIR, safePath);

  if (!existsSync(filePath) || !statSync(filePath).isFile()) return false;

  const type = MIME[extname(filePath)] || 'application/octet-stream';
  res.statusCode = 200;
  res.setHeader('content-type', type);
  res.setHeader('cache-control', 'public, max-age=31536000, immutable');
  createReadStream(filePath).pipe(res);
  return true;
}

const server = http.createServer(async (req, res) => {
  try {
    if (tryServeStatic(req, res)) return;

    const origin = `http://${req.headers.host || `localhost:${PORT}`}`;
    const url = new URL(req.url || '/', origin);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else if (value != null) {
        headers.set(key, value);
      }
    }

    const method = req.method || 'GET';
    const body = method === 'GET' || method === 'HEAD' ? undefined : Readable.toWeb(req);

    const request = new Request(url, {
      method,
      headers,
      body,
      duplex: body ? 'half' : undefined,
    });

    const response = await app.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (!response.body) return res.end();

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
