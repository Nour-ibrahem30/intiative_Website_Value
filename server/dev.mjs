import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const nodeBin = process.execPath;
const leadsScript = path.join(projectRoot, 'server', 'leads-server.mjs');
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');

const leadsPort = process.env.LEADS_PORT || '8787';
const vitePort = process.env.VITE_PORT || '5173';

const leadsProcess = spawn(nodeBin, [leadsScript, '--port', String(leadsPort)], {
  stdio: 'inherit',
  env: { ...process.env, PORT: String(leadsPort) }
});

const viteProcess = spawn(nodeBin, [viteBin, '--port', String(vitePort)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_LEADS_ENDPOINT: `http://localhost:${leadsPort}/api/leads`
  }
});

const shutdown = () => {
  if (!leadsProcess.killed) leadsProcess.kill('SIGINT');
  if (!viteProcess.killed) viteProcess.kill('SIGINT');
};

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

leadsProcess.on('exit', (code) => {
  shutdown();
  process.exit(code ?? 1);
});

viteProcess.on('exit', (code) => {
  shutdown();
  process.exit(code ?? 1);
});

