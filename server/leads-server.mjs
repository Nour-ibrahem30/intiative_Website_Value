import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const args = new Set(process.argv.slice(2));
const getArgValue = (name) => {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
};

const port = Number(getArgValue('--port') || process.env.PORT || 8787);
const serveDist = args.has('--serve-dist') || process.env.SERVE_DIST === '1';

const dataDir = path.join(projectRoot, 'data');
const leadsFilePath = path.join(dataDir, 'leads.csv');
const allowedOriginsEnv = (process.env.LEADS_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
const rateLimitWindowMs = Number(process.env.LEADS_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const rateLimitMax = Number(process.env.LEADS_RATE_LIMIT_MAX || 30);

const headers = [
  'receivedAt',
  'type',
  'name',
  'email',
  'phone',
  'company',
  'message',
  'pageUrl',
  'createdAt'
];

const localhostOriginRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const getClientIp = (req) => {
  const ip = req.socket?.remoteAddress || '';
  return ip;
};

const isLocalIp = (ip) => ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';

const isAllowedOrigin = (origin) => {
  if (!origin) return false;
  if (localhostOriginRegex.test(origin)) return true;
  return allowedOriginsEnv.includes(origin);
};

const rateBuckets = new Map();
const isRateLimited = (ip) => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets.entries()) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
  const existing = rateBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  existing.count += 1;
  if (existing.count > rateLimitMax) return true;
  return false;
};

const escapeCsv = (value) => {
  let str = String(value ?? '');
  if (/^[=\-+@]/.test(str)) str = `'${str}`;
  return `"${str.replace(/"/g, '""')}"`;
};

const ensureLeadsFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leadsFilePath);
  } catch {
    await fs.writeFile(leadsFilePath, `\uFEFF${headers.join(',')}\r\n`, 'utf8');
  }
};

const appendLead = async (lead) => {
  await ensureLeadsFile();
  const row = headers.map((h) => escapeCsv(lead?.[h])).join(',') + '\r\n';
  await fs.appendFile(leadsFilePath, row, 'utf8');
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1024 * 1024) req.destroy(new Error('Body too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

const sendJson = (res, statusCode, obj) => {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(body);
};

const sendText = (res, statusCode, text, contentType = 'text/plain; charset=utf-8') => {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(text);
};

const setCommonHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

  if (serveDist) {
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "img-src 'self' https: data:",
        "font-src 'self' https://fonts.gstatic.com data:",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "script-src 'self'",
        "connect-src 'self'"
      ].join('; ')
    );
  }
};

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const sanitizeLead = (incoming) => {
  const sanitizeText = (value, maxLen) => {
    if (typeof value !== 'string') return '';
    const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
    return cleaned.length > maxLen ? cleaned.slice(0, maxLen) : cleaned;
  };

  const trimmed = (v) => (typeof v === 'string' ? v.trim() : v);
  const safe = {
    receivedAt: new Date().toISOString(),
    type: sanitizeText(trimmed(incoming?.type), 32) || 'unknown',
    name: sanitizeText(trimmed(incoming?.name), 120),
    email: sanitizeText(trimmed(incoming?.email), 254).toLowerCase(),
    phone: sanitizeText(trimmed(incoming?.phone), 40),
    company: sanitizeText(trimmed(incoming?.company), 120),
    message: sanitizeText(trimmed(incoming?.message), 4000),
    pageUrl: sanitizeText(trimmed(incoming?.pageUrl), 500),
    createdAt: sanitizeText(trimmed(incoming?.createdAt), 64)
  };
  return safe;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const serveStaticFile = async (req, res, pathname) => {
  const distDir = path.join(projectRoot, 'dist');
  const safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(distDir, safePath);
  const ext = path.extname(filePath).toLowerCase();

  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
  };

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      const indexContent = await fs.readFile(indexPath);
      sendText(res, 200, indexContent, contentTypes['.html']);
      return;
    }

    const content = await fs.readFile(filePath);
    sendText(res, 200, content, contentTypes[ext] || 'application/octet-stream');
  } catch {
    try {
      const indexPath = path.join(distDir, 'index.html');
      const indexContent = await fs.readFile(indexPath);
      sendText(res, 200, indexContent, contentTypes['.html']);
    } catch {
      sendText(res, 404, 'Not found');
    }
  }
};

const server = http.createServer(async (req, res) => {
  try {
    setCommonHeaders(req, res);

    if (req.method === 'OPTIONS') {
      const origin = req.headers.origin;
      if (origin && isAllowedOrigin(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
      }
      sendText(res, 204, '');
      return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;
    const ip = getClientIp(req);

    if (req.method === 'POST' && pathname === '/api/leads') {
      if (isRateLimited(ip)) {
        sendJson(res, 429, { ok: false, error: 'Too many requests' });
        return;
      }

      const origin = req.headers.origin;
      if (!isLocalIp(ip) && (!origin || !isAllowedOrigin(origin))) {
        sendJson(res, 403, { ok: false, error: 'Forbidden' });
        return;
      }

      const raw = await readBody(req);
      const contentType = (req.headers['content-type'] || '').toLowerCase();

      let incoming = null;
      if (contentType.includes('application/json')) {
        incoming = safeJsonParse(raw);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams(raw);
        incoming = params.get('payload') ? safeJsonParse(params.get('payload')) : Object.fromEntries(params.entries());
      } else {
        incoming = safeJsonParse(raw);
      }

      const lead = sanitizeLead(incoming || {});
      if (!lead.name || !lead.email || !isValidEmail(lead.email)) {
        sendJson(res, 400, { ok: false, error: 'Invalid payload' });
        return;
      }
      if (lead.type !== 'contact' && lead.type !== 'apply') {
        sendJson(res, 400, { ok: false, error: 'Invalid payload' });
        return;
      }
      await appendLead(lead);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (serveDist && req.method === 'GET') {
      await serveStaticFile(req, res, pathname === '/' ? '/index.html' : pathname);
      return;
    }

    sendJson(res, 404, { ok: false, error: 'Not found' });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error?.message || 'Server error' });
  }
});

server.listen(port, () => {
  const mode = serveDist ? 'dist+api' : 'api';
  void ensureLeadsFile();
  process.stdout.write(`leads-server (${mode}) listening on http://localhost:${port}\n`);
  process.stdout.write(`CSV file: ${leadsFilePath}\n`);
});

