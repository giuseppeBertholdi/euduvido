# 100 usuários até 15/11/2026

App: https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690

**A conta.** Ninguém chega a 100 só com TikTok orgânico em 30 dias: o melhor post do I_doubt fez 21 mil views, e de view pra instalação a conversão costuma ficar abaixo de 1%. Por isso a meta se divide em três frentes:

| Frente | Meta | Como |
|---|---|---|
| Rede própria (amigos, família, trabalho) | 40 | WhatsApp, stories, pedir pra jogarem *juntos* |
| Comunidades (TabNews, Reddit, X, LinkedIn) | 25 | história de "lancei meu app sozinho" |
| TikTok/Reels (busca) | 35 | 1 carrossel por dia, o mesmo no Reels |

Jogo de festa cresce em grupo: cada partida com PIN ou cada convite traz 2 a 7 pessoas. Por isso a primeira semana é pra fazer **grupos** jogarem, não pessoas soltas.

## Antes de postar (hoje)

- [ ] **Link de campanha** no App Store Connect (Analytics > Fontes > Links de campanha). Um por canal: `ct=tiktok`, `ct=whatsapp`, `ct=tabnews`, `ct=reddit`, `ct=insta`. Sem isso não dá pra saber o que funciona.
- [ ] **Bio do TikTok e do Instagram** com o link da loja e: "o jogo do EU DUVIDO! 👇".
- [x] **Site**: idoubtit.fun agora é o Eu Duvido! (o I Doubt It foi pra /idoubtit/; /euduvido/ continua funcionando, então nada muda no App Store Connect). Use `idoubtit.fun` na bio.
- [ ] **Build 1.1.1** com o link da loja no convite da sala, no card do "na mosca" e no "Mandar o jogo pra galera" e "Avaliar" em Ajustes (já está no código). Sem isso, quem recebe o convite não tem como instalar.
- [ ] **Avaliações**: os 10 primeiros amigos que jogarem, peça uma avaliação 5 estrelas com uma frase. Com menos de 5 avaliações a conversão da loja despenca.

## Semana 1 (15 a 21/10): rede própria

**Dia 1, WhatsApp (mande individualmente pra 30 pessoas, não só em grupo):**

> lancei meu jogo na App Store!! 🎉 é o "eu duvido": sai uma pergunta tipo "quantos km de vasos sanguíneos tem no seu corpo?", cada um chuta um número e o outro pode gritar EU DUVIDO. joga num celular só passando na roda. testa no próximo rolê e me fala? e se curtir, uma avaliação me ajuda MUITO
> https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690

**Grupos de WhatsApp (família, faculdade, trabalho):**

> duvido alguém aqui acertar: quantos km de vasos sanguíneos tem no corpo humano? 🤔
> (resposta amanhã. a pergunta é do jogo que eu lancei: https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690)

No dia seguinte: "100 mil km. dá duas voltas e meia na Terra. quem chegou mais perto?". O post-pergunta gera conversa, o link sozinho não.

**Stories (3 seguidos):** 1) print da loja com "LANCEI 🎉"; 2) enquete "quantos km de vasos sanguíneos tem no seu corpo? 100 / 1.000 / 100.000"; 3) a resposta + link.

**Partida gravada:** junte 3 ou 4 amigos no fim de semana e grave a roda reagindo à revelação. 15 segundos do grito de EU DUVIDO + revelação valem mais que qualquer carrossel. Peça autorização pra postar.

## Semana 2 (22 a 28/10): comunidades

Uma por dia, e responda todo comentário nas primeiras 2 horas.

**TabNews / r/brdev** (público dev gosta de bastidor; título sincero):

> **Lancei meu primeiro app na App Store: um jogo de festa brasileiro. O que aprendi**
>
> Fiz o Eu Duvido!, um quiz de blefe: sai uma pergunta com resposta em número, cada um dá um lance e o próximo aumenta ou duvida. Expo + Supabase (salas com PIN em tempo real) + RevenueCat.
> - A versão em inglês (I Doubt It) foi rejeitada pela regra 2.3.7: escrevi "grátis" nas screenshots.
> - Joguei fora 109 das 708 perguntas que eu tinha: pergunta boa é a que a pessoa jura que sabe e erra por 100x.
> - ... (mais 2 ou 3 aprendizados reais)
>
> Link: https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690. Feedback é muito bem-vindo, principalmente das perguntas.

**r/brasil, r/jogatina, r/desabafos (não)**: no Reddit geral, não poste link de cara. Poste a pergunta ("vocês chutariam quantos km?") e só ponha o link se perguntarem de onde é. Leia as regras de autopromoção de cada sub antes.

**X/Threads**: "fiz um jogo onde a resposta sempre parece mentira. 5 perguntas que geraram briga nos testes 🧵" + 5 perguntas, link no último.

**LinkedIn**: o mesmo post do TabNews, em tom de "projeto paralelo". Colegas de trabalho instalam por apoio.

## Semanas 1 a 4: TikTok + Reels todo dia

1 carrossel por dia às 19h–21h. O mesmo arquivo no Reels do Instagram (formato carrossel). Regras no `tiktok/README.md`; marque como conteúdo de IA.

| Dia | Conceito | Busca |
|---|---|---|
| 15/10 | `brincadeiras-com-amigos` | brincadeiras com amigos |
| 16/10 | `jogos-de-bar` | jogos para jogar com amigos pessoalmente |
| 17/10 | `jogos-em-grupo` | jogos para jogar em grupo |
| 18/10 | `amigos-em-casa` | o que fazer com os amigos em casa |
| 19/10 | `brincadeiras-para-casal` | brincadeiras para casal |
| 20/10+ | variações de quem passar de 1K views (mesma busca, outra pergunta no 5) | |
| 01/11+ | `confraternizacao` e variações | brincadeiras para confraternização |

Gerar fotos e slides:

```bash
cd marketing/tiktok
node native.mjs photos jogos-em-grupo && node native.mjs render jogos-em-grupo
```

Comentário fixado em todo post: a fonte da resposta do 5 + "o jogo é o Eu Duvido!, link na bio".

## Semanas 3 e 4 (29/10 a 15/11): dobrar o que funcionou

- Pegue o canal com mais instalações no link de campanha e faça o dobro dele.
- **Novembro = confraternização**. Mande pro RH ou pro organizador da festa do seu trabalho e de 5 amigos: "jogo pra confraternização que não é amigo secreto". Uma firma jogando = 20 pessoas vendo.
- Feriados de 2/11 e 15/11 (viagem e casa cheia): posts "jogos pra viagem com amigos" e "jogos pra jogar com a família".

## Medir (toda segunda)

| | Meta acumulada |
|---|---|
| 21/10 | 35 |
| 28/10 | 60 |
| 04/11 | 80 |
| 15/11 | 100 |

Onde olhar: App Store Connect (instalações por fonte), PostHog (`match_finished`, `invite_shared`, `room_joined`, `card_shared`). Se no dia 28/10 estiver abaixo de 45, o problema é volume de posts ou conversão da loja (views da página vs. instalações): veja qual antes de postar mais.
