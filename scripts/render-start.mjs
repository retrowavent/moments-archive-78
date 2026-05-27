import http from 'node:http';
import { Readable } from 'node:stream';

const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';

const mod = await import(new URL('../dist/server/server.js', import.meta.url));
const app = mod.default;

if (!app || typeof app.fetch !== 'function') {
  throw new Error('dist/server/server.js does not export a fetch handler');
}

const server = http.createServer(async (req, res) => {
  try {
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
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

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
