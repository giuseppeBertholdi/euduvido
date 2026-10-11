// GERADO por scripts/sync-engine.mjs a partir de src/game/questions.ts. Não edite aqui.
// GERADO por scripts/import-questions.mjs a partir de content/*.csv. Não edite aqui: edite o CSV (ou EXCLUDE/FIX no script).
export type Question = { id: string; text: string; answer: number; unit: string; fact?: string; source?: string };

export type Pack = {
  id: string;
  title: string;
  tagline: string;
  premium: boolean;
  isNew?: boolean;
  /** Ícone (ver `src/components/Icon.tsx`) e cor do pacote. */
  icon: 'bulb' | 'brasil' | 'paw' | 'heart' | 'cursor' | 'cup' | 'bolt' | 'planet';
  tint: string;
  questions: Question[];
};

export const PACKS: Pack[] = [
  {
    "id": "classico",
    "title": "clássico",
    "tagline": "o básico bem feito",
    "premium": false,
    "icon": "bulb",
    "tint": "#FFD600",
    "questions": [
      {
        "id": "q66",
        "text": "Em que ano o homem pisou na Lua pela primeira vez?",
        "answer": 1969,
        "unit": "ano",
        "fact": "Neil Armstrong e Buzz Aldrin desembarcaram na missão Apollo 11.",
        "source": "NASA History"
      },
      {
        "id": "q67",
        "text": "Quantos minutos a luz do Sol leva para chegar à Terra?",
        "answer": 8,
        "unit": "minutos",
        "fact": "Média exata de cerca de 8 minutos e 20 segundos.",
        "source": "NASA Solar System Exploration"
      },
      {
        "id": "q68",
        "text": "Quantas peças de xadrez cada jogador possui no início da partida?",
        "answer": 16,
        "unit": "peças",
        "fact": "Totalizando 32 peças no tabuleiro.",
        "source": "FIDE Rules of Chess"
      },
      {
        "id": "q69",
        "text": "Quantos graus celsius é o ponto de ebulição da água ao nível do mar?",
        "answer": 100,
        "unit": "graus",
        "fact": "A 1 atm de pressão atmosférica.",
        "source": "NIST Physical Constants"
      },
      {
        "id": "q70",
        "text": "Quantos dias tem um ano bissexto?",
        "answer": 366,
        "unit": "dias",
        "fact": "O dia extra é adicionado ao mês de fevereiro (dia 29).",
        "source": "Astronomical Applications Dept"
      },
      {
        "id": "q71",
        "text": "Quantas cartas tem um baralho padrão sem os coringas?",
        "answer": 52,
        "unit": "cartas",
        "fact": "Divididas em 4 naipes de 13 cartas cada.",
        "source": "International Playing-Card Society"
      },
      {
        "id": "q72",
        "text": "Quantos anéis olímpicos compõem o símbolo dos Jogos Olímpicos?",
        "answer": 5,
        "unit": "anéis",
        "fact": "Representam os cinco continentes unidos pelo esporte.",
        "source": "International Olympic Committee (IOC)"
      },
      {
        "id": "q73",
        "text": "Em que ano afundou o navio Titanic?",
        "answer": 1912,
        "unit": "ano",
        "fact": "Colidiu com um iceberg na noite de 14 para 15 de abril.",
        "source": "Encyclopedia Titanica"
      },
      {
        "id": "q74",
        "text": "Quantos quilômetros tem a circunferência da Terra na linha do Equador?",
        "answer": 40075,
        "unit": "km",
        "fact": "A Terra é ligeiramente achatada nos polos.",
        "source": "NASA Earth Fact Sheet"
      },
      {
        "id": "q75",
        "text": "Quantos lados tem um heptágono?",
        "answer": 7,
        "unit": "lados",
        "fact": "Polígono de 7 vértices e 7 ângulos.",
        "source": "MathWorld / Wolfram"
      },
      {
        "id": "q76",
        "text": "Em que ano terminou a Segunda Guerra Mundial?",
        "answer": 1945,
        "unit": "ano",
        "fact": "A Alemanha se rendeu em maio e o Japão em setembro.",
        "source": "Imperial War Museums"
      },
      {
        "id": "q77",
        "text": "Quantas teclas tem um piano acústico padrão?",
        "answer": 88,
        "unit": "teclas",
        "fact": "Sendo 52 brancas e 36 pretas.",
        "source": "Steinway & Sons Technical Specs"
      },
      {
        "id": "q78",
        "text": "Quantos elementos químicos existem na Tabela Periódica atual?",
        "answer": 118,
        "unit": "elementos",
        "fact": "O mais recente nomeado foi o Oganessônio (Og).",
        "source": "IUPAC Periodic Table"
      },
      {
        "id": "q79",
        "text": "Em que ano começou a Primeira Guerra Mundial?",
        "answer": 1914,
        "unit": "ano",
        "fact": "Iniciada após o assassinato do arquiduque Francisco Ferdinando.",
        "source": "History Channel / WWI"
      },
      {
        "id": "q137",
        "text": "Quantos planetas existem no Sistema Solar segundo a União Astronômica Internacional?",
        "answer": 8,
        "unit": "planetas",
        "fact": "Plutão foi reclassificado como planeta anão em 2006.",
        "source": "International Astronomical Union"
      },
      {
        "id": "q138",
        "text": "Em que ano ocorreu a queda da Bastilha na Revolução Francesa?",
        "answer": 1789,
        "unit": "ano",
        "fact": "Aconteceu em 14 de julho de 1789.",
        "source": "French National Archives"
      },
      {
        "id": "q139",
        "text": "Quantas casas de xadrez existem em um tabuleiro tradicional?",
        "answer": 64,
        "unit": "casas",
        "fact": "Divididas igualmente entre 32 brancas e 32 pretas.",
        "source": "FIDE Chess Rules"
      },
      {
        "id": "q140",
        "text": "Em que ano Albert Einstein publicou a Teoria da Relatividade Restrita?",
        "answer": 1905,
        "unit": "ano",
        "fact": "Conhecido como o seu 'Ano Miraculoso' (Annus Mirabilis).",
        "source": "Nobel Prize Archives"
      },
      {
        "id": "q141",
        "text": "Quantas teclas de atalho de função (F1 a F12) existem no topo de um teclado padrão PC?",
        "answer": 12,
        "unit": "teclas",
        "fact": "De F1 até F12.",
        "source": "ISO Keyboard Standards"
      },
      {
        "id": "q142",
        "text": "Quantos quilômetros de altitude é considerada a Linha Kármán (fronteira do espaço)?",
        "answer": 100,
        "unit": "km",
        "fact": "Definida pela Federação Aeronáutica Internacional.",
        "source": "FAI Federation"
      },
      {
        "id": "q143",
        "text": "Em que ano foi inaugurada a Torre Eiffel em Paris?",
        "answer": 1889,
        "unit": "ano",
        "fact": "Construída para a Exposição Universal de 1889.",
        "source": "La Tour Eiffel Official"
      },
      {
        "id": "q144",
        "text": "Quantos lados tem um decágono?",
        "answer": 10,
        "unit": "lados",
        "fact": "Polígono regular com ângulos internos de 144 graus.",
        "source": "Geometry Standard"
      },
      {
        "id": "q145",
        "text": "Em que ano o muro de Berlim caiu, simbolizando o fim da Guerra Fria?",
        "answer": 1989,
        "unit": "ano",
        "fact": "Caiu na noite de 9 de novembro de 1989.",
        "source": "German Historical Museum"
      },
      {
        "id": "q146",
        "text": "Quantos quilômetros por segundo percorre a luz no vácuo?",
        "answer": 299792,
        "unit": "km/s",
        "fact": "Exatamente 299.792,458 km/s.",
        "source": "NIST Physical Standards"
      },
      {
        "id": "q147",
        "text": "Quantos jogadores de cada time entram em campo em uma partida de futebol?",
        "answer": 11,
        "unit": "jogadores",
        "fact": "Incluindo o goleiro em cada equipe.",
        "source": "IFAB Laws of the Game"
      },
      {
        "id": "q148",
        "text": "Em que ano foi lançada a nota de 200 reais no Brasil?",
        "answer": 2020,
        "unit": "ano",
        "fact": "Traz o lobo-guará estampado no verso.",
        "source": "Banco Central do Brasil"
      },
      {
        "id": "q149",
        "text": "Quantas cores tem o arco-íris tradicionalmente descritas por Isaac Newton?",
        "answer": 7,
        "unit": "cores",
        "fact": "Vermelho, laranja, amarelo, verde, azul, anil e violeta.",
        "source": "Royal Society Optics"
      },
      {
        "id": "q150",
        "text": "Em que ano aconteceu o massacre de Pompeia pela erupção do Monte Vesúvio?",
        "answer": 79,
        "unit": "ano",
        "fact": "Destruiu as cidades de Pompeia e Herculano na Itália.",
        "source": "Archaeological Park of Pompeii"
      },
      {
        "id": "q186",
        "text": "Quantas notas musicais compõem a escala diatônica clássica?",
        "answer": 7,
        "unit": "notas",
        "fact": "Dó, Ré, Mi, Fá, Sol, Lá, Si.",
        "source": "Music Theory Guide"
      },
      {
        "id": "q187",
        "text": "Em que ano caiu a União Soviética (URSS)?",
        "answer": 1991,
        "unit": "ano",
        "fact": "Dissolvida em dezembro de 1991.",
        "source": "Historical Archives"
      },
      {
        "id": "q188",
        "text": "Quantos metros tem uma piscina olímpica oficial de natação?",
        "answer": 50,
        "unit": "metros",
        "fact": "Com largura de 25 metros e 8 a 10 raias.",
        "source": "World Aquatics (FINA)"
      },
      {
        "id": "q190",
        "text": "Em que ano Colombo chegou às Américas?",
        "answer": 1492,
        "unit": "ano",
        "fact": "Desembarcou na ilha de Guanahani em outubro.",
        "source": "History Channel"
      },
      {
        "id": "q191",
        "text": "Quantos jogadores formam um time de basquete em quadra?",
        "answer": 5,
        "unit": "jogadores",
        "fact": "Sendo 10 jogadores no total em quadra.",
        "source": "FIBA Official Rules"
      },
      {
        "id": "q192",
        "text": "Quantas maravilhas do mundo antigo existiam na lista tradicional?",
        "answer": 7,
        "unit": "maravilhas",
        "fact": "Apenas as Pirâmides de Gizé ainda estão de pé.",
        "source": "UNESCO Heritage"
      },
      {
        "id": "q233",
        "text": "Quantos estados compõem os Estados Unidos da América?",
        "answer": 50,
        "unit": "estados",
        "fact": "O Alasca e o Havaí foram os últimos integrados.",
        "source": "US Census Bureau"
      },
      {
        "id": "q234",
        "text": "Em que ano terminou a Guerra do Vietnã?",
        "answer": 1975,
        "unit": "ano",
        "fact": "Com a queda de Saigon em 30 de abril.",
        "source": "US National Archives"
      },
      {
        "id": "q235",
        "text": "Quantos minutos tem uma partida oficial de futebol sem acréscimos?",
        "answer": 90,
        "unit": "minutos",
        "fact": "Dividida em dois tempos de 45 minutos.",
        "source": "IFAB Laws of the Game"
      },
      {
        "id": "q236",
        "text": "Quantas cordas tem um violão tradicional acústico?",
        "answer": 6,
        "unit": "cordas",
        "fact": "Afinadas em Mi, Lá, Ré, Sol, Si, Mi.",
        "source": "Musical Instrument Standards"
      },
      {
        "id": "q237",
        "text": "Em que ano ocorreu a Revolução Russa que derrubou o Czar?",
        "answer": 1917,
        "unit": "ano",
        "fact": "Conhecida pelas fases de Fevereiro e Outubro.",
        "source": "Russian History Archives"
      },
      {
        "id": "q238",
        "text": "Quantas faces tem um dado tradicional de jogo de tabuleiro?",
        "answer": 6,
        "unit": "faces",
        "fact": "Os lados opostos de um dado padrão sempre somam 7.",
        "source": "Board Game Standards"
      },
      {
        "id": "q239",
        "text": "Em que ano Neil Armstrong faleceu?",
        "answer": 2012,
        "unit": "ano",
        "fact": "O primeiro homem a pisar na Lua faleceu aos 82 anos.",
        "source": "NASA Historical"
      },
      {
        "id": "q240",
        "text": "Quantos mililitros cabem em uma garrafa de vinho padrão?",
        "answer": 750,
        "unit": "ml",
        "fact": "Padrão internacional estabelecido no século XIX.",
        "source": "International Organisation of Vine and Wine"
      },
      {
        "id": "q241",
        "text": "Quantos pinos são usados em uma pista tradicional de boliche?",
        "answer": 10,
        "unit": "pinos",
        "fact": "Dispostos em formato triangular.",
        "source": "World Bowling Federation"
      },
      {
        "id": "q242",
        "text": "Em que ano Albert Einstein recebeu o Prêmio Nobel de Física?",
        "answer": 1921,
        "unit": "ano",
        "fact": "Premiado pela explicação do efeito fotoelétrico.",
        "source": "Nobel Prize Official"
      },
      {
        "id": "q283",
        "text": "Em que ano a bomba atômica foi lançada sobre Hiroshima?",
        "answer": 1945,
        "unit": "ano",
        "fact": "Aconteceu no dia 6 de agosto de 1945.",
        "source": "Hiroshima Peace Memorial"
      },
      {
        "id": "q284",
        "text": "Quantos minutos dura um tempo suplementar (prorrogação) de futebol no total?",
        "answer": 30,
        "unit": "minutos",
        "fact": "Dividido em dois tempos de 15 minutos.",
        "source": "IFAB Laws"
      },
      {
        "id": "q286",
        "text": "Quantos quilômetros tem uma maratona oficial?",
        "answer": 42,
        "unit": "km",
        "fact": "Exatamente 42,195 quilômetros.",
        "source": "World Athletics"
      },
      {
        "id": "q287",
        "text": "Quantos lados tem um octógono?",
        "answer": 8,
        "unit": "lados",
        "fact": "Polígono de 8 lados e 8 ângulos.",
        "source": "Geometry Foundations"
      },
      {
        "id": "q288",
        "text": "Em que ano foi inaugurado o Canal do Panamá?",
        "answer": 1914,
        "unit": "ano",
        "fact": "Conectando o Oceano Atlântico ao Oceano Pacífico.",
        "source": "Panama Canal Authority"
      },
      {
        "id": "q289",
        "text": "Quantas cordas tem um violoncelo?",
        "answer": 4,
        "unit": "cordas",
        "fact": "Afinadas em Dó, Sol, Ré e Lá.",
        "source": "Orchestra Instruments Guide"
      },
      {
        "id": "q291",
        "text": "Quantos dentes incisivos um humano adulto tem na boca?",
        "answer": 8,
        "unit": "dentes",
        "fact": "Quatro na arcada superior e quatro na inferior.",
        "source": "Dental Anatomy"
      },
      {
        "id": "q292",
        "text": "Em que ano a expedição de Pedro Álvares Cabral chegou ao Brasil?",
        "answer": 1500,
        "unit": "ano",
        "fact": "Desembarcaram em Porto Seguro em 22 de abril.",
        "source": "Biblioteca Nacional Brasil"
      },
      {
        "id": "n2",
        "text": "Quantos metros de profundidade tem a Fossa das Marianas, o ponto mais fundo do oceano?",
        "answer": 11034,
        "unit": "metros",
        "fact": "Se colocasse o Monte Everest lá dentro, ainda sobrava mais de 2 km de água por cima.",
        "source": "NOAA Ocean Exploration"
      },
      {
        "id": "n3",
        "text": "Quantos litros de água são necessários para produzir apenas 1 kg de carne bovina?",
        "answer": 15415,
        "unit": "litros",
        "fact": "Inclui a água usada no cultivo do pasto, ração e dessedentação do animal.",
        "source": "Water Footprint Network"
      },
      {
        "id": "n5",
        "text": "Quantos metros de altura tem o Burj Khalifa em Dubai, o prédio mais alto do mundo?",
        "answer": 828,
        "unit": "metros",
        "fact": "Possui 163 andares habitáveis e pode ser visto a 95 km de distância.",
        "source": "CTBUH Skyscraper Center"
      },
      {
        "id": "n7",
        "text": "Quantos quilômetros tem a Grande Muralha da China em toda a sua extensão contínua e ramificações?",
        "answer": 21196,
        "unit": "km",
        "fact": "Cruza 15 províncias chinesas e levou séculos para ser concluída.",
        "source": "UNESCO World Heritage"
      },
      {
        "id": "n8",
        "text": "Quantas ilhas formam o país da Indonésia, o maior arquipélago do mundo?",
        "answer": 17508,
        "unit": "ilhas",
        "fact": "Cerca de 6.000 dessas ilhas são habitadas por seres humanos.",
        "source": "Indonesian Government"
      },
      {
        "id": "n10",
        "text": "Quantos graus Celsius faz no núcleo do Sol (em milhões)?",
        "answer": 15,
        "unit": "milhões",
        "fact": "A temperatura e pressão no núcleo são suficientes para fusão nuclear de hidrogênio.",
        "source": "NASA Solar Physics"
      },
      {
        "id": "n13",
        "text": "Quantos quilômetros tem o raio médio do planeta Terra do centro até a superfície?",
        "answer": 6371,
        "unit": "km",
        "fact": "O diâmetro total da Terra é de aproximadamente 12.742 km.",
        "source": "NASA Earth Fact Sheet"
      },
      {
        "id": "n15",
        "text": "Quantas estátuas de pedra (Moais) foram catalogadas na Ilha de Páscoa?",
        "answer": 887,
        "unit": "estátuas",
        "fact": "A maioria foi esculpida em tufa vulcânica entre os anos 1100 e 1680.",
        "source": "UNESCO / Easter Island Statue Project"
      },
      {
        "id": "n16",
        "text": "Quantos metros acima do nível do mar tem o topo do Monte Everest?",
        "answer": 8849,
        "unit": "metros",
        "fact": "A altitude oficial revisada recentemente é de 8.848,86 metros.",
        "source": "National Geographic"
      }
    ]
  },
  {
    "id": "absurdos-br",
    "title": "absurdos BR",
    "tagline": "o Brasil não é pra amadores",
    "premium": true,
    "isNew": true,
    "icon": "brasil",
    "tint": "#9BDDB0",
    "questions": [
      {
        "id": "q37",
        "text": "Em que ano o Plano Real entrou em vigor no Brasil?",
        "answer": 1994,
        "unit": "ano",
        "fact": "O Real substituiu o Cruzeiro Real em 1º de julho de 1994.",
        "source": "Banco Central do Brasil"
      },
      {
        "id": "q38",
        "text": "Quantos estados compõem a República Federativa do Brasil, sem contar o DF?",
        "answer": 26,
        "unit": "estados",
        "fact": "Com o Distrito Federal, são 27 unidades federativas.",
        "source": "IBGE"
      },
      {
        "id": "q39",
        "text": "Quantos municípios existem no Brasil segundo o IBGE?",
        "answer": 5570,
        "unit": "municípios",
        "fact": "O município mais novo é Mojuí dos Campos (PA), instalado em 2013.",
        "source": "IBGE 2023"
      },
      {
        "id": "q40",
        "text": "Quantos metros de altura tem o Cristo Redentor, incluindo o pedestal?",
        "answer": 38,
        "unit": "metros",
        "fact": "Apenas a estátua tem 30 metros e o pedestal 8 metros.",
        "source": "Trem do Corcovado / ICMBio"
      },
      {
        "id": "q41",
        "text": "Em que ano a TV Colosso estreou na TV Globo?",
        "answer": 1993,
        "unit": "ano",
        "fact": "O programa dos cachorros puppets marcou a infância dos anos 90.",
        "source": "Memória Globo"
      },
      {
        "id": "q43",
        "text": "Quantos títulos de Copa do Mundo a Seleção Brasileira masculina de futebol possui?",
        "answer": 5,
        "unit": "títulos",
        "fact": "Vencidos em 1958, 1962, 1970, 1994 e 2002.",
        "source": "FIFA Official Records"
      },
      {
        "id": "q44",
        "text": "Em que ano o programa Castelo Rá-Tim-Bum estreou na TV Cultura?",
        "answer": 1994,
        "unit": "ano",
        "fact": "Teve 90 episódios e um especial de Natal.",
        "source": "TV Cultura Archive"
      },
      {
        "id": "q45",
        "text": "Quantos andares tem o edifício Itália em São Paulo?",
        "answer": 46,
        "unit": "andares",
        "fact": "É um dos arranha-céus mais icônicos do Brasil, com 165 metros.",
        "source": "Prefeitura de SP / Turismo"
      },
      {
        "id": "q46",
        "text": "Em que ano aconteceu a estreia do Big Brother Brasil (BBB 1)?",
        "answer": 2002,
        "unit": "ano",
        "fact": "Kléber Bambam foi o grande vencedor da primeira edição.",
        "source": "Gshow / Globo"
      },
      {
        "id": "q47",
        "text": "Quantas pontas tem a estrela da bandeira do Brasil que representa o DF?",
        "answer": 5,
        "unit": "pontas",
        "fact": "Todas as 27 estrelas da bandeira têm 5 pontas.",
        "source": "Governo Federal / Símbolos Nacionais"
      },
      {
        "id": "q48",
        "text": "Em que ano Ayrton Senna ganhou seu primeiro título de Formula 1?",
        "answer": 1988,
        "unit": "ano",
        "fact": "Ele foi tricampeão (1988, 1990 e 1991).",
        "source": "Formula 1 Official"
      },
      {
        "id": "q50",
        "text": "Em que ano o Brasil aprovou a sua atual Constituição Federal?",
        "answer": 1988,
        "unit": "ano",
        "fact": "Conhecida como a 'Constituição Cidadã'.",
        "source": "Chancelaria da Presidência"
      },
      {
        "id": "q51",
        "text": "Quantas capitais do Brasil estão localizadas na Região Sul?",
        "answer": 3,
        "unit": "capitais",
        "fact": "Curitiba, Florianópolis e Porto Alegre.",
        "source": "IBGE Geo"
      },
      {
        "id": "q80",
        "text": "Em que ano a novela 'A Favorita' foi exibida na TV Globo?",
        "answer": 2008,
        "unit": "ano",
        "fact": "Ficou famosa pela revelação da vilã Flora x Donatela.",
        "source": "Memória Globo"
      },
      {
        "id": "q81",
        "text": "Quantos capítulos teve a primeira versão da novela Pantanal em 1990 na Manchete?",
        "answer": 216,
        "unit": "capítulos",
        "fact": "Escrita por Benedito Ruy Barbosa.",
        "source": "Rede Manchete Acervo"
      },
      {
        "id": "q82",
        "text": "Em que ano o Senna venceu seu último GP de Formula 1 no Brasil (Interlagos)?",
        "answer": 1993,
        "unit": "ano",
        "fact": "Com a célebre invasão da pista pela torcida.",
        "source": "F1 Archive"
      },
      {
        "id": "q83",
        "text": "Quantos municípios tem o estado de Minas Gerais?",
        "answer": 853,
        "unit": "municípios",
        "fact": "É o estado brasileiro com o maior número de municípios.",
        "source": "IBGE Minas Gerais"
      },
      {
        "id": "q84",
        "text": "Quantos quilômetros de extensão tem a praia do Cassino no RS, considerada a maior do mundo?",
        "answer": 254,
        "unit": "km",
        "fact": "Registrada no Guinness Book como a praia mais longa.",
        "source": "Guinness World Records"
      },
      {
        "id": "q85",
        "text": "Em que ano foi inaugurada a cidade de Brasília?",
        "answer": 1960,
        "unit": "ano",
        "fact": "Inaugurada em 21 de abril por Juscelino Kubitschek.",
        "source": "Arquivo Público do DF"
      },
      {
        "id": "q86",
        "text": "Quantos andares tem o prédio mais alto do Brasil (One Tower em Balneário Camboriú)?",
        "answer": 84,
        "unit": "andares",
        "fact": "Tem 290 metros de altura total.",
        "source": "CTBUH Skyscraper Center"
      },
      {
        "id": "q87",
        "text": "Em que ano o Rock in Rio teve sua primeira edição?",
        "answer": 1985,
        "unit": "ano",
        "fact": "Reuniu mais de 1 milhão de pessoas na Cidade do Rock.",
        "source": "Rock in Rio Official"
      },
      {
        "id": "q89",
        "text": "Em que ano o Chaves começou a ser transmitido no SBT?",
        "answer": 1984,
        "unit": "ano",
        "fact": "Virou um clássico absoluto da televisão brasileira.",
        "source": "SBT Histórico"
      },
      {
        "id": "q90",
        "text": "Quantas estrelas tem a bandeira do estado de São Paulo?",
        "answer": 4,
        "unit": "estrelas",
        "fact": "Representam as quatro estrelas da Constelação do Cruzeiro do Sul na bandeira paulista.",
        "source": "Governo de SP"
      },
      {
        "id": "q91",
        "text": "Em que ano Carmen Miranda nasceu?",
        "answer": 1909,
        "unit": "ano",
        "fact": "Nasceu em Portugal e veio para o Brasil com menos de 1 ano.",
        "source": "Museu Carmen Miranda"
      },
      {
        "id": "q92",
        "text": "Quantas estações de metrô em operação tem a linha 1-Azul de São Paulo?",
        "answer": 23,
        "unit": "estações",
        "fact": "Foi a primeira linha de metrô construída no Brasil.",
        "source": "Metrô SP"
      },
      {
        "id": "q93",
        "text": "Em que ano o concurso Miss Brasil teve sua primeira edição oficial?",
        "answer": 1954,
        "unit": "ano",
        "fact": "A vencedora foi a baiana Martha Rocha.",
        "source": "História Miss Brasil"
      },
      {
        "id": "q169",
        "text": "Em que ano o Fusca parou de ser fabricado pela primeira vez no Brasil?",
        "answer": 1986,
        "unit": "ano",
        "fact": "Ele voltou a ser produzido em 1993 a pedido do presidente Itamar Franco.",
        "source": "VW do Brasil"
      },
      {
        "id": "q171",
        "text": "Em que ano a novela 'Avenida Brasil' foi ao ar com o fenômeno da Carminha?",
        "answer": 2012,
        "unit": "ano",
        "fact": "O último capítulo parou o país e bateu recordes de audiência.",
        "source": "Memória Globo"
      },
      {
        "id": "q172",
        "text": "Quantas ilhas habitadas compõem o arquipélago de Fernando de Noronha?",
        "answer": 1,
        "unit": "ilha",
        "fact": "Apenas a ilha principal é habitada.",
        "source": "Governo de Pernambuco"
      },
      {
        "id": "q173",
        "text": "Em que ano o famoso Menino da Porteira virou música gravada por Tonico & Tinoco?",
        "answer": 1955,
        "unit": "ano",
        "fact": "Tornou-se um clássico caipira eterno.",
        "source": "Instituto Memória Musical"
      },
      {
        "id": "q174",
        "text": "Quantos times participam da primeira divisão (Série A) do Brasileirão?",
        "answer": 20,
        "unit": "times",
        "fact": "Disputado em pontos corridos com 38 rodadas.",
        "source": "CBF Oficial"
      },
      {
        "id": "q175",
        "text": "Em que ano ocorreu o desastre do Edifício Joelma em São Paulo?",
        "answer": 1974,
        "unit": "ano",
        "fact": "Um dos incêndios mais marcantes da história do país.",
        "source": "Corpo de Bombeiros SP"
      },
      {
        "id": "q177",
        "text": "Em que ano o programa 'Domingão do Faustão' estreou na TV Globo?",
        "answer": 1989,
        "unit": "ano",
        "fact": "Ficou no ar aos domingos por mais de 30 anos.",
        "source": "Memória Globo"
      },
      {
        "id": "q194",
        "text": "Quantos estados formam a Região Nordeste do Brasil?",
        "answer": 9,
        "unit": "estados",
        "fact": "É a região com o maior número de estados no país.",
        "source": "IBGE"
      },
      {
        "id": "q195",
        "text": "Em que ano o Rock in Rio teve sua segunda edição no Maracanã?",
        "answer": 1991,
        "unit": "ano",
        "fact": "Contou com performances marcantes de Guns N' Roses e A-ha.",
        "source": "Rock in Rio Archive"
      },
      {
        "id": "q196",
        "text": "Quantos metros de altitude tem o Pico da Neblina, o ponto mais alto do Brasil?",
        "answer": 2995,
        "unit": "metros",
        "fact": "Localizado na Serra do Imeri no Amazonas.",
        "source": "IBGE Geociências"
      },
      {
        "id": "q197",
        "text": "Em que ano o Teleton estreou no SBT?",
        "answer": 1998,
        "unit": "ano",
        "fact": "Campanha anual em prol da AACD.",
        "source": "SBT Press"
      },
      {
        "id": "q198",
        "text": "Quantos quilômetros tem a ponte Rio-Niterói?",
        "answer": 13,
        "unit": "km",
        "fact": "É a maior ponte em extensão do Hemisfério Sul.",
        "source": "EcoPonte / ANTT"
      },
      {
        "id": "q199",
        "text": "Em que ano foi lançada a Moeda Provisória Cruzeiro Real antes do Plano Real?",
        "answer": 1993,
        "unit": "ano",
        "fact": "Durou menos de um ano no mercado.",
        "source": "Banco Central do Brasil"
      },
      {
        "id": "q200",
        "text": "Quantos títulos da Copa do Brasil o Cruzeiro possui (recordista)?",
        "answer": 6,
        "unit": "títulos",
        "fact": "Conquistados em 1993, 1996, 2000, 2003, 2017 e 2018.",
        "source": "CBF Oficial"
      },
      {
        "id": "q201",
        "text": "Em que ano Santos Dumont fez o famoso voo do 14-Bis no Campo de Bagatelle?",
        "answer": 1906,
        "unit": "ano",
        "fact": "Percorreu 60 metros a 2 a 3 metros de altura.",
        "source": "Força Aérea Brasileira"
      },
      {
        "id": "q243",
        "text": "Em que ano foi inaugurado o Maracanã para a Copa do Mundo?",
        "answer": 1950,
        "unit": "ano",
        "fact": "O estádio sediou a final do famoso 'Maracanazo'.",
        "source": "CBF / Governo do RJ"
      },
      {
        "id": "q244",
        "text": "Quantas faixas tem a bandeira do estado da Bahia?",
        "answer": 4,
        "unit": "faixas",
        "fact": "Duas brancas e duas vermelhas alternadas.",
        "source": "Governo da Bahia"
      },
      {
        "id": "q245",
        "text": "Em que ano o piloto Ayrton Senna estreou na Fórmula 1 pela Toleman?",
        "answer": 1984,
        "unit": "ano",
        "fact": "Seu primeiro ponto foi no GP da África do Sul.",
        "source": "F1 Archive"
      },
      {
        "id": "q247",
        "text": "Em que ano a novela 'Vale Tudo' foi exibida na TV Globo?",
        "answer": 1988,
        "unit": "ano",
        "fact": "Famosa pelo mistério de 'Quem matou Odete Roitman?'.",
        "source": "Memória Globo"
      },
      {
        "id": "q248",
        "text": "Quantas capitais estaduais o Brasil possui?",
        "answer": 26,
        "unit": "capitais",
        "fact": "Mais Brasília como capital federal.",
        "source": "IBGE"
      },
      {
        "id": "q249",
        "text": "Em que ano foi lançado o refrigerante Guaraná Antarctica?",
        "answer": 1921,
        "unit": "ano",
        "fact": "Lançado originalmente com o nome Guaraná Champagne.",
        "source": "Ambev Press"
      },
      {
        "id": "q250",
        "text": "Quantos andares tem o famoso Edifício Copan em São Paulo?",
        "answer": 32,
        "unit": "andares",
        "fact": "Projetado por Oscar Niemeyer.",
        "source": "Prefeitura de SP"
      },
      {
        "id": "q251",
        "text": "Em que ano o Brasil ganhou a sua primeira medalha de ouro olímpica?",
        "answer": 1920,
        "unit": "ano",
        "fact": "Conquistada por Guilherme Paraense no tiro esportivo na Antuérpia.",
        "source": "COB"
      },
      {
        "id": "q252",
        "text": "Quantas cores tem a bandeira oficial do Brasil?",
        "answer": 4,
        "unit": "cores",
        "fact": "Verde, amarelo, azul e branco.",
        "source": "Governo Federal"
      },
      {
        "id": "q293",
        "text": "Em que ano o horário de verão foi instituído pela primeira vez no Brasil?",
        "answer": 1931,
        "unit": "ano",
        "fact": "Decretado pelo presidente Getúlio Vargas.",
        "source": "Governo Federal / MME"
      },
      {
        "id": "q295",
        "text": "Em que ano o programa 'TV Xuxa' estreou na TV Globo?",
        "answer": 2005,
        "unit": "ano",
        "fact": "Exibido nas manhãs e depois nas tardes de sábado.",
        "source": "Memória Globo"
      },
      {
        "id": "q297",
        "text": "Em que ano o Real completou 25 anos de circulação?",
        "answer": 2019,
        "unit": "ano",
        "fact": "A moeda estabilizou a economia após a hiperinflação.",
        "source": "Banco Central do Brasil"
      },
      {
        "id": "q298",
        "text": "Quantas linhas de metrô funcionam na cidade do Rio de Janeiro?",
        "answer": 3,
        "unit": "linhas",
        "fact": "Linha 1, Linha 2 e Linha 4.",
        "source": "MetrôRio"
      },
      {
        "id": "q299",
        "text": "Em que ano foi lançado o primeiro álbum da banda Mamonas Assassinas?",
        "answer": 1995,
        "unit": "ano",
        "fact": "Vendeu mais de 3 milhões de cópias em menos de um ano.",
        "source": "Som Livre / Acervo"
      },
      {
        "id": "q301",
        "text": "Em que ano o Palácio do Planalto foi inaugurado em Brasília?",
        "answer": 1960,
        "unit": "ano",
        "fact": "Sede do poder executivo do governo federal brasileiro.",
        "source": "Presidência da República"
      },
      {
        "id": "n105",
        "text": "Quantos metros de altura tem o prédio mais alto do Brasil (One Tower)?",
        "answer": 290,
        "unit": "metros",
        "fact": "Fica localizado em Balneário Camboriú (SC).",
        "source": "CTBUH Skyscraper Center"
      },
      {
        "id": "n108",
        "text": "Quantas pessoas cabiam no Maracanã no jogo de maior público da história (1950)?",
        "answer": 199854,
        "unit": "pessoas",
        "fact": "O famoso jogo do 'Maracanazo' na final da Copa de 1950.",
        "source": "CBF / FIFA"
      },
      {
        "id": "n119",
        "text": "Quantos fusos horários existem em todo o território nacional do Brasil?",
        "answer": 4,
        "unit": "fusos",
        "fact": "Do UTC-2 (Fernando de Noronha) ao UTC-5 (Acre).",
        "source": "Observatório Nacional"
      },
      {
        "id": "n121",
        "text": "Quantas faixas horizontais tem a bandeira do estado de São Paulo?",
        "answer": 13,
        "unit": "faixas",
        "fact": "Sendo 7 faixas pretas e 6 faixas brancas alternadas.",
        "source": "Governo de SP"
      },
      {
        "id": "n122",
        "text": "Quantas estrelas estão estampadas na bandeira oficial do Brasil?",
        "answer": 27,
        "unit": "estrelas",
        "fact": "Representam os 26 estados e o Distrito Federal.",
        "source": "Governo Federal"
      },
      {
        "id": "n128",
        "text": "Quantas praias oficiais existem na ilha de Florianópolis em SC?",
        "answer": 42,
        "unit": "praias",
        "fact": "Conhecida mundialmente como a 'Ilha da Magia'.",
        "source": "Turismo Floripa"
      },
      {
        "id": "n129",
        "text": "Quantas quedas d'água compõem o conjunto das Cataratas do Iguaçu?",
        "answer": 275,
        "unit": "quedas",
        "fact": "Localizadas no Parque Nacional do Iguaçu no Paraná.",
        "source": "ICMBio / UNESCO"
      },
      {
        "id": "n131",
        "text": "Quantos degraus tem a escadaria do monumento do Cristo Redentor?",
        "answer": 220,
        "unit": "degraus",
        "fact": "Apesar de hoje existirem elevadores e escadas rolantes.",
        "source": "Trem do Corcovado"
      },
      {
        "id": "n134",
        "text": "Quantas ilhas formam a Baía de Guanabara no Rio de Janeiro?",
        "answer": 130,
        "unit": "ilhas",
        "fact": "Incluindo a Ilha do Governador e a Ilha do Fundão.",
        "source": "Marinha do Brasil"
      },
      {
        "id": "n137",
        "text": "Quantos metros de altura tem o obelisco do Ibirapuera em São Paulo?",
        "answer": 72,
        "unit": "metros",
        "fact": "Homenagem aos heróis da Revolução Constitucionalista de 1932.",
        "source": "Prefeitura de SP"
      }
    ]
  },
  {
    "id": "bichos",
    "title": "bichos",
    "tagline": "a natureza é estranha",
    "premium": true,
    "icon": "paw",
    "tint": "#F4A7A7",
    "questions": [
      {
        "id": "q20",
        "text": "Quantos dentes tem um gambá-virgem (Didelphis virginiana)?",
        "answer": 50,
        "unit": "dentes",
        "fact": "É o mamífero terrestre norte-americano com mais dentes.",
        "source": "National Wildlife Federation"
      },
      {
        "id": "q22",
        "text": "Quantos corações tem um polvo?",
        "answer": 3,
        "unit": "corações",
        "fact": "Dois bombeiam sangue para as guelras e um para o resto do corpo.",
        "source": "World Wildlife Fund (WWF)"
      },
      {
        "id": "q23",
        "text": "Quantos dentes pode ter um tubarão-branco ao longo de toda a sua vida?",
        "answer": 30000,
        "unit": "dentes",
        "fact": "Eles trocam de dentes constantemente como uma esteira rolante.",
        "source": "Smithsonian Ocean"
      },
      {
        "id": "q24",
        "text": "Quantas câmaras tem o estômago de uma vaca?",
        "answer": 4,
        "unit": "câmaras",
        "fact": "Rúmen, retículo, omaso e abomaso.",
        "source": "USDA / Veterinary Sciences"
      },
      {
        "id": "q25",
        "text": "Quantos dias dura em média a gestação de um elefante-africano?",
        "answer": 645,
        "unit": "dias",
        "fact": "Quase 22 meses de gestação, a mais longa entre mamíferos terrestres.",
        "source": "San Diego Zoo"
      },
      {
        "id": "q26",
        "text": "Quantos olhos tem uma aranha caranguejeira típica?",
        "answer": 8,
        "unit": "olhos",
        "fact": "Apesar de ter 8 olhos, a maioria enxerga muito mal.",
        "source": "Live Science"
      },
      {
        "id": "q27",
        "text": "Quantas vértebras tem o pescoço de uma girafa?",
        "answer": 7,
        "unit": "vértebras",
        "fact": "O mesmo número de vértebras cervicais que um ser humano!",
        "source": "Giraffe Conservation Foundation"
      },
      {
        "id": "q28",
        "text": "Quantas asas tem uma mosca doméstica comum?",
        "answer": 2,
        "unit": "asas",
        "fact": "Elas pertencem à ordem Diptera, que significa 'duas asas'.",
        "source": "Entomological Society of America"
      },
      {
        "id": "q29",
        "text": "Quantos tentáculos tem uma lula gigante?",
        "answer": 10,
        "unit": "braços",
        "fact": "São 8 braços normais e 2 tentáculos mais longos para captura.",
        "source": "Smithsonian National Museum of Natural History"
      },
      {
        "id": "q30",
        "text": "Quantos quilos de bambu um urso panda adulto come por dia?",
        "answer": 30,
        "unit": "kg",
        "fact": "Eles passam até 12 horas por dia apenas comendo.",
        "source": "WWF Giant Panda Facts"
      },
      {
        "id": "q31",
        "text": "Quantos minutos um jacaré consegue ficar embaixo da água sem respirar?",
        "answer": 120,
        "unit": "minutos",
        "fact": "Em águas frias, conseguem reduzir o metabolismo e ficar ainda mais.",
        "source": "Florida Fish and Wildlife"
      },
      {
        "id": "q33",
        "text": "Quantos corações (arcos aórticos) tem uma minhoca?",
        "answer": 5,
        "unit": "corações",
        "fact": "São 5 pares de arcos aórticos que funcionam como corações.",
        "source": "Penn State Extension"
      },
      {
        "id": "q34",
        "text": "Quantos dentes tem um caracol de jardim na sua rádula?",
        "answer": 14000,
        "unit": "dentes",
        "fact": "Ficam localizados em uma língua microscópica raspadora.",
        "source": "Natural History Museum London"
      },
      {
        "id": "q35",
        "text": "Quantos dias vive em média uma abelha operária no verão?",
        "answer": 45,
        "unit": "dias",
        "fact": "Elas literalmente trabalham até morrer de exaustão.",
        "source": "Mid-Atlantic Apiculture Research"
      },
      {
        "id": "q36",
        "text": "Quantos dentes tem um jacaré-açu adulto?",
        "answer": 80,
        "unit": "dentes",
        "fact": "Eles podem substituir seus dentes até 50 vezes ao longo da vida.",
        "source": "Crocodilian Biology Database"
      },
      {
        "id": "q95",
        "text": "Quantas pernas tem um caranguejo?",
        "answer": 10,
        "unit": "pernas",
        "fact": "Sendo as duas da frente adaptadas como garras ou pinças.",
        "source": "Marine Biology Dept"
      },
      {
        "id": "q96",
        "text": "Quantas asas tem uma libélula?",
        "answer": 4,
        "unit": "asas",
        "fact": "Elas conseguem mover cada asa independentemente.",
        "source": "Entomology Today"
      },
      {
        "id": "q97",
        "text": "Quantos quilos pode pesar um tubarão-baleia adulto?",
        "answer": 19000,
        "unit": "kg",
        "fact": "É o maior peixe existente no mundo.",
        "source": "National Geographic Wildlife"
      },
      {
        "id": "q98",
        "text": "Quantos ovos uma tartaruga-marinha põe em média por ninho?",
        "answer": 110,
        "unit": "ovos",
        "fact": "Apenas 1 em cada 1000 filhotes chega à idade adulta.",
        "source": "Projeto Tamar"
      },
      {
        "id": "q99",
        "text": "Quantos quilômetros por hora corre uma chita (guepardo) em arrancada máxima?",
        "answer": 120,
        "unit": "km/h",
        "fact": "Chega a essa velocidade em menos de 3 segundos.",
        "source": "African Wildlife Foundation"
      },
      {
        "id": "q100",
        "text": "Quantos metros pode alcançar o comprimento de uma anaconda-verde adulta?",
        "answer": 9,
        "unit": "metros",
        "fact": "É uma das cobras mais pesadas do planeta.",
        "source": "Reptile Magazine"
      },
      {
        "id": "q101",
        "text": "Quantos anos vive em média uma tartaruga-das-galápagos na natureza?",
        "answer": 100,
        "unit": "anos",
        "fact": "Alguns espécimes ultrapassaram 150 anos.",
        "source": "Galapagos National Park"
      },
      {
        "id": "q102",
        "text": "Quantas pálpebras tem o olho de um camelo?",
        "answer": 3,
        "unit": "pálpebras",
        "fact": "A terceira pálpebra é transparente para proteger da areia.",
        "source": "Desert Biology Studies"
      },
      {
        "id": "q103",
        "text": "Quantos corações tem uma lula?",
        "answer": 3,
        "unit": "corações",
        "fact": "Assim como os polvos, possuem três corações.",
        "source": "Oceanographic Institute"
      },
      {
        "id": "q104",
        "text": "Quantas câmaras tem o estômago de uma girafa?",
        "answer": 4,
        "unit": "câmaras",
        "fact": "Como os ruminantes, digere a vegetação em quatro etapas.",
        "source": "Giraffe Conservation"
      },
      {
        "id": "q105",
        "text": "Quantas penas tem uma coruja em média no corpo todo?",
        "answer": 10000,
        "unit": "penas",
        "fact": "Penas macias e especiais permitem um voo quase silencioso.",
        "source": "Audubon Society"
      },
      {
        "id": "q106",
        "text": "Quantas horas por dia um coala passa dormindo em média?",
        "answer": 20,
        "unit": "horas",
        "fact": "A dieta com folhas de eucalipto fornece pouca energia.",
        "source": "Australian Koala Foundation"
      },
      {
        "id": "q107",
        "text": "Quantos dentes tem um urso-polar?",
        "answer": 42,
        "unit": "dentes",
        "fact": "Adaptados para rasgar carne e gordura de focas.",
        "source": "Polar Bears International"
      },
      {
        "id": "q108",
        "text": "Quantos litros de leite uma baleia-azul produz por dia para seu filhote?",
        "answer": 200,
        "unit": "litros",
        "fact": "O leite é tão rico em gordura que parece pasta de dente.",
        "source": "BBC Earth"
      },
      {
        "id": "q109",
        "text": "Quantas vértebras tem o pescoço de uma coruja?",
        "answer": 14,
        "unit": "vértebras",
        "fact": "Permite rodar a cabeça em até 270 graus.",
        "source": "Bird Biology Journal"
      },
      {
        "id": "q160",
        "text": "Quantas patas tem uma aranha?",
        "answer": 8,
        "unit": "patas",
        "fact": "Aracnídeos têm 8 patas, diferentemente dos insetos que têm 6.",
        "source": "Arachnology Society"
      },
      {
        "id": "q161",
        "text": "Quantos ovos um galinha caipira põe em média por ano?",
        "answer": 250,
        "unit": "ovos",
        "fact": "Galinhas poedeiras industriais chegam a 300.",
        "source": "Poultry Science Org"
      },
      {
        "id": "q162",
        "text": "Quantos dentes tem um leão adulto?",
        "answer": 30,
        "unit": "dentes",
        "fact": "Adaptados para cortar carne com precisão carnassial.",
        "source": "Panthera Wildlife"
      },
      {
        "id": "q163",
        "text": "Quantos metros de profundidade um pinguim-imperador consegue mergulhar?",
        "answer": 500,
        "unit": "metros",
        "fact": "Eles podem ficar mais de 20 minutos debaixo d'água.",
        "source": "National Geographic Kids"
      },
      {
        "id": "q164",
        "text": "Quantos quilos de comida um urso-pardo come por dia antes de hibernar?",
        "answer": 40,
        "unit": "kg",
        "fact": "Aumentam drasticamente a ingestão de calorias para criar gordura.",
        "source": "National Park Service US"
      },
      {
        "id": "q165",
        "text": "Quantas vezes por segundo um beija-flor bate as asas em voo parado?",
        "answer": 80,
        "unit": "vezes",
        "fact": "Pode chegar a 200 vezes por segundo durante mergulhos.",
        "source": "Audubon Society"
      },
      {
        "id": "q166",
        "text": "Quantos olhos tem uma abelha melífera?",
        "answer": 5,
        "unit": "olhos",
        "fact": "Dois olhos compostos grandes e três ocelos simples no topo da cabeça.",
        "source": "Bee Research Lab"
      },
      {
        "id": "q168",
        "text": "Quantos estômagos tem um camelo?",
        "answer": 3,
        "unit": "câmaras",
        "fact": "Diferente de vacas, camelos têm 3 compartimentos estomacais.",
        "source": "Camelid Veterinary Journal"
      },
      {
        "id": "q203",
        "text": "Quantos corações tem um náutilo (molusco marinho)?",
        "answer": 4,
        "unit": "corações",
        "fact": "Possui um sistema circulatório singular.",
        "source": "Marine Biology Studies"
      },
      {
        "id": "q204",
        "text": "Quantos metros pode alcançar a envergadura das asas de um albatroz-viante?",
        "answer": 3,
        "unit": "metros",
        "fact": "A maior envergadura de asa entre as aves vivas.",
        "source": "BirdLife International"
      },
      {
        "id": "q205",
        "text": "Quantos dentes tem um urso-pardo?",
        "answer": 42,
        "unit": "dentes",
        "fact": "Mesmo número de dentes da maioria dos canídeos e ursídeos.",
        "source": "Wildlife Biology"
      },
      {
        "id": "q206",
        "text": "Quantas horas por dia um leão pode passar descansando ou dormindo?",
        "answer": 20,
        "unit": "horas",
        "fact": "Economizam energia para as caçadas noturnas.",
        "source": "African Wildlife Foundation"
      },
      {
        "id": "q207",
        "text": "Quantos quilos de carne um tigre adulto consegue comer em uma única refeição?",
        "answer": 30,
        "unit": "kg",
        "fact": "Podem ficar dias sem comer após uma grande refeição.",
        "source": "Save The Tiger Fund"
      },
      {
        "id": "q208",
        "text": "Quantos tentáculos tem uma água-viva-juba-de-leão em seus tufos?",
        "answer": 1200,
        "unit": "tentáculos",
        "fact": "É uma das maiores espécies de água-viva do planeta.",
        "source": "Oceana Org"
      },
      {
        "id": "q209",
        "text": "Quantos km/h pode nadar o peixe-vela, o peixe mais rápido do oceano?",
        "answer": 110,
        "unit": "km/h",
        "fact": "Sua nadadeira dorsal ajuda na hidrodinâmica em alta velocidade.",
        "source": "National Geographic Marine"
      },
      {
        "id": "q210",
        "text": "Quantos dias dura o período de incubação de um ovo de galinha?",
        "answer": 21,
        "unit": "dias",
        "fact": "Temperatura ideal de cerca de 37,5 °C.",
        "source": "Poultry Science Association"
      },
      {
        "id": "q211",
        "text": "Quantos pares de patas tem um camarão decápode?",
        "answer": 5,
        "unit": "pares",
        "fact": "Decápode significa literalmente 'dez pés'.",
        "source": "Crustacean Biology Journal"
      },
      {
        "id": "q212",
        "text": "Quantos metros de profundidade um cachalote pode mergulhar para caçar lulas gigantes?",
        "answer": 2000,
        "unit": "metros",
        "fact": "Consegue prender a respiração por mais de 90 minutos.",
        "source": "Whale and Dolphin Conservation"
      },
      {
        "id": "q253",
        "text": "Quantos dentes tem uma jaguatirica adulta?",
        "answer": 30,
        "unit": "dentes",
        "fact": "Dentição típica de felídeos carnívoros.",
        "source": "Mammal Species of the World"
      },
      {
        "id": "q254",
        "text": "Quantos quilos de comida um elefante-africano adulto consome por dia?",
        "answer": 150,
        "unit": "kg",
        "fact": "Podem passar até 18 horas por dia se alimentando.",
        "source": "WWF Africa"
      },
      {
        "id": "q255",
        "text": "Quantos metros de envergadura pode ter um condor-dos-andes?",
        "answer": 3,
        "unit": "metros",
        "fact": "Uma das maiores aves voadoras do mundo.",
        "source": "Andean Conservation Fund"
      },
      {
        "id": "q256",
        "text": "Quantas garras afiadas tem uma preguiça-de-três-dedos nas patas dianteiras?",
        "answer": 3,
        "unit": "garras",
        "fact": "Usadas para se pendurar com firmeza em galhos altos.",
        "source": "Sloth Conservation Foundation"
      },
      {
        "id": "q257",
        "text": "Quantas câmaras cardíacas possui o coração de um peixe?",
        "answer": 2,
        "unit": "câmaras",
        "fact": "Um átrio e um ventrículo.",
        "source": "Ichthyology Journal"
      },
      {
        "id": "q258",
        "text": "Quantos dias dura o período de gestação de um cachorro em média?",
        "answer": 63,
        "unit": "dias",
        "fact": "Pode variar entre 58 e 68 dias.",
        "source": "American Kennel Club"
      },
      {
        "id": "q259",
        "text": "Quantos mililitros de veneno uma cobra-rei consegue injetar em uma única picada?",
        "answer": 7,
        "unit": "ml",
        "fact": "Suficiente para matar um elefante adulto.",
        "source": "National Geographic Venom Studies"
      },
      {
        "id": "q260",
        "text": "Quantas penas primárias de voo uma águia-careca tem em cada asa?",
        "answer": 10,
        "unit": "penas",
        "fact": "Essenciais para o controle de voo e sustentação.",
        "source": "Raptor Center"
      },
      {
        "id": "q261",
        "text": "Quantas vezes o coração de um beija-flor bate por minuto em voo?",
        "answer": 1200,
        "unit": "bpm",
        "fact": "O coração responde por até 2,5% do seu peso corporal.",
        "source": "Ornithology Research"
      },
      {
        "id": "q262",
        "text": "Quantas pernas tem um escorpião?",
        "answer": 8,
        "unit": "patas",
        "fact": "Pertençam à classe dos aracnídeos assim como as aranhas.",
        "source": "Arachnology World"
      },
      {
        "id": "n24",
        "text": "Quantos ovos uma rainha cupim consegue pôr em um único dia?",
        "answer": 30000,
        "unit": "ovos",
        "fact": "Ela dedica toda a sua vida adulta exclusivamente à postura.",
        "source": "Entomology Research"
      },
      {
        "id": "n26",
        "text": "Quantas patas tem a centopeia recordista da espécie Illacme plenipes?",
        "answer": 750,
        "unit": "patas",
        "fact": "Apesar do nome 'centopeia', nenhuma espécie tem exatamente 100 patas.",
        "source": "ZooKeys Journal"
      },
      {
        "id": "n28",
        "text": "Quantas penas compõem a plumagem de um cisne-bravo em média?",
        "answer": 25000,
        "unit": "penas",
        "fact": "Mais de 80% dessas penas ficam localizadas na cabeça e pescoço.",
        "source": "Ornithology World"
      },
      {
        "id": "n30",
        "text": "Quantas formigas existem na Terra para cada ser humano (em milhões)?",
        "answer": 2,
        "unit": "milhões",
        "fact": "Estima-se que existam 20 quatrilhões de formigas no planeta.",
        "source": "PNAS Study"
      },
      {
        "id": "n38",
        "text": "Quantos quilos pode pesar a língua de uma baleia-azul adulta?",
        "answer": 2700,
        "unit": "kg",
        "fact": "Apenas a língua pesa o mesmo que um elefante adulto inteiro.",
        "source": "National Geographic Wildlife"
      },
      {
        "id": "n39",
        "text": "Quantos ovos uma tartaruga-de-pente põe em média a cada ninho na praia?",
        "answer": 150,
        "unit": "ovos",
        "fact": "Apenas 1 em cada 1000 filhotes consegue chegar à idade adulta.",
        "source": "Projeto Tamar"
      },
      {
        "id": "n42",
        "text": "Quantos quilos pesa em média o cérebro de um cachalote, o maior cérebro do planeta?",
        "answer": 8,
        "unit": "kg",
        "fact": "É cerca de 5 vezes mais pesado que o cérebro humano.",
        "source": "Smithsonian Marine"
      },
      {
        "id": "n43",
        "text": "Quantos quilômetros uma borboleta-monarca consegue voar na migração anual?",
        "answer": 4000,
        "unit": "km",
        "fact": "Elas voam do Canadá até as florestas do México todo outono.",
        "source": "Monarch Watch"
      },
      {
        "id": "n44",
        "text": "Quantas picadas de abelha seriam necessárias para matar um humano adulto por toxicidade direta?",
        "answer": 1000,
        "unit": "picadas",
        "fact": "Para pessoas sem alergia, o limite letal do veneno é cerca de 10 picadas por quilo.",
        "source": "USDA Bee Lab"
      },
      {
        "id": "n47",
        "text": "Quantos metros pode saltar um canguru-vermelho em um único pulo horizontal?",
        "answer": 9,
        "unit": "metros",
        "fact": "Eles podem alcançar velocidades de até 60 km/h aos pulos.",
        "source": "Australia Wildlife"
      },
      {
        "id": "n48",
        "text": "Quantas ventosas existem no total nos oito braços de um polvo-gigante-do-Pacífico?",
        "answer": 2200,
        "unit": "ventosas",
        "fact": "Cada ventosa tem receptores de paladar e capacidade de preensão forte.",
        "source": "Oceana Org"
      },
      {
        "id": "n49",
        "text": "Quantos quilos de krill uma baleia-azul consome por dia?",
        "answer": 4000,
        "unit": "kg",
        "fact": "Filtrados do oceano usando suas barbas de baleia.",
        "source": "WWF Ocean"
      },
      {
        "id": "n50",
        "text": "Quantas vezes por segundo uma mosca doméstica bate as asas?",
        "answer": 200,
        "unit": "vezes",
        "fact": "Produzindo o zumbido característico perto dos nossos ouvidos.",
        "source": "Entomological Society"
      },
      {
        "id": "n59",
        "text": "Quantos gramas pesa o menor pássaro do mundo, o beija-flor-abelha de Cuba?",
        "answer": 2,
        "unit": "g",
        "fact": "Mede menos de 6 centímetros do bico até a ponta da cauda.",
        "source": "BirdLife International"
      },
      {
        "id": "n60",
        "text": "Quantos dentes tem um crocodilo-do-nilo adulto em sua boca?",
        "answer": 68,
        "unit": "dentes",
        "fact": "Podem substituir seus dentes até 50 vezes ao longo da vida.",
        "source": "Crocodilian Biology"
      },
      {
        "id": "n61",
        "text": "Quantos quilômetros por hora corre um avestruz em velocidade sustentada?",
        "answer": 70,
        "unit": "km/h",
        "fact": "É a ave terrestre mais rápida do mundo e possui apenas dois dedos em cada pé.",
        "source": "National Geographic"
      }
    ]
  },
  {
    "id": "corpo",
    "title": "corpo humano",
    "tagline": "você é estranho por dentro",
    "premium": true,
    "icon": "heart",
    "tint": "#FFB59A",
    "questions": [
      {
        "id": "q2",
        "text": "Quantos ossos tem o corpo humano de um adulto?",
        "answer": 206,
        "unit": "ossos",
        "fact": "Bebês nascem com cerca de 270 ossos, mas muitos se fundem com o crescimento.",
        "source": "Anatomy & Physiology / Gray's Anatomy"
      },
      {
        "id": "q3",
        "text": "Quantos dentes tem uma pessoa adulta com a dentição completa?",
        "answer": 32,
        "unit": "dentes",
        "fact": "Inclui os 4 dentes do juízo (siso).",
        "source": "American Dental Association"
      },
      {
        "id": "q4",
        "text": "Quantos pares de costelas um ser humano normal possui?",
        "answer": 12,
        "unit": "pares",
        "fact": "Cerca de 1 em cada 200 pessoas nasce com uma costela extra.",
        "source": "Mayo Clinic"
      },
      {
        "id": "q5",
        "text": "Quantos batimentos por minuto é o ritmo cardíaco médio em repouso de um adulto?",
        "answer": 72,
        "unit": "bpm",
        "fact": "Atletas de alto rendimento podem ter frequência abaixo de 40 bpm.",
        "source": "American Heart Association"
      },
      {
        "id": "q6",
        "text": "Quantos ossos existem na mão humana, incluindo o pulso?",
        "answer": 27,
        "unit": "ossos",
        "fact": "São 8 no pulso, 5 na palma e 14 nos dedos.",
        "source": "American Society for Surgery of the Hand"
      },
      {
        "id": "q7",
        "text": "Quantos ossos existem em um único pé humano?",
        "answer": 26,
        "unit": "ossos",
        "fact": "Os dois pés juntos contêm um quarto de todos os ossos do corpo.",
        "source": "American Podiatric Medical Association"
      },
      {
        "id": "q8",
        "text": "Quantos litros de sangue um adulto médio tem no corpo?",
        "answer": 5,
        "unit": "litros",
        "fact": "Representa cerca de 7% a 8% do peso corporal total.",
        "source": "Red Cross Blood Services"
      },
      {
        "id": "q9",
        "text": "Quantos músculos existem no corpo humano?",
        "answer": 600,
        "unit": "músculos",
        "fact": "Exatamente entre 600 e 640 músculos esqueléticos nomeados.",
        "source": "Library of Congress / Human Anatomy"
      },
      {
        "id": "q10",
        "text": "Qual é o tempo médio de vida de uma hemácia (glóbulo vermelho) em dias?",
        "answer": 120,
        "unit": "dias",
        "fact": "O corpo produz cerca de 2 milhões de hemácias por segundo.",
        "source": "National Institutes of Health (NIH)"
      },
      {
        "id": "q11",
        "text": "Quantos cromossomos tem uma célula somática humana normal?",
        "answer": 46,
        "unit": "cromossomos",
        "fact": "Organizados em 23 pares.",
        "source": "National Human Genome Research Institute"
      },
      {
        "id": "q12",
        "text": "Quantas papilas gustativas um adulto humano tem em média na língua?",
        "answer": 10000,
        "unit": "papilas",
        "fact": "Elas se renovam a cada duas semanas.",
        "source": "NCBI / PubMed"
      },
      {
        "id": "q13",
        "text": "Quantas horas um ser humano pode passar acordado antes de ter alucinações severas no recorde de Randy Gardner?",
        "answer": 264,
        "unit": "horas",
        "fact": "Ele ficou 11 dias sem dormir em 1964.",
        "source": "Guinness World Records"
      },
      {
        "id": "q14",
        "text": "Quantos litros de saliva uma pessoa produz em média por dia?",
        "answer": 1,
        "unit": "litro",
        "fact": "Ao longo da vida, daria para encher duas piscinas.",
        "source": "Journal of Medicine"
      },
      {
        "id": "q15",
        "text": "Quantos % do cérebro humano é composto por água?",
        "answer": 73,
        "unit": "%",
        "fact": "E o cérebro consome 20% de toda a energia do corpo.",
        "source": "USGS Water Science School"
      },
      {
        "id": "q16",
        "text": "Quantos cílios temos em média na pálpebra superior?",
        "answer": 150,
        "unit": "cílios",
        "fact": "A pálpebra inferior tem cerca de metade disso.",
        "source": "American Academy of Ophthalmology"
      },
      {
        "id": "q17",
        "text": "Quantos quilômetros de vasos sanguíneos existem no corpo humano adulto?",
        "answer": 100000,
        "unit": "km",
        "fact": "Suficiente para dar mais de duas voltas na Terra.",
        "source": "National Geographic / Human Body"
      },
      {
        "id": "q18",
        "text": "Quantos elementos químicos principais compõem 99% da massa do corpo humano?",
        "answer": 6,
        "unit": "elementos",
        "fact": "Oxigênio, carbono, hidrogênio, nitrogênio, cálcio e fósforo.",
        "source": "American Chemical Society"
      },
      {
        "id": "q110",
        "text": "Quantos litros de ar um ser humano respira em média por dia?",
        "answer": 11000,
        "unit": "litros",
        "fact": "Inspiramos e expiramos cerca de 20.000 vezes ao dia.",
        "source": "EPA Indoor Air Quality"
      },
      {
        "id": "q111",
        "text": "Quantos fios de cabelo existem em média no couro cabeludo humano?",
        "answer": 100000,
        "unit": "fios",
        "fact": "Loiros costumam ter mais fios e ruivos menos.",
        "source": "American Academy of Dermatology"
      },
      {
        "id": "q112",
        "text": "Quantos gramas pesa o cérebro humano adulto em média?",
        "answer": 1400,
        "unit": "g",
        "fact": "Representa cerca de 2% do peso corporal.",
        "source": "Brain Facts / Neuroscience"
      },
      {
        "id": "q113",
        "text": "Quantos mililitros de lágrimas um humano produz por ano em média?",
        "answer": 100,
        "unit": "ml",
        "fact": "Mesmo sem chorar, os olhos produzem lágrimas para lubrificação.",
        "source": "Ophthalmology Times"
      },
      {
        "id": "q116",
        "text": "Quantos segundos o cérebro humano pode sobreviver sem oxigênio antes de ter danos irreversíveis?",
        "answer": 180,
        "unit": "segundos",
        "fact": "Cerca de 3 a 5 minutos sem oxigenação.",
        "source": "Red Cross First Aid"
      },
      {
        "id": "q117",
        "text": "Quantas vezes piscamos os olhos por minuto em média?",
        "answer": 15,
        "unit": "vezes",
        "fact": "Usando telas piscamos menos da metade disso.",
        "source": "Vision Council"
      },
      {
        "id": "q118",
        "text": "Quantos gramas pesa o coração de um adulto médio?",
        "answer": 300,
        "unit": "g",
        "fact": "Tem aproximadamente o tamanho de um punho fechado.",
        "source": "American Heart Association"
      },
      {
        "id": "q119",
        "text": "Quantos metros de comprimento tem o intestino delgado de um adulto?",
        "answer": 6,
        "unit": "metros",
        "fact": "Apesar de fino, é super dobrado para absorver nutrientes.",
        "source": "Gastroenterology Journal"
      },
      {
        "id": "q120",
        "text": "Quantos metros de comprimento tem o intestino grosso humano?",
        "answer": 2,
        "unit": "metros",
        "fact": "É mais curto que o delgado, mas muito mais largo.",
        "source": "Digestive Health Foundation"
      },
      {
        "id": "q121",
        "text": "Quantos batimentos o coração humano realiza em média em um dia?",
        "answer": 100000,
        "unit": "batimentos",
        "fact": "Mais de 35 milhões de batimentos por ano.",
        "source": "Cardiology Today"
      },
      {
        "id": "q122",
        "text": "Quantas glândulas sudoríparas uma pessoa tem em média no corpo?",
        "answer": 3000000,
        "unit": "glândulas",
        "fact": "A maior concentração fica nas solas dos pés e palmas.",
        "source": "Dermatology Research"
      },
      {
        "id": "q123",
        "text": "Quantos dias leva para a camada superficial da pele se renovar completamente?",
        "answer": 28,
        "unit": "dias",
        "fact": "Perdemos milhares de células mortas por minuto.",
        "source": "Skin Health Institute"
      },
      {
        "id": "q151",
        "text": "Quantos ossos tem a coluna vertebral de um adulto humano?",
        "answer": 26,
        "unit": "ossos",
        "fact": "São 24 vértebras isoladas mais o sacro e o cóccix.",
        "source": "Spine Health Org"
      },
      {
        "id": "q152",
        "text": "Quantos litros de sangue o coração bombeia por dia em média?",
        "answer": 7500,
        "unit": "litros",
        "fact": "Trabalho contínuo sem nunca parar de bater.",
        "source": "Texas Heart Institute"
      },
      {
        "id": "q153",
        "text": "Quantos % do corpo humano adulto é composto por água em média?",
        "answer": 60,
        "unit": "%",
        "fact": "Bebês chegam a ter até 75% de água.",
        "source": "USGS Water Science"
      },
      {
        "id": "q154",
        "text": "Quantas costelas flutuantes uma pessoa tem no total?",
        "answer": 4,
        "unit": "costelas",
        "fact": "São dois pares de costelas que não se prendem ao esterno.",
        "source": "Anatomy Online"
      },
      {
        "id": "q155",
        "text": "Quantos mililitros de ar entram nos pulmões numa respiração normal em repouso?",
        "answer": 500,
        "unit": "ml",
        "fact": "Conhecido como volume corrente pulmonar.",
        "source": "Respiratory Medicine"
      },
      {
        "id": "q156",
        "text": "Quantos ossos compõem o crânio humano adulto (incluindo a face)?",
        "answer": 22,
        "unit": "ossos",
        "fact": "Divididos em 8 ossos cranianos e 14 faciais.",
        "source": "Gray's Anatomy"
      },
      {
        "id": "q157",
        "text": "Quantas horas dura em média a digestão completa de uma refeição no estômago?",
        "answer": 4,
        "unit": "horas",
        "fact": "Varia conforme a quantidade de gordura e fibra.",
        "source": "Mayo Clinic Gastroenterology"
      },
      {
        "id": "q158",
        "text": "Quantos poros existem na pele humana aproximadamente?",
        "answer": 5000000,
        "unit": "poros",
        "fact": "Ajudam a regular a temperatura eliminando suor.",
        "source": "Dermatology World"
      },
      {
        "id": "q159",
        "text": "Quantos milissegundos dura um piscar de olhos humano em média?",
        "answer": 100,
        "unit": "ms",
        "fact": "Pode durar entre 100 e 400 milissegundos.",
        "source": "NIH Neuroscience"
      },
      {
        "id": "q213",
        "text": "Quantos ossos compõem a caixa torácica humana?",
        "answer": 25,
        "unit": "ossos",
        "fact": "São 24 costelas e 1 osso esterno.",
        "source": "Human Anatomy Foundation"
      },
      {
        "id": "q214",
        "text": "Quantas válvulas tem o coração humano?",
        "answer": 4,
        "unit": "válvulas",
        "fact": "Tricúspide, pulmonar, mitral e aórtica.",
        "source": "American Heart Association"
      },
      {
        "id": "q215",
        "text": "Quantos gramas pesa cada rim de um adulto saudável em média?",
        "answer": 150,
        "unit": "g",
        "fact": "Filtram cerca de 180 litros de sangue por dia.",
        "source": "National Kidney Foundation"
      },
      {
        "id": "q216",
        "text": "Quantos furos de duto lacrimal existem nos olhos humanos (nos cantos internos)?",
        "answer": 4,
        "unit": "pontos lacrimais",
        "fact": "Dois na pálpebra superior e dois na inferior.",
        "source": "Ophthalmology Association"
      },
      {
        "id": "q217",
        "text": "Quantas vezes o olho humano pisca por dia em média?",
        "answer": 19000,
        "unit": "vezes",
        "fact": "Piscar limpa e lubrifica a superfície ocular.",
        "source": "Vision Research Council"
      },
      {
        "id": "q218",
        "text": "Quantas unhas de dedos das mãos e pés um humano possui?",
        "answer": 20,
        "unit": "unhas",
        "fact": "A unha da mão cresce cerca de 3 mm por mês.",
        "source": "Dermatology Association"
      },
      {
        "id": "q219",
        "text": "Quantos litros de ar cabem na capacidade pulmonar total de um adulto médio?",
        "answer": 6,
        "unit": "litros",
        "fact": "Pode variar bastante com porte físico e treino esportivo.",
        "source": "American Thoracic Society"
      },
      {
        "id": "q220",
        "text": "Quantos ossos tem o tornozelo humano (ossos do tarso)?",
        "answer": 7,
        "unit": "ossos",
        "fact": "Inclui o tálus e o calcâneo (calcanhar).",
        "source": "Foot & Ankle Society"
      },
      {
        "id": "q221",
        "text": "Quantas cavidades (ventrículos e átrios) dividem o coração humano?",
        "answer": 4,
        "unit": "cavidades",
        "fact": "Dois átrios e dois ventrículos.",
        "source": "Cardiology Health"
      },
      {
        "id": "q222",
        "text": "Quantos neurônios estima-se que existam no cérebro humano em bilhões?",
        "answer": 86,
        "unit": "bilhões",
        "fact": "Conectados por trilhões de sinapses.",
        "source": "Frontiers in Human Neuroscience"
      },
      {
        "id": "q264",
        "text": "Quantas glândulas salivares maiores o corpo humano possui?",
        "answer": 6,
        "unit": "glândulas",
        "fact": "Três pares: parótidas, submandibulares e sublinguais.",
        "source": "ENT Health Organization"
      },
      {
        "id": "q266",
        "text": "Quantas costelas verdadeiras (presas diretamente ao esterno) o ser humano tem?",
        "answer": 14,
        "unit": "costelas",
        "fact": "Sete pares de costelas verdadeiras.",
        "source": "Anatomy & Physiology"
      },
      {
        "id": "q267",
        "text": "Quantos dentes de leite (decíduos) nasce no total em uma criança?",
        "answer": 20,
        "unit": "dentes",
        "fact": "Dez na arcada superior e dez na inferior.",
        "source": "American Academy of Pediatric Dentistry"
      },
      {
        "id": "q268",
        "text": "Quantas pálpebras tem o olho humano?",
        "answer": 2,
        "unit": "pálpebras",
        "fact": "A superior e a inferior.",
        "source": "Ophthalmology Basics"
      },
      {
        "id": "q269",
        "text": "Quantos % da energia do corpo o cérebro humano consome?",
        "answer": 20,
        "unit": "%",
        "fact": "Apesar de ter apenas cerca de 2% da massa corporal.",
        "source": "Neuroscience Today"
      },
      {
        "id": "q270",
        "text": "Quantos centímetros de comprimento tem o esôfago de um adulto?",
        "answer": 25,
        "unit": "cm",
        "fact": "Conecta a faringe ao estômago.",
        "source": "Gastroenterology Basics"
      },
      {
        "id": "q271",
        "text": "Quantos cromossomos sexuais tem uma célula somática humana?",
        "answer": 2,
        "unit": "cromossomos",
        "fact": "XX em mulheres e XY em homens.",
        "source": "Genetics Learning Center"
      },
      {
        "id": "n65",
        "text": "Quantos litros de saliva uma pessoa produz em média ao longo da vida?",
        "answer": 25000,
        "unit": "litros",
        "fact": "Quantidade suficiente para encher duas piscinas olímpicas inteiras.",
        "source": "Journal of Medicine"
      },
      {
        "id": "n69",
        "text": "Quantas células mortas da pele o corpo humano elimina por minuto?",
        "answer": 30000,
        "unit": "células",
        "fact": "Essas células formam a maior parte da poeira que se acumula nas casas.",
        "source": "Skin Health Institute"
      },
      {
        "id": "n94",
        "text": "Quantos mililitros de suor as solas dos pés humanos podem produzir por dia?",
        "answer": 500,
        "unit": "ml",
        "fact": "Os pés contêm cerca de 250 mil glândulas sudoríparas.",
        "source": "American Podiatric Medical Association"
      }
    ]
  },
  {
    "id": "internet",
    "title": "internet",
    "tagline": "cronicamente online",
    "premium": true,
    "icon": "cursor",
    "tint": "#B9C8FF",
    "questions": [
      {
        "id": "q52",
        "text": "Em que ano o YouTube foi criado?",
        "answer": 2005,
        "unit": "ano",
        "fact": "O primeiro vídeo enviado foi 'Me at the zoo' em abril de 2005.",
        "source": "YouTube Press / Google"
      },
      {
        "id": "q53",
        "text": "Em que ano o Instagram foi lançado no iOS?",
        "answer": 2010,
        "unit": "ano",
        "fact": "Criado por Kevin Systrom e Mike Krieger.",
        "source": "Instagram Blog"
      },
      {
        "id": "q54",
        "text": "Quantos caracteres era o limite original de um tweet no Twitter?",
        "answer": 140,
        "unit": "caracteres",
        "fact": "Inspirado no limite de 160 caracteres das mensagens SMS.",
        "source": "Twitter / X Corp History"
      },
      {
        "id": "q55",
        "text": "Em que ano o filme 'Matrix' foi lançado nos cinemas?",
        "answer": 1999,
        "unit": "ano",
        "fact": "Revolucionou os efeitos visuais com o efeito 'bullet time'.",
        "source": "IMDb"
      },
      {
        "id": "q56",
        "text": "Quantos episódios no total tem a série de animação 'Chaves' (El Chavo del Ocho)?",
        "answer": 312,
        "unit": "episódios",
        "fact": "Exibido originalmente entre 1973 e 1980.",
        "source": "Televisa / Grupo Chespirito"
      },
      {
        "id": "q57",
        "text": "Em que ano o aplicativo TikTok foi lançado globalmente fora da China?",
        "answer": 2017,
        "unit": "ano",
        "fact": "Surgiu da fusão com o Musical.ly em 2018.",
        "source": "ByteDance Corporate"
      },
      {
        "id": "q58",
        "text": "Quantos filmes da franquia principal 'Harry Potter' foram lançados nos cinemas?",
        "answer": 8,
        "unit": "filmes",
        "fact": "O último livro foi dividido em duas partes no cinema.",
        "source": "Warner Bros Pictures"
      },
      {
        "id": "q59",
        "text": "Em que ano o Facebook passou a se chamar Meta?",
        "answer": 2021,
        "unit": "ano",
        "fact": "Mark Zuckerberg anunciou a mudança em outubro de 2021.",
        "source": "Meta Newsroom"
      },
      {
        "id": "q60",
        "text": "Quantos episódios tem a primeira temporada da série 'Stranger Things'?",
        "answer": 8,
        "unit": "episódios",
        "fact": "Lançada na Netflix em julho de 2016.",
        "source": "Netflix Press"
      },
      {
        "id": "q61",
        "text": "Em que ano o primeiro iPhone foi anunciado por Steve Jobs?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Foi apresentado no Macworld em 9 de janeiro de 2007.",
        "source": "Apple Newsroom"
      },
      {
        "id": "q62",
        "text": "Quantas temporadas durou a série 'Game of Thrones'?",
        "answer": 8,
        "unit": "temporadas",
        "fact": "Com um total de 73 episódios exibidos pela HBO.",
        "source": "HBO Official"
      },
      {
        "id": "q63",
        "text": "Em que ano foi lançado o jogo Minecraft na sua versão alfa pública?",
        "answer": 2009,
        "unit": "ano",
        "fact": "Criado por Markus 'Notch' Persson.",
        "source": "Mojang Studios"
      },
      {
        "id": "q64",
        "text": "Quantos botões de ação frontais principais tem um controle de PlayStation 5 (Sem D-Pad e sem bumpers)?",
        "answer": 4,
        "unit": "botões",
        "fact": "Triângulo, Círculo, X e Quadrado.",
        "source": "PlayStation Support"
      },
      {
        "id": "q65",
        "text": "Em que ano foi postado o meme do 'Gato Nyan' (Nyan Cat)?",
        "answer": 2011,
        "unit": "ano",
        "fact": "Um gato espacial em pixels voando com rastro de arco-íris.",
        "source": "Know Your Meme"
      },
      {
        "id": "q124",
        "text": "Em que ano foi enviado o primeiro e-mail da história por Ray Tomlinson?",
        "answer": 1971,
        "unit": "ano",
        "fact": "Ele usou o símbolo '@' para separar o usuário da máquina.",
        "source": "Computer History Museum"
      },
      {
        "id": "q125",
        "text": "Em que ano foi criado o protocolo World Wide Web (WWW) por Tim Berners-Lee?",
        "answer": 1989,
        "unit": "ano",
        "fact": "Proposto enquanto ele trabalhava no CERN.",
        "source": "CERN Official History"
      },
      {
        "id": "q126",
        "text": "Quantas curtidas teve a famosa foto do 'ovo do Instagram' (world_record_egg)?",
        "answer": 60000000,
        "unit": "curtidas",
        "fact": "Bateu o recorde mundial do Instagram em 2019.",
        "source": "Guinness World Records"
      },
      {
        "id": "q127",
        "text": "Em que ano a Wikipédia em inglês foi lançada oficialmente?",
        "answer": 2001,
        "unit": "ano",
        "fact": "Fundada por Jimmy Wales e Larry Sanger.",
        "source": "Wikimedia Foundation"
      },
      {
        "id": "q128",
        "text": "Em que ano o jogo 'Pokémon GO' foi lançado provocando correria nas ruas?",
        "answer": 2016,
        "unit": "ano",
        "fact": "Alcançou mais de 500 milhões de downloads no primeiro ano.",
        "source": "Niantic Labs"
      },
      {
        "id": "q130",
        "text": "Em que ano o WhatsApp foi vendido para o Facebook por US$ 19 bilhões?",
        "answer": 2014,
        "unit": "ano",
        "fact": "Uma das maiores aquisições de tecnologia da história.",
        "source": "Forbes Tech"
      },
      {
        "id": "q131",
        "text": "Quantos episódios foram lançados na série 'The Office' americana?",
        "answer": 201,
        "unit": "episódios",
        "fact": "Exibida ao longo de 9 temporadas.",
        "source": "NBC Universal"
      },
      {
        "id": "q132",
        "text": "Em que ano o Spotify foi lançado originalmente na Suécia?",
        "answer": 2008,
        "unit": "ano",
        "fact": "Revolucionou a indústria da música por streaming.",
        "source": "Spotify Newsroom"
      },
      {
        "id": "q133",
        "text": "Quantos GB de armazenamento gratuito o Google Drive oferece por padrão em uma conta?",
        "answer": 15,
        "unit": "GB",
        "fact": "Compartilhado entre Gmail, Photos e Drive.",
        "source": "Google Support"
      },
      {
        "id": "q134",
        "text": "Em que ano foi lançado o clássico jogo 'Super Mario Bros' para o Famicom/NES?",
        "answer": 1985,
        "unit": "ano",
        "fact": "Criado por Shigeru Miyamoto.",
        "source": "Nintendo Official History"
      },
      {
        "id": "q135",
        "text": "Quantos minutos dura o vídeo clipe oficial mais visto de 'Gangnam Style'?",
        "answer": 4,
        "unit": "minutos",
        "fact": "Primeiro vídeo do YouTube a alcançar 1 bilhão de visualizações.",
        "source": "YouTube Charts"
      },
      {
        "id": "q136",
        "text": "Em que ano o Twitter mudou oficialmente de nome para 'X'?",
        "answer": 2023,
        "unit": "ano",
        "fact": "Mudança promovida após a compra por Elon Musk.",
        "source": "X Corp Press"
      },
      {
        "id": "q178",
        "text": "Em que ano a Wikipédia em português foi criada?",
        "answer": 2001,
        "unit": "ano",
        "fact": "Poucos meses após a versão original em inglês.",
        "source": "Wikimedia Brasil"
      },
      {
        "id": "q179",
        "text": "Quantas horas de vídeo são enviadas ao YouTube a cada minuto?",
        "answer": 500,
        "unit": "horas",
        "fact": "São mais de 500 horas de conteúdo enviadas por minuto.",
        "source": "YouTube Press"
      },
      {
        "id": "q180",
        "text": "Em que ano foi lançado o primeiro filme do 'Homem de Ferro' dando início ao UCM?",
        "answer": 2008,
        "unit": "ano",
        "fact": "Estrelado por Robert Downey Jr.",
        "source": "Marvel Studios"
      },
      {
        "id": "q181",
        "text": "Quantas temporadas tem a série 'Friends'?",
        "answer": 10,
        "unit": "temporadas",
        "fact": "Totalizando 236 episódios exibidos entre 1994 e 2004.",
        "source": "Warner Bros Television"
      },
      {
        "id": "q182",
        "text": "Em que ano o jogo 'League of Legends' (LoL) foi lançado?",
        "answer": 2009,
        "unit": "ano",
        "fact": "Desenvolvido e publicado pela Riot Games.",
        "source": "Riot Games Press"
      },
      {
        "id": "q183",
        "text": "Quantos episódios tem o anime 'Dragon Ball Z' na contagem original japonesa?",
        "answer": 291,
        "unit": "episódios",
        "fact": "Exibido originalmente entre 1989 e 1996.",
        "source": "Toei Animation"
      },
      {
        "id": "q184",
        "text": "Em que ano a Netflix começou seu serviço de streaming de vídeo?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Antes disso a empresa entregava DVDs pelo correio.",
        "source": "Netflix Investor Relations"
      },
      {
        "id": "q185",
        "text": "Quantos botões de atalho tem um mouse comum de computador?",
        "answer": 3,
        "unit": "botões",
        "fact": "Esquerdo, direito e a roda de rolagem (scroll/clique).",
        "source": "Tech Specs Hardware"
      },
      {
        "id": "q223",
        "text": "Em que ano o jogo 'GTA V' foi lançado originalmente para PS3 e Xbox 360?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Tornou-se um dos produtos de entretenimento mais lucrativos da história.",
        "source": "Rockstar Games"
      },
      {
        "id": "q224",
        "text": "Quantos episódios foram produzidos na série 'Breaking Bad'?",
        "answer": 62,
        "unit": "episódios",
        "fact": "Aclamada criticamente ao longo de 5 temporadas.",
        "source": "AMC / Sony Pictures"
      },
      {
        "id": "q225",
        "text": "Em que ano foi lançado o primeiro filme da franquia 'Star Wars' (Episódio IV)?",
        "answer": 1977,
        "unit": "ano",
        "fact": "Dirigido por George Lucas.",
        "source": "Lucasfilm / Disney"
      },
      {
        "id": "q226",
        "text": "Quantas temporadas tem a série comédia 'The Big Bang Theory'?",
        "answer": 12,
        "unit": "temporadas",
        "fact": "Teve um total de 279 episódios.",
        "source": "CBS Studios"
      },
      {
        "id": "q227",
        "text": "Em que ano foi lançado o console PlayStation 1 no Japão?",
        "answer": 1994,
        "unit": "ano",
        "fact": "Lançado em 3 de dezembro de 1994 pela Sony.",
        "source": "Sony Interactive Entertainment"
      },
      {
        "id": "q228",
        "text": "Quantas músicas compõem o álbum 'Thriller' do Michael Jackson?",
        "answer": 9,
        "unit": "faixas",
        "fact": "O álbum mais vendido de todos os tempos.",
        "source": "Sony Music / Epic Records"
      },
      {
        "id": "q229",
        "text": "Em que ano o aplicativo WhatsApp foi lançado originalmente?",
        "answer": 2009,
        "unit": "ano",
        "fact": "Criado por Jan Koum e Brian Acton.",
        "source": "WhatsApp / Meta"
      },
      {
        "id": "q230",
        "text": "Quantos minutos tem o filme 'O Senhor dos Anéis: O Retorno do Rei' na versão de cinema?",
        "answer": 201,
        "unit": "minutos",
        "fact": "Ganhou 11 estatuetas do Oscar.",
        "source": "New Line Cinema"
      },
      {
        "id": "q231",
        "text": "Em que ano foi fundado o site da Amazon por Jeff Bezos?",
        "answer": 1994,
        "unit": "ano",
        "fact": "Começou como uma livraria online em uma garagem.",
        "source": "Amazon Corporate"
      },
      {
        "id": "q273",
        "text": "Em que ano foi lançado o primeiro filme da trilogia 'O Senhor dos Anéis'?",
        "answer": 2001,
        "unit": "ano",
        "fact": "'A Sociedade do Anel' estreou em dezembro de 2001.",
        "source": "IMDb / New Line"
      },
      {
        "id": "q274",
        "text": "Quantos episódios tem a série animada 'Avatar: A Lenda de Aang'?",
        "answer": 61,
        "unit": "episódios",
        "fact": "Dividida em 3 livros (Água, Terra e Fogo).",
        "source": "Nickelodeon Animation"
      },
      {
        "id": "q275",
        "text": "Em que ano foi lançado o jogo 'Tetris' pelo programador Alexey Pajitnov?",
        "answer": 1984,
        "unit": "ano",
        "fact": "Desenvolvido na União Soviética.",
        "source": "Tetris Holding"
      },
      {
        "id": "q276",
        "text": "Quantas temporadas tem a série 'Lost'?",
        "answer": 6,
        "unit": "temporadas",
        "fact": "Teve 121 episódios exibidos pela ABC.",
        "source": "ABC Network"
      },
      {
        "id": "q277",
        "text": "Em que ano o Spotify ultrapassou 500 milhões de usuários ativos mensais?",
        "answer": 2023,
        "unit": "ano",
        "fact": "Atingido no primeiro trimestre de 2023.",
        "source": "Spotify Financial Reports"
      },
      {
        "id": "q278",
        "text": "Quantas faixas compõem o famoso 'Abbey Road' dos Beatles?",
        "answer": 17,
        "unit": "faixas",
        "fact": "Lançado em 1969 com a famosa foto da faixa de pedestres.",
        "source": "Apple Records"
      },
      {
        "id": "q279",
        "text": "Em que ano foi lançado o primeiro console Xbox da Microsoft?",
        "answer": 2001,
        "unit": "ano",
        "fact": "Lançado na América do Norte em novembro de 2001.",
        "source": "Microsoft Xbox History"
      },
      {
        "id": "q280",
        "text": "Quantos filmes da saga 'Vingadores' foram lançados no cinema pela Marvel?",
        "answer": 4,
        "unit": "filmes",
        "fact": "Vingadores, Era de Ultron, Guerra Infinita e Ultimato.",
        "source": "Marvel Studios"
      },
      {
        "id": "q281",
        "text": "Em que ano foi publicado o primeiro post do blog WordPress?",
        "answer": 2003,
        "unit": "ano",
        "fact": "Criado por Matt Mullenweg e Mike Little.",
        "source": "WordPress Org"
      },
      {
        "id": "q282",
        "text": "Quantas vidas iniciais um jogador recebe na maioria dos jogos clássicos do Mario?",
        "answer": 3,
        "unit": "vidas",
        "fact": "Representadas por cogumelos verdes de 1UP.",
        "source": "Nintendo History"
      },
      {
        "id": "n144",
        "text": "Quantos bilhões de dólares o Facebook pagou para comprar o WhatsApp?",
        "answer": 19,
        "unit": "bilhões",
        "fact": "Uma das maiores aquisições da história da tecnologia.",
        "source": "Forbes Tech"
      },
      {
        "id": "n145",
        "text": "Quantos blocos no total formam a altura máxima do mapa no Minecraft?",
        "answer": 384,
        "unit": "blocos",
        "fact": "Do limite inferior da rocha-mãe até o topo do céu.",
        "source": "Mojang Studios"
      },
      {
        "id": "n153",
        "text": "Quantos Pokémons faziam parte da Primeira Geração original (Kanto)?",
        "answer": 151,
        "unit": "Pokémon",
        "fact": "De Bulbasaur (#001) até o secreto Mew (#151).",
        "source": "The Pokémon Company"
      },
      {
        "id": "n155",
        "text": "Quantas joias do infinito existem nos quadrinhos e filmes da Marvel?",
        "answer": 6,
        "unit": "joias",
        "fact": "Espaço, Mente, Realidade, Poder, Tempo e Alma.",
        "source": "Marvel Comics"
      },
      {
        "id": "n157",
        "text": "Quantos cavaleiros de ouro protegem as casas do zodíaco em 'Os Cavaleiros do Zodíaco'?",
        "answer": 12,
        "unit": "cavaleiros",
        "fact": "Um cavaleiro para cada signo do zodíaco tradicional.",
        "source": "Toei Animation"
      },
      {
        "id": "n158",
        "text": "Quantos capítulos tem o mangá original de 'Dragon Ball' de Akira Toriyama?",
        "answer": 519,
        "unit": "capítulos",
        "fact": "Publicado na revista Weekly Shōnen Jump.",
        "source": "Shueisha"
      },
      {
        "id": "n159",
        "text": "Quantos troféus 'Bola de Ouro' Lionel Messi conquistou na carreira?",
        "answer": 8,
        "unit": "troféus",
        "fact": "Recordista absoluto do prêmio concedido pela France Football.",
        "source": "France Football"
      },
      {
        "id": "n164",
        "text": "Quantos lutadores jogáveis existiam em 'Street Fighter II' de 1991?",
        "answer": 8,
        "unit": "lutadores",
        "fact": "Ryu, Ken, Chun-Li, Guile, Blanka, Dhalsim, Zangief e E. Honda.",
        "source": "Capcom"
      },
      {
        "id": "n172",
        "text": "Quantas cores formavam o logotipo original do Google?",
        "answer": 4,
        "unit": "cores",
        "fact": "Azul, vermelho, amarelo e verde.",
        "source": "Google Design Specs"
      },
      {
        "id": "n173",
        "text": "Quantos fantasmas perseguem o Pac-Man no jogo arcade original?",
        "answer": 4,
        "unit": "fantasmas",
        "fact": "Blinky (vermelho), Pinky (rosa), Inky (azul) e Clyde (laranja).",
        "source": "Bandai Namco"
      },
      {
        "id": "n175",
        "text": "Quantas gerações de Pokémon existem no universo principal dos jogos até a IX?",
        "answer": 9,
        "unit": "gerações",
        "fact": "Contando mais de 1000 espécies diferentes de criaturas.",
        "source": "The Pokémon Company"
      },
      {
        "id": "n181",
        "text": "Quantos episódios foram produzidos para a minissérie 'Chernobyl' da HBO?",
        "answer": 5,
        "unit": "episódios",
        "fact": "Uma das minisséries de maior nota da história do IMDb.",
        "source": "HBO"
      }
    ]
  },
  {
    "id": "comida",
    "title": "comida & bebida",
    "tagline": "a mesa também mente",
    "premium": true,
    "isNew": true,
    "icon": "cup",
    "tint": "#FFE08A",
    "questions": [
      {
        "id": "n182",
        "text": "Quantas calorias tem 1 grama de gordura pura?",
        "answer": 9,
        "unit": "kcal",
        "fact": "Carboidratos e proteínas possuem 4 kcal por grama.",
        "source": "FAO / OMS"
      },
      {
        "id": "n183",
        "text": "Quantos litros de leite são necessários para produzir apenas 1 kg de queijo parmesão duro?",
        "answer": 16,
        "unit": "litros",
        "fact": "Devido à baixa umidade e longo processo de maturação.",
        "source": "Consorzio Parmigiano"
      },
      {
        "id": "n186",
        "text": "Quantos gramas de açúcar tem uma lata tradicional de Coca-Cola de 350 ml?",
        "answer": 37,
        "unit": "g",
        "fact": "O equivalente a cerca de 7 colheres de chá cheias de açúcar.",
        "source": "Nutritional Labeling"
      },
      {
        "id": "n187",
        "text": "Quantas sementes (favas) existem dentro de um fruto de cacau médio?",
        "answer": 40,
        "unit": "sementes",
        "fact": "Variando normalmente entre 30 e 50 sementes envoltas em polpa.",
        "source": "World Cocoa Foundation"
      },
      {
        "id": "n188",
        "text": "Quantos graus de teor alcoólico mínimo tem a cachaça tradicional brasileira segundo a lei?",
        "answer": 38,
        "unit": "%",
        "fact": "A cachaça deve ter entre 38% e 48% de teor alcoólico em volume.",
        "source": "MAPA Brasil"
      },
      {
        "id": "n190",
        "text": "Quantos mililitros de espresso concentrado são servidos em uma xícara individual padrão?",
        "answer": 30,
        "unit": "ml",
        "fact": "Um café espresso simples curto utiliza entre 25 ml e 30 ml de água.",
        "source": "Specialty Coffee Association"
      },
      {
        "id": "n191",
        "text": "Quantas uvas são necessárias aproximadamente para produzir uma garrafa de vinho de 750 ml?",
        "answer": 600,
        "unit": "uvas",
        "fact": "Aproximadamente 1 kg a 1,2 kg de uvas de colheita.",
        "source": "American Journal of Enology"
      },
      {
        "id": "n192",
        "text": "Quantos litros de cerveja cabem em um barril comercial de chopp padrão no Brasil?",
        "answer": 50,
        "unit": "litros",
        "fact": "O barril de 50 litros é o tamanho mais utilizado em bares.",
        "source": "ABRABE"
      },
      {
        "id": "n194",
        "text": "Quantos quilos de café verde são contidos em uma saca padrão de exportação no Brasil?",
        "answer": 60,
        "unit": "kg",
        "fact": "A saca de 60 kg é a medida oficial do mercado global.",
        "source": "Cecafé"
      },
      {
        "id": "n195",
        "text": "Quantas colheres de sopa cabem em 1 xícara de chá padrão de culinária?",
        "answer": 16,
        "unit": "colheres",
        "fact": "Padrão das tabelas internacionais de medidas caseiras.",
        "source": "Gastronomy Standards"
      },
      {
        "id": "n196",
        "text": "Quantos mililitros de tequila são usados no preparo tradicional do coquetel Margarita?",
        "answer": 50,
        "unit": "ml",
        "fact": "Acompanhado de 20 ml de licor de laranja e suco de limão.",
        "source": "IBA Bartenders"
      },
      {
        "id": "n197",
        "text": "Quantas dobras teóricas possui o chapéu tradicional de um chef de cozinha (Toque Blanche)?",
        "answer": 100,
        "unit": "dobras",
        "fact": "Simbolizava as 100 maneiras diferentes de se preparar um ovo.",
        "source": "Culinary History Institute"
      },
      {
        "id": "n198",
        "text": "Quantos gramas de sal por litro de água são recomendados para cozinhar macarrão perfeitamente?",
        "answer": 10,
        "unit": "g",
        "fact": "Regra clássica italiana: 100g de massa, 1 litro de água e 10g de sal.",
        "source": "Accademia Italiana della Cucina"
      },
      {
        "id": "n199",
        "text": "Quantas fatias tem uma pizza grande tradicional cortada em pizzarias brasileiras?",
        "answer": 8,
        "unit": "fatias",
        "fact": "Padrão de corte para pizzas de 35 cm de diâmetro.",
        "source": "Associação de Pizzarias Unidas"
      },
      {
        "id": "n200",
        "text": "Quantos gramas de proteína tem em média um ovo de galinha grande?",
        "answer": 6,
        "unit": "g",
        "fact": "Distribuídos entre a clara e a gema do ovo.",
        "source": "USDA FoodData"
      },
      {
        "id": "n201",
        "text": "Quantos mililitros tem uma lata de refrigerante tradicional no padrão brasileiro?",
        "answer": 350,
        "unit": "ml",
        "fact": "O volume clássico das latas de alumínio no Brasil.",
        "source": "ABIR"
      },
      {
        "id": "n202",
        "text": "Quantos ingredientes compõem a receita do molho Pesto tradicional genovês?",
        "answer": 7,
        "unit": "ingredientes",
        "fact": "Manjericão, azeite, pinoli, alho, parmesão, pecorino e sal.",
        "source": "Consorzio Pesto Genovese"
      },
      {
        "id": "n203",
        "text": "Quantos minutos um ovo leva para cozinhar com a gema totalmente dura em água fervente?",
        "answer": 10,
        "unit": "minutos",
        "fact": "Com 6 minutos a gema fica cremosa e líquida por dentro.",
        "source": "Culinary Science"
      },
      {
        "id": "n204",
        "text": "Quantos mililitros de cerveja cabem em um 'Pint' de copo britânico tradicional?",
        "answer": 568,
        "unit": "ml",
        "fact": "Diferente do pint americano que possui 473 ml.",
        "source": "UK Weights and Measures"
      },
      {
        "id": "n205",
        "text": "Quantas calorias possui 1 colher de sopa de azeite de oliva puro?",
        "answer": 120,
        "unit": "kcal",
        "fact": "O azeite de oliva é uma fonte concentrada de gorduras saudáveis.",
        "source": "Nutritional Facts"
      },
      {
        "id": "n206",
        "text": "Quantos quilos de chocolate o país da Suíça consome por pessoa ao ano (o recordista mundial)?",
        "answer": 10,
        "unit": "kg",
        "fact": "O maior consumo per capita de chocolate do planeta.",
        "source": "Chocosuisse"
      },
      {
        "id": "n208",
        "text": "Quantos ml de uísque contêm uma dose padrão (shot) em bares no Reino Unido?",
        "answer": 25,
        "unit": "ml",
        "fact": "Medida oficial regulamentada por lei no Reino Unido.",
        "source": "UK Licensing Act"
      },
      {
        "id": "n209",
        "text": "Quantos dias um queijo Parmigiano-Reggiano precisa maturar no mínimo para ser vendido?",
        "answer": 365,
        "unit": "dias",
        "fact": "Exatamente 12 meses de maturação mínima obrigatória.",
        "source": "Consorzio del Formaggio"
      },
      {
        "id": "n210",
        "text": "Quantos gramas de café moído são recomendados para preparar uma xícara de 200 ml?",
        "answer": 12,
        "unit": "g",
        "fact": "Proporção padrão de 60g de café para 1 litro de água.",
        "source": "Specialty Coffee Association"
      },
      {
        "id": "n211",
        "text": "Quantos litros de cerveja são consumidos por ano por pessoa na Chéquia (líder mundial)?",
        "answer": 140,
        "unit": "litros",
        "fact": "A Chéquia lidera o consumo per capita global de cerveja há décadas.",
        "source": "Kirin Beer Report"
      },
      {
        "id": "n215",
        "text": "Quantas colheres de chá equivalem a 1 colher de sopa de ingrediente líquido?",
        "answer": 3,
        "unit": "colheres",
        "fact": "Medida padrão das receitas de culinária.",
        "source": "Gastronomy Guide"
      },
      {
        "id": "n217",
        "text": "Quantos ml tem uma garrafa de champanhe no tamanho 'Magnum'?",
        "answer": 1500,
        "unit": "ml",
        "fact": "O equivalente a exatamente duas garrafas normais de 750 ml.",
        "source": "Comité Champagne"
      },
      {
        "id": "n219",
        "text": "Quantas calorias tem uma maçã média com casca?",
        "answer": 95,
        "unit": "kcal",
        "fact": "Rica em fibras e frutose natural.",
        "source": "USDA"
      }
    ]
  },
  {
    "id": "esporte",
    "title": "esporte & velocidade",
    "tagline": "pra quem acha que entende de regra",
    "premium": true,
    "isNew": true,
    "icon": "bolt",
    "tint": "#A8E6FF",
    "questions": [
      {
        "id": "n223",
        "text": "Quantos títulos mundiais de Fórmula 1 o piloto Michael Schumacher conquistou?",
        "answer": 7,
        "unit": "títulos",
        "fact": "Empatado com Lewis Hamilton no recorde mundial de títulos.",
        "source": "Formula 1 Official"
      },
      {
        "id": "n225",
        "text": "Quantos metros mede a extensão de uma pista de atletismo oficial em volta do campo?",
        "answer": 400,
        "unit": "metros",
        "fact": "A Raia 1 mede exatamente 400 metros na linha de medição.",
        "source": "World Athletics"
      },
      {
        "id": "n227",
        "text": "Quantas jardas mede um campo de futebol americano da NFL de trave a trave?",
        "answer": 120,
        "unit": "jardas",
        "fact": "100 jardas de campo de jogo mais 10 jardas em cada endzone.",
        "source": "NFL Official Rules"
      },
      {
        "id": "n228",
        "text": "Quantas bolas no total são usadas na mesa em uma partida de sinuca/snooker tradicional?",
        "answer": 22,
        "unit": "bolas",
        "fact": "15 vermelhas, 6 coloridas e 1 bola branca de tacada.",
        "source": "World Snooker Federation"
      },
      {
        "id": "n229",
        "text": "Quantas voltas os carros dão na famosa corrida das 500 Milhas de Indianápolis (Indy 500)?",
        "answer": 200,
        "unit": "voltas",
        "fact": "Realizadas no circuito oval de 2,5 milhas de extensão.",
        "source": "IndyCar Official"
      },
      {
        "id": "n230",
        "text": "Quantos pontos vale um try no jogo de rugby union?",
        "answer": 5,
        "unit": "pontos",
        "fact": "A conversão logo após o try vale mais 2 pontos.",
        "source": "World Rugby"
      },
      {
        "id": "n231",
        "text": "Quantos sets um jogador precisa vencer para ganhar um jogo de tênis masculino num Grand Slam?",
        "answer": 3,
        "unit": "sets",
        "fact": "Disputado no sistema de 'melhor de 5 sets'.",
        "source": "ITF Tennis"
      },
      {
        "id": "n234",
        "text": "Quantos jogadores formam uma equipe titular em uma partida de vôlei de quadra?",
        "answer": 6,
        "unit": "jogadores",
        "fact": "Cada time mantém 6 atletas em quadra.",
        "source": "FIVB Rules"
      },
      {
        "id": "n235",
        "text": "Quantas grandes voltas (Grand Tours) do ciclismo mundial existem por ano na Europa?",
        "answer": 3,
        "unit": "voltas",
        "fact": "Tour de France, Giro d'Italia e Vuelta a España.",
        "source": "UCI Cycling"
      },
      {
        "id": "n236",
        "text": "Quantos centímetros de altura tem a rede de vôlei masculino adulto oficial?",
        "answer": 243,
        "unit": "cm",
        "fact": "A altura exata é de 2,43 metros.",
        "source": "FIVB Rules"
      },
      {
        "id": "n237",
        "text": "Quantos cartões amarelos aplicados ao mesmo jogador em um jogo resultam em expulsão?",
        "answer": 2,
        "unit": "cartões",
        "fact": "O segundo cartão amarelo gera automaticamente o cartão vermelho.",
        "source": "IFAB"
      },
      {
        "id": "n238",
        "text": "Quantos árbitros no total compõem a equipe de arbitragem de quadra na NBA?",
        "answer": 3,
        "unit": "árbitros",
        "fact": "Três juízes de quadra trabalham juntos nas partidas.",
        "source": "NBA Rules"
      },
      {
        "id": "n239",
        "text": "Quantos centímetros acima do chão fica o aro da cesta de basquete oficial?",
        "answer": 305,
        "unit": "cm",
        "fact": "A altura oficial fixada pela FIBA e NBA é de 3,05 metros.",
        "source": "FIBA / NBA"
      },
      {
        "id": "n240",
        "text": "Quantas voltas os carros dão no GP de Mônaco de Fórmula 1 em Monte Carlo?",
        "answer": 78,
        "unit": "voltas",
        "fact": "O GP mais lento e desafiador do calendário da F1.",
        "source": "Formula 1"
      },
      {
        "id": "n241",
        "text": "Quantos pontos vale um arremesso de basquete feito antes da linha de três pontos?",
        "answer": 2,
        "unit": "pontos",
        "fact": "Arremessos normais valem 2 pontos e lances livres valem 1 ponto.",
        "source": "FIBA"
      },
      {
        "id": "n243",
        "text": "Quantos jogadores formam um time de polo aquático na piscina?",
        "answer": 7,
        "unit": "jogadores",
        "fact": "6 jogadores de linha e 1 goleiro por equipe.",
        "source": "World Aquatics"
      },
      {
        "id": "n244",
        "text": "Quantas jardas um time de futebol americano precisa avançar para conseguir um 'first down'?",
        "answer": 10,
        "unit": "jardas",
        "fact": "Tem 4 tentativas (downs) para conquistar a distância.",
        "source": "NFL"
      },
      {
        "id": "n245",
        "text": "Quantos segundos dura a posse de bola no ataque no basquete da NBA (relógio de ataque)?",
        "answer": 24,
        "unit": "segundos",
        "fact": "Se não arremessar em 24 segundos, perde a posse de bola.",
        "source": "NBA Rules"
      },
      {
        "id": "n246",
        "text": "Quantos substitutos um técnico de futebol pode usar em partidas oficiais segundo a regra pós-pandemia?",
        "answer": 5,
        "unit": "substituições",
        "fact": "Realizadas em no máximo 3 paradas do jogo.",
        "source": "IFAB"
      },
      {
        "id": "n247",
        "text": "Quantas rodadas são disputadas no Campeonato Brasileiro da Série A (pontos corridos)?",
        "answer": 38,
        "unit": "rodadas",
        "fact": "20 times jogam entre si em turno e returno.",
        "source": "CBF"
      },
      {
        "id": "n248",
        "text": "Quantos metros de distância fica a marca do tiro livre direto no futsal (após 5 faltas acumuladas)?",
        "answer": 10,
        "unit": "metros",
        "fact": "Cobrado sem barreira diretamente contra o goleiro.",
        "source": "FIFA Futsal"
      },
      {
        "id": "n249",
        "text": "Quantos milímetros de diâmetro tem uma bola de tênis de mesa (pingue-pongue) oficial?",
        "answer": 40,
        "unit": "mm",
        "fact": "Aumentada de 38 mm para 40 mm para desacelerar o jogo.",
        "source": "ITTF"
      },
      {
        "id": "n251",
        "text": "Quantos cavalos de potência (CV) possui um carro moderno de Fórmula 1 com motor híbrido?",
        "answer": 1000,
        "unit": "cv",
        "fact": "Combinando o motor V6 turbo e os motores elétricos MGU-K/MGU-H.",
        "source": "Formula 1 Tech"
      },
      {
        "id": "n252",
        "text": "Quantos minutos duram cada um dos 4 períodos (quarters) em um jogo de basquete da NBA?",
        "answer": 12,
        "unit": "minutos",
        "fact": "Totalizando 48 minutos de tempo regulamentar.",
        "source": "NBA"
      },
      {
        "id": "n253",
        "text": "Quantas estatuetas do Oscar o boxeador Rocky Balboa inspirou para a franquia de filmes?",
        "answer": 3,
        "unit": "oscars",
        "fact": "O primeiro filme de 1976 venceu Melhor Filme, Direção e Montagem.",
        "source": "Academy Awards"
      },
      {
        "id": "n254",
        "text": "Quantos metros tem a distância do tiro de pênalti até a linha do gol no futebol?",
        "answer": 11,
        "unit": "metros",
        "fact": "Conhecido também como a 'marca dos 11 metros'.",
        "source": "IFAB"
      },
      {
        "id": "n255",
        "text": "Quantos buracos compõem uma rodada completa em um campo de golfe padrão?",
        "answer": 18,
        "unit": "buracos",
        "fact": "Os jogadores percorrem o circuito completando todos os buracos.",
        "source": "USGA"
      },
      {
        "id": "n256",
        "text": "Quantos segundos dura uma contagem de nocaute dada pelo árbitro no boxe?",
        "answer": 10,
        "unit": "segundos",
        "fact": "Se o lutador não se levantar em 10 segundos, a luta encerra.",
        "source": "WBC Boxing"
      },
      {
        "id": "n259",
        "text": "Quantos jurados compõem a banca de notas nas finais de surfe da WSL?",
        "answer": 5,
        "unit": "juízes",
        "fact": "As notas mais alta e mais baixa são descartadas.",
        "source": "WSL Surf"
      },
      {
        "id": "n260",
        "text": "Quantos quilos pesa a barra olímpica masculina de levantamento de peso sem as anilhas?",
        "answer": 20,
        "unit": "kg",
        "fact": "A barra feminina pesa 15 kg.",
        "source": "IWF Weightlifting"
      },
      {
        "id": "n261",
        "text": "Quantos atletas compõem uma equipe de revezamento no atletismo (4x100m)?",
        "answer": 4,
        "unit": "atletas",
        "fact": "Cada um corre um trecho de 100 metros passando o bastão.",
        "source": "World Athletics"
      }
    ]
  },
  {
    "id": "ciencia",
    "title": "ciência & espaço",
    "tagline": "o universo é grande demais",
    "premium": true,
    "isNew": true,
    "icon": "planet",
    "tint": "#D9C8FF",
    "questions": [
      {
        "id": "n262",
        "text": "Quantos dias a Terra leva para dar uma volta completa ao redor do Sol (ano sideral)?",
        "answer": 365,
        "unit": "dias",
        "fact": "Exatamente 365,24 dias, motivo pelo qual temos os anos bissextos.",
        "source": "NASA Astronomy"
      },
      {
        "id": "n269",
        "text": "Quantos graus Celsius abaixo de zero é a temperatura do Zero Absoluto em Celsius?",
        "answer": 273,
        "unit": "graus",
        "fact": "Exatamente -273,15 °C (0 Kelvin), onde os átomos param de se mover.",
        "source": "NIST Thermodynamics"
      },
      {
        "id": "n270",
        "text": "Quantos astronautas compõem a tripulação habitual da Estação Espacial Internacional (ISS)?",
        "answer": 7,
        "unit": "astronautas",
        "fact": "Podendo aumentar temporariamente durante trocas de missões.",
        "source": "NASA ISS"
      },
      {
        "id": "n271",
        "text": "Quantos quilômetros por hora a Estação Espacial Internacional viaja ao redor da Terra?",
        "answer": 27600,
        "unit": "km/h",
        "fact": "Ela dá uma volta completa no planeta Terra a cada 90 minutos.",
        "source": "NASA Orbit Specs"
      },
      {
        "id": "n272",
        "text": "Quantos planetas no Sistema Solar possuem anéis (gigantes gasosos)?",
        "answer": 4,
        "unit": "planetas",
        "fact": "Saturno, Júpiter, Urano e Netuno possuem sistemas de anéis.",
        "source": "NASA Planetary"
      },
      {
        "id": "n273",
        "text": "Quantos mililitros de água cabem em exatamente 1 quilograma de água pura?",
        "answer": 1000,
        "unit": "ml",
        "fact": "A densidade da água é de exatamente 1 g/cm³ a 4 °C.",
        "source": "Physics Standards"
      },
      {
        "id": "n274",
        "text": "Quantas horas dura o dia no planeta Júpiter (a rotação mais rápida do Sistema Solar)?",
        "answer": 10,
        "unit": "horas",
        "fact": "Júpiter completa uma rotação no próprio eixo em apenas 9 horas e 55 minutos.",
        "source": "NASA Space Facts"
      },
      {
        "id": "n275",
        "text": "Quantos % da massa de todo o Sistema Solar está concentrada apenas no Sol?",
        "answer": 99,
        "unit": "%",
        "fact": "O Sol representa cerca de 99,86% de toda a massa do sistema solar.",
        "source": "NASA Solar Physics"
      },
      {
        "id": "n276",
        "text": "Quantos dias o planeta Mercúrio leva para completar uma volta ao redor do Sol?",
        "answer": 88,
        "unit": "dias",
        "fact": "Por ser o planeta mais próximo do Sol, possui o ano mais curto.",
        "source": "NASA Planetary"
      },
      {
        "id": "n277",
        "text": "Quantas pessoas já pisaram na superfície da Lua em toda a história da humanidade?",
        "answer": 12,
        "unit": "pessoas",
        "fact": "Todas durante o programa Apollo da NASA entre 1969 e 1972.",
        "source": "NASA History"
      },
      {
        "id": "n278",
        "text": "Quantos quilos de rochas e amostras lunares as missões Apollo trouxeram para a Terra?",
        "answer": 382,
        "unit": "kg",
        "fact": "Coletadas durante as seis missões que pousaram na superfície da Lua.",
        "source": "NASA Lunar Curator"
      },
      {
        "id": "n279",
        "text": "Quantos anos-luz de distância fica a estrela mais próxima do Sol (Próxima Centauri)?",
        "answer": 4,
        "unit": "anos-luz",
        "fact": "Aproximadamente 4,24 anos-luz de distância da Terra.",
        "source": "ESA Astronomy"
      },
      {
        "id": "n280",
        "text": "Quantos satélites naturais (luas) orbitam o planeta Marte?",
        "answer": 2,
        "unit": "luas",
        "fact": "Fobos e Deimos, duas luas pequenas e de formato irregular.",
        "source": "NASA Mars Exploration"
      },
      {
        "id": "n281",
        "text": "Quantos quilômetros de diâmetro tem a Lua, o satélite natural da Terra?",
        "answer": 3474,
        "unit": "km",
        "fact": "Cerca de um quarto do diâmetro do planeta Terra.",
        "source": "NASA Moon Sheet"
      },
      {
        "id": "n282",
        "text": "Quantos anos dura uma rotação do Sol ao redor do centro da galáxia (ano galáctico em milhões)?",
        "answer": 230,
        "unit": "milhões",
        "fact": "Tempo que o Sistema Solar leva para dar uma volta na Via Láctea.",
        "source": "ESA Galaxy Facts"
      },
      {
        "id": "n283",
        "text": "Quantos por cento da atmosfera da Terra é composta por gás Nitrogênio?",
        "answer": 78,
        "unit": "%",
        "fact": "O Oxigênio representa cerca de 21% da atmosfera.",
        "source": "NOAA Atmosphere"
      },
      {
        "id": "n285",
        "text": "Quantos quilômetros de altura tem o Monte Olimpo em Marte, a maior montanha do Sistema Solar?",
        "answer": 21,
        "unit": "km",
        "fact": "Tem quase três vezes a altura do Monte Everest.",
        "source": "NASA Planetary Geology"
      },
      {
        "id": "n286",
        "text": "Quantas faces da Lua são visíveis da Terra devido ao acoplamento de maré?",
        "answer": 1,
        "unit": "face",
        "fact": "A Lua leva o mesmo tempo para girar sobre si mesma e ao redor da Terra.",
        "source": "NASA Moon"
      },
      {
        "id": "n287",
        "text": "Quantos segundos a luz da Lua leva para chegar até os nossos olhos na Terra?",
        "answer": 1,
        "unit": "segundo",
        "fact": "Leva cerca de 1,3 segundo para percorrer os 384.000 km.",
        "source": "NASA Lunar Facts"
      },
      {
        "id": "n288",
        "text": "Quantos % do Universo visível é composto por matéria normal (átomos)?",
        "answer": 5,
        "unit": "%",
        "fact": "O restante (95%) é composto por Matéria Escura e Energia Escura.",
        "source": "CERN Physics"
      },
      {
        "id": "n289",
        "text": "Quantos prótons existem no núcleo de um único átomo de Ouro?",
        "answer": 79,
        "unit": "prótons",
        "fact": "O número atômico do ouro na Tabela Periódica é 79.",
        "source": "IUPAC Chemistry"
      },
      {
        "id": "n290",
        "text": "Quantas dimensões espaciais percebemos no nosso dia a dia?",
        "answer": 3,
        "unit": "dimensões",
        "fact": "Comprimento, largura e altura (mais o tempo como 4ª dimensão).",
        "source": "Physics Basics"
      },
      {
        "id": "n292",
        "text": "Quantos gramas pesa 1 litro de água pura à temperatura ambiente?",
        "answer": 1000,
        "unit": "g",
        "fact": "1 litro de água equivale a exatamente 1 quilo.",
        "source": "Physical Constants"
      },
      {
        "id": "n294",
        "text": "Quantos % da água de todo o planeta Terra é salgada e fica nos oceanos?",
        "answer": 97,
        "unit": "%",
        "fact": "Apenas cerca de 3% da água da Terra é água doce.",
        "source": "USGS Water Science"
      },
      {
        "id": "n295",
        "text": "Quantos dias um astronauta do recorde mundial (Valeri Polyakov) passou no espaço direto?",
        "answer": 437,
        "unit": "dias",
        "fact": "Passou mais de 14 meses contínuos a bordo da estação espacial Mir.",
        "source": "Roscosmos / Guinness"
      },
      {
        "id": "n296",
        "text": "Quantos telescópios compuseram a rede Event Horizon Telescope para fotografar um buraco negro?",
        "answer": 8,
        "unit": "telescópios",
        "fact": "Telescópios espalhados pelo mundo funcionando como um telescópio gigante.",
        "source": "EHT Collaboration"
      },
      {
        "id": "n297",
        "text": "Quantos espelhos hexagonais formam o espelho primário do Telescópio Espacial James Webb?",
        "answer": 18,
        "unit": "espelhos",
        "fact": "Banhados a ouro para refletir luz infravermelha.",
        "source": "NASA JWST"
      },
      {
        "id": "n298",
        "text": "Quantos graus Celsius de temperatura média faz na superfície do planeta Vênus?",
        "answer": 465,
        "unit": "graus",
        "fact": "É o planeta mais quente do Sistema Solar devido ao efeito estufa denso.",
        "source": "NASA Venus Sheet"
      },
      {
        "id": "n299",
        "text": "Quantos prótons possui o átomo de Hidrogênio, o elemento mais abundante do Universo?",
        "answer": 1,
        "unit": "próton",
        "fact": "É o elemento mais simples da Tabela Periódica.",
        "source": "IUPAC"
      },
      {
        "id": "n300",
        "text": "Quantas constelações oficiais são reconhecidas pela União Astronômica Internacional?",
        "answer": 88,
        "unit": "constelações",
        "fact": "Mapeando todo o céu noturno do hemisfério norte e sul.",
        "source": "IAU Astronomy"
      },
      {
        "id": "n301",
        "text": "Quantos quilômetros por hora a Terra gira em torno de si mesma na Linha do Equador?",
        "answer": 1670,
        "unit": "km/h",
        "fact": "Velocidade de rotação da superfície terrestre.",
        "source": "NASA Earth Facts"
      }
    ]
  }
];

export function packById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

/** Nome do pacote de uma pergunta (vira o chip de categoria). */
export function packTitleOf(questionId: string): string {
  return PACKS.find((p) => p.questions.some((x) => x.id === questionId))?.title ?? 'aleatório';
}
