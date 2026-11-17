import crypto from 'node:crypto';
import zlib from 'node:zlib';

const SECRET = process.env.SESSION_SECRET || '';
const COOKIE = 'estagio_ti';
const TTL = 8 * 3600; // 8h

const USERS = new Set(String(process.env.ALLOWED_USERS || '').split(',').map(u => u.trim().toLowerCase()).filter(Boolean));

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
const sign = v => crypto.createHmac('sha256', SECRET).update(v).digest('hex');

function makeToken(user) {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  const body = user + '|' + exp;
  return Buffer.from(body).toString('base64url') + '.' + sign(body);
}
function readToken(tok) {
  try {
    const [b, sig] = String(tok).split('.');
    const body = Buffer.from(b, 'base64url').toString();
    const ok = sig && sig.length === 64 && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sign(body)));
    if (!ok) return null;
    const [user, exp] = body.split('|');
    if (Number(exp) < Date.now() / 1000 || !USERS.has(user)) return null;
    return user;
  } catch { return null; }
}
function cookieOf(req) {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|; )' + COOKIE + '=([^;]+)'));
  return m ? m[1] : '';
}
function loginPage(erro) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Acesso | Desafio Técnico Duall</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(ellipse at 85% 0%,#19304c 0%,transparent 38%),#080d17;color:#eef3fb;font:16px/1.6 Inter,Segoe UI,Arial,sans-serif}
.box{width:min(420px,92vw);background:linear-gradient(155deg,#142238,#101927);border:1px solid #263449;border-radius:16px;padding:34px}
.brand{font-size:17px;font-weight:850;letter-spacing:.18em}.brand span{color:#efb54b}.brand small{display:block;font-size:10px;font-weight:500;letter-spacing:.24em;color:#a2b0c3}
h1{font-size:22px;margin:26px 0 6px}p{color:#a2b0c3;font-size:14px;margin:0 0 20px}
input{width:100%;padding:13px 14px;border-radius:10px;border:1px solid #40506a;background:#0b1422;color:#fff;font:inherit}input:focus{outline:2px solid #efb54b;border-color:transparent}
button{width:100%;margin-top:14px;padding:13px;border:0;border-radius:10px;background:#efb54b;color:#1a1305;font:inherit;font-weight:800;cursor:pointer}
.err{color:#ff8f8f;font-size:14px;margin-top:12px}
</style></head><body><form class="box" method="POST" action="/estagio_ti"><div class="brand">DUALL<span>.</span><small>ENGENHARIA · TECNOLOGIA & INOVAÇÃO</small></div><h1>Desafio técnico</h1><p>Informe seu username para acessar.</p><input name="username" placeholder="nome.sobrenome" autocomplete="off" autocapitalize="off" spellcheck="false" autofocus required><button type="submit">Entrar</button>${erro ? '<div class="err">Username não autorizado.</div>' : ''}</form></body></html>`;
}

export default async function handler(req, res) {
  if (!SECRET || !USERS.size) { res.statusCode = 503; return res.end('Indisponível'); }
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.method === 'POST') {
    let raw = '';
    if (typeof req.body === 'string') raw = req.body;
    else if (req.body && typeof req.body === 'object') raw = new URLSearchParams(req.body).toString();
    else raw = await new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => r(d)); });
    const user = norm(new URLSearchParams(raw).get('username'));
    if (!USERS.has(user)) { res.statusCode = 401; return res.end(loginPage(true)); }
    res.setHeader('Set-Cookie', `${COOKIE}=${makeToken(user)}; Path=/estagio_ti; HttpOnly; Secure; SameSite=Lax; Max-Age=${TTL}`);
    res.statusCode = 303; res.setHeader('Location', '/estagio_ti');
    return res.end();
  }

  if (readToken(cookieOf(req))) {
    return res.end(zlib.gunzipSync(Buffer.from(process.env.TESTE_HTML_B64 || '', 'base64')));
  }
  res.end(loginPage(false));
}
