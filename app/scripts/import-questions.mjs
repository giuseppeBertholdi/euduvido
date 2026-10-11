// Gera src/game/questions.ts a partir dos CSVs em content/ (pacote,pergunta,resposta,unidade,curiosidade,fonte).
// O CSV é a fonte da verdade. Exclusões e correções ficam AQUI, com o motivo, referenciadas pela linha do CSV.
//   node scripts/import-questions.mjs   (depois: npm run sync:engine e redeploy das funções)
import { readFileSync, writeFileSync } from 'node:fs';

/** Linhas que não entram no jogo. */
const EXCLUDE = {
  189: 'duplicada (= linha 267, dentes de leite)',
  193: 'duplicada (= linha 48, 1º título do Senna)',
  285: 'duplicada (= linha 66, homem na Lua)',
  290: 'duplicada (= linha 138, Revolução Francesa/Bastilha)',
  21: 'errada: centopeias têm patas em pares, 177 é impossível',
  32: 'unidade trocada (pergunta em metros, resposta em cm) e "proporcionalmente" não tem número',
  88: 'pergunta sem sentido (nota de 1 real custava 1 real)',
  263: 'contradiz a linha 7 (26 ossos só no pé)',
  265: '"espirro forte médio" não tem número de referência',
  42: 'não verificável (letras do nome completo de Dom Pedro I)',
  294: 'desatualizada: o Brasil ganhou a 9ª Copa América feminina em 2025',
  49: 'recorde não verificável (maior coxinha)',
  94: 'recorde não verificável (maior pão de queijo)',
  246: 'recorde não verificável (maior queijo minas)',
  300: 'recorde não verificável (maior pizza)',
  296: 'não verificável e com erro de digitação ("da da Penha")',
  176: 'não verificável (pontes do Rio Pinheiros)',
  202: 'duvidosa (faixas da bandeira do RJ)',
  19: 'vaga demais (passos na vida)',
  167: 'vaga demais (listras de zebra variam muito)',
  170: 'vaga demais (guaraná por habitante)',
  232: 'vaga demais (limite de pager variava por modelo)',
  272: 'vaga demais (quantas vezes os rins filtram o sangue)',
  114: 'vaga demais (músculos de um passo)',
  115: 'vaga demais (articulações: as fontes variam de 250 a 360)',
  129: 'duvidosa (inscritos do PewDiePie "quando era o mais inscrito")',
};

/** Correções de texto/unidade/resposta. */
const FIX = {
  27: { pergunta: 'Quantas vértebras tem o pescoço de uma girafa?' },
  29: { unidade: 'braços' },
  33: { pergunta: 'Quantos corações (arcos aórticos) tem uma minhoca?', unidade: 'corações' },
  74: { pergunta: 'Quantos quilômetros tem a circunferência da Terra na linha do Equador?' },
  90: { pergunta: 'Quantas estrelas tem a bandeira do estado de São Paulo?' },
  104: { pergunta: 'Quantas câmaras tem o estômago de uma girafa?' },
  146: { pergunta: 'Quantos quilômetros por segundo percorre a luz no vácuo?', resposta: '299792' },
  179: { pergunta: 'Quantas horas de vídeo são enviadas ao YouTube a cada minuto?' },
  270: { pergunta: 'Quantos centímetros de comprimento tem o esôfago de um adulto?' },
};

/** Segundo arquivo (content/perguntas-2.csv). */
const DUP = 'repetida do primeiro arquivo';
const EXCLUDE_2 = {
  // clássico
  4: 'vaga demais (Lego por pessoa)', 6: DUP, 9: 'vaga demais (100 a 400 bilhões de estrelas)', 11: DUP, 12: DUP, 14: DUP, 17: DUP,
  18: 'errada: uma bola de ouro do tamanho de uma de tênis pesa uns 3 kg', 19: DUP, 20: DUP, 21: DUP,
  // bichos
  22: DUP, 23: DUP, 25: DUP, 27: DUP, 29: DUP, 31: DUP, 32: DUP, 33: DUP, 34: DUP, 35: DUP, 36: DUP, 37: 'vaga demais (quanto um leão come de uma vez)',
  40: DUP, 41: DUP, 45: DUP, 46: DUP, 51: DUP, 52: DUP, 53: DUP, 54: DUP, 55: DUP, 56: DUP, 57: DUP, 58: DUP,
  // corpo humano
  62: DUP, 63: DUP, 64: DUP, 66: 'vaga demais (passos na vida)', 67: DUP, 68: DUP, 70: DUP, 71: 'vaga demais (músculos de um passo)',
  72: DUP, 73: DUP, 74: DUP, 75: DUP, 76: DUP, 77: DUP, 78: DUP, 79: DUP, 80: DUP, 81: DUP, 82: DUP, 83: 'vaga demais (articulações)',
  84: DUP, 85: DUP, 86: DUP, 87: DUP, 88: DUP, 89: DUP, 90: DUP, 91: DUP, 92: DUP, 93: 'duvidosa (articulações da mão e do pulso)',
  95: DUP, 96: DUP, 97: DUP, 98: DUP, 99: DUP, 100: DUP, 101: DUP,
  // absurdos BR
  102: 'recorde não verificável (coxinha)', 103: DUP, 104: DUP, 106: 'não verificável (letras do nome de Dom Pedro I)', 107: 'recorde não verificável (pão de queijo)',
  109: 'muda todo ano (lâmpadas da árvore da Lagoa)', 110: DUP, 111: 'vaga demais (guaraná por segundo)', 112: DUP, 113: DUP, 114: DUP, 115: DUP,
  116: DUP, 117: DUP, 118: 'recorde não verificável (queijo minas)', 120: DUP, 123: 'recorde não verificável (pizza)', 124: 'não verificável (pontes do Rio Pinheiros)',
  125: DUP, 126: 'não verificável (açaí no Ver-o-Peso)', 127: 'duvidosa (faixas da Paulista)', 130: 'não verificável (tirolesa de Munhoz)',
  132: 'recorde não verificável (macarronada)', 133: 'não verificável (carros na Imigrantes)', 135: 'não verificável (caldo de cana nas feiras)',
  136: 'recorde não verificável (fogueira)', 138: 'não verificável (pedras do calçadão)', 139: 'regra muda todo ano (alegorias na Sapucaí)',
  140: 'vaga demais (passageiros do metrô por dia)', 141: 'recorde não verificável (churrasqueira)',
  // internet
  142: 'repetida do primeiro arquivo (e unidade trocada)', 143: DUP, 146: 'óbvia (até passar de 1000 → 1000)', 147: DUP, 148: 'desatualizada (vendas de GTA V)',
  149: 'desatualizada (episódios dos Simpsons)', 150: DUP, 151: DUP, 152: DUP, 154: DUP, 156: 'duvidosa (inscritos do PewDiePie)', 160: DUP, 161: DUP,
  162: DUP, 163: DUP, 165: DUP, 166: DUP, 167: DUP, 168: DUP, 169: DUP, 170: 'duvidosa (duração da versão estendida varia com os créditos)',
  171: DUP, 174: 'repetida (Friends, linha 151)', 176: 'duvidosa (altura de casa de vila no Minecraft)', 177: DUP, 178: 'óbvia (até a 19ª → 19)',
  179: 'ambígua (primeiro plano da Netflix era de DVD)', 180: DUP,
  // comida & bebida
  184: 'receita varia (folhas no mojito)', 185: DUP, 189: 'vaga demais (cheddar extra-maturado)', 193: 'vaga demais (dentes de alho)',
  207: 'mito (gergelim do Big Mac)', 212: 'duvidosa (peso do Big Mac varia por país)', 213: 'errada: o Daiquiri oficial (IBA) leva 60 ml de rum',
  214: 'não verificável (batata frita do McDonald\'s por dia)', 216: 'duvidosa (regra do chocolate amargo no Brasil)', 218: 'unidade trocada (quilos → discos)',
  220: 'vaga e com erro de digitação ("faporizado")', 221: 'pouco interessante (1 picles)',
  // esporte & velocidade
  222: DUP, 224: DUP, 226: DUP, 232: DUP, 233: DUP, 242: DUP, 250: 'não tem número exato (a FIFA aceita de 410 a 450 g)',
  257: 'desatualizada (recorde do badminton é 565 km/h desde 2023)', 258: DUP,
  // ciência & espaço
  263: DUP, 264: DUP, 265: DUP, 266: DUP, 267: DUP, 268: 'desatualizada (luas de Júpiter)', 284: 'vaga demais (vulcões em Marte)',
  291: 'repetida (1 litro = 1000 ml, linha 273)', 293: 'resposta zero não funciona no jogo (o lance mínimo é 1)',
};

const FIX_2 = {
  3: { resposta: '15415' },
  16: { resposta: '8849' },
  43: { pergunta: 'Quantos quilômetros uma borboleta-monarca consegue voar na migração anual?' },
  182: { pergunta: 'Quantas calorias tem 1 grama de gordura pura?' },
  236: { pergunta: 'Quantos centímetros de altura tem a rede de vôlei masculino adulto oficial?', resposta: '243', unidade: 'cm' },
  239: { pergunta: 'Quantos centímetros acima do chão fica o aro da cesta de basquete oficial?', resposta: '305', unidade: 'cm' },
};

const SOURCES = [
  { file: 'content/perguntas.csv', prefix: 'q', exclude: EXCLUDE, fix: FIX },
  { file: 'content/perguntas-2.csv', prefix: 'n', exclude: EXCLUDE_2, fix: FIX_2 },
];

/** Metadados dos pacotes (ordem de exibição). */
const PACKS = [
  { id: 'classico', name: 'clássico', title: 'clássico', tagline: 'o básico bem feito', premium: false, icon: 'bulb', tint: '#FFD600' },
  { id: 'absurdos-br', name: 'absurdos BR', title: 'absurdos BR', tagline: 'o Brasil não é pra amadores', premium: true, isNew: true, icon: 'brasil', tint: '#9BDDB0' },
  { id: 'bichos', name: 'bichos', title: 'bichos', tagline: 'a natureza é estranha', premium: true, icon: 'paw', tint: '#F4A7A7' },
  { id: 'corpo', name: 'corpo humano', title: 'corpo humano', tagline: 'você é estranho por dentro', premium: true, icon: 'heart', tint: '#FFB59A' },
  { id: 'internet', name: 'internet', title: 'internet', tagline: 'cronicamente online', premium: true, icon: 'cursor', tint: '#B9C8FF' },
  { id: 'comida', name: 'comida & bebida', title: 'comida & bebida', tagline: 'a mesa também mente', premium: true, isNew: true, icon: 'cup', tint: '#FFE08A' },
  { id: 'esporte', name: 'esporte & velocidade', title: 'esporte & velocidade', tagline: 'pra quem acha que entende de regra', premium: true, isNew: true, icon: 'bolt', tint: '#A8E6FF' },
  { id: 'ciencia', name: 'ciência & espaço', title: 'ciência & espaço', tagline: 'o universo é grande demais', premium: true, isNew: true, icon: 'planet', tint: '#D9C8FF' },
];

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') (field += '"'), i++;
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') row.push(field), (field = '');
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field), rows.push(row), (row = []), (field = '');
    } else field += c;
  }
  if (field || row.length) row.push(field), rows.push(row);
  return rows.filter((r) => r.some((f) => f.trim()));
}

const byPack = Object.fromEntries(PACKS.map((p) => [p.name, []]));
const problems = [];
const seenText = new Map();
const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
let read = 0;
for (const src of SOURCES) {
  const [header, ...lines] = parseCsv(readFileSync(src.file, 'utf8'));
  const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  for (const k of ['pacote', 'pergunta', 'resposta', 'unidade', 'curiosidade', 'fonte']) if (!(k in col)) throw new Error(`${src.file}: coluna faltando: ${k}`);
  read += lines.length;
  lines.forEach((cells, idx) => {
    const line = idx + 2; // linha no CSV (1 = cabeçalho)
    if (src.exclude[line]) return;
    const where = `${src.file}:${line}`;
    const get = (k) => (src.fix[line]?.[k] ?? cells[col[k]] ?? '').trim();
    const pack = get('pacote');
    const answer = get('resposta');
    if (!(pack in byPack)) return problems.push(`${where}: pacote desconhecido "${pack}"`);
    if (!/^\d+$/.test(answer) || Number(answer) <= 0) return problems.push(`${where}: resposta não é inteiro positivo "${answer}"`);
    if (!get('pergunta').endsWith('?')) problems.push(`${where}: pergunta sem "?"`);
    const key = norm(get('pergunta'));
    if (seenText.has(key)) return problems.push(`${where}: repetida de ${seenText.get(key)} (exclua uma das duas)`);
    seenText.set(key, where);
    byPack[pack].push({ id: `${src.prefix}${line}`, text: get('pergunta'), answer: Number(answer), unit: get('unidade'), fact: get('curiosidade') || undefined, source: get('fonte') || undefined });
  });
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

const packs = PACKS.map(({ name: _n, ...p }) => ({ ...p, questions: byPack[_n] }));
const total = packs.reduce((n, p) => n + p.questions.length, 0);
const out = `// GERADO por scripts/import-questions.mjs a partir de content/*.csv. Não edite aqui: edite o CSV (ou EXCLUDE/FIX no script).
export type Question = { id: string; text: string; answer: number; unit: string; fact?: string; source?: string };

export type Pack = {
  id: string;
  title: string;
  tagline: string;
  premium: boolean;
  isNew?: boolean;
  /** Ícone (ver \`src/components/Icon.tsx\`) e cor do pacote. */
  icon: 'bulb' | 'brasil' | 'paw' | 'heart' | 'cursor' | 'cup' | 'bolt' | 'planet';
  tint: string;
  questions: Question[];
};

export const PACKS: Pack[] = ${JSON.stringify(packs, null, 2)};

export function packById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

/** Nome do pacote de uma pergunta (vira o chip de categoria). */
export function packTitleOf(questionId: string): string {
  return PACKS.find((p) => p.questions.some((x) => x.id === questionId))?.title ?? 'aleatório';
}
`;
writeFileSync('src/game/questions.ts', out);
console.log(`${total} perguntas (${read - total} fora): ` + packs.map((p) => `${p.title} ${p.questions.length}`).join(', '));
