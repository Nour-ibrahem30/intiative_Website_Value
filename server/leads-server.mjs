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

const escapeCsv = (value) => {
  const str = String(value ?? '');
  return `"${str.replace(/"/g, '""')}"`;
};

const ensureLeadsFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leadsFilePath);
  } catch {
    await fs.writeFile(leadsFilePath, `${headers.join(',')}\r\n`, 'utf8');
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
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(body);
};

const sendText = (res, statusCode, text, contentType = 'text/plain; charset=utf-8') => {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(text);
};

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const sanitizeLead = (incoming) => {
  const trimmed = (v) => (typeof v === 'string' ? v.trim() : v);
  const safe = {
    receivedAt: new Date().toISOString(),
    type: trimmed(incoming?.type) || 'unknown',
    name: trimmed(incoming?.name) || '',
    email: trimmed(incoming?.email) || '',
    phone: trimmed(incoming?.phone) || '',
    company: trimmed(incoming?.company) || '',
    message: trimmed(incoming?.message) || '',
    pageUrl: trimmed(incoming?.pageUrl) || '',
    createdAt: trimmed(incoming?.createdAt) || ''
  };
  return safe;
};

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
    if (req.method === 'OPTIONS') {
      sendText(res, 204, '');
      return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/api/leads/download') {
      await ensureLeadsFile();
      const content = await fs.readFile(leadsFilePath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(`\uFEFF${content}`);
      return;
    }

    if (req.method === 'POST' && pathname === '/api/leads') {
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
  process.stdout.write(`leads-server (${mode}) listening on http://localhost:${port}\n`);
  process.stdout.write(`CSV file: ${leadsFilePath}\n`);
});

