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
  // chatas demais: geometria de escola não gera discussão na mesa
  75: 'chata (lados do heptágono)',
  144: 'chata (lados do decágono)',
  287: 'chata (lados do octógono)',
  // faxina (out/2026): óbvias, escolares, vagas, erradas ou repetidas
  68: 'óbvia (peças de xadrez)',
  69: 'óbvia (água ferve a 100 °C)',
  70: 'óbvia (ano bissexto)',
  71: 'óbvia (cartas do baralho)',
  72: 'óbvia (anéis olímpicos)',
  137: 'óbvia (8 planetas)',
  139: 'óbvia (casas do xadrez)',
  141: 'óbvia (F1 a F12)',
  147: 'óbvia (11 jogadores)',
  149: 'óbvia (cores do arco-íris)',
  186: 'óbvia (7 notas)',
  188: 'óbvia (piscina de 50 m)',
  191: 'óbvia (5 no basquete)',
  192: 'óbvia (7 maravilhas)',
  233: 'óbvia (50 estados)',
  235: 'óbvia (90 minutos)',
  236: 'óbvia (6 cordas)',
  238: 'óbvia (6 faces do dado)',
  239: 'sem graça (ano da morte do Armstrong)',
  241: 'óbvia (10 pinos)',
  284: 'óbvia (prorrogação)',
  289: 'sem graça (cordas do violoncelo)',
  291: 'sem graça (incisivos)',
  38: 'óbvia (26 estados)',
  43: 'óbvia (5 Copas)',
  47: 'sem graça (pontas da estrela)',
  51: 'óbvia (capitais do Sul)',
  86: 'repetida (One Tower, fica a da altura)',
  90: 'sem graça (estrelas da bandeira de SP)',
  92: 'regional demais (estações da linha 1)',
  173: 'obscura (Menino da Porteira)',
  174: 'óbvia (20 times)',
  194: 'escolar (estados do Nordeste)',
  244: 'sem graça (faixas da bandeira da Bahia)',
  248: 'repetida e óbvia (26 capitais)',
  252: 'óbvia (cores da bandeira)',
  297: 'sem graça (25 anos do Real)',
  301: 'repetida (mesmo ano de Brasília)',
  28: 'óbvia (2 asas da mosca)',
  31: 'vaga demais (fôlego do jacaré)',
  36: 'vaga demais (dentes do jacaré-açu)',
  103: 'repetida (3 corações, como o polvo)',
  104: 'repetida (estômago da vaca)',
  105: 'vaga demais (penas da coruja)',
  107: 'sem graça (dentes do urso-polar)',
  160: 'óbvia (8 patas)',
  161: 'errada (caipira põe bem menos que 250)',
  162: 'sem graça (dentes do leão)',
  164: 'vaga demais (comida do urso)',
  203: 'duvidosa (corações do náutilo)',
  205: 'sem graça (dentes do urso-pardo)',
  207: 'vaga demais (refeição do tigre)',
  209: 'contestada (velocidade do peixe-vela)',
  253: 'sem graça (dentes da jaguatirica)',
  259: 'vaga demais (veneno da cobra-rei)',
  260: 'sem graça (penas da águia)',
  5: 'vaga demais (de 60 a 100 bpm)',
  113: 'errada (lágrimas por ano são litros, não 100 ml)',
  116: 'vaga demais (cérebro sem oxigênio)',
  120: 'errada (o intestino grosso tem 1,5 m)',
  157: 'vaga demais (digestão)',
  158: 'vaga demais (poros)',
  159: 'vaga demais (piscar)',
  216: 'sem graça (pontos lacrimais)',
  217: 'repetida (piscadas por minuto)',
  218: 'óbvia (20 unhas)',
  221: 'repetida (válvulas do coração)',
  268: 'óbvia (2 pálpebras)',
  271: 'óbvia (cromossomos sexuais)',
  56: 'contestada (episódios do Chaves)',
  58: 'óbvia (8 filmes)',
  60: 'sem graça (episódios de Stranger Things)',
  62: 'sem graça (temporadas de GoT)',
  64: 'sem graça (botões do controle)',
  135: 'sem graça (duração do clipe)',
  178: 'repetida (mesmo ano da Wikipédia em inglês)',
  185: 'sem sentido (botões do mouse)',
  281: 'obscura (blog do WordPress)',
  282: 'vaga demais (vidas do Mario)',
};

/** Correções de texto/unidade/resposta. */
const FIX = {
  // o clássico é a vitrine do app (é o pacote grátis): datas de livro de escola vão pro pacote história
  76: { pacote: 'história' },
  79: { pacote: 'história' },
  138: { pacote: 'história' },
  140: { pacote: 'história' },
  143: { pacote: 'história' },
  145: { pacote: 'história' },
  187: { pacote: 'história' },
  190: { pacote: 'história' },
  234: { pacote: 'história' },
  237: { pacote: 'história' },
  242: { pacote: 'história' },
  283: { pacote: 'história' },
  288: { pacote: 'história' },
  292: { pacote: 'história' },
  77: { pacote: 'música' },
  78: { pacote: 'ciência & espaço' },
  142: { pacote: 'ciência & espaço' },
  27: { pergunta: 'Quantas vértebras tem o pescoço de uma girafa?' },
  29: { pergunta: 'Quantos braços e tentáculos, somados, tem uma lula?', unidade: 'braços e tentáculos' },
  150: { pergunta: 'Em que ano o Vesúvio soterrou a cidade de Pompeia?' },
  199: { pergunta: 'Em que ano foi lançado o Cruzeiro Real, a moeda que veio antes do Real?' },
  33: { pergunta: 'Quantos corações (arcos aórticos) tem uma minhoca?', unidade: 'corações' },
  74: { pergunta: 'Quantos quilômetros tem a circunferência da Terra na linha do Equador?' },
  90: { pergunta: 'Quantas estrelas tem a bandeira do estado de São Paulo?' },
  104: { pergunta: 'Quantas câmaras tem o estômago de uma girafa?' },
  146: { pergunta: 'Quantos quilômetros por segundo percorre a luz no vácuo?', resposta: '299792' },
  179: { pergunta: 'Quantas horas de vídeo são enviadas ao YouTube a cada minuto?' },
  270: { pergunta: 'Quantos centímetros de comprimento tem o esôfago de um adulto?' },
  // out/2026: o clássico fica só com perguntas de choque; as de escola vão pros pacotes do assunto
  66: { pacote: 'história' },
  73: { pacote: 'história' },
  148: { pacote: 'história' },
  150: { pergunta: 'Em que ano o Vesúvio soterrou a cidade de Pompeia?', pacote: 'história' },
  67: { pacote: 'ciência & espaço' },
  74: { pergunta: 'Quantos quilômetros tem a circunferência da Terra na linha do Equador?', pacote: 'ciência & espaço' },
  146: { pergunta: 'Quantos quilômetros por segundo percorre a luz no vácuo?', resposta: '299792', pacote: 'ciência & espaço' },
  240: { pacote: 'comida & bebida' },
  286: { pacote: 'esporte & velocidade' },
};

/** Lote 2 do Claude: o que sai do clássico (vitrine) e vai pro pacote história. */
const FIX_4 = {
  ...Object.fromEntries([244, 247, 254, 255, 256, 258, 262, 269, 270].map((line) => [line, { pacote: 'história' }])),
  // out/2026: saem do clássico (a Cleópatra virou "quantos anos depois da Grande Pirâmide" no lote 3)
  245: { pergunta: 'Quantos anos antes de Cristo Cleópatra morreu?', pacote: 'história' },
  250: { pacote: 'ciência & espaço' },
  268: { pacote: 'pelo mundo' },
  271: { pacote: 'pelo mundo' },
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
  // faxina (out/2026)
  128: 'vaga demais (praias de Floripa: as contas variam)',
  39: 'repetida (ovos de tartaruga)',
  60: 'vaga demais (dentes do crocodilo)',
  144: 'repetida (o preço já está na pergunta do ano)',
  175: 'muda logo (gerações de Pokémon)',
  198: 'vaga demais (sal do macarrão)',
  199: 'sem graça (fatias da pizza)',
  201: 'óbvia (lata de 350 ml)',
  203: 'vaga demais (ovo cozido)',
  210: 'vaga demais (café por xícara)',
  215: 'escolar (colheres)',
  225: 'óbvia (pista de 400 m)',
  231: 'óbvia (sets do tênis)',
  234: 'óbvia (6 no vôlei)',
  235: 'obscura (Grand Tours)',
  237: 'óbvia (2 amarelos)',
  238: 'sem graça (árbitros da NBA)',
  241: 'óbvia (2 pontos)',
  246: 'óbvia (5 substituições)',
  248: 'obscura (tiro livre do futsal)',
  259: 'obscura (juízes do surfe)',
  261: 'óbvia (4 no revezamento)',
  262: 'óbvia (365 dias)',
  273: 'escolar (1 kg de água)',
  286: 'sem sentido (faces da Lua)',
  289: 'escolar (prótons do ouro)',
  290: 'óbvia (3 dimensões)',
  292: 'repetida (1 litro de água)',
  299: 'escolar (próton do hidrogênio)',
  8: 'número desatualizado (contagem oficial de ilhas da Indonésia mudou)',
};

const FIX_2 = {
  3: { resposta: '15415' },
  // out/2026: saem do clássico
  2: { resposta: '10935', pacote: 'pelo mundo' },
  7: { pergunta: 'Quantos quilômetros tem a Grande Muralha da China, contando todos os trechos?', pacote: 'pelo mundo' },
  10: { pergunta: 'Quantos milhões de graus faz no centro do Sol?', unidade: 'milhões de graus', pacote: 'ciência & espaço' },
  13: { pacote: 'ciência & espaço' },
  15: { pacote: 'pelo mundo' },
  26: { pergunta: 'Quantas patas pode ter o piolho-de-cobra Illacme plenipes?' },
  253: { pergunta: 'Quantos Oscars ganhou o primeiro filme do Rocky?', unidade: 'Oscars' },
  16: { resposta: '8849', pacote: 'pelo mundo' },
  43: { pergunta: 'Quantos quilômetros uma borboleta-monarca consegue voar na migração anual?' },
  182: { pergunta: 'Quantas calorias tem 1 grama de gordura pura?' },
  236: { pergunta: 'Quantos centímetros de altura tem a rede de vôlei masculino adulto oficial?', resposta: '243', unidade: 'cm' },
  239: { pergunta: 'Quantos centímetros acima do chão fica o aro da cesta de basquete oficial?', resposta: '305', unidade: 'cm' },
};

const SOURCES = [
  { file: 'content/perguntas.csv', prefix: 'q', exclude: EXCLUDE, fix: FIX },
  { file: 'content/perguntas-2.csv', prefix: 'n', exclude: EXCLUDE_2, fix: FIX_2 },
  // lote inicial escrito pelo Claude (fatos estáveis, com fonte): futebol, anos 90/2000, memes, picante
  { file: 'content/perguntas-3.csv', prefix: 'c', exclude: { 25: 'óbvia (5 Power Rangers)' }, fix: {} },
  // lote 2 do Claude (out/2026): fatos conferidos, com fonte; reforça os pacotes pequenos e cria TV, música, dinheiro e mundo
  { file: 'content/perguntas-4.csv', prefix: 'd', exclude: { 253: 'óbvia (26 letras)' }, fix: FIX_4 },
  // lote 3 do Claude (out/2026): perguntas de choque pro clássico, a vitrine grátis
  { file: 'content/perguntas-5.csv', prefix: 'e', exclude: {}, fix: {} },
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
  { id: 'futebol', name: 'futebol BR', title: 'futebol BR', tagline: 'resenha de boteco, agora valendo', premium: true, isNew: true, icon: 'ball', tint: '#B6E59E' },
  { id: 'anos90', name: 'anos 90/2000', title: 'anos 90/2000', tagline: 'nostalgia com tamagotchi', premium: true, isNew: true, icon: 'cassette', tint: '#FFC2E0' },
  { id: 'memes', name: 'memes', title: 'memes', tagline: 'cronicamente online, nível 2', premium: true, isNew: true, icon: 'meme', tint: '#C5F0EA' },
  { id: 'picante', name: 'picante', title: 'picante', tagline: 'só com a galera certa', premium: true, isNew: true, icon: 'pepper', tint: '#FF9C8A' },
  { id: 'tv', name: 'novelas & TV', title: 'novelas & TV', tagline: 'quem viu, viu', premium: true, isNew: true, icon: 'tv', tint: '#FFD0A8' },
  { id: 'musica', name: 'música', title: 'música', tagline: 'do hino ao funk', premium: true, isNew: true, icon: 'note', tint: '#E2C8FF' },
  { id: 'dinheiro', name: 'dinheiro', title: 'dinheiro', tagline: 'quanto custa? mais do que você acha', premium: true, isNew: true, icon: 'money', tint: '#C8EFA0' },
  { id: 'historia', name: 'história', title: 'história', tagline: 'datas que todo mundo jura que sabe', premium: true, isNew: true, icon: 'hourglass', tint: '#F2D6A2' },
  { id: 'mundo', name: 'pelo mundo', title: 'pelo mundo', tagline: 'o planeta é maior que o seu bairro', premium: true, isNew: true, icon: 'globe', tint: '#A8DCFF' },
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
  icon: 'bulb' | 'brasil' | 'paw' | 'heart' | 'cursor' | 'cup' | 'bolt' | 'planet' | 'ball' | 'cassette' | 'meme' | 'pepper' | 'tv' | 'note' | 'money' | 'globe' | 'hourglass';
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

// inglês: content/en.csv traduz por id (id,question,answer,unit,fact). Pergunta sem tradução fica fora do jogo em inglês;
// a resposta pode mudar junto com a unidade (metros → pés). A fonte e o pacote vêm do português.
const allIds = new Set(packs.flatMap((p) => p.questions.map((q) => q.id)));
const [enHeader, ...enLines] = parseCsv(readFileSync('content/en.csv', 'utf8'));
const ec = Object.fromEntries(enHeader.map((h, i) => [h.trim(), i]));
for (const k of ['id', 'question', 'answer', 'unit', 'fact']) if (!(k in ec)) throw new Error(`content/en.csv: coluna faltando: ${k}`);
const en = {};
const enProblems = [];
enLines.forEach((cells, idx) => {
  const where = `content/en.csv:${idx + 2}`;
  const get = (k) => (cells[ec[k]] ?? '').trim();
  const id = get('id');
  if (!allIds.has(id)) return enProblems.push(`${where}: id "${id}" não existe (ou foi excluído) em português`);
  if (en[id]) return enProblems.push(`${where}: id "${id}" repetido`);
  if (!/^\d+$/.test(get('answer')) || Number(get('answer')) <= 0) return enProblems.push(`${where}: resposta não é inteiro positivo`);
  if (!get('question').endsWith('?')) enProblems.push(`${where}: pergunta sem "?"`);
  en[id] = { text: get('question'), answer: Number(get('answer')), unit: get('unit'), ...(get('fact') ? { fact: get('fact') } : {}) };
});
if (enProblems.length) {
  console.error(enProblems.join('\n'));
  process.exit(1);
}
const enOut = `// GERADO por scripts/import-questions.mjs a partir de content/en.csv. Não edite aqui: edite o CSV.
// Tradução por id das perguntas de questions.ts; o que não está aqui não sai em inglês.
export type EnQuestion = { text: string; answer: number; unit: string; fact?: string };

export const EN_QUESTIONS: Record<string, EnQuestion> = ${JSON.stringify(en, null, 2)};
`;
writeFileSync('src/game/questions.en.ts', enOut);
console.log(`inglês: ${Object.keys(en).length} perguntas traduzidas`);
console.log(`${total} perguntas (${read - total} fora): ` + packs.map((p) => `${p.title} ${p.questions.length}`).join(', '));
