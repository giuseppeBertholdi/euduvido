# Carrosséis do TikTok (Eu Duvido!)

Mesmo formato do único post que estourou no I_doubt (`friendship-games`: 21K+ views, **~95% vindas da Busca**, top query
`brincadeiras com amigos`): foto com cara de foto real (flash de iPhone, gerada pela OpenAI), texto nos estilos do próprio TikTok,
listicle de 5 com o jogo como **o 5**, e o nome do app só no último slide, continuando a história. Nada de logo, tela ou "baixe agora".

```bash
npm install
OPENAI_API_KEY=... node native.mjs photos <slug>   # ou crie .env com OPENAI_API_KEY=
node native.mjs render <slug>                       # out/<slug>/carousel_NN.png e .jpg (o TikTok só aceita JPEG)
```

O app está na App Store desde 15/10/2026: poste sempre o `carousel_07.jpg` (o `_soon` era do pré-lançamento).
Marque o post como conteúdo gerado por IA no TikTok.

## Regras que valem (dados do I_doubt)
1. **Uma busca real por post**: a frase exata no título do slide 1, na primeira linha da legenda e numa hashtag.
2. Brincadeiras pouco batidas na lista (nada de eu nunca / máfia / verdade ou desafio de novo).
3. O 5 é uma rodada de verdade, com uma pergunta do app que **puxa discussão** (o comentário é o "não pode ser").
4. No máximo 1 post por dia; julgar depois de 72 h (<100 views = perdeu; 1K+ ou >50% busca = fazer variações).

## Conceitos

| slug | busca alvo | o 5 | legenda |
|---|---|---|---|
| `brincadeiras-com-amigos` | brincadeiras com amigos | folha dobrada 42 vezes chega na Lua | no JSON (`caption`) |
| `jogos-de-bar` | jogos para jogar com amigos pessoalmente | Portugal cabe 92 vezes no Brasil | no JSON |
| `confraternizacao` | brincadeiras para confraternização | 17 mil litros de água por kg de chocolate | no JSON |
| `jogos-em-grupo` | jogos para jogar em grupo | 10.000 bitcoins em 2 pizzas | no JSON |
| `brincadeiras-para-casal` | brincadeiras para casal | beijo mais longo: 58 horas | no JSON |
| `amigos-em-casa` | o que fazer com os amigos em casa | banana na parede: 6 milhões de dólares | no JSON |

Ordem sugerida: `brincadeiras-com-amigos` primeiro (é a busca do vencedor), `jogos-de-bar` no dia seguinte, `confraternizacao`
entre o fim de outubro e dezembro (busca sazonal). Fixe um comentário com a fonte da resposta do 5 (está no `content/` do app).
