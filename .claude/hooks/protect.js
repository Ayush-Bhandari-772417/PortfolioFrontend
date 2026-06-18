const fs = require("fs");

const raw = fs.readFileSync(0, "utf-8");
const data = JSON.parse(raw);
const path = (data?.tool_input?.path || "").replace(/\\/g, "/");

const BLOCKED_EXACT = [
  ".env", ".env.local", ".env.development", ".env.production",
  ".env.test", ".vercel", "next-env.d.ts",
];

const BLOCKED_PATTERNS = [
  /^\/node_modules\/.*/,
  /^\/\.pnp$/,
  /^\.pnp\..*/,
  /^\.yarn\/(?!patches|plugins|releases|versions).*/,
  /^\/coverage\/.*/,
  /^\/\.next\/.*/,
  /^\/out\/.*/,
  /^\/build\/.*/,
  /\.DS_Store$/,
  /\.pem$/,
  /npm-debug\.log.*/,
  /yarn-debug\.log.*/,
  /yarn-error\.log.*/,
  /\.pnpm-debug\.log.*/,
  /\.tsbuildinfo$/,
  /^\.env.*/,
];

const blockedExact = BLOCKED_EXACT.some(f => path.endsWith(f) || path === f);
const blockedPattern = BLOCKED_PATTERNS.some(p => p.test(path));

if (blockedExact || blockedPattern) {
  console.log(JSON.stringify({ allow: false, reason: `[Next.js #2] Blocked: ${path}` }));
} else {
  console.log(JSON.stringify({ allow: true }));
}