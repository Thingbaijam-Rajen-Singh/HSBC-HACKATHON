import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const child = spawn(process.execPath, ['--import', 'tsx', 'backend/server.ts'], {
  cwd: projectRoot,
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error('Could not start the SkillBridge production server:', error);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Production server stopped after signal ${signal}.`);
    process.exitCode = 1;
  } else {
    process.exitCode = code ?? 1;
  }
});
