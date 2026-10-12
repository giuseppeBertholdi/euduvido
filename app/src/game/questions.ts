// GERADO por scripts/import-questions.mjs a partir de content/*.csv. Não edite aqui: edite o CSV (ou EXCLUDE/FIX no script).
export type Question = { id: string; text: string; answer: number; unit: string; fact?: string; source?: string };

export type Pack = {
  id: string;
  title: string;
  tagline: string;
  premium: boolean;
  isNew?: boolean;
  /** Ícone (ver `src/components/Icon.tsx`) e cor do pacote. */
  icon: 'bulb' | 'brasil' | 'paw' | 'heart' | 'cursor' | 'cup' | 'bolt' | 'planet' | 'ball' | 'cassette' | 'meme' | 'pepper' | 'tv' | 'note' | 'money' | 'globe';
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
        "id": "q138",
        "text": "Em que ano ocorreu a queda da Bastilha na Revolução Francesa?",
        "answer": 1789,
        "unit": "ano",
        "fact": "Aconteceu em 14 de julho de 1789.",
        "source": "French National Archives"
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
        "id": "q148",
        "text": "Em que ano foi lançada a nota de 200 reais no Brasil?",
        "answer": 2020,
        "unit": "ano",
        "fact": "Traz o lobo-guará estampado no verso.",
        "source": "Banco Central do Brasil"
      },
      {
        "id": "q150",
        "text": "Em que ano o Vesúvio soterrou a cidade de Pompeia?",
        "answer": 79,
        "unit": "ano",
        "fact": "Destruiu as cidades de Pompeia e Herculano na Itália.",
        "source": "Archaeological Park of Pompeii"
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
        "id": "q190",
        "text": "Em que ano Colombo chegou às Américas?",
        "answer": 1492,
        "unit": "ano",
        "fact": "Desembarcou na ilha de Guanahani em outubro.",
        "source": "History Channel"
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
        "id": "q237",
        "text": "Em que ano ocorreu a Revolução Russa que derrubou o Czar?",
        "answer": 1917,
        "unit": "ano",
        "fact": "Conhecida pelas fases de Fevereiro e Outubro.",
        "source": "Russian History Archives"
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
        "id": "q286",
        "text": "Quantos quilômetros tem uma maratona oficial?",
        "answer": 42,
        "unit": "km",
        "fact": "Exatamente 42,195 quilômetros.",
        "source": "World Athletics"
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
      },
      {
        "id": "d244",
        "text": "Em que ano a população mundial chegou a 8 bilhões de pessoas?",
        "answer": 2022,
        "unit": "ano",
        "fact": "Em 1800 o mundo tinha só 1 bilhão.",
        "source": "ONU"
      },
      {
        "id": "d245",
        "text": "Em que ano antes de Cristo Cleópatra morreu?",
        "answer": 30,
        "unit": "a.C.",
        "fact": "Ela viveu mais perto da invenção do iPhone do que da construção das pirâmides.",
        "source": "Britannica"
      },
      {
        "id": "d246",
        "text": "Quantos metros de comprimento tinha o Titanic?",
        "answer": 269,
        "unit": "metros",
        "fact": "Quase três campos de futebol enfileirados.",
        "source": "Encyclopedia Titanica"
      },
      {
        "id": "d247",
        "text": "Em que ano os destroços do Titanic foram encontrados?",
        "answer": 1985,
        "unit": "ano",
        "fact": "73 anos depois do naufrágio.",
        "source": "Woods Hole Oceanographic Institution"
      },
      {
        "id": "d248",
        "text": "A quantos metros de profundidade estão os destroços do Titanic?",
        "answer": 3800,
        "unit": "metros",
        "fact": "A pressão lá embaixo é quase 400 vezes a da superfície.",
        "source": "NOAA"
      },
      {
        "id": "d249",
        "text": "Quantos centímetros de altura tinha Napoleão?",
        "answer": 169,
        "unit": "cm",
        "fact": "Era altura normal pra época: a fama de baixinho veio da propaganda inglesa.",
        "source": "Britannica"
      },
      {
        "id": "d250",
        "text": "Quantos dias durou a missão Apollo 11, da decolagem à volta?",
        "answer": 8,
        "unit": "dias",
        "fact": "Os astronautas ficaram 21 dias de quarentena na volta.",
        "source": "NASA"
      },
      {
        "id": "d251",
        "text": "Quantos centímetros de altura tem a Mona Lisa?",
        "answer": 77,
        "unit": "cm",
        "fact": "É bem menor do que quase todo mundo imagina.",
        "source": "Museu do Louvre"
      },
      {
        "id": "d252",
        "text": "Quantas letras tem o alfabeto havaiano?",
        "answer": 13,
        "unit": "letras",
        "fact": "Por isso as palavras repetem tanto: \"humuhumunukunukuapua'a\".",
        "source": "Universidade do Havaí"
      },
      {
        "id": "d253",
        "text": "Quantas letras tem o alfabeto da língua portuguesa hoje?",
        "answer": 26,
        "unit": "letras",
        "fact": "K, W e Y voltaram com o Acordo Ortográfico de 2009.",
        "source": "Acordo Ortográfico de 1990"
      },
      {
        "id": "d254",
        "text": "Em que ano Graham Bell patenteou o telefone?",
        "answer": 1876,
        "unit": "ano",
        "fact": "Muitos atribuem a invenção ao italiano Antonio Meucci.",
        "source": "Escritório de Patentes dos EUA"
      },
      {
        "id": "d255",
        "text": "Em que ano Edison patenteou a lâmpada elétrica?",
        "answer": 1879,
        "unit": "ano",
        "fact": "Ele testou milhares de filamentos, até bambu.",
        "source": "Escritório de Patentes dos EUA"
      },
      {
        "id": "d256",
        "text": "Em que ano Karl Benz patenteou o primeiro carro a gasolina?",
        "answer": 1886,
        "unit": "ano",
        "fact": "A esposa dele fez a primeira viagem longa, sem avisar.",
        "source": "Mercedes-Benz"
      },
      {
        "id": "d257",
        "text": "Em que ano os irmãos Wright fizeram o primeiro voo de avião?",
        "answer": 1903,
        "unit": "ano",
        "fact": "Três anos antes do 14-Bis de Santos Dumont. A briga segue até hoje.",
        "source": "Smithsonian"
      },
      {
        "id": "d258",
        "text": "Em que ano caiu o Império Romano do Ocidente?",
        "answer": 476,
        "unit": "ano",
        "fact": "O Império do Oriente durou mais mil anos.",
        "source": "Britannica"
      },
      {
        "id": "d259",
        "text": "Quantos anos viveu Jeanne Calment, a pessoa mais velha já registrada?",
        "answer": 122,
        "unit": "anos",
        "fact": "Ela conheceu Van Gogh quando era adolescente.",
        "source": "Guinness World Records"
      },
      {
        "id": "d260",
        "text": "Quantos quilos pesou Jon Brower Minnoch, o homem mais pesado já registrado?",
        "answer": 635,
        "unit": "kg",
        "fact": "Precisaram de 13 pessoas pra virá-lo na cama do hospital.",
        "source": "Guinness World Records"
      },
      {
        "id": "d261",
        "text": "Quantos centímetros tinha Robert Wadlow, o homem mais alto da história?",
        "answer": 272,
        "unit": "cm",
        "fact": "Ainda estava crescendo quando morreu, aos 22 anos.",
        "source": "Guinness World Records"
      },
      {
        "id": "d262",
        "text": "Em que ano o Brasil aboliu a escravidão?",
        "answer": 1888,
        "unit": "ano",
        "fact": "Foi o último país das Américas a fazer isso.",
        "source": "Lei Áurea"
      },
      {
        "id": "d263",
        "text": "Desde que ano está acesa a lâmpada mais antiga do mundo, num quartel de bombeiros na Califórnia?",
        "answer": 1901,
        "unit": "ano",
        "fact": "Tem até webcam pra provar que continua acesa.",
        "source": "Guinness World Records"
      },
      {
        "id": "d264",
        "text": "Quantas toneladas pesa uma nuvem comum (cúmulo)?",
        "answer": 500,
        "unit": "toneladas",
        "fact": "Ela flutua porque essa água está espalhada em gotinhas minúsculas.",
        "source": "USGS"
      },
      {
        "id": "d265",
        "text": "Quantos anos levaria pra contar até 1 bilhão, um número por segundo, sem parar?",
        "answer": 32,
        "unit": "anos",
        "fact": "Até 1 milhão, seriam só 12 dias.",
        "source": "cálculo: 1 bilhão de segundos"
      },
      {
        "id": "d266",
        "text": "Quantos metros tem a árvore mais alta do mundo, a sequoia Hyperion?",
        "answer": 116,
        "unit": "metros",
        "fact": "A localização é mantida em segredo pra protegê-la.",
        "source": "Parque Nacional Redwood"
      },
      {
        "id": "d267",
        "text": "Quantos países tem a África?",
        "answer": 54,
        "unit": "países",
        "fact": "É o continente com mais países.",
        "source": "ONU"
      },
      {
        "id": "d268",
        "text": "Quantos países tem a América do Sul?",
        "answer": 12,
        "unit": "países",
        "fact": "A Guiana Francesa não conta: é território da França.",
        "source": "ONU"
      },
      {
        "id": "d269",
        "text": "Em que ano o Post-it chegou às lojas?",
        "answer": 1980,
        "unit": "ano",
        "fact": "Nasceu de uma cola que \"deu errado\" por ser fraca demais.",
        "source": "3M"
      },
      {
        "id": "d270",
        "text": "Em que ano a calça jeans foi patenteada?",
        "answer": 1873,
        "unit": "ano",
        "fact": "Era roupa de trabalho para mineiros.",
        "source": "Levi Strauss & Co."
      },
      {
        "id": "d271",
        "text": "Quantos graus a Torre de Pisa está inclinada hoje (aproximadamente)?",
        "answer": 4,
        "unit": "graus",
        "fact": "Já chegou a 5,5 graus antes da obra que a \"endireitou\".",
        "source": "Opera della Primaziale Pisana"
      },
      {
        "id": "d272",
        "text": "Quantos minutos durou o voo de Yuri Gagarin, o primeiro ser humano no espaço?",
        "answer": 108,
        "unit": "minutos",
        "fact": "Deu uma volta inteira na Terra.",
        "source": "Roscosmos"
      },
      {
        "id": "d273",
        "text": "Em que ano foi disputada a primeira Copa do Mundo?",
        "answer": 1930,
        "unit": "ano",
        "fact": "No Uruguai, que também foi o campeão.",
        "source": "FIFA"
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
        "id": "q91",
        "text": "Em que ano Carmen Miranda nasceu?",
        "answer": 1909,
        "unit": "ano",
        "fact": "Nasceu em Portugal e veio para o Brasil com menos de 1 ano.",
        "source": "Museu Carmen Miranda"
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
        "text": "Em que ano foi lançado o Cruzeiro Real, a moeda que veio antes do Real?",
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
      },
      {
        "id": "d135",
        "text": "Quantos metros de altura tem o Pão de Açúcar?",
        "answer": 396,
        "unit": "metros",
        "fact": "O bondinho é de 1912.",
        "source": "Parque Bondinho Pão de Açúcar"
      },
      {
        "id": "d136",
        "text": "Quantos dias durou a viagem de Cabral de Lisboa até o Brasil?",
        "answer": 44,
        "unit": "dias",
        "fact": "Saiu em 9 de março e avistou terra em 22 de abril de 1500.",
        "source": "Carta de Pero Vaz de Caminha"
      },
      {
        "id": "d137",
        "text": "Por quantos anos o Brasil foi um império?",
        "answer": 67,
        "unit": "anos",
        "fact": "De 1822 a 1889.",
        "source": "história do Brasil"
      },
      {
        "id": "d138",
        "text": "Quantos quilômetros de litoral tem o Brasil?",
        "answer": 7367,
        "unit": "km",
        "fact": "Contando as reentrâncias, passa de 9 mil.",
        "source": "IBGE"
      },
      {
        "id": "d139",
        "text": "Quantos países fazem fronteira com o Brasil?",
        "answer": 10,
        "unit": "países",
        "fact": "Só Chile e Equador não fazem, na América do Sul.",
        "source": "IBGE"
      },
      {
        "id": "d140",
        "text": "Quantos habitantes tem Serra da Saudade (MG), a menor cidade do Brasil?",
        "answer": 833,
        "unit": "habitantes",
        "fact": "Censo de 2022.",
        "source": "IBGE, Censo 2022"
      },
      {
        "id": "d141",
        "text": "Quantos km² tem Altamira (PA), o maior município do Brasil?",
        "answer": 159533,
        "unit": "km²",
        "fact": "É maior que países como Portugal e Grécia.",
        "source": "IBGE"
      },
      {
        "id": "d142",
        "text": "Quantas línguas indígenas são faladas no Brasil?",
        "answer": 295,
        "unit": "línguas",
        "fact": "Faladas por 391 povos, segundo o Censo de 2022.",
        "source": "IBGE, Censo 2022"
      },
      {
        "id": "d143",
        "text": "Em quantos meses Brasília foi construída?",
        "answer": 41,
        "unit": "meses",
        "fact": "Inaugurada em 21 de abril de 1960.",
        "source": "Arquivo Público do DF"
      },
      {
        "id": "d144",
        "text": "Em que ano a capital do Brasil deixou de ser Salvador?",
        "answer": 1763,
        "unit": "ano",
        "fact": "Foi para o Rio de Janeiro.",
        "source": "história do Brasil"
      },
      {
        "id": "d145",
        "text": "Com quantos anos Dom Pedro II virou imperador de fato?",
        "answer": 14,
        "unit": "anos",
        "fact": "O \"Golpe da Maioridade\" adiantou a coroação.",
        "source": "história do Brasil"
      },
      {
        "id": "d146",
        "text": "Quantos anos Dom Pedro I tinha quando proclamou a Independência?",
        "answer": 23,
        "unit": "anos",
        "fact": "Nasceu em 1798, em Portugal.",
        "source": "história do Brasil"
      },
      {
        "id": "d147",
        "text": "Quantos anos durou a ditadura militar no Brasil?",
        "answer": 21,
        "unit": "anos",
        "fact": "De 1964 a 1985.",
        "source": "história do Brasil"
      },
      {
        "id": "d148",
        "text": "Quantas ilhas tem Angra dos Reis?",
        "answer": 365,
        "unit": "ilhas",
        "fact": "Diz-se que é uma pra cada dia do ano.",
        "source": "Prefeitura de Angra dos Reis"
      },
      {
        "id": "d334",
        "text": "Quantos meses Jânio Quadros ficou na Presidência antes de renunciar?",
        "answer": 7,
        "unit": "meses",
        "fact": "Esperava voltar nos braços do povo. Não voltou.",
        "source": "história do Brasil"
      },
      {
        "id": "d335",
        "text": "Quantos milhões de habitantes o Brasil tinha no Censo de 2022?",
        "answer": 203,
        "unit": "milhões",
        "fact": "O crescimento foi o menor da história.",
        "source": "IBGE, Censo 2022"
      },
      {
        "id": "d336",
        "text": "Quantos estados fazem parte da Amazônia Legal?",
        "answer": 9,
        "unit": "estados",
        "fact": "Ocupa mais da metade do território do Brasil.",
        "source": "IBGE"
      },
      {
        "id": "d337",
        "text": "Em que ano a família real portuguesa chegou ao Brasil?",
        "answer": 1808,
        "unit": "ano",
        "fact": "Fugindo das tropas de Napoleão.",
        "source": "história do Brasil"
      },
      {
        "id": "d338",
        "text": "Em que ano as mulheres conquistaram o direito de votar no Brasil?",
        "answer": 1932,
        "unit": "ano",
        "fact": "Pelo Código Eleitoral de Getúlio Vargas.",
        "source": "TSE"
      },
      {
        "id": "d339",
        "text": "Quantos anos durou a Era Vargas?",
        "answer": 15,
        "unit": "anos",
        "fact": "De 1930 a 1945. Depois ele ainda voltou eleito.",
        "source": "história do Brasil"
      },
      {
        "id": "d340",
        "text": "Quantos municípios tem o estado de São Paulo?",
        "answer": 645,
        "unit": "municípios",
        "fact": "Minas tem mais: 853.",
        "source": "IBGE"
      },
      {
        "id": "d341",
        "text": "Em que ano foi fundada a cidade de São Paulo?",
        "answer": 1554,
        "unit": "ano",
        "fact": "Por padres jesuítas, num colégio.",
        "source": "Prefeitura de São Paulo"
      },
      {
        "id": "d342",
        "text": "Em que ano foi fundada a cidade do Rio de Janeiro?",
        "answer": 1565,
        "unit": "ano",
        "fact": "Por Estácio de Sá.",
        "source": "Prefeitura do Rio"
      },
      {
        "id": "d343",
        "text": "Em que ano foi feita a primeira transmissão de rádio no Brasil?",
        "answer": 1922,
        "unit": "ano",
        "fact": "No centenário da Independência.",
        "source": "EBC"
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
        "id": "q29",
        "text": "Quantos braços e tentáculos, somados, tem uma lula?",
        "answer": 10,
        "unit": "braços e tentáculos",
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
        "id": "q106",
        "text": "Quantas horas por dia um coala passa dormindo em média?",
        "answer": 20,
        "unit": "horas",
        "fact": "A dieta com folhas de eucalipto fornece pouca energia.",
        "source": "Australian Koala Foundation"
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
        "id": "q163",
        "text": "Quantos metros de profundidade um pinguim-imperador consegue mergulhar?",
        "answer": 500,
        "unit": "metros",
        "fact": "Eles podem ficar mais de 20 minutos debaixo d'água.",
        "source": "National Geographic Kids"
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
        "id": "q204",
        "text": "Quantos metros pode alcançar a envergadura das asas de um albatroz-viante?",
        "answer": 3,
        "unit": "metros",
        "fact": "A maior envergadura de asa entre as aves vivas.",
        "source": "BirdLife International"
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
        "id": "q208",
        "text": "Quantos tentáculos tem uma água-viva-juba-de-leão em seus tufos?",
        "answer": 1200,
        "unit": "tentáculos",
        "fact": "É uma das maiores espécies de água-viva do planeta.",
        "source": "Oceana Org"
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
        "text": "Quantas patas pode ter o piolho-de-cobra Illacme plenipes?",
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
        "id": "n61",
        "text": "Quantos quilômetros por hora corre um avestruz em velocidade sustentada?",
        "answer": 70,
        "unit": "km/h",
        "fact": "É a ave terrestre mais rápida do mundo e possui apenas dois dedos em cada pé.",
        "source": "National Geographic"
      },
      {
        "id": "d274",
        "text": "Quantos anos pode viver um tubarão-da-groenlândia?",
        "answer": 400,
        "unit": "anos",
        "fact": "É o vertebrado mais longevo que se conhece.",
        "source": "Science (2016)"
      },
      {
        "id": "d275",
        "text": "Quantos km/h atinge um falcão-peregrino em mergulho?",
        "answer": 390,
        "unit": "km/h",
        "fact": "É o animal mais rápido do mundo.",
        "source": "National Geographic"
      },
      {
        "id": "d276",
        "text": "Quantos quilos pesa o coração de uma baleia-azul?",
        "answer": 180,
        "unit": "kg",
        "fact": "Do tamanho de um carrinho de golfe, não de um carro.",
        "source": "Royal Ontario Museum"
      },
      {
        "id": "d277",
        "text": "Quantos litros de água um camelo consegue beber de uma vez, em 10 minutos?",
        "answer": 100,
        "unit": "litros",
        "fact": "A água não fica na corcova: lá é gordura.",
        "source": "National Geographic"
      },
      {
        "id": "d278",
        "text": "Quantas vezes por minuto bate o coração de uma baleia-azul num mergulho fundo?",
        "answer": 2,
        "unit": "batimentos",
        "fact": "Medido com um sensor preso por ventosa.",
        "source": "PNAS (2019)"
      },
      {
        "id": "d279",
        "text": "Quantos olhos tem uma estrela-do-mar de 5 braços?",
        "answer": 5,
        "unit": "olhos",
        "fact": "Um na ponta de cada braço.",
        "source": "Proceedings of the Royal Society B (2014)"
      },
      {
        "id": "d280",
        "text": "Quantas patas tem uma borboleta?",
        "answer": 6,
        "unit": "patas",
        "fact": "Algumas usam só 4 pra andar, o que confunde muita gente.",
        "source": "Museu de História Natural de Londres"
      },
      {
        "id": "d281",
        "text": "Quantas vezes por semana uma preguiça desce da árvore pra fazer cocô?",
        "answer": 1,
        "unit": "vez",
        "fact": "É o momento mais perigoso da vida dela.",
        "source": "Smithsonian"
      },
      {
        "id": "d282",
        "text": "Quantos dentes um tubarão-branco tem na boca ao mesmo tempo?",
        "answer": 300,
        "unit": "dentes",
        "fact": "Em várias fileiras: quando um cai, o de trás avança.",
        "source": "Florida Museum"
      },
      {
        "id": "d283",
        "text": "Quantos centímetros de altura uma pulga consegue saltar?",
        "answer": 18,
        "unit": "cm",
        "fact": "É mais de 100 vezes o tamanho dela.",
        "source": "Journal of Experimental Biology"
      },
      {
        "id": "d284",
        "text": "Quantas horas por dia um elefante dorme na natureza?",
        "answer": 2,
        "unit": "horas",
        "fact": "É o mamífero que menos dorme.",
        "source": "PLOS ONE (2017)"
      },
      {
        "id": "d285",
        "text": "Quantos centímetros pode ter a língua de uma girafa?",
        "answer": 50,
        "unit": "cm",
        "fact": "É escura, provavelmente pra não queimar no sol.",
        "source": "San Diego Zoo"
      },
      {
        "id": "d286",
        "text": "Quantos km/h um hipopótamo consegue correr em terra?",
        "answer": 30,
        "unit": "km/h",
        "fact": "Corre mais que muito ser humano.",
        "source": "San Diego Zoo"
      },
      {
        "id": "d287",
        "text": "Quantos ovos de galinha equivalem a um ovo de avestruz?",
        "answer": 24,
        "unit": "ovos",
        "fact": "Leva cerca de 1 hora pra cozinhar.",
        "source": "San Diego Zoo"
      },
      {
        "id": "d288",
        "text": "Quantas toneladas pesa um elefante-africano macho adulto?",
        "answer": 6,
        "unit": "toneladas",
        "fact": "É o maior animal terrestre.",
        "source": "WWF"
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
      },
      {
        "id": "d289",
        "text": "Quantos metros de DNA tem cada célula do corpo, se esticado?",
        "answer": 2,
        "unit": "metros",
        "fact": "E cabe num núcleo de poucos micrômetros.",
        "source": "NIH"
      },
      {
        "id": "d290",
        "text": "Quantos milímetros tem o estribo, o menor osso do corpo?",
        "answer": 3,
        "unit": "mm",
        "fact": "Fica dentro do ouvido.",
        "source": "Gray's Anatomy"
      },
      {
        "id": "d291",
        "text": "Quantos centímetros o cabelo cresce por mês, em média?",
        "answer": 1,
        "unit": "cm",
        "fact": "Uns 15 cm por ano.",
        "source": "Academia Americana de Dermatologia"
      },
      {
        "id": "d292",
        "text": "Em quantos anos o esqueleto inteiro se renova?",
        "answer": 10,
        "unit": "anos",
        "fact": "O osso é tecido vivo: é destruído e refeito o tempo todo.",
        "source": "NIH"
      },
      {
        "id": "d293",
        "text": "Quantos trilhões de bactérias vivem no corpo humano?",
        "answer": 38,
        "unit": "trilhões",
        "fact": "Mais do que as nossas próprias células.",
        "source": "PLOS Biology (2016)"
      },
      {
        "id": "d294",
        "text": "Quantos trilhões de células tem o corpo humano?",
        "answer": 30,
        "unit": "trilhões",
        "fact": "A maioria são glóbulos vermelhos.",
        "source": "PLOS Biology (2016)"
      },
      {
        "id": "d295",
        "text": "Quantos centímetros, em média, somos mais altos de manhã do que à noite?",
        "answer": 1,
        "unit": "cm",
        "fact": "Os discos da coluna se achatam durante o dia.",
        "source": "NIH"
      },
      {
        "id": "d296",
        "text": "Quantos dias um ser humano sobrevive sem beber água, em média?",
        "answer": 3,
        "unit": "dias",
        "fact": "Sem comida, aguenta semanas.",
        "source": "Cruz Vermelha"
      },
      {
        "id": "d297",
        "text": "Quantos bilhões de vezes o coração bate numa vida inteira?",
        "answer": 3,
        "unit": "bilhões",
        "fact": "Sem nunca parar pra descansar.",
        "source": "American Heart Association"
      },
      {
        "id": "d298",
        "text": "Quantos km/h chega a viajar um impulso nervoso?",
        "answer": 430,
        "unit": "km/h",
        "fact": "Nas fibras mais rápidas, 120 metros por segundo.",
        "source": "Britannica"
      },
      {
        "id": "d299",
        "text": "Quantos anos, em média, uma pessoa passa dormindo ao longo da vida?",
        "answer": 25,
        "unit": "anos",
        "fact": "Cerca de um terço da vida.",
        "source": "National Sleep Foundation"
      },
      {
        "id": "d300",
        "text": "Quantas horas por dia dorme um recém-nascido, em média?",
        "answer": 16,
        "unit": "horas",
        "fact": "Mas em pedaços de 2 a 3 horas.",
        "source": "Sociedade Brasileira de Pediatria"
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
        "id": "q57",
        "text": "Em que ano o aplicativo TikTok foi lançado globalmente fora da China?",
        "answer": 2017,
        "unit": "ano",
        "fact": "Surgiu da fusão com o Musical.ly em 2018.",
        "source": "ByteDance Corporate"
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
        "id": "q61",
        "text": "Em que ano o primeiro iPhone foi anunciado por Steve Jobs?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Foi apresentado no Macworld em 9 de janeiro de 2007.",
        "source": "Apple Newsroom"
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
        "id": "q136",
        "text": "Em que ano o Twitter mudou oficialmente de nome para 'X'?",
        "answer": 2023,
        "unit": "ano",
        "fact": "Mudança promovida após a compra por Elon Musk.",
        "source": "X Corp Press"
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
        "id": "n181",
        "text": "Quantos episódios foram produzidos para a minissérie 'Chernobyl' da HBO?",
        "answer": 5,
        "unit": "episódios",
        "fact": "Uma das minisséries de maior nota da história do IMDb.",
        "source": "HBO"
      },
      {
        "id": "d301",
        "text": "Quantos anos tinha Mark Zuckerberg quando criou o Facebook?",
        "answer": 19,
        "unit": "anos",
        "fact": "Fez no quarto da faculdade, em Harvard.",
        "source": "Meta"
      },
      {
        "id": "d302",
        "text": "Por quantas horas Facebook, Instagram e WhatsApp ficaram fora do ar no apagão de 2021?",
        "answer": 6,
        "unit": "horas",
        "fact": "Os funcionários não conseguiam nem entrar no prédio.",
        "source": "Meta"
      },
      {
        "id": "d303",
        "text": "Em que ano o Gmail foi lançado?",
        "answer": 2004,
        "unit": "ano",
        "fact": "Lançado num 1º de abril: muita gente achou que era mentira.",
        "source": "Google"
      },
      {
        "id": "d304",
        "text": "Quantos MB de espaço o Gmail dava quando foi lançado?",
        "answer": 1000,
        "unit": "MB",
        "fact": "Era 1 GB, um absurdo na época.",
        "source": "Google"
      },
      {
        "id": "d305",
        "text": "Quantos MB de espaço grátis o Hotmail dava quando o Gmail chegou?",
        "answer": 2,
        "unit": "MB",
        "fact": "O Gmail dava 500 vezes mais.",
        "source": "Microsoft"
      },
      {
        "id": "d306",
        "text": "Em que ano foi enviado o primeiro SMS?",
        "answer": 1992,
        "unit": "ano",
        "fact": "Dizia \"Merry Christmas\".",
        "source": "Vodafone"
      },
      {
        "id": "d307",
        "text": "Em que ano foram criados os primeiros emojis, no Japão?",
        "answer": 1999,
        "unit": "ano",
        "fact": "Estão hoje no acervo do MoMA, em Nova York.",
        "source": "MoMA"
      },
      {
        "id": "d308",
        "text": "Quantos emojis tinha o primeiro conjunto, criado no Japão?",
        "answer": 176,
        "unit": "emojis",
        "fact": "Cada um com 12 por 12 pixels.",
        "source": "MoMA"
      },
      {
        "id": "d309",
        "text": "Em que ano o primeiro site da história foi ao ar?",
        "answer": 1991,
        "unit": "ano",
        "fact": "Ainda está no ar, no endereço original do CERN.",
        "source": "CERN"
      },
      {
        "id": "d310",
        "text": "Em que ano foi lançado o Free Fire?",
        "answer": 2017,
        "unit": "ano",
        "fact": "O Brasil virou o maior mercado do jogo.",
        "source": "Garena"
      },
      {
        "id": "d311",
        "text": "Em que ano foi lançado o Among Us?",
        "answer": 2018,
        "unit": "ano",
        "fact": "Só estourou dois anos depois, na pandemia.",
        "source": "Innersloth"
      },
      {
        "id": "d312",
        "text": "Em que ano foi lançado o Fortnite?",
        "answer": 2017,
        "unit": "ano",
        "fact": "O modo battle royale chegou meses depois.",
        "source": "Epic Games"
      },
      {
        "id": "d313",
        "text": "Em que ano saíram os primeiros jogos de Pokémon, no Japão?",
        "answer": 1996,
        "unit": "ano",
        "fact": "Red e Green, para Game Boy.",
        "source": "The Pokémon Company"
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
        "id": "n200",
        "text": "Quantos gramas de proteína tem em média um ovo de galinha grande?",
        "answer": 6,
        "unit": "g",
        "fact": "Distribuídos entre a clara e a gema do ovo.",
        "source": "USDA FoodData"
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
        "id": "n211",
        "text": "Quantos litros de cerveja são consumidos por ano por pessoa na Chéquia (líder mundial)?",
        "answer": 140,
        "unit": "litros",
        "fact": "A Chéquia lidera o consumo per capita global de cerveja há décadas.",
        "source": "Kirin Beer Report"
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
      },
      {
        "id": "d92",
        "text": "Em que ano abriu o primeiro McDonald's do Brasil?",
        "answer": 1979,
        "unit": "ano",
        "fact": "Foi em Copacabana, no Rio.",
        "source": "McDonald's Brasil"
      },
      {
        "id": "d93",
        "text": "Em que ano a Coca-Cola foi inventada?",
        "answer": 1886,
        "unit": "ano",
        "fact": "Começou como \"remédio\" vendido em farmácia.",
        "source": "The Coca-Cola Company"
      },
      {
        "id": "d94",
        "text": "Em que ano o macarrão instantâneo foi inventado no Japão?",
        "answer": 1958,
        "unit": "ano",
        "fact": "O inventor, Momofuku Ando, chegou aos 96 anos.",
        "source": "Nissin"
      },
      {
        "id": "d95",
        "text": "Quantos litros de seiva de bordo são precisos para fazer 1 litro de xarope de maple?",
        "answer": 40,
        "unit": "litros",
        "fact": "A seiva é quase só água.",
        "source": "Governo do Canadá"
      },
      {
        "id": "d96",
        "text": "Quantas flores são precisas para fazer 1 kg de açafrão (aproximadamente)?",
        "answer": 150000,
        "unit": "flores",
        "fact": "Cada flor dá só 3 fiozinhos.",
        "source": "FAO"
      },
      {
        "id": "d97",
        "text": "Quantos litros de água são gastos pra produzir uma xícara de café?",
        "answer": 140,
        "unit": "litros",
        "fact": "Conta a água do pé de café até a xícara.",
        "source": "Water Footprint Network"
      },
      {
        "id": "d98",
        "text": "Quantas unidades Scoville tem a Pepper X, a pimenta mais ardida do mundo?",
        "answer": 2693000,
        "unit": "SHU",
        "fact": "Uma jalapeño tem no máximo 8 mil.",
        "source": "Guinness World Records (2023)"
      },
      {
        "id": "d99",
        "text": "Em que ano foi criada a pizza Margherita, em homenagem à rainha da Itália?",
        "answer": 1889,
        "unit": "ano",
        "fact": "As cores imitam a bandeira italiana.",
        "source": "Associazione Verace Pizza Napoletana"
      },
      {
        "id": "d100",
        "text": "Em que ano o Nescau foi lançado no Brasil?",
        "answer": 1932,
        "unit": "ano",
        "fact": "O nome original era \"Nescáo\".",
        "source": "Nestlé Brasil"
      },
      {
        "id": "d101",
        "text": "Em que ano o Toddy chegou ao Brasil?",
        "answer": 1933,
        "unit": "ano",
        "fact": "Um ano depois do Nescau: a briga é antiga.",
        "source": "PepsiCo / Meio & Mensagem"
      },
      {
        "id": "d102",
        "text": "Em que ano a Nestlé começou a fabricar o leite condensado no Brasil?",
        "answer": 1921,
        "unit": "ano",
        "fact": "Era vendido como \"Milkmaid\"; o povo chamou de \"Moça\".",
        "source": "Nestlé Brasil"
      },
      {
        "id": "d103",
        "text": "Em que ano surgiu o brigadeiro?",
        "answer": 1945,
        "unit": "ano",
        "fact": "Nasceu na campanha presidencial do Brigadeiro Eduardo Gomes.",
        "source": "história da culinária brasileira"
      },
      {
        "id": "d104",
        "text": "Em que ano abriu a primeira lanchonete Bob's?",
        "answer": 1952,
        "unit": "ano",
        "fact": "Foi o primeiro fast-food do Brasil.",
        "source": "Bob's"
      },
      {
        "id": "d105",
        "text": "Em que ano um decreto federal oficializou a caipirinha como bebida brasileira?",
        "answer": 2003,
        "unit": "ano",
        "fact": "A receita oficial leva cachaça, limão, açúcar e gelo.",
        "source": "Decreto 4.851/2003"
      },
      {
        "id": "d106",
        "text": "Quantas sementes tem, em média, um morango?",
        "answer": 200,
        "unit": "sementes",
        "fact": "É a única fruta com as sementes do lado de fora.",
        "source": "California Strawberry Commission"
      },
      {
        "id": "d107",
        "text": "Em que ano foi lançado o Sonho de Valsa?",
        "answer": 1938,
        "unit": "ano",
        "fact": "O nome vem de uma opereta austríaca.",
        "source": "Lacta"
      },
      {
        "id": "d108",
        "text": "Quantos anos tinha o mel ainda comestível achado em tumbas do Egito?",
        "answer": 3000,
        "unit": "anos",
        "fact": "Mel bem guardado praticamente não estraga.",
        "source": "Smithsonian"
      },
      {
        "id": "d109",
        "text": "Em que ano a Fanta foi criada?",
        "answer": 1940,
        "unit": "ano",
        "fact": "Nasceu na Alemanha, sem acesso ao xarope da Coca na guerra.",
        "source": "The Coca-Cola Company"
      },
      {
        "id": "d110",
        "text": "Em que ano foi inventado o picolé?",
        "answer": 1905,
        "unit": "ano",
        "fact": "Por um menino de 11 anos que esqueceu o refresco no frio.",
        "source": "Popsicle"
      },
      {
        "id": "d111",
        "text": "Em que ano a Nestlé foi fundada, na Suíça?",
        "answer": 1866,
        "unit": "ano",
        "fact": "Começou fazendo farinha láctea para bebês.",
        "source": "Nestlé"
      },
      {
        "id": "d344",
        "text": "Em que ano surgiu o sanduíche, batizado em homenagem a um conde inglês?",
        "answer": 1762,
        "unit": "ano",
        "fact": "O conde de Sandwich não queria largar o jogo de cartas pra comer.",
        "source": "Oxford English Dictionary"
      },
      {
        "id": "d345",
        "text": "Quantos grãos tem, em média, uma espiga de milho?",
        "answer": 800,
        "unit": "grãos",
        "fact": "O número de fileiras é sempre par.",
        "source": "Universidade de Illinois"
      },
      {
        "id": "d346",
        "text": "Em que ano a Heinz lançou o seu ketchup?",
        "answer": 1876,
        "unit": "ano",
        "fact": "O ketchup original, na Ásia, era um molho de peixe.",
        "source": "Kraft Heinz"
      },
      {
        "id": "d347",
        "text": "Em que ano a Nutella foi lançada?",
        "answer": 1964,
        "unit": "ano",
        "fact": "Nasceu porque o cacau era caro: misturaram avelã.",
        "source": "Ferrero"
      },
      {
        "id": "d348",
        "text": "Em que ano surgiu o Doritos?",
        "answer": 1966,
        "unit": "ano",
        "fact": "Nasceu num restaurante da Disneylândia.",
        "source": "PepsiCo"
      },
      {
        "id": "d349",
        "text": "Quantos litros de água são gastos pra produzir 1 kg de chocolate?",
        "answer": 17000,
        "unit": "litros",
        "fact": "A maior parte vai no cultivo do cacau.",
        "source": "Water Footprint Network"
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
        "id": "n236",
        "text": "Quantos centímetros de altura tem a rede de vôlei masculino adulto oficial?",
        "answer": 243,
        "unit": "cm",
        "fact": "A altura exata é de 2,43 metros.",
        "source": "FIVB Rules"
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
        "id": "n247",
        "text": "Quantas rodadas são disputadas no Campeonato Brasileiro da Série A (pontos corridos)?",
        "answer": 38,
        "unit": "rodadas",
        "fact": "20 times jogam entre si em turno e returno.",
        "source": "CBF"
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
        "text": "Quantos Oscars ganhou o primeiro filme do Rocky?",
        "answer": 3,
        "unit": "Oscars",
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
        "id": "n260",
        "text": "Quantos quilos pesa a barra olímpica masculina de levantamento de peso sem as anilhas?",
        "answer": 20,
        "unit": "kg",
        "fact": "A barra feminina pesa 15 kg.",
        "source": "IWF Weightlifting"
      },
      {
        "id": "d112",
        "text": "Qual foi a velocidade máxima de Usain Bolt no recorde dos 100 m (km/h)?",
        "answer": 44,
        "unit": "km/h",
        "fact": "Chegou a 44,72 km/h entre os 60 e os 80 metros.",
        "source": "World Athletics"
      },
      {
        "id": "d113",
        "text": "Quantas medalhas olímpicas Michael Phelps ganhou?",
        "answer": 28,
        "unit": "medalhas",
        "fact": "23 delas de ouro.",
        "source": "COI"
      },
      {
        "id": "d114",
        "text": "Quantas medalhas olímpicas Rebeca Andrade tinha depois de Paris 2024?",
        "answer": 6,
        "unit": "medalhas",
        "fact": "É a atleta do Brasil com mais medalhas olímpicas.",
        "source": "COB"
      },
      {
        "id": "d115",
        "text": "Quantos pontos Kobe Bryant fez no melhor jogo da carreira?",
        "answer": 81,
        "unit": "pontos",
        "fact": "Contra o Toronto, em 2006.",
        "source": "NBA"
      },
      {
        "id": "d116",
        "text": "Quantos pontos Wilt Chamberlain fez num único jogo da NBA?",
        "answer": 100,
        "unit": "pontos",
        "fact": "Em 1962. O jogo nem foi televisionado.",
        "source": "NBA"
      },
      {
        "id": "d117",
        "text": "Com quantos anos George Foreman voltou a ser campeão mundial dos pesados?",
        "answer": 45,
        "unit": "anos",
        "fact": "Vinte anos depois de perder o título para Ali.",
        "source": "The Ring"
      },
      {
        "id": "d118",
        "text": "Quantas vitórias seguidas Anderson Silva teve no UFC?",
        "answer": 16,
        "unit": "vitórias",
        "fact": "A sequência durou quase 7 anos.",
        "source": "UFC"
      },
      {
        "id": "d119",
        "text": "Quantos títulos mundiais de surfe Gabriel Medina tem?",
        "answer": 3,
        "unit": "títulos",
        "fact": "2014, 2018 e 2021.",
        "source": "WSL"
      },
      {
        "id": "d120",
        "text": "Quantos títulos mundiais de Fórmula 1 os pilotos brasileiros têm somados?",
        "answer": 8,
        "unit": "títulos",
        "fact": "Fittipaldi 2, Piquet 3 e Senna 3.",
        "source": "FIA"
      },
      {
        "id": "d121",
        "text": "Quantas corridas Ayrton Senna venceu na Fórmula 1?",
        "answer": 41,
        "unit": "vitórias",
        "fact": "E fez 65 pole positions.",
        "source": "FIA"
      },
      {
        "id": "d122",
        "text": "Quantas horas durou o jogo de tênis mais longo da história (Isner x Mahut)?",
        "answer": 11,
        "unit": "horas",
        "fact": "Foram 3 dias em Wimbledon; o último set acabou 70 a 68.",
        "source": "Wimbledon"
      },
      {
        "id": "d314",
        "text": "Quantos segundos durou a luta mais rápida da história do UFC?",
        "answer": 5,
        "unit": "segundos",
        "fact": "Uma joelhada voadora de Jorge Masvidal, em 2019.",
        "source": "UFC"
      },
      {
        "id": "d315",
        "text": "Quantos km/h teve o saque mais rápido reconhecido pela ATP?",
        "answer": 253,
        "unit": "km/h",
        "fact": "John Isner, em 2016.",
        "source": "ATP"
      },
      {
        "id": "d316",
        "text": "Quantos ouros olímpicos o vôlei masculino do Brasil tem?",
        "answer": 3,
        "unit": "ouros",
        "fact": "1992, 2004 e 2016.",
        "source": "COB"
      },
      {
        "id": "d317",
        "text": "Quantas medalhas de ouro o Brasil ganhou em Paris 2024?",
        "answer": 3,
        "unit": "ouros",
        "fact": "Bia Souza, Rebeca Andrade e Ana Patrícia e Duda.",
        "source": "COB"
      },
      {
        "id": "d318",
        "text": "Quantas medalhas no total o Brasil ganhou em Paris 2024?",
        "answer": 20,
        "unit": "medalhas",
        "fact": "3 ouros, 7 pratas e 10 bronzes.",
        "source": "COB"
      },
      {
        "id": "d319",
        "text": "Quantos km/h atingiu a peteca no golpe mais rápido do badminton?",
        "answer": 565,
        "unit": "km/h",
        "fact": "É o objeto mais rápido de qualquer esporte com raquete.",
        "source": "Guinness World Records (2023)"
      },
      {
        "id": "d320",
        "text": "Quantos centímetros tem o recorde mundial do salto em distância?",
        "answer": 895,
        "unit": "cm",
        "fact": "Mike Powell, em 1991. Ninguém passou até hoje.",
        "source": "World Athletics"
      },
      {
        "id": "d321",
        "text": "Quantas medalhas de ouro olímpicas o Brasil tem na história, até Paris 2024?",
        "answer": 40,
        "unit": "ouros",
        "fact": "A primeira foi no tiro, em 1920.",
        "source": "COB"
      },
      {
        "id": "d322",
        "text": "Com quantos anos Rayssa Leal ganhou a prata no skate em Tóquio?",
        "answer": 13,
        "unit": "anos",
        "fact": "Virou a medalhista mais jovem do Brasil.",
        "source": "COB"
      },
      {
        "id": "d323",
        "text": "Com quantos anos Nadia Comaneci tirou o primeiro 10 da ginástica olímpica?",
        "answer": 14,
        "unit": "anos",
        "fact": "O placar só tinha 3 dígitos e mostrou 1.00.",
        "source": "COI"
      },
      {
        "id": "d324",
        "text": "Quantas Copas do Mundo de futsal o Brasil ganhou?",
        "answer": 6,
        "unit": "títulos",
        "fact": "A última foi em 2024, no Uzbequistão.",
        "source": "FIFA"
      },
      {
        "id": "d325",
        "text": "Em que ano Guga ganhou o primeiro Roland Garros?",
        "answer": 1997,
        "unit": "ano",
        "fact": "Era o número 66 do mundo.",
        "source": "ATP"
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
      },
      {
        "id": "d123",
        "text": "Em que ano foi lançada a sonda Voyager 1, que até hoje manda sinais?",
        "answer": 1977,
        "unit": "ano",
        "fact": "É o objeto humano mais distante da Terra.",
        "source": "NASA"
      },
      {
        "id": "d124",
        "text": "Quantos quilômetros separam a Terra da Lua, em média?",
        "answer": 384400,
        "unit": "km",
        "fact": "Caberiam todos os planetas do Sistema Solar enfileirados nesse espaço.",
        "source": "NASA"
      },
      {
        "id": "d125",
        "text": "Quantos graus Celsius faz na superfície do Sol?",
        "answer": 5500,
        "unit": "°C",
        "fact": "A coroa, por fora, passa de 1 milhão de graus.",
        "source": "NASA"
      },
      {
        "id": "d126",
        "text": "Quantas Terras caberiam dentro do Sol?",
        "answer": 1300000,
        "unit": "Terras",
        "fact": "Aproximadamente 1,3 milhão.",
        "source": "NASA"
      },
      {
        "id": "d127",
        "text": "Quantas toneladas pesa a Estação Espacial Internacional?",
        "answer": 420,
        "unit": "toneladas",
        "fact": "Foi montada em órbita, peça por peça.",
        "source": "NASA"
      },
      {
        "id": "d128",
        "text": "Quantos anos-luz de diâmetro tem a Via Láctea?",
        "answer": 100000,
        "unit": "anos-luz",
        "fact": "A luz leva 100 mil anos pra atravessá-la.",
        "source": "NASA"
      },
      {
        "id": "d129",
        "text": "Quantos milhões de anos tem o Universo?",
        "answer": 13800,
        "unit": "milhões de anos",
        "fact": "13,8 bilhões de anos.",
        "source": "NASA / Planck"
      },
      {
        "id": "d130",
        "text": "Quantos dias terrestres dura um dia em Vênus?",
        "answer": 243,
        "unit": "dias",
        "fact": "O dia de Vênus é mais longo que o ano dele (225 dias).",
        "source": "NASA"
      },
      {
        "id": "d131",
        "text": "Quantos anos Netuno leva pra dar uma volta no Sol?",
        "answer": 165,
        "unit": "anos",
        "fact": "Completou a primeira volta desde a descoberta só em 2011.",
        "source": "NASA"
      },
      {
        "id": "d132",
        "text": "Quantos graus Celsius chega a ter um raio?",
        "answer": 30000,
        "unit": "°C",
        "fact": "Cinco vezes mais quente que a superfície do Sol.",
        "source": "NOAA"
      },
      {
        "id": "d133",
        "text": "Em que ano Plutão deixou de ser considerado planeta?",
        "answer": 2006,
        "unit": "ano",
        "fact": "Virou \"planeta anão\".",
        "source": "União Astronômica Internacional"
      },
      {
        "id": "d134",
        "text": "Quantos milhões de raios caem no Brasil por ano, em média?",
        "answer": 77,
        "unit": "milhões",
        "fact": "O Brasil é o campeão mundial de raios.",
        "source": "INPE / ELAT"
      },
      {
        "id": "d326",
        "text": "Quantas vezes o diâmetro do Sol é maior que o da Lua?",
        "answer": 400,
        "unit": "vezes",
        "fact": "E ele está 400 vezes mais longe: por isso os eclipses encaixam.",
        "source": "NASA"
      },
      {
        "id": "d327",
        "text": "Quantos km/h a Terra viaja em volta do Sol?",
        "answer": 107000,
        "unit": "km/h",
        "fact": "Mais de 100 vezes a velocidade de um avião.",
        "source": "NASA"
      },
      {
        "id": "d328",
        "text": "Quantos quilos marcaria na balança, na Lua, quem pesa 60 kg na Terra?",
        "answer": 10,
        "unit": "kg",
        "fact": "A gravidade lá é cerca de 1/6 da nossa.",
        "source": "NASA"
      },
      {
        "id": "d329",
        "text": "Quantos graus abaixo de zero faz na Lua durante a noite?",
        "answer": 173,
        "unit": "°C abaixo de zero",
        "fact": "De dia, passa de 120 °C.",
        "source": "NASA"
      },
      {
        "id": "d330",
        "text": "Em que ano foi lançado o Sputnik, o primeiro satélite artificial?",
        "answer": 1957,
        "unit": "ano",
        "fact": "Começou a corrida espacial.",
        "source": "NASA"
      },
      {
        "id": "d331",
        "text": "Em que ano o telescópio Hubble foi lançado?",
        "answer": 1990,
        "unit": "ano",
        "fact": "Foi pro espaço com o espelho errado e precisou de \"óculos\".",
        "source": "NASA"
      },
      {
        "id": "d332",
        "text": "A quantos quilômetros de altura orbita a Estação Espacial Internacional?",
        "answer": 400,
        "unit": "km",
        "fact": "Menos que a distância entre São Paulo e o Rio.",
        "source": "NASA"
      },
      {
        "id": "d333",
        "text": "Quantos planetas anões são reconhecidos oficialmente?",
        "answer": 5,
        "unit": "planetas anões",
        "fact": "Plutão, Ceres, Éris, Haumea e Makemake.",
        "source": "União Astronômica Internacional"
      }
    ]
  },
  {
    "id": "futebol",
    "title": "futebol BR",
    "tagline": "resenha de boteco, agora valendo",
    "premium": true,
    "isNew": true,
    "icon": "ball",
    "tint": "#B6E59E",
    "questions": [
      {
        "id": "c2",
        "text": "Em que ano o Brasil ganhou sua primeira Copa do Mundo?",
        "answer": 1958,
        "unit": "ano",
        "fact": "Na Suécia. Pelé tinha só 17 anos.",
        "source": "FIFA"
      },
      {
        "id": "c3",
        "text": "Quantos gols Pelé marcou em Copas do Mundo?",
        "answer": 12,
        "unit": "gols",
        "fact": "Em 14 jogos de Copa.",
        "source": "FIFA"
      },
      {
        "id": "c4",
        "text": "Quantos gols Ronaldo Fenômeno marcou em Copas do Mundo?",
        "answer": 15,
        "unit": "gols",
        "fact": "Foi o maior artilheiro das Copas até 2014.",
        "source": "FIFA"
      },
      {
        "id": "c5",
        "text": "Quantos anos Pelé tinha quando ganhou sua primeira Copa do Mundo?",
        "answer": 17,
        "unit": "anos",
        "fact": "Ainda é o mais jovem a marcar numa final de Copa.",
        "source": "FIFA"
      },
      {
        "id": "c6",
        "text": "Quantas Copas do Mundo Pelé ganhou como jogador?",
        "answer": 3,
        "unit": "Copas",
        "fact": "1958, 1962 e 1970. Ninguém ganhou mais.",
        "source": "FIFA"
      },
      {
        "id": "c7",
        "text": "Em que ano Pelé marcou o seu milésimo gol (pela contagem dele)?",
        "answer": 1969,
        "unit": "ano",
        "fact": "De pênalti, contra o Vasco, no Maracanã.",
        "source": "Santos FC"
      },
      {
        "id": "c8",
        "text": "Em que ano Romário comemorou o seu milésimo gol (pela contagem dele)?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Também de pênalti, contra o Sport.",
        "source": "CBF"
      },
      {
        "id": "c9",
        "text": "Em que ano aconteceu o Maracanaço (Brasil perdeu a final para o Uruguai)?",
        "answer": 1950,
        "unit": "ano",
        "fact": "O Brasil só precisava de um empate.",
        "source": "FIFA"
      },
      {
        "id": "c10",
        "text": "Quantos gols Zico marcou pelo Flamengo?",
        "answer": 508,
        "unit": "gols",
        "fact": "É o maior artilheiro da história do clube.",
        "source": "Clube de Regatas do Flamengo"
      },
      {
        "id": "c11",
        "text": "Em que ano o Corinthians ganhou o primeiro Mundial de Clubes da FIFA?",
        "answer": 2000,
        "unit": "ano",
        "fact": "A final foi contra o Vasco, no Maracanã, nos pênaltis.",
        "source": "FIFA"
      },
      {
        "id": "c12",
        "text": "Quantos títulos de Copa América a Seleção masculina tem?",
        "answer": 9,
        "unit": "títulos",
        "fact": "O primeiro foi em 1919.",
        "source": "CONMEBOL"
      },
      {
        "id": "c13",
        "text": "Em que ano o Brasil ganhou o primeiro ouro olímpico no futebol masculino?",
        "answer": 2016,
        "unit": "ano",
        "fact": "No Maracanã, nos pênaltis, contra a Alemanha.",
        "source": "COI"
      },
      {
        "id": "c14",
        "text": "Quantas vezes Marta foi eleita a melhor jogadora do mundo pela FIFA?",
        "answer": 6,
        "unit": "vezes",
        "fact": "Cinco seguidas (2006 a 2010) e mais uma em 2018.",
        "source": "FIFA"
      },
      {
        "id": "c15",
        "text": "Quantos gols Marta marcou em Copas do Mundo?",
        "answer": 17,
        "unit": "gols",
        "fact": "É a maior artilheira de Copas entre homens e mulheres.",
        "source": "FIFA"
      },
      {
        "id": "c16",
        "text": "Quantos jogos Pelé disputou pela Seleção Brasileira (contagem da FIFA)?",
        "answer": 92,
        "unit": "jogos",
        "fact": "Marcou 77 gols nesses jogos.",
        "source": "FIFA"
      },
      {
        "id": "d2",
        "text": "Em quantos minutos a Alemanha fez 4 gols seguidos no 7 a 1 de 2014?",
        "answer": 6,
        "unit": "minutos",
        "fact": "Os gols saíram aos 23, 24, 26 e 29 do primeiro tempo.",
        "source": "FIFA"
      },
      {
        "id": "d3",
        "text": "Em quantas Copas do Mundo masculinas o Brasil jogou, de 1930 até 2022?",
        "answer": 22,
        "unit": "Copas",
        "fact": "É a única seleção que jogou todas.",
        "source": "FIFA"
      },
      {
        "id": "d4",
        "text": "Quantos gols o Brasil sofreu na Copa de 2014 inteira?",
        "answer": 14,
        "unit": "gols",
        "fact": "Metade deles numa tarde só, contra a Alemanha.",
        "source": "FIFA"
      },
      {
        "id": "d5",
        "text": "Quantos gols Ronaldo Fenômeno marcou na Copa de 2002?",
        "answer": 8,
        "unit": "gols",
        "fact": "Dois deles na final contra a Alemanha.",
        "source": "FIFA"
      },
      {
        "id": "d6",
        "text": "Quantos gols Romário marcou na Copa de 1994?",
        "answer": 5,
        "unit": "gols",
        "fact": "Foi eleito o melhor jogador daquela Copa.",
        "source": "FIFA"
      },
      {
        "id": "d7",
        "text": "Quantos gols Garrincha marcou na Copa de 1962?",
        "answer": 4,
        "unit": "gols",
        "fact": "Terminou como um dos artilheiros, com Pelé machucado desde o 2º jogo.",
        "source": "FIFA"
      },
      {
        "id": "d8",
        "text": "Quantos anos o Brasil esperou entre o tri (1970) e o tetra (1994)?",
        "answer": 24,
        "unit": "anos",
        "fact": "O tetra veio nos pênaltis contra a Itália, a mesma rival da final de 70.",
        "source": "FIFA"
      },
      {
        "id": "d9",
        "text": "Em que ano a taça Jules Rimet foi roubada da sede da CBF no Rio?",
        "answer": 1983,
        "unit": "ano",
        "fact": "Nunca foi achada; a suspeita é que foi derretida.",
        "source": "CBF"
      },
      {
        "id": "d10",
        "text": "Em que ano foi disputada a Taça Brasil, o primeiro campeonato nacional de clubes?",
        "answer": 1959,
        "unit": "ano",
        "fact": "O primeiro campeão foi o Bahia, em cima do Santos de Pelé.",
        "source": "CBF"
      },
      {
        "id": "d11",
        "text": "Em que ano o VAR foi usado pela primeira vez no Brasileirão Série A inteiro?",
        "answer": 2019,
        "unit": "ano",
        "fact": "Na Copa do Brasil, já tinha sido usado em 2018.",
        "source": "CBF"
      },
      {
        "id": "d12",
        "text": "Por quantos milhões de euros o PSG tirou Neymar do Barcelona em 2017?",
        "answer": 222,
        "unit": "milhões de euros",
        "fact": "Ainda é a transferência mais cara da história.",
        "source": "FIFA / imprensa esportiva"
      },
      {
        "id": "d13",
        "text": "Por quantos milhões de euros o Real Madrid comprou Vinícius Júnior do Flamengo?",
        "answer": 45,
        "unit": "milhões de euros",
        "fact": "O acordo foi fechado em 2017, quando ele tinha 16 anos.",
        "source": "Real Madrid"
      },
      {
        "id": "d14",
        "text": "Com quantos anos Endrick estreou no time profissional do Palmeiras?",
        "answer": 16,
        "unit": "anos",
        "fact": "Estreou em outubro de 2022.",
        "source": "Palmeiras"
      },
      {
        "id": "d15",
        "text": "Com quantos anos Neymar estreou no time profissional do Santos?",
        "answer": 17,
        "unit": "anos",
        "fact": "Estreou em março de 2009.",
        "source": "Santos FC"
      },
      {
        "id": "d16",
        "text": "Em que ano um clube brasileiro ganhou a Libertadores pela primeira vez?",
        "answer": 1962,
        "unit": "ano",
        "fact": "Foi o Santos de Pelé, contra o Peñarol.",
        "source": "CONMEBOL"
      },
      {
        "id": "d17",
        "text": "Em que ano o Flamengo ganhou o Mundial em cima do Liverpool por 3 a 0?",
        "answer": 1981,
        "unit": "ano",
        "fact": "Foi em Tóquio, com Zico comandando o time.",
        "source": "FIFA"
      },
      {
        "id": "d18",
        "text": "Em que ano Ronaldinho Gaúcho ganhou a Bola de Ouro?",
        "answer": 2005,
        "unit": "ano",
        "fact": "No mesmo ano ganhou também o prêmio da FIFA.",
        "source": "France Football"
      },
      {
        "id": "d19",
        "text": "Quantas Bolas de Ouro jogadores brasileiros já ganharam?",
        "answer": 5,
        "unit": "Bolas de Ouro",
        "fact": "Ronaldo (2), Rivaldo, Ronaldinho e Kaká.",
        "source": "France Football"
      },
      {
        "id": "d20",
        "text": "Quantas finais de Copa do Mundo Cafu disputou?",
        "answer": 3,
        "unit": "finais",
        "fact": "1994, 1998 e 2002: ninguém mais jogou três finais seguidas.",
        "source": "FIFA"
      },
      {
        "id": "d21",
        "text": "Em que minuto Ronaldo fez o primeiro gol da final da Copa de 2002?",
        "answer": 67,
        "unit": "minuto",
        "fact": "O segundo saiu aos 79.",
        "source": "FIFA"
      },
      {
        "id": "d22",
        "text": "Quantos estádios receberam jogos da Copa do Mundo de 2014 no Brasil?",
        "answer": 12,
        "unit": "estádios",
        "fact": "Alguns viraram \"elefantes brancos\" depois do torneio.",
        "source": "FIFA"
      },
      {
        "id": "d23",
        "text": "Quantos quilos pesa a taça da Copa do Mundo (arredondando)?",
        "answer": 6,
        "unit": "kg",
        "fact": "São 6,1 kg de ouro 18 quilates.",
        "source": "FIFA"
      },
      {
        "id": "d24",
        "text": "Quantos títulos brasileiros o Palmeiras tinha até 2024 (contando Taça Brasil e Robertão)?",
        "answer": 12,
        "unit": "títulos",
        "fact": "É o maior campeão nacional.",
        "source": "CBF"
      },
      {
        "id": "d25",
        "text": "Quantas Libertadores o São Paulo ganhou?",
        "answer": 3,
        "unit": "títulos",
        "fact": "1992, 1993 e 2005.",
        "source": "CONMEBOL"
      },
      {
        "id": "d26",
        "text": "Em que ano Pelé fez o último jogo pelo Santos?",
        "answer": 1974,
        "unit": "ano",
        "fact": "Depois ainda jogou pelo Cosmos, nos EUA.",
        "source": "Santos FC"
      }
    ]
  },
  {
    "id": "anos90",
    "title": "anos 90/2000",
    "tagline": "nostalgia com tamagotchi",
    "premium": true,
    "isNew": true,
    "icon": "cassette",
    "tint": "#FFC2E0",
    "questions": [
      {
        "id": "c17",
        "text": "Em que ano o Tamagotchi foi lançado no Japão?",
        "answer": 1996,
        "unit": "ano",
        "fact": "Vendeu mais de 80 milhões de unidades.",
        "source": "Bandai"
      },
      {
        "id": "c18",
        "text": "Em que ano estreou o primeiro filme Toy Story?",
        "answer": 1995,
        "unit": "ano",
        "fact": "Foi o primeiro longa feito todo em computação gráfica.",
        "source": "Pixar"
      },
      {
        "id": "c19",
        "text": "Em que ano o filme Titanic estreou nos cinemas?",
        "answer": 1997,
        "unit": "ano",
        "fact": "Ficou 12 anos como a maior bilheteria da história.",
        "source": "Box Office Mojo"
      },
      {
        "id": "c20",
        "text": "Quantos Oscars o filme Titanic ganhou?",
        "answer": 11,
        "unit": "Oscars",
        "fact": "Empatado com Ben-Hur e O Retorno do Rei.",
        "source": "Academia de Artes e Ciências Cinematográficas"
      },
      {
        "id": "c21",
        "text": "Em que ano o MSN Messenger foi lançado?",
        "answer": 1999,
        "unit": "ano",
        "fact": "Começou como MSN Messenger Service, da Microsoft.",
        "source": "Microsoft"
      },
      {
        "id": "c22",
        "text": "Quantos integrantes tinha a banda Mamonas Assassinas?",
        "answer": 5,
        "unit": "integrantes",
        "fact": "A banda durou menos de um ano de sucesso nacional.",
        "source": "Wikipédia (Mamonas Assassinas)"
      },
      {
        "id": "c23",
        "text": "Em que ano o Nokia 3310 foi lançado?",
        "answer": 2000,
        "unit": "ano",
        "fact": "Vendeu cerca de 126 milhões de unidades.",
        "source": "Nokia"
      },
      {
        "id": "c24",
        "text": "Em que ano o Game Boy Color foi lançado?",
        "answer": 1998,
        "unit": "ano",
        "fact": "Foi o primeiro Game Boy com tela colorida.",
        "source": "Nintendo"
      },
      {
        "id": "c26",
        "text": "Em que ano foi exibido o último episódio de Friends?",
        "answer": 2004,
        "unit": "ano",
        "fact": "O final teve mais de 52 milhões de espectadores nos EUA.",
        "source": "NBC"
      },
      {
        "id": "c27",
        "text": "Em que ano o Windows 95 foi lançado?",
        "answer": 1995,
        "unit": "ano",
        "fact": "Foi o sistema que trouxe o botão Iniciar.",
        "source": "Microsoft"
      },
      {
        "id": "c28",
        "text": "Em que ano o PlayStation 2 foi lançado no Japão?",
        "answer": 2000,
        "unit": "ano",
        "fact": "É o console mais vendido da história.",
        "source": "Sony Interactive Entertainment"
      },
      {
        "id": "c29",
        "text": "Quantas integrantes tinham as Spice Girls?",
        "answer": 5,
        "unit": "integrantes",
        "fact": "Baby, Ginger, Scary, Sporty e Posh.",
        "source": "Wikipédia (Spice Girls)"
      },
      {
        "id": "c30",
        "text": "Em que ano estreou o primeiro filme do Shrek?",
        "answer": 2001,
        "unit": "ano",
        "fact": "Ganhou o primeiro Oscar de Melhor Animação da história.",
        "source": "DreamWorks"
      },
      {
        "id": "c31",
        "text": "Em que ano o Google foi fundado?",
        "answer": 1998,
        "unit": "ano",
        "fact": "Começou numa garagem na Califórnia.",
        "source": "Google"
      },
      {
        "id": "d27",
        "text": "Em que ano o Orkut foi lançado?",
        "answer": 2004,
        "unit": "ano",
        "fact": "O Brasil virou o país com mais usuários da rede.",
        "source": "Google"
      },
      {
        "id": "d28",
        "text": "Em que ano o Orkut foi desligado?",
        "answer": 2014,
        "unit": "ano",
        "fact": "Durou 10 anos; os depoimentos ficaram de saudade.",
        "source": "Google"
      },
      {
        "id": "d29",
        "text": "Em que ano estreou Malhação?",
        "answer": 1995,
        "unit": "ano",
        "fact": "Ficou no ar até 2020.",
        "source": "Memória Globo"
      },
      {
        "id": "d30",
        "text": "Em que ano foi lançado o Nintendo 64?",
        "answer": 1996,
        "unit": "ano",
        "fact": "Super Mario 64 veio junto, no lançamento.",
        "source": "Nintendo"
      },
      {
        "id": "d31",
        "text": "Em que ano foi publicado o primeiro livro de Harry Potter?",
        "answer": 1997,
        "unit": "ano",
        "fact": "Foi recusado por 12 editoras antes.",
        "source": "Bloomsbury"
      },
      {
        "id": "d32",
        "text": "Em que ano o Napster foi lançado?",
        "answer": 1999,
        "unit": "ano",
        "fact": "Fechou em 2001, depois de processos das gravadoras.",
        "source": "Napster"
      },
      {
        "id": "d33",
        "text": "Em que ano o primeiro iPod foi lançado?",
        "answer": 2001,
        "unit": "ano",
        "fact": "O slogan era \"mil músicas no seu bolso\".",
        "source": "Apple"
      },
      {
        "id": "d34",
        "text": "Quantas músicas cabiam no primeiro iPod, segundo a propaganda da Apple?",
        "answer": 1000,
        "unit": "músicas",
        "fact": "Tinha 5 GB e roda de rolagem mecânica.",
        "source": "Apple"
      },
      {
        "id": "d35",
        "text": "Quantos kilobytes cabiam num disquete comum de 3,5 polegadas?",
        "answer": 1440,
        "unit": "KB",
        "fact": "O \"1,44 MB\" da etiqueta é, na verdade, 1440 KB.",
        "source": "IBM"
      },
      {
        "id": "d36",
        "text": "Quantos minutos de música cabiam num CD no padrão original?",
        "answer": 74,
        "unit": "minutos",
        "fact": "Diz a lenda que era pra caber a 9ª Sinfonia de Beethoven inteira.",
        "source": "Sony / Philips"
      },
      {
        "id": "d37",
        "text": "Em que ano o avião dos Mamonas Assassinas caiu?",
        "answer": 1996,
        "unit": "ano",
        "fact": "A banda tinha estourado menos de um ano antes.",
        "source": "Memória Globo"
      },
      {
        "id": "d38",
        "text": "Em que ano estreou o Show do Milhão no SBT?",
        "answer": 1999,
        "unit": "ano",
        "fact": "\"Está certo disso?\" virou bordão nacional.",
        "source": "SBT"
      },
      {
        "id": "d39",
        "text": "Em que ano foi lançado o Windows XP?",
        "answer": 2001,
        "unit": "ano",
        "fact": "Ficou com suporte oficial até 2014.",
        "source": "Microsoft"
      },
      {
        "id": "d40",
        "text": "Em que ano estreou Bob Esponja nos EUA?",
        "answer": 1999,
        "unit": "ano",
        "fact": "O criador era biólogo marinho.",
        "source": "Nickelodeon"
      },
      {
        "id": "d41",
        "text": "Quantos episódios teve Todo Mundo Odeia o Chris?",
        "answer": 88,
        "unit": "episódios",
        "fact": "Foram 4 temporadas; no Brasil, a Record reprisou sem parar.",
        "source": "CW / UPN"
      },
      {
        "id": "d42",
        "text": "Em que ano o Furby foi lançado?",
        "answer": 1998,
        "unit": "ano",
        "fact": "Vendeu 40 milhões em 3 anos.",
        "source": "Hasbro / Tiger"
      },
      {
        "id": "d43",
        "text": "Em que ano o MSN Messenger foi desligado (fora da China)?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Os usuários foram levados pro Skype.",
        "source": "Microsoft"
      },
      {
        "id": "d44",
        "text": "Em que ano Sandy & Junior lançaram o primeiro disco?",
        "answer": 1991,
        "unit": "ano",
        "fact": "Sandy tinha 8 anos; o disco era \"Aniversário do Tatu\".",
        "source": "Universal Music"
      },
      {
        "id": "d45",
        "text": "Em que ano o anime Pokémon estreou no Japão?",
        "answer": 1997,
        "unit": "ano",
        "fact": "No Brasil, chegou em 1999.",
        "source": "The Pokémon Company"
      },
      {
        "id": "d46",
        "text": "Em que ano estreou o Domingo Legal do Gugu?",
        "answer": 1993,
        "unit": "ano",
        "fact": "Brigou anos pela audiência com o Faustão.",
        "source": "SBT"
      },
      {
        "id": "d47",
        "text": "Em que ano estreou o Pânico na TV?",
        "answer": 2003,
        "unit": "ano",
        "fact": "Começou no rádio, na Jovem Pan.",
        "source": "RedeTV!"
      },
      {
        "id": "d48",
        "text": "Em que ano estreou a versão brasileira de Chiquititas no SBT?",
        "answer": 1997,
        "unit": "ano",
        "fact": "Foi gravada na Argentina.",
        "source": "SBT"
      },
      {
        "id": "d49",
        "text": "Quantas temporadas teve Um Maluco no Pedaço?",
        "answer": 6,
        "unit": "temporadas",
        "fact": "Will Smith tinha 21 anos na estreia.",
        "source": "NBC"
      },
      {
        "id": "d50",
        "text": "Em que ano foi lançado o primeiro GTA?",
        "answer": 1997,
        "unit": "ano",
        "fact": "Era visto de cima, em 2D.",
        "source": "Rockstar"
      },
      {
        "id": "d51",
        "text": "Em que ano estreou O Rei Leão (o desenho)?",
        "answer": 1994,
        "unit": "ano",
        "fact": "Foi a maior bilheteria de animação até então.",
        "source": "Disney"
      }
    ]
  },
  {
    "id": "memes",
    "title": "memes",
    "tagline": "cronicamente online, nível 2",
    "premium": true,
    "isNew": true,
    "icon": "meme",
    "tint": "#C5F0EA",
    "questions": [
      {
        "id": "c32",
        "text": "Quantos segundos dura Me at the zoo, o primeiro vídeo do YouTube?",
        "answer": 19,
        "unit": "segundos",
        "fact": "Foi postado por Jawed Karim, um dos fundadores.",
        "source": "YouTube"
      },
      {
        "id": "c33",
        "text": "Em que ano foi lançada Never Gonna Give You Up, a música do Rickroll?",
        "answer": 1987,
        "unit": "ano",
        "fact": "O Rickroll virou meme só em 2007.",
        "source": "Wikipédia (Rickrolling)"
      },
      {
        "id": "c34",
        "text": "Em que ano foi postado o vídeo Charlie bit my finger?",
        "answer": 2007,
        "unit": "ano",
        "fact": "O vídeo foi vendido como NFT em 2021.",
        "source": "YouTube"
      },
      {
        "id": "c35",
        "text": "Em que ano foi tirada a foto da Kabosu que virou o meme Doge?",
        "answer": 2010,
        "unit": "ano",
        "fact": "A Kabosu era uma shiba inu do Japão.",
        "source": "Know Your Meme"
      },
      {
        "id": "c36",
        "text": "Quantos anos tinha a Kabosu (a cachorrinha do Doge) quando morreu em 2024?",
        "answer": 18,
        "unit": "anos",
        "fact": "O meme inspirou até uma criptomoeda.",
        "source": "Know Your Meme"
      },
      {
        "id": "c37",
        "text": "Em que ano o clipe de Gangnam Style foi lançado?",
        "answer": 2012,
        "unit": "ano",
        "fact": "Foi o primeiro vídeo a passar de 1 bilhão de views.",
        "source": "YouTube"
      },
      {
        "id": "c38",
        "text": "Quantas visualizações Gangnam Style tinha quando estourou o contador do YouTube?",
        "answer": 2147483647,
        "unit": "views",
        "fact": "É o maior número que cabe num inteiro de 32 bits.",
        "source": "Google / YouTube (2014)"
      },
      {
        "id": "c39",
        "text": "Em que ano viralizou o Harlem Shake?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Milhares de versões foram postadas em poucas semanas.",
        "source": "Know Your Meme"
      },
      {
        "id": "c40",
        "text": "Em que ano viralizou o desafio do balde de gelo (Ice Bucket Challenge)?",
        "answer": 2014,
        "unit": "ano",
        "fact": "Arrecadou mais de 100 milhões de dólares para a pesquisa da ELA.",
        "source": "ALS Association"
      },
      {
        "id": "c41",
        "text": "Quantos anos viveu a Grumpy Cat?",
        "answer": 7,
        "unit": "anos",
        "fact": "Seu nome de verdade era Tardar Sauce.",
        "source": "Know Your Meme"
      },
      {
        "id": "c42",
        "text": "Em que ano viralizou o vestido azul e preto (ou branco e dourado)?",
        "answer": 2015,
        "unit": "ano",
        "fact": "O vestido era azul e preto.",
        "source": "Wikipédia (The dress)"
      },
      {
        "id": "c43",
        "text": "Em que ano foi lançado o vídeo Baby Shark Dance?",
        "answer": 2016,
        "unit": "ano",
        "fact": "Virou o vídeo mais visto da história do YouTube.",
        "source": "Pinkfong"
      },
      {
        "id": "c44",
        "text": "Em que ano o sapo Pepe apareceu pela primeira vez nos quadrinhos?",
        "answer": 2005,
        "unit": "ano",
        "fact": "Na revista Boy's Club de Matt Furie.",
        "source": "Know Your Meme"
      },
      {
        "id": "c45",
        "text": "Em que ano foi tirada a foto do namorado distraído (Distracted Boyfriend)?",
        "answer": 2015,
        "unit": "ano",
        "fact": "O fotógrafo é Antonio Guillem, de Barcelona.",
        "source": "Know Your Meme"
      },
      {
        "id": "d52",
        "text": "Em que ano viralizou o vídeo \"Para Nossa Alegria\"?",
        "answer": 2012,
        "unit": "ano",
        "fact": "Quase 10 milhões de visualizações na primeira semana.",
        "source": "Know Your Meme"
      },
      {
        "id": "d53",
        "text": "Em que ano viralizou \"Menos a Luiza, que está no Canadá\"?",
        "answer": 2012,
        "unit": "ano",
        "fact": "Era um comercial de imóveis na Paraíba.",
        "source": "Know Your Meme"
      },
      {
        "id": "d54",
        "text": "Em que ano surgiu a \"grávida de Taubaté\"?",
        "answer": 2012,
        "unit": "ano",
        "fact": "A barriga era de pano.",
        "source": "Know Your Meme"
      },
      {
        "id": "d55",
        "text": "Em que ano Inês Brasil gravou o vídeo de inscrição pro BBB que a deixou famosa?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Ela nunca foi escolhida pro programa.",
        "source": "Know Your Meme"
      },
      {
        "id": "d56",
        "text": "Em que ano foi postado o vídeo \"Numa Numa\"?",
        "answer": 2004,
        "unit": "ano",
        "fact": "Um dos primeiros virais da internet, antes do YouTube existir.",
        "source": "Know Your Meme"
      },
      {
        "id": "d57",
        "text": "Em que ano surgiu o Dancing Baby, um dos primeiros memes da internet?",
        "answer": 1996,
        "unit": "ano",
        "fact": "Era um GIF 3D que rodava por e-mail.",
        "source": "Know Your Meme"
      },
      {
        "id": "d58",
        "text": "Em que ano surgiram os \"Chuck Norris facts\"?",
        "answer": 2005,
        "unit": "ano",
        "fact": "O próprio Chuck escreveu um livro respondendo.",
        "source": "Know Your Meme"
      },
      {
        "id": "d59",
        "text": "Em que ano foi gravada a apresentação original do Trololo?",
        "answer": 1976,
        "unit": "ano",
        "fact": "Só viralizou em 2010, 34 anos depois.",
        "source": "Know Your Meme"
      },
      {
        "id": "d60",
        "text": "Em que ano o vídeo dos carregadores de caixão de Gana virou meme no mundo todo?",
        "answer": 2020,
        "unit": "ano",
        "fact": "O \"coffin dance\" virou trilha da pandemia.",
        "source": "Know Your Meme"
      },
      {
        "id": "d61",
        "text": "Quantos segundos era o limite de um vídeo do Vine?",
        "answer": 6,
        "unit": "segundos",
        "fact": "Deu origem a uma geração de influencers.",
        "source": "Twitter"
      },
      {
        "id": "d62",
        "text": "Em que ano o Vine foi encerrado?",
        "answer": 2017,
        "unit": "ano",
        "fact": "Tinha sido comprado pelo Twitter antes mesmo de lançar.",
        "source": "Twitter"
      },
      {
        "id": "d63",
        "text": "Em que ano Rebecca Black lançou \"Friday\"?",
        "answer": 2011,
        "unit": "ano",
        "fact": "Virou o vídeo com mais \"não gostei\" do YouTube na época.",
        "source": "Know Your Meme"
      },
      {
        "id": "d64",
        "text": "Em que ano foi postado o \"Leave Britney Alone\"?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Chris Crocker gravou chorando na cama.",
        "source": "Know Your Meme"
      },
      {
        "id": "d65",
        "text": "Em que ano saiu \"What Does the Fox Say?\"?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Era pra ser uma música de piada.",
        "source": "Know Your Meme"
      },
      {
        "id": "d66",
        "text": "Em que ano surgiu a pegadinha do Rickroll?",
        "answer": 2007,
        "unit": "ano",
        "fact": "Começou no fórum 4chan.",
        "source": "Know Your Meme"
      },
      {
        "id": "d67",
        "text": "Em que ano o WhatsApp lançou as figurinhas?",
        "answer": 2018,
        "unit": "ano",
        "fact": "O \"bom dia, grupo\" nunca mais foi o mesmo.",
        "source": "WhatsApp"
      },
      {
        "id": "d68",
        "text": "Em que ano o emoji 😂 foi eleito a \"palavra do ano\" pelo dicionário Oxford?",
        "answer": 2015,
        "unit": "ano",
        "fact": "Foi a primeira vez que um emoji ganhou.",
        "source": "Oxford Dictionaries"
      },
      {
        "id": "d69",
        "text": "Em que ano foi publicado o quadrinho do cachorro \"This is fine\"?",
        "answer": 2013,
        "unit": "ano",
        "fact": "O autor é KC Green.",
        "source": "Know Your Meme"
      },
      {
        "id": "d70",
        "text": "Em que ano foi tirada a foto do Success Kid (o bebê com a mão de areia)?",
        "answer": 2007,
        "unit": "ano",
        "fact": "O dinheiro do meme ajudou a pagar um transplante de rim do pai.",
        "source": "Know Your Meme"
      },
      {
        "id": "d71",
        "text": "Em que ano seria o \"fim do mundo\" pelo calendário maia, que virou piada mundial?",
        "answer": 2012,
        "unit": "ano",
        "fact": "21 de dezembro. Não aconteceu nada.",
        "source": "NASA"
      }
    ]
  },
  {
    "id": "picante",
    "title": "picante",
    "tagline": "só com a galera certa",
    "premium": true,
    "isNew": true,
    "icon": "pepper",
    "tint": "#FF9C8A",
    "questions": [
      {
        "id": "c46",
        "text": "Quantas horas durou o beijo mais longo do mundo (recorde do Guinness)?",
        "answer": 58,
        "unit": "horas",
        "fact": "Um casal na Tailândia, em 2013. Ganharam até um prêmio em dinheiro.",
        "source": "Guinness World Records"
      },
      {
        "id": "c47",
        "text": "Em que ano o Viagra foi aprovado nos Estados Unidos?",
        "answer": 1998,
        "unit": "ano",
        "fact": "O remédio nasceu de uma pesquisa para o coração.",
        "source": "FDA"
      },
      {
        "id": "c48",
        "text": "Em que ano a primeira pílula anticoncepcional foi aprovada nos Estados Unidos?",
        "answer": 1960,
        "unit": "ano",
        "fact": "Mudou a história do comportamento no século 20.",
        "source": "FDA"
      },
      {
        "id": "c49",
        "text": "Quantas posições sexuais o Kama Sutra descreve na lista mais famosa?",
        "answer": 64,
        "unit": "posições",
        "fact": "Na verdade são 64 artes do amor; o livro fala muito mais de relacionamento.",
        "source": "Kama Sutra (Vatsyayana)"
      },
      {
        "id": "c50",
        "text": "Em que ano o Tinder foi lançado?",
        "answer": 2012,
        "unit": "ano",
        "fact": "O swipe virou verbo em várias línguas.",
        "source": "Match Group"
      },
      {
        "id": "c51",
        "text": "Em que ano estreou nos cinemas o filme Cinquenta Tons de Cinza?",
        "answer": 2015,
        "unit": "ano",
        "fact": "O livro vendeu mais de 150 milhões de cópias.",
        "source": "Universal Pictures"
      },
      {
        "id": "c52",
        "text": "Em que ano estreou a série Sex and the City?",
        "answer": 1998,
        "unit": "ano",
        "fact": "Foram 6 temporadas e 94 episódios.",
        "source": "HBO"
      },
      {
        "id": "c53",
        "text": "Em que ano saiu a primeira edição da revista Playboy?",
        "answer": 1953,
        "unit": "ano",
        "fact": "A capa era a Marilyn Monroe.",
        "source": "Playboy Enterprises"
      },
      {
        "id": "c54",
        "text": "Quantos anos Marilyn Monroe tinha quando foi capa da primeira Playboy?",
        "answer": 27,
        "unit": "anos",
        "fact": "As fotos tinham sido feitas anos antes para um calendário.",
        "source": "Playboy Enterprises"
      },
      {
        "id": "c55",
        "text": "Em que ano o Grindr foi lançado?",
        "answer": 2009,
        "unit": "ano",
        "fact": "Foi um dos primeiros apps de encontro por localização.",
        "source": "Grindr"
      },
      {
        "id": "c56",
        "text": "Em que ano foi inventada a camisinha de látex?",
        "answer": 1920,
        "unit": "ano",
        "fact": "Antes eram feitas de borracha grossa ou de tripa animal.",
        "source": "Smithsonian"
      },
      {
        "id": "d72",
        "text": "Quantos minutos dura, em média, uma relação sexual (estudo com 500 casais)?",
        "answer": 5,
        "unit": "minutos",
        "fact": "A mediana foi 5,4 minutos; o mais rápido, 33 segundos.",
        "source": "Waldinger et al., J Sex Med (2005)"
      },
      {
        "id": "d73",
        "text": "Quantas camisinhas foram distribuídas na Vila Olímpica do Rio 2016?",
        "answer": 450000,
        "unit": "camisinhas",
        "fact": "Três vezes mais do que em Londres 2012.",
        "source": "COI / Rio 2016"
      },
      {
        "id": "d74",
        "text": "Em que ano a camisinha feminina foi aprovada nos EUA?",
        "answer": 1993,
        "unit": "ano",
        "fact": "Hoje é distribuída de graça no SUS.",
        "source": "FDA"
      },
      {
        "id": "d75",
        "text": "Com quantos anos Hugh Hefner, o criador da Playboy, morreu?",
        "answer": 91,
        "unit": "anos",
        "fact": "Viveu até o fim na Mansão Playboy.",
        "source": "Playboy"
      },
      {
        "id": "d76",
        "text": "Em que ano o OnlyFans foi lançado?",
        "answer": 2016,
        "unit": "ano",
        "fact": "Explodiu na pandemia de 2020.",
        "source": "OnlyFans"
      },
      {
        "id": "d77",
        "text": "Em que ano estreou Bridgerton na Netflix?",
        "answer": 2020,
        "unit": "ano",
        "fact": "Foi assistida por 82 milhões de casas no primeiro mês.",
        "source": "Netflix"
      },
      {
        "id": "d78",
        "text": "Em que ano a Playboy americana parou de publicar nus (e depois voltou atrás)?",
        "answer": 2016,
        "unit": "ano",
        "fact": "Voltaram em 2017.",
        "source": "Playboy"
      },
      {
        "id": "d79",
        "text": "Em que ano estreou \"9½ Semanas de Amor\"?",
        "answer": 1986,
        "unit": "ano",
        "fact": "A cena da geladeira entrou pra história.",
        "source": "IMDb"
      },
      {
        "id": "d80",
        "text": "Em que ano estreou \"Instinto Selvagem\", da cruzada de pernas da Sharon Stone?",
        "answer": 1992,
        "unit": "ano",
        "fact": "Ela diz que não sabia o que estava sendo filmado.",
        "source": "IMDb"
      },
      {
        "id": "d81",
        "text": "Em que ano estreou \"Dirty Dancing\"?",
        "answer": 1987,
        "unit": "ano",
        "fact": "\"Ninguém põe Baby de castigo.\"",
        "source": "IMDb"
      },
      {
        "id": "d82",
        "text": "Quantas horas durou o casamento de Britney Spears em Las Vegas, em 2004?",
        "answer": 55,
        "unit": "horas",
        "fact": "Foi anulado na segunda-feira seguinte.",
        "source": "imprensa internacional"
      },
      {
        "id": "d83",
        "text": "Quantos dias durou o casamento de Kim Kardashian com Kris Humphries?",
        "answer": 72,
        "unit": "dias",
        "fact": "O casamento foi transmitido na TV.",
        "source": "imprensa internacional"
      },
      {
        "id": "d84",
        "text": "Quantas vezes Elizabeth Taylor se casou?",
        "answer": 8,
        "unit": "vezes",
        "fact": "Duas delas com o mesmo homem, Richard Burton.",
        "source": "imprensa internacional"
      },
      {
        "id": "d85",
        "text": "Quantas esposas teve o rei Henrique VIII?",
        "answer": 6,
        "unit": "esposas",
        "fact": "Duas foram decapitadas.",
        "source": "história"
      },
      {
        "id": "d86",
        "text": "Em que ano foi lançado o Bumble, o app em que a mulher manda a primeira mensagem?",
        "answer": 2014,
        "unit": "ano",
        "fact": "A fundadora tinha saído do Tinder.",
        "source": "Bumble"
      },
      {
        "id": "d87",
        "text": "Em que ano o Dia dos Namorados foi criado no Brasil, numa jogada de publicidade?",
        "answer": 1949,
        "unit": "ano",
        "fact": "12 de junho: véspera de Santo Antônio, o santo casamenteiro.",
        "source": "história da publicidade brasileira"
      },
      {
        "id": "d88",
        "text": "Em que ano o divórcio foi aprovado no Brasil?",
        "answer": 1977,
        "unit": "ano",
        "fact": "Antes disso, só existia o \"desquite\".",
        "source": "Lei 6.515/1977"
      },
      {
        "id": "d89",
        "text": "Em que ano os cartórios do Brasil passaram a ser obrigados a celebrar casamento entre pessoas do mesmo sexo?",
        "answer": 2013,
        "unit": "ano",
        "fact": "Foi por uma resolução do CNJ.",
        "source": "CNJ, Resolução 175"
      },
      {
        "id": "d90",
        "text": "Quantos anos Julieta tinha em \"Romeu e Julieta\"?",
        "answer": 13,
        "unit": "anos",
        "fact": "Shakespeare diz que ela ainda não tinha 14.",
        "source": "Shakespeare"
      },
      {
        "id": "d91",
        "text": "Em que ano estreou a série Sex Education?",
        "answer": 2019,
        "unit": "ano",
        "fact": "Teve 4 temporadas.",
        "source": "Netflix"
      }
    ]
  },
  {
    "id": "tv",
    "title": "novelas & TV",
    "tagline": "quem viu, viu",
    "premium": true,
    "isNew": true,
    "icon": "tv",
    "tint": "#FFD0A8",
    "questions": [
      {
        "id": "d149",
        "text": "Quantos capítulos teve Avenida Brasil?",
        "answer": 179,
        "unit": "capítulos",
        "fact": "O último parou o país em outubro de 2012.",
        "source": "Memória Globo"
      },
      {
        "id": "d150",
        "text": "Em que ano foi ao ar Senhora do Destino, da Nazaré Tedesco?",
        "answer": 2004,
        "unit": "ano",
        "fact": "A Nazaré virou meme mais de 10 anos depois.",
        "source": "Memória Globo"
      },
      {
        "id": "d151",
        "text": "Em que ano estreou Roque Santeiro?",
        "answer": 1985,
        "unit": "ano",
        "fact": "Tinha sido censurada 10 anos antes.",
        "source": "Memória Globo"
      },
      {
        "id": "d152",
        "text": "Em que ano estreou o Jornal Nacional?",
        "answer": 1969,
        "unit": "ano",
        "fact": "Foi o primeiro telejornal em rede nacional.",
        "source": "Memória Globo"
      },
      {
        "id": "d153",
        "text": "Em que ano a TV Globo foi inaugurada?",
        "answer": 1965,
        "unit": "ano",
        "fact": "No Rio de Janeiro, em 26 de abril.",
        "source": "Memória Globo"
      },
      {
        "id": "d154",
        "text": "Em que ano a televisão chegou ao Brasil?",
        "answer": 1950,
        "unit": "ano",
        "fact": "A TV Tupi, de Assis Chateaubriand.",
        "source": "história da TV brasileira"
      },
      {
        "id": "d155",
        "text": "Em que ano a primeira transmissão em cores foi feita no Brasil?",
        "answer": 1972,
        "unit": "ano",
        "fact": "Foi a Festa da Uva, em Caxias do Sul.",
        "source": "história da TV brasileira"
      },
      {
        "id": "d156",
        "text": "Por quantos anos o Faustão comandou o Domingão na Globo?",
        "answer": 32,
        "unit": "anos",
        "fact": "De 1989 a 2021.",
        "source": "Memória Globo"
      },
      {
        "id": "d157",
        "text": "Com quantos anos Silvio Santos morreu?",
        "answer": 93,
        "unit": "anos",
        "fact": "Em agosto de 2024.",
        "source": "SBT"
      },
      {
        "id": "d158",
        "text": "Em que ano estreou o Programa Silvio Santos?",
        "answer": 1963,
        "unit": "ano",
        "fact": "Começou na TV Paulista, antes do SBT existir.",
        "source": "SBT"
      },
      {
        "id": "d159",
        "text": "Em que ano estreou a novela Carrossel no SBT?",
        "answer": 2012,
        "unit": "ano",
        "fact": "Remake da novela mexicana dos anos 80.",
        "source": "SBT"
      },
      {
        "id": "d160",
        "text": "Quantos reais Davi levou como prêmio do BBB 24?",
        "answer": 2920000,
        "unit": "reais",
        "fact": "O maior prêmio da história do programa até então.",
        "source": "TV Globo"
      },
      {
        "id": "d161",
        "text": "Em que ano estreou o Fantástico?",
        "answer": 1973,
        "unit": "ano",
        "fact": "\"O show da vida.\"",
        "source": "Memória Globo"
      },
      {
        "id": "d162",
        "text": "Em que ano estreou Sai de Baixo?",
        "answer": 1996,
        "unit": "ano",
        "fact": "Era gravado com plateia num teatro em São Paulo.",
        "source": "Memória Globo"
      },
      {
        "id": "d163",
        "text": "Em que ano Os Trapalhões estrearam na Globo?",
        "answer": 1977,
        "unit": "ano",
        "fact": "Antes, passavam na Tupi.",
        "source": "Memória Globo"
      },
      {
        "id": "d164",
        "text": "Por quantos anos Cid Moreira apresentou o Jornal Nacional?",
        "answer": 27,
        "unit": "anos",
        "fact": "De 1969 a 1996.",
        "source": "Memória Globo"
      },
      {
        "id": "d165",
        "text": "Em que ano estreou o Sítio do Picapau Amarelo da Globo (a versão clássica)?",
        "answer": 1977,
        "unit": "ano",
        "fact": "A abertura era do Gilberto Gil.",
        "source": "Memória Globo"
      },
      {
        "id": "d166",
        "text": "Em que ano estreou o Programa do Jô na Globo?",
        "answer": 2000,
        "unit": "ano",
        "fact": "Antes ele tinha o Jô Soares Onze e Meia, no SBT.",
        "source": "Memória Globo"
      },
      {
        "id": "d167",
        "text": "Em que ano estreou o Caldeirão do Huck?",
        "answer": 2000,
        "unit": "ano",
        "fact": "Ficou no ar até 2021.",
        "source": "Memória Globo"
      },
      {
        "id": "d168",
        "text": "Em que ano estreou Terra Nostra?",
        "answer": 1999,
        "unit": "ano",
        "fact": "Contava a chegada dos imigrantes italianos.",
        "source": "Memória Globo"
      },
      {
        "id": "d169",
        "text": "Em que ano estreou o remake de Pantanal na Globo?",
        "answer": 2022,
        "unit": "ano",
        "fact": "A primeira versão era de 1990, na Manchete.",
        "source": "Memória Globo"
      },
      {
        "id": "d170",
        "text": "Em que ano estreou A Praça é Nossa no SBT?",
        "answer": 1987,
        "unit": "ano",
        "fact": "Herdeira da Praça da Alegria, dos anos 50.",
        "source": "SBT"
      },
      {
        "id": "d171",
        "text": "Em que ano estreou a novela Escrava Isaura?",
        "answer": 1976,
        "unit": "ano",
        "fact": "Foi vendida pra dezenas de países, inclusive a China.",
        "source": "Memória Globo"
      }
    ]
  },
  {
    "id": "musica",
    "title": "música",
    "tagline": "do hino ao funk",
    "premium": true,
    "isNew": true,
    "icon": "note",
    "tint": "#E2C8FF",
    "questions": [
      {
        "id": "d172",
        "text": "Com quantos anos Mozart compôs as primeiras músicas?",
        "answer": 5,
        "unit": "anos",
        "fact": "Morreu com 35 e deixou mais de 600 obras.",
        "source": "Mozarteum"
      },
      {
        "id": "d173",
        "text": "Quantas sinfonias Beethoven compôs?",
        "answer": 9,
        "unit": "sinfonias",
        "fact": "Compôs a última já completamente surdo.",
        "source": "Beethoven-Haus Bonn"
      },
      {
        "id": "d174",
        "text": "Em que ano saiu \"Chega de Saudade\", de João Gilberto, que marca o começo da Bossa Nova?",
        "answer": 1958,
        "unit": "ano",
        "fact": "A batida do violão foi a novidade.",
        "source": "Instituto Antonio Carlos Jobim"
      },
      {
        "id": "d175",
        "text": "Em que ano \"Garota de Ipanema\" foi composta?",
        "answer": 1962,
        "unit": "ano",
        "fact": "É uma das músicas mais gravadas do mundo.",
        "source": "Instituto Antonio Carlos Jobim"
      },
      {
        "id": "d176",
        "text": "Em que ano foi exibido o primeiro especial de fim de ano do Roberto Carlos na Globo?",
        "answer": 1974,
        "unit": "ano",
        "fact": "Virou tradição de quase 50 anos.",
        "source": "Memória Globo"
      },
      {
        "id": "d177",
        "text": "Em que ano Michael Jackson lançou \"Thriller\"?",
        "answer": 1982,
        "unit": "ano",
        "fact": "É o álbum mais vendido da história.",
        "source": "Guinness World Records"
      },
      {
        "id": "d178",
        "text": "Quantas pessoas foram ao show dos Rolling Stones em Copacabana, em 2006?",
        "answer": 1500000,
        "unit": "pessoas",
        "fact": "Show gratuito, na areia, com palco montado em frente ao Copacabana Palace.",
        "source": "Riotur"
      },
      {
        "id": "d179",
        "text": "Quantas pessoas foram ao show da Madonna em Copacabana, em 2024?",
        "answer": 1600000,
        "unit": "pessoas",
        "fact": "Show gratuito, na areia.",
        "source": "Riotur"
      },
      {
        "id": "d180",
        "text": "Quantas pessoas foram ao show da Lady Gaga em Copacabana, em 2025?",
        "answer": 2100000,
        "unit": "pessoas",
        "fact": "Bateu o recorde da Madonna um ano depois.",
        "source": "Prefeitura do Rio / Riotur"
      },
      {
        "id": "d181",
        "text": "Em que ano saiu o disco \"Tropicália\", marco do Tropicalismo?",
        "answer": 1968,
        "unit": "ano",
        "fact": "Caetano, Gil, Gal, Mutantes e Tom Zé.",
        "source": "Universal Music"
      },
      {
        "id": "d182",
        "text": "Com quantos anos Raul Seixas morreu?",
        "answer": 44,
        "unit": "anos",
        "fact": "Em 1989, dias depois de lançar um disco.",
        "source": "imprensa brasileira"
      },
      {
        "id": "d183",
        "text": "Quantas semanas \"Despacito\" ficou em 1º lugar na parada americana?",
        "answer": 16,
        "unit": "semanas",
        "fact": "Recorde pra uma música em espanhol.",
        "source": "Billboard"
      },
      {
        "id": "d184",
        "text": "Quantas semanas \"Old Town Road\" ficou em 1º lugar na parada americana?",
        "answer": 19,
        "unit": "semanas",
        "fact": "Foi recorde da Billboard Hot 100.",
        "source": "Billboard"
      },
      {
        "id": "d185",
        "text": "Em que ano Anitta lançou \"Show das Poderosas\"?",
        "answer": 2013,
        "unit": "ano",
        "fact": "O clipe foi o que a tornou nacional.",
        "source": "Warner Music"
      },
      {
        "id": "d186",
        "text": "Em que ano \"Envolver\", da Anitta, chegou ao 1º lugar global do Spotify?",
        "answer": 2022,
        "unit": "ano",
        "fact": "Primeira vez de uma artista brasileira solo.",
        "source": "Spotify"
      },
      {
        "id": "d187",
        "text": "Em que ano foi lançado \"Ai Se Eu Te Pego\", do Michel Teló?",
        "answer": 2011,
        "unit": "ano",
        "fact": "Cristiano Ronaldo dançou num gol e o mundo inteiro copiou.",
        "source": "Som Livre"
      },
      {
        "id": "d188",
        "text": "Quantas cordas tem um cavaquinho?",
        "answer": 4,
        "unit": "cordas",
        "fact": "É parente do ukulele havaiano.",
        "source": "instrumentos brasileiros"
      },
      {
        "id": "d189",
        "text": "Quantos integrantes tinham os Titãs quando a banda começou?",
        "answer": 9,
        "unit": "integrantes",
        "fact": "Começaram como \"Titãs do Iê-Iê\".",
        "source": "história do rock brasileiro"
      },
      {
        "id": "d190",
        "text": "Em que ano o Spotify chegou ao Brasil?",
        "answer": 2014,
        "unit": "ano",
        "fact": "Seis anos depois do lançamento na Suécia.",
        "source": "Spotify"
      },
      {
        "id": "d191",
        "text": "Quantos minutos dura \"Bohemian Rhapsody\", do Queen (arredondando)?",
        "answer": 6,
        "unit": "minutos",
        "fact": "A gravadora achava longa demais pra tocar no rádio.",
        "source": "Queen"
      },
      {
        "id": "d192",
        "text": "Em que ano Dodô e Osmar saíram com o primeiro trio elétrico no Carnaval de Salvador?",
        "answer": 1950,
        "unit": "ano",
        "fact": "Era um Ford 1929, a \"Fobica\".",
        "source": "Carnaval de Salvador"
      },
      {
        "id": "d193",
        "text": "Com quantos anos Mozart morreu?",
        "answer": 35,
        "unit": "anos",
        "fact": "Deixou o Réquiem inacabado.",
        "source": "Mozarteum"
      },
      {
        "id": "d194",
        "text": "Quantas estrofes tem o Hino Nacional Brasileiro?",
        "answer": 2,
        "unit": "estrofes",
        "fact": "Quase todo mundo só sabe cantar a primeira.",
        "source": "Lei 5.700/1971"
      },
      {
        "id": "d195",
        "text": "Em que ano a letra do Hino Nacional foi oficializada?",
        "answer": 1922,
        "unit": "ano",
        "fact": "A música já existia desde 1831; a letra veio 90 anos depois.",
        "source": "Planalto"
      },
      {
        "id": "d196",
        "text": "Com quantos anos Elis Regina morreu?",
        "answer": 36,
        "unit": "anos",
        "fact": "Em 1982.",
        "source": "imprensa brasileira"
      }
    ]
  },
  {
    "id": "dinheiro",
    "title": "dinheiro",
    "tagline": "quanto custa? mais do que você acha",
    "premium": true,
    "isNew": true,
    "icon": "money",
    "tint": "#C8EFA0",
    "questions": [
      {
        "id": "d197",
        "text": "Por quantos dólares o primeiro iPhone foi vendido nos EUA?",
        "answer": 499,
        "unit": "dólares",
        "fact": "Era o de 4 GB.",
        "source": "Apple"
      },
      {
        "id": "d198",
        "text": "Qual a chance de acertar a Mega-Sena com 6 números? 1 em quanto?",
        "answer": 50063860,
        "unit": "chances",
        "fact": "É mais fácil morrer atingido por um raio.",
        "source": "Caixa"
      },
      {
        "id": "d199",
        "text": "Por quantos bilhões de dólares Elon Musk comprou o Twitter?",
        "answer": 44,
        "unit": "bilhões de dólares",
        "fact": "Em 2022. Virou X um ano depois.",
        "source": "imprensa internacional"
      },
      {
        "id": "d200",
        "text": "Por quantos milhões de dólares o Facebook comprou o Instagram, em 2012?",
        "answer": 1000,
        "unit": "milhões de dólares",
        "fact": "O Instagram tinha 13 funcionários.",
        "source": "Meta"
      },
      {
        "id": "d201",
        "text": "Por quantos milhões de dólares o Google comprou o YouTube, em 2006?",
        "answer": 1650,
        "unit": "milhões de dólares",
        "fact": "O YouTube tinha 1 ano e meio.",
        "source": "Google"
      },
      {
        "id": "d202",
        "text": "Por quantos bilhões de dólares a Disney comprou a Lucasfilm (Star Wars)?",
        "answer": 4,
        "unit": "bilhões de dólares",
        "fact": "Em 2012; recuperou só com os filmes novos.",
        "source": "Disney"
      },
      {
        "id": "d203",
        "text": "Quantos bitcoins um programador pagou por 2 pizzas, em 2010?",
        "answer": 10000,
        "unit": "bitcoins",
        "fact": "Hoje seriam centenas de milhões de dólares.",
        "source": "Bitcoin Pizza Day"
      },
      {
        "id": "d204",
        "text": "Quantos cruzeiros reais valia 1 real quando o Real foi criado, em 1994?",
        "answer": 2750,
        "unit": "cruzeiros reais",
        "fact": "Antes, existiu a URV pra fazer a transição.",
        "source": "Banco Central"
      },
      {
        "id": "d205",
        "text": "Quantas moedas diferentes o Brasil teve de 1942 até o Real (contando o Real)?",
        "answer": 8,
        "unit": "moedas",
        "fact": "O Cruzeiro voltou três vezes.",
        "source": "Banco Central"
      },
      {
        "id": "d206",
        "text": "Qual foi a inflação do Brasil em 1993 (%)?",
        "answer": 2477,
        "unit": "%",
        "fact": "Os preços mudavam no mesmo dia no supermercado.",
        "source": "IBGE (IPCA)"
      },
      {
        "id": "d207",
        "text": "Quantos milhões de dólares custava um comercial de 30 segundos no Super Bowl de 2025?",
        "answer": 8,
        "unit": "milhões de dólares",
        "fact": "Mais de 250 mil dólares por segundo.",
        "source": "Fox / imprensa americana"
      },
      {
        "id": "d208",
        "text": "Por quantos milhões de dólares foi vendido o Salvator Mundi, o quadro mais caro do mundo?",
        "answer": 450,
        "unit": "milhões de dólares",
        "fact": "Atribuído a Leonardo da Vinci; o paradeiro é um mistério.",
        "source": "Christie's"
      },
      {
        "id": "d209",
        "text": "Quantos milhões de libras o Brasil pagou a Portugal pelo reconhecimento da Independência?",
        "answer": 2,
        "unit": "milhões de libras",
        "fact": "O dinheiro foi emprestado da Inglaterra.",
        "source": "Tratado de 1825"
      },
      {
        "id": "d210",
        "text": "Por quantos milhões de dólares os EUA compraram o Alasca da Rússia?",
        "answer": 7,
        "unit": "milhões de dólares",
        "fact": "7,2 milhões, em 1867. Chamaram de \"loucura\".",
        "source": "Arquivos Nacionais dos EUA"
      },
      {
        "id": "d211",
        "text": "Por quantos bilhões de dólares a Microsoft comprou a Activision (Call of Duty)?",
        "answer": 69,
        "unit": "bilhões de dólares",
        "fact": "A maior compra da história dos games.",
        "source": "Microsoft"
      },
      {
        "id": "d212",
        "text": "Em que ano o Pix foi lançado?",
        "answer": 2020,
        "unit": "ano",
        "fact": "Foi lançado em novembro, no meio da pandemia.",
        "source": "Banco Central"
      },
      {
        "id": "d213",
        "text": "Por quantos dólares o Apple I, o primeiro computador da Apple, era vendido?",
        "answer": 666,
        "unit": "dólares",
        "fact": "Exatos US$ 666,66. Wozniak gostava de números repetidos.",
        "source": "Apple"
      },
      {
        "id": "d214",
        "text": "Quantos dólares por ano o WhatsApp cobrava antes de virar grátis?",
        "answer": 1,
        "unit": "dólar",
        "fact": "A cobrança acabou em 2016.",
        "source": "WhatsApp"
      },
      {
        "id": "d215",
        "text": "Por quantos milhões de dólares foi leiloada a banana colada na parede com fita (Comedian)?",
        "answer": 6,
        "unit": "milhões de dólares",
        "fact": "Em 2024. O comprador comeu a banana.",
        "source": "Sotheby's"
      },
      {
        "id": "d216",
        "text": "Quantos milhões de dólares custou fazer o filme Titanic?",
        "answer": 200,
        "unit": "milhões de dólares",
        "fact": "Era o filme mais caro da história até então.",
        "source": "Box Office Mojo"
      },
      {
        "id": "d217",
        "text": "Quantos milhões de coroas suecas vale um Prêmio Nobel?",
        "answer": 11,
        "unit": "milhões de coroas",
        "fact": "Cerca de 1 milhão de dólares.",
        "source": "Fundação Nobel"
      },
      {
        "id": "d218",
        "text": "Por quantos bilhões de dólares o Facebook tentou comprar o Snapchat (e levou um não)?",
        "answer": 3,
        "unit": "bilhões de dólares",
        "fact": "Em 2013. O Snapchat tinha 2 anos.",
        "source": "imprensa internacional"
      }
    ]
  },
  {
    "id": "mundo",
    "title": "pelo mundo",
    "tagline": "o planeta é maior que o seu bairro",
    "premium": true,
    "isNew": true,
    "icon": "globe",
    "tint": "#A8DCFF",
    "questions": [
      {
        "id": "d219",
        "text": "Quantos países são membros da ONU?",
        "answer": 193,
        "unit": "países",
        "fact": "O último a entrar foi o Sudão do Sul, em 2011.",
        "source": "ONU"
      },
      {
        "id": "d220",
        "text": "Quantos fusos horários tem a França, contando os territórios ultramarinos?",
        "answer": 12,
        "unit": "fusos",
        "fact": "É o país com mais fusos do mundo.",
        "source": "Governo da França"
      },
      {
        "id": "d221",
        "text": "Quantos fusos horários a China usa oficialmente?",
        "answer": 1,
        "unit": "fuso",
        "fact": "Mesmo tendo largura pra 5.",
        "source": "Governo da China"
      },
      {
        "id": "d222",
        "text": "Quantas línguas oficiais tem a África do Sul?",
        "answer": 12,
        "unit": "línguas",
        "fact": "A 12ª é a língua de sinais, desde 2023.",
        "source": "Governo da África do Sul"
      },
      {
        "id": "d223",
        "text": "Quantos quilômetros tem o Rio Nilo?",
        "answer": 6650,
        "unit": "km",
        "fact": "Briga com o Amazonas pelo título de maior rio.",
        "source": "Britannica"
      },
      {
        "id": "d224",
        "text": "Quantos países têm o português como língua oficial?",
        "answer": 9,
        "unit": "países",
        "fact": "Do Brasil ao Timor-Leste.",
        "source": "CPLP"
      },
      {
        "id": "d225",
        "text": "Quantos degraus tem a Torre Eiffel até o topo?",
        "answer": 1665,
        "unit": "degraus",
        "fact": "O público só pode subir 674 deles.",
        "source": "Torre Eiffel (site oficial)"
      },
      {
        "id": "d226",
        "text": "Quantos metros tem a Estátua da Liberdade, contando o pedestal?",
        "answer": 93,
        "unit": "metros",
        "fact": "Foi presente da França.",
        "source": "National Park Service"
      },
      {
        "id": "d227",
        "text": "Em que ano começou a construção da Sagrada Família, em Barcelona?",
        "answer": 1882,
        "unit": "ano",
        "fact": "E ainda não terminou.",
        "source": "Basílica da Sagrada Família"
      },
      {
        "id": "d228",
        "text": "Quantos quilômetros tem o Canal de Suez?",
        "answer": 193,
        "unit": "km",
        "fact": "Um navio entalado nele travou o comércio mundial em 2021.",
        "source": "Autoridade do Canal de Suez"
      },
      {
        "id": "d229",
        "text": "Por quantos países passa o Rio Danúbio?",
        "answer": 10,
        "unit": "países",
        "fact": "Recorde mundial.",
        "source": "Britannica"
      },
      {
        "id": "d230",
        "text": "Há quantos anos foi construída a Grande Pirâmide de Gizé (aproximadamente)?",
        "answer": 4500,
        "unit": "anos",
        "fact": "Foi a construção mais alta do mundo por quase 4 mil anos.",
        "source": "Britannica"
      },
      {
        "id": "d231",
        "text": "Quantos andares tem o Burj Khalifa?",
        "answer": 163,
        "unit": "andares",
        "fact": "O elevador sobe a 36 km/h.",
        "source": "Burj Khalifa"
      },
      {
        "id": "d232",
        "text": "Quantos metros de profundidade tem o Lago Baikal, o mais fundo do mundo?",
        "answer": 1642,
        "unit": "metros",
        "fact": "Guarda 20% da água doce líquida do planeta.",
        "source": "UNESCO"
      },
      {
        "id": "d233",
        "text": "Quantas listras tem a bandeira dos EUA?",
        "answer": 13,
        "unit": "listras",
        "fact": "Uma pra cada colônia original.",
        "source": "Governo dos EUA"
      },
      {
        "id": "d234",
        "text": "Quantos anos durou a Guerra dos Cem Anos?",
        "answer": 116,
        "unit": "anos",
        "fact": "De 1337 a 1453.",
        "source": "Britannica"
      },
      {
        "id": "d235",
        "text": "Quantos minutos durou a guerra mais curta da história (Inglaterra x Zanzibar)?",
        "answer": 38,
        "unit": "minutos",
        "fact": "Em 1896.",
        "source": "Guinness World Records"
      },
      {
        "id": "d236",
        "text": "Quantos quilômetros tem a Ferrovia Transiberiana?",
        "answer": 9289,
        "unit": "km",
        "fact": "A viagem de Moscou a Vladivostok leva 7 dias.",
        "source": "Ferrovias Russas"
      },
      {
        "id": "d237",
        "text": "Quantos metros de queda tem o Salto Ángel, a cachoeira mais alta do mundo?",
        "answer": 979,
        "unit": "metros",
        "fact": "Fica na Venezuela.",
        "source": "UNESCO"
      },
      {
        "id": "d238",
        "text": "Quantos hectares tem o Vaticano?",
        "answer": 44,
        "unit": "hectares",
        "fact": "Cabe uns 60 campos de futebol.",
        "source": "Santa Sé"
      },
      {
        "id": "d239",
        "text": "Com quantos países a China faz fronteira?",
        "answer": 14,
        "unit": "países",
        "fact": "Empatada com a Rússia no topo.",
        "source": "Britannica"
      },
      {
        "id": "d240",
        "text": "Em que ano o Muro de Berlim foi construído?",
        "answer": 1961,
        "unit": "ano",
        "fact": "Ficou de pé por 28 anos.",
        "source": "Britannica"
      },
      {
        "id": "d241",
        "text": "Quantos anos Nelson Mandela ficou preso?",
        "answer": 27,
        "unit": "anos",
        "fact": "Saiu e virou presidente 4 anos depois.",
        "source": "Fundação Nelson Mandela"
      },
      {
        "id": "d242",
        "text": "Por quantos anos Elizabeth II foi rainha?",
        "answer": 70,
        "unit": "anos",
        "fact": "O reinado mais longo da história britânica.",
        "source": "Família Real Britânica"
      },
      {
        "id": "d243",
        "text": "Quantas línguas são faladas em Papua-Nova Guiné?",
        "answer": 840,
        "unit": "línguas",
        "fact": "O país mais diverso em idiomas do mundo.",
        "source": "Ethnologue"
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
