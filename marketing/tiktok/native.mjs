/**
 * Carrosséis "nativos" pro TikTok do Eu Duvido!: uma foto com cara de foto real por slide (flash de iPhone, gerada pela API da
 * OpenAI) e os estilos de texto do próprio TikTok (TikTok Sans, caixa branca por linha no título, texto branco com contorno no corpo).
 * O post parece post de gente, não anúncio. Mesmo formato do carrossel que estourou no I_doubt (friendship-games: 21K+ views, ~95% busca).
 *
 *   node native.mjs photos <slug>   gera as fotos que faltam (gpt-image, ~US$0,07 cada; OPENAI_API_KEY no ambiente ou em .env)
 *   node native.mjs render <slug>   out/<slug>/carousel_NN.png (+ _soon no último, pra antes de lançar) e .jpg pro upload
 *
 * Conceitos em concepts/<slug>.json. Fotos ficam em photos/<slug>/ (apague uma pra refazer; re-render não paga de novo).
 */
import { Resvg } from '@resvg/resvg-js';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const W = 1080;
const H = 1920;
/** O TikTok cobre a barra de cima, a coluna da direita e a legenda: o texto fica dentro disso. */
const SAFE = { left: 80, right: 900, top: 250 };

function env(name) {
  if (process.env[name]) return process.env[name];
  const file = join(here, '.env');
  const line = existsSync(file) ? readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith(`${name}=`)) : undefined;
  return line ? line.slice(name.length + 1).trim() : '';
}

// ── fotos ─────────────────────────────────────────────────────────────────────────────────────
async function openaiPhoto(prompt, file, refs) {
  const key = env('OPENAI_API_KEY');
  if (!key) throw new Error('falta OPENAI_API_KEY (no ambiente ou em marketing/tiktok/.env)');
  const params = { model: env('OPENAI_IMAGE_MODEL') || 'gpt-image-2', prompt, size: '1024x1536', quality: 'medium', output_format: 'jpeg' };
  let res;
  if (refs.length) {
    // edição: mantém as mesmas pessoas e o mesmo lugar da foto de referência
    const form = new FormData();
    for (const [k, v] of Object.entries(params)) form.set(k, v);
    for (const [i, ref] of refs.entries()) form.append(refs.length > 1 ? 'image[]' : 'image', new Blob([readFileSync(ref)], { type: 'image/jpeg' }), `ref${i}.jpg`);
    res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: `Bearer ${key}` }, body: form });
  } else {
    res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, n: 1 }),
    });
  }
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  const b64 = body.data?.[0]?.b64_json;
  if (!res.ok || !b64) throw new Error(`${file}: HTTP ${res.status} ${body.error?.message ?? text.slice(0, 300)}`);
  writeFileSync(file, Buffer.from(b64, 'base64'));
  console.log(`salvou ${file.replace(here + '/', '')}`);
}

async function photos(c) {
  const dir = join(here, 'photos', c.slug);
  mkdirSync(dir, { recursive: true });
  const make = async (s) => {
    const file = join(dir, `${s.photo}.jpg`);
    if (existsSync(file) || !s.prompt) return;
    const refs = s.ref === undefined ? [] : [s.ref].flat();
    await openaiPhoto(`${s.prompt} ${c.style}`, file, refs.map((r) => join(dir, `${r}.jpg`)));
  };
  // primeiro as fotos sem referência (em paralelo), depois as que editam outra foto do conceito
  for (const group of [c.slides.filter((s) => !s.ref), c.slides.filter((s) => s.ref)]) {
    const results = await Promise.allSettled(group.map(make));
    for (const r of results) if (r.status === 'rejected') console.error(r.reason?.message ?? r.reason);
  }
}

// ── texto ─────────────────────────────────────────────────────────────────────────────────────
const font = { fontFiles: [join(here, 'fonts/TikTokSans-600.ttf'), join(here, 'fonts/TikTokSans-800.ttf')], loadSystemFonts: false, defaultFontFamily: 'TikTok Sans 800' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cache = new Map();
function measure(text, size, family) {
  const key = `${family}|${size}|${text}`;
  if (cache.has(key)) return cache.get(key);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="6000" height="600"><text x="0" y="400" font-family="${family}" font-size="${size}">${esc(text)}</text></svg>`;
  const w = new Resvg(svg, { font }).getBBox()?.width ?? 0;
  cache.set(key, w);
  return w;
}
function wrap(text, size, family, maxW) {
  const lines = [];
  let line = '';
  for (const word of text.split(/ +/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next, size, family) > maxW) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Estilo "fundo" do TikTok: texto preto e uma caixa branca arredondada em cada linha. */
function boxed(text, size, y, box = '#FFFFFF', ink = '#161823') {
  const family = 'TikTok Sans 800';
  const lines = wrap(text, size, family, SAFE.right - SAFE.left - size);
  const cx = (SAFE.left + SAFE.right) / 2;
  const lh = size * 1.32;
  const padX = size * 0.42;
  let svg = '';
  lines.forEach((l, i) => {
    const w = measure(l, size, family) + padX * 2;
    svg += `<rect x="${cx - w / 2}" y="${y + i * lh}" width="${w}" height="${lh + 2}" rx="${size * 0.28}" fill="${box}"/>`;
    svg += `<text x="${cx}" y="${y + i * lh + lh * 0.74}" text-anchor="middle" font-family="${family}" font-size="${size}" fill="${ink}">${esc(l)}</text>`;
  });
  return { svg, bottom: y + lines.length * lh };
}

/** Estilo clássico do TikTok: branco com contorno escuro fino. */
function outlined(text, size, y) {
  const family = 'TikTok Sans 600';
  const lines = wrap(text, size, family, SAFE.right - SAFE.left - 20);
  const cx = (SAFE.left + SAFE.right) / 2;
  const svg = lines
    .map((l, i) => {
      const at = `x="${cx}" y="${y + size + i * size * 1.25}" text-anchor="middle" font-family="${family}" font-size="${size}"`;
      return `<text ${at} fill="none" stroke="#000000" stroke-opacity="0.85" stroke-width="${size * 0.14}" stroke-linejoin="round">${esc(l)}</text><text ${at} fill="#FFFFFF">${esc(l)}</text>`;
    })
    .join('');
  return { svg, bottom: y + lines.length * size * 1.25 };
}

function slide(photo, { title, body, cta }, first) {
  const img = readFileSync(photo).toString('base64');
  const t = boxed(title, first ? 66 : 58, SAFE.top + 60);
  const b = body ? outlined(body, 46, t.bottom + 34) : { svg: '', bottom: t.bottom };
  // a caixa amarela do TikTok, pro nome do app no último slide
  const c = cta ? boxed(cta, 52, b.bottom + 50, '#FFE500', '#161823').svg : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<image href="data:image/jpeg;base64,${img}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
${t.svg}${b.svg}${c}</svg>`;
}

function render(c) {
  const out = join(here, 'out', c.slug);
  mkdirSync(out, { recursive: true });
  const write = (svg, name) => {
    const png = join(out, `${name}.png`);
    writeFileSync(png, new Resvg(svg, { font, fitTo: { mode: 'width', value: W } }).render().asPng());
    // o TikTok recusa PNG no upload de fotos
    execFileSync('convert', [png, '-background', 'white', '-flatten', '-quality', '92', png.replace(/\.png$/, '.jpg')]);
  };
  c.slides.forEach((s, i) => {
    const photo = join(here, 'photos', c.slug, `${s.photo}.jpg`);
    if (!existsSync(photo)) throw new Error(`falta ${photo.replace(here + '/', '')}: rode "photos" antes`);
    const name = `carousel_${String(i + 1).padStart(2, '0')}`;
    write(slide(photo, s.pt, i === 0), name);
    if (s.pt.soon) write(slide(photo, { ...s.pt, cta: s.pt.soon }, i === 0), `${name}_soon`);
  });
  console.log(`${c.slug}: ${c.slides.length} slides -> out/${c.slug}`);
}

const [cmd, slug] = process.argv.slice(2);
if (!slug || !['photos', 'render'].includes(cmd)) {
  console.error('uso: node native.mjs photos|render <slug>');
  process.exit(1);
}
const concept = JSON.parse(readFileSync(join(here, 'concepts', `${slug}.json`), 'utf8'));
try {
  if (cmd === 'photos') await photos(concept);
  else render(concept);
} catch (e) {
  console.error(e?.message ?? e);
  process.exit(1);
}
