# Eu Duvido! (Expo Go)

Jogo de festa de estimativa e blefe. Mascote: o gambá. Visual: handoff `../design_handoff_eu_duvido_gamba` (direção 4a).

## Rodar
```bash
npm install
npm start          # abre o QR do Expo Go (SDK 57)
npm test           # regras do motor + motor das Edge Functions em dia
npm run typecheck && npx expo lint
```

## Visual e marca
Tema claro "papel" (`src/theme/tokens.ts`), contraste AA nos textos. Profundidade com "sombra de adesivo": `Raised` em `src/components/ui.tsx` (placa grafite por baixo; botões afundam ao apertar). Ícones próprios em SVG, duotone (`src/components/Icon.tsx`).
Sem mascote: a marca é o **"!"** (`src/components/brand.tsx`): o selo `BangMark` (o mesmo do ícone do app), o carimbo `Stamp` "EU DUVIDO!" quando alguém duvida, as vidas `Lives` desenhadas como "!" e o `CountUp` da resposta. Animações só com `Animated` do React Native (`src/components/motion.tsx`), sem Reanimated, pra rodar em qualquer Expo Go; respeitam "reduzir movimento".

## Fluxo
Onboarding (4 passos) → paywall completo (com "continuar de graça") → Home.
Toda vez que o app abre (ou volta depois de 30 min), quem não assina vê o **easy paywall**: uma folha curta com um plano só e o ✕ depois de 2 s (`src/components/EasyPaywall.tsx`, `src/state/visits.ts`).

## Regras (`src/game/engine.ts`, como o Nem a Pato)
Aparece a pergunta (resposta numérica). Quem abre dá um lance: "é X ou mais". Na sua vez, aumenta (mínimo +1) ou grita "eu duvido!". Duvidou: revela a resposta; se o lance passou, quem lançou perde um "!"; senão, perde quem duvidou (igual à resposta conta como certo). Sem "!", tá fora; o último que sobrar ganha. Quem perde abre a próxima rodada.

## Pacotes e perguntas
`content/perguntas.csv` é a fonte da verdade (pacote, pergunta, resposta inteira, unidade, curiosidade, fonte). `node scripts/import-questions.mjs` gera `src/game/questions.ts`; exclusões e correções ficam no script (`EXCLUDE`/`FIX`, com o motivo, pela linha do CSV). Depois de mexer: `npm run sync:engine` e redeploy das funções (o servidor tem a própria cópia das perguntas).
Tocar num pacote abre a lista de perguntas (`src/app/pack/[id].tsx`), com "mostrar respostas" (e a fonte) opcional. Pacote pago mostra só as 3 primeiras. A fonte também aparece na revelação, pra resolver discussão na mesa.

## Perguntas repetidas
O app lembra as perguntas que já saíram neste celular (`played`, salvo localmente) e, com "Pular perguntas que já saíram" ligado (padrão), sorteia só as novas (`src/game/played.ts`, `freshPool`). Se sobrarem menos de 8 novas nos pacotes escolhidos, volta a usar o pacote inteiro. O interruptor e o "zerar" ficam na configuração da partida e em Ajustes. No online, quem cria a sala manda as já jogadas (`skip`) e a revanche pula também as da partida anterior. "Mostrar respostas" no pacote pede confirmação e oferece tirar aquelas perguntas das próximas partidas.

## Convite por link
`euduvido://join/1234` (rota `src/app/join/[pin].tsx`) abre a tela de PIN preenchida e entra sozinho se o nome já é conhecido. No Expo Go o link é `exp://<IP>:8081/--/join/1234`. O convite compartilhado leva o link e o PIN (WhatsApp não deixa links `euduvido://` clicáveis). Pra um link https clicável em qualquer app: um domínio com Universal Links (`associatedDomains` no app.json + `apple-app-site-association` no site).

## Viral: lance exato, zoeira, sons e +18
- **Lance exato** (`engine.ts`): se a dúvida revela que o lance era exatamente a resposta, quem lançou recupera um "!" (até o máximo do começo). Carimbo "NA MOSCA!", fanfarra e cartão pra compartilhar (`src/components/ShareCard.tsx`, `react-native-view-shot` + `expo-sharing`).
- **Zoeira** (online): reações com emoji e som (`src/features/online/zoeira.tsx`) via Realtime Broadcast (não grava no banco); só reações conhecidas, de quem está na sala, 1 a cada 1,2 s.
- **Sons** (`src/services/sound.ts`, `expo-audio`): sintetizados por `python3 scripts/gen-sounds.py` (sem samples de terceiros). Respeitam o silencioso; liga/desliga em Ajustes.
- **+18**: pacotes com `adult: true` pedem confirmação de idade uma vez (`src/features/packs/adult.ts`). Conteúdo picante é humor sugestivo, não explícito; na App Store, marque "temas sugestivos/maduros" na classificação.
- `content/perguntas-3.csv`: lote inicial escrito pelo Claude (futebol BR, anos 90/2000, memes, picante). Revise e amplie no mesmo formato.

## Timer e Ajustes
Timer opcional por vez (15, 30 ou 60 s), na configuração da partida e em Ajustes: estourou, perde um "!" (`TIMEOUT` no motor). Ajustes (`src/app/settings.tsx`, engrenagem na Home): nome no online, vidas e timer padrão, vibração, pro (restaurar, gerenciar assinatura), como joga, rever introdução, termos, privacidade e contato (links do `.env`).

## Online com PIN (Supabase)
- O servidor manda: toda jogada passa pela Edge Function `room-action`, que roda o MESMO motor (`npm run sync:engine` copia `src/game` pra `supabase/functions/_shared/game`; `npm test` falha se esquecer).
- O app só lê a própria sala (RLS) e ouve o Realtime; nunca grava direto. A resposta fica em `room_secrets` (sem acesso pro app) e o estado público não tem a resposta antes da revelação.
- Login anônimo; identidade vem do JWT. Versão otimista recusa jogada velha; o prazo do timer é do relógio do servidor.
- Funções: `create-room`, `join-room`, `room-action` (START, PLAY_AGAIN, START_TURN, BID, DOUBT, TIMEOUT, NEXT_ROUND), `leave-room` (quem sai no meio perde os "!"; o host passa a coroa; sala vazia fecha).

### Rodar local
```bash
npm run supabase:up          # Postgres + Auth + Realtime + API (portas 553xx, não brigam com o I_doubt)
npm run supabase:functions   # Edge Functions (deixe rodando)
npm run test:online          # 13 verificações: PIN, RLS, vez, versão, realtime, saída, timer
```
No `.env`, `EXPO_PUBLIC_SUPABASE_URL=http://<IP-da-máquina>:55321` e a anon key que o `supabase start` mostra (o celular precisa do IP, não de localhost).

### Publicar no seu projeto Supabase
```bash
supabase login
supabase link --project-ref <ref-do-projeto>
supabase db push                       # cria tabelas, RLS e realtime
supabase functions deploy create-room join-room room-action leave-room
```
No painel: Authentication > Sign In / Providers > **Allow anonymous sign-ins** ligado. Depois troque no `.env` a URL e a anon key pelas do projeto (Project Settings > API) e rode `npx expo start -c`.

## Compras (RevenueCat)
- `src/services/purchases.ts`: modo `revenuecat` em build nativo com `EXPO_PUBLIC_REVENUECAT_IOS_KEY`; modo `mock` no Expo Go/web/sem chave (comprar só liga o premium no aparelho).
- Entitlement `pro`; offering `default` com pacotes Annual, Weekly, Monthly e Lifetime. Preço, período e teste grátis (com elegibilidade) vêm da loja; sem preço carregado, o botão de compra fica desligado.
- O app user id do RevenueCat é o id do Supabase. `create-room` confere o `pro` na API do RevenueCat (`_shared/entitlement.ts`) quando o segredo `REVENUECAT_SECRET_KEY` existe; sem ele, a checagem fica desligada. Com ele ligado, `npm run test:online` contra o projeto falha no create-room (os usuários de teste não são pro).
- Build de desenvolvimento: `npx eas-cli build --profile development --platform ios`, depois `npm run start:dev`. Cadastre as variáveis `EXPO_PUBLIC_*` no EAS (o `.env` não vai pro build).

## Funil (PostHog)
`src/services/analytics.ts` manda eventos em lote pela API HTTP do PostHog (sem SDK nativo; roda no Expo Go). Liga com `EXPO_PUBLIC_POSTHOG_KEY` (e `EXPO_PUBLIC_POSTHOG_HOST`, padrão `https://us.i.posthog.com`); sem chave, não manda nada. Id anônimo gerado no aparelho, sem geoIP. Eventos: `app_opened`, `onboarding_step/completed`, `paywall_viewed/closed` (`source`, `kind` full/easy), `purchase_started/completed/failed`, `restore_tapped`, `pack_opened`, `match_started/finished`, `free_exhausted`, `room_created/joined`, `card_shared`, `reminders_answered`. Ao publicar com isso ligado, atualize a "Privacidade do app" no App Store Connect (Dados de uso > Interação com o produto, e Identificadores > ID do dispositivo; não vinculados à identidade, sem rastreamento) e a política de privacidade.

## Grátis acabou
Quem não é pro e tem menos de 8 perguntas novas no Clássico vê o paywall "vocês zeraram as grátis" por cima da partida (ao começar ou na revanche), no máximo 1 vez a cada 20 h (`src/features/paywall/exhausted.ts`, `offerExhausted.ts`). Na configuração da partida aparece "liberar +N perguntas novas".

## O que é mock
- **Compras no Expo Go**: simuladas (comprar só liga o premium no aparelho). Em build nativo com a chave, vale o RevenueCat.
- **Premium no servidor**: a Edge Function não confere assinatura ao criar sala (as compras ainda são simuladas). Quando entrar o RevenueCat, verifique o entitlement em `create-room`.
