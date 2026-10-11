# Handoff: Eu Duvido! — direção "Gambá" (opção 4a)

## Overview
Eu Duvido! é um jogo de festa para iPhone, de estimativa e blefe. Chega uma pergunta com resposta numérica, cada jogador chuta em segredo e depois defende o próprio chute. Qualquer um pode gritar "Eu duvido!" pra desafiar. O mascote é um gambá: ele finge de morto, então vira o "rei do blefe".

Este pacote cobre 4 telas do modo presencial (um celular só, passa-e-joga):
1. Home
2. Como jogar (onboarding)
3. Passa-e-joga (troca de jogador)
4. Pergunta + palpite numérico

## About the Design Files
Os arquivos deste pacote são **referências de design feitas em HTML**: protótipos que mostram o visual e o comportamento esperados. **Não são código de produção** pra copiar direto. A tarefa é **recriar esses designs no ambiente do app** usando os padrões e bibliotecas do projeto. Se ainda não existir código, o recomendado é **SwiftUI** (iOS nativo).

`Eu Duvido.dc.html` tem várias rodadas de exploração. **Implemente só a seção "4" / opção `#4a`**, que fica no topo do arquivo. As seções 1–3 são direções descartadas.

## Fidelity
**High-fidelity.** Cores, tipografia, raios e textos são finais. Recrie pixel a pixel, num canvas de 390×844 pt (iPhone 14/15). As medidas abaixo estão em pt.

## Design Tokens

### Cores
| Token | Hex | Uso |
|---|---|---|
| graphite | `#2B2B2B` | fundo escuro, texto principal no claro, botões escuros |
| graphite-deep | `#1C1C1C` | moldura do device (só no mock) |
| graphite-key | `#3A3A3A` | teclas do teclado (hover `#454545`) |
| gray | `#6B6B6B` | bordas secundárias, chips de "já chutou" |
| cream | `#F4E9DD` | texto no escuro |
| cream-surface | `#F9F2DE` | fundo claro, cards |
| yellow | `#FFD600` | ação primária, foco de lanterna, nome do jogador |
| yellow-hi | `#FFE45C` | centro do gradiente do foco |
| pink | `#F4A7A7` | o "!" da marca, stickers, labels de destaque |
| pink-ink | `#C9706F` | números dos passos em fundo claro |
| muted-on-dark | `#C9C0B4` / `#A8A097` | texto secundário no escuro |
| muted-on-light | `#555555` | texto secundário no claro |

### Tipografia (Google Fonts)
- **Syne** 800: display (logo, títulos, nome do jogador, números, teclas)
- **Rethink Sans** 500–800: UI e texto corrido

| Estilo | Fonte | Tamanho/entrelinha | Tracking |
|---|---|---|---|
| Logo "eu duvido!" | Syne 800 | 60 / 0.88 | -2.5 |
| Título de tela | Syne 800 | 42 / 0.9 | -1.5 |
| Nome do jogador | Syne 800 | 96 / 0.85 | -5 |
| Pergunta | Syne 800 | 23 / 1.12 | -0.6 |
| Display do número | Syne 800 | 50 / 1 | -2 |
| Teclas | Syne 800 | 22 | 0 |
| Botão | Rethink Sans 800 | 18 | 0 |
| Corpo | Rethink Sans 600 | 15–16 / 1.35 | 0 |
| Label (caixa alta) | Rethink Sans 700 | 13 | +0.12em |
| Chip | Rethink Sans 700 | 13–14 | 0 |

### Raios
Botões: 20. Botão "segurar": 22. Cards: 24. Bottom sheet: 34 (só nos cantos de cima). Teclas: 16. Botões de magnitude: 12. Chips/pills: 999. Badge "1,5s": 16.

### Espaçamento
Margem lateral: 20–26. Gap entre botões: 10. Gap do teclado: 8. Gap entre chips: 6. Ação principal a 30–34 do fundo (acima da home indicator).

## Screens

### 1. Home (fundo `graphite`)
- **Logo:** "eu / duvido!" em duas linhas, Syne 60, cor `cream`. O "!" é `pink`. Começa em x=26, logo abaixo da status bar.
- **Tagline:** "O gambá finge de morto. Você finge que sabe." Rethink 600 16, `#C9C0B4`, largura máxima 190.
- **Foco de lanterna:** círculo de 300 pt centralizado, com topo em y≈304. Gradiente radial de `#FFE45C` (centro) → `#FFD600` (60%) → `#F2C900`. Dois halos de anel: 18 pt a 12% de amarelo e 40 pt a 5%.
- **Gambá:** asset `gamba-hero.png` com 380 de altura, centralizado e com topo em y≈236. Os pés ficam sobre o círculo, e a cabeça passa por cima do logo.
- **Sticker:** "pacote novo: absurdos BR", fundo `pink` e texto `graphite`, Rethink 800 13, raio 16, girado +9°, perto da borda direita (y≈470).
- **Ações (ancoradas embaixo):**
  - Primária: "Jogar no mesmo celular", altura 64, fundo `yellow`, texto `graphite`, com seta "→" à direita.
  - Secundária: "Entrar com PIN", altura 58, borda 2.5 `gray`, com "_ _ _ _" em `pink` à direita.
  - Link: "como joga?", Rethink 700 15, `#A8A097`.

### 2. Como jogar (fundo `yellow`)
- **Topo:** "← voltar" à esquerda e "pular" à direita (60% de opacidade), Rethink 700 15.
- **Título:** "como joga". Subtítulo: "Quatro passos e nenhuma calculadora."
- **Grid 2×2** de cards, gap 10. Cada card tem borda 2.5 `graphite`, raio 24 e padding 12. Conteúdo: arte do gambá (96 de altura, centralizada), número (Syne 13, `pink-ink`), título (Rethink 800 16) e descrição (Rethink 500 13, `#555`).
  1. `gamba-empe.png`: "Chega a pergunta" / "A resposta é sempre um número."
  2. `gamba-pensativo.png`: "Chuta no sigilo" / "Digita e passa o celular."
  3. `gamba-saudando.png`: "Defende na lábia" / "Cita "um estudo aí"."
  4. **Card escuro** (fundo `graphite`), com `gamba-determinado.png` 108 de largura sangrando pra fora do card. Texto: "Grita "eu duvido!"" (o "!" em `pink`) / "Acertou: ponto. Errou: mico."
- **CTA:** "Saquei, bora", altura 62, fundo `graphite`, texto `yellow`.

### 3. Passa-e-joga (fundo `graphite`)
- **Label:** "RODADA 3 · PASSA-E-JOGA", em `pink`.
- **Texto:** "vez da" (Rethink 700 22), com o nome do jogador embaixo em Syne 96 `yellow`. Use "da"/"do" conforme o gênero do jogador.
- **Instrução:** "O resto da galera finge de morto até a {Nome} ver a pergunta."
- **Chips de jogadores:**
  - Já chutou: fundo `gray`, prefixo "✓ ".
  - Atual: fundo `yellow`, texto `graphite`.
  - Na fila: borda 2 `gray`, fundo transparente.
- **Medalhão:** círculo de 230 pt em `cream-surface`, com `gamba-saudando.png` (164 de largura) centralizado e encostado embaixo.
- **Botão "segurar pra revelar":** altura 72, fundo `yellow`. Badge "1,5s" (56×56, `graphite`) à esquerda. Texto: "Segura pra ver a pergunta".
  - Enquanto o dedo está pressionado, uma barra de preenchimento `pink` cresce da esquerda pra direita ao longo de 1,5 s. O mock mostra o estado em 40%.
  - Ao completar, vai pra tela 4. Soltar antes do fim reseta a barra.
  - Isso evita que alguém veja a pergunta sem querer.

### 4. Pergunta + palpite (fundo `cream-surface`, com bottom sheet `graphite`)
- **Linha de chips:** "3/10" (fundo `graphite`, texto `yellow`), categoria (fundo `pink`), e "vez da {Nome}" à direita em `gray`.
- **Pergunta:** Syne 23, por exemplo "Quantos litros de saliva uma pessoa produz em um ano?".
- **Gambá:** `gamba-pensativo.png` com 108 de largura, sentado em cima da borda do sheet, à direita.
- **Bottom sheet:** altura 504, raio 34 em cima. Conteúdo, de cima pra baixo:
  - **Display:** valor em Syne 50 `yellow`, formatado em pt-BR com ponto de milhar ("1.200"). Trunca com reticências se passar da largura. A unidade ("litros") fica à direita, Rethink 700 16 `pink`.
  - **Botões de magnitude:** "× mil", "× milhão", "× bilhão", altura 38, borda tracejada 2 `gray` (no hover, borda e texto ficam `pink`). Acrescentam 3, 6 ou 9 zeros ao valor. Se o campo estiver vazio, começam do 1.
  - **Teclado 3×4:** 1–9, depois "C", "0", "⌫". Teclas com altura 50 e fundo `graphite-key`. Ao pressionar, a tecla fica `yellow` com texto `graphite`.
  - **CTA:** "Cravar esse chute", altura 62, fundo `yellow`.

## Interactions & State
- `players: [{name, gender}]` e `currentIndex`. Cada jogador tem um status: `done`, `now` ou `waiting`.
- `guess: string` (só dígitos, até 13 caracteres).
  - "C" limpa.
  - "⌫" apaga o último dígito.
  - Se o valor for "0", o próximo dígito substitui o zero.
- `round`, `totalRounds` (10) e a `question` atual: `{text, category, unit}`.
- **Fluxo:** Home → (Como jogar, opcional) → setup de jogadores (ainda não desenhado) → Passa-e-joga → Pergunta → próximo jogador → … → fase de defesa e "Eu duvido!" (ainda não desenhada).
- Use haptics leves nas teclas e um haptic de sucesso quando o "segurar pra revelar" completar.

## Assets
Em `assets/`, recortados do guia do mascote (`assets/Guia Visual do Mascote Gamba.png`). São PNGs com fundo transparente: `gamba-hero`, `-empe`, `-pensativo`, `-saudando`, `-sentado`, `-caminhando`, `-neutro`, `-feliz`, `-empolgado`, `-acolhedor`, `-determinado`.

**Atenção:** o recorte foi automático e tem pequenas sobras de fundo creme entre as patas. Pra produção, peça os arquivos originais ao ilustrador (de preferência em vetor ou PNG @3x).

## Files
- `Eu Duvido.dc.html`: a referência (seção `#4a`). Abre direto no navegador, junto com `support.js`.
- `Ganso.dc.html`: dependência das seções antigas. Ignore.
- `assets/`: as artes do mascote.
