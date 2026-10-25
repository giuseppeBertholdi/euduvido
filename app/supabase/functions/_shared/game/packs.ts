// GERADO por scripts/sync-engine.mjs a partir de src/game/packs.ts. Não edite aqui.
/**
 * Pacotes no idioma do jogo. TS puro (sem Expo): roda no app e na Edge Function (`npm run sync:engine` copia).
 * Em português sai o `questions.ts` como está. Em inglês, cada pergunta usa a tradução de `questions.en.ts` (que pode
 * trazer outra resposta, quando a unidade muda) e o que não foi traduzido fica de fora; pacote sem nome em inglês
 * (os que só fazem sentido no Brasil) também.
 */
import { PACKS as PT, type Pack } from './questions.ts';
import { EN_QUESTIONS } from './questions.en.ts';

export type Lang = 'pt' | 'en';

const EN_PACKS: Record<string, { title: string; tagline: string }> = {
  classico: { title: 'classic', tagline: 'the basics, done right' },
  bichos: { title: 'animals', tagline: 'nature is weird' },
  corpo: { title: 'human body', tagline: "you're weird on the inside" },
  internet: { title: 'internet', tagline: 'chronically online' },
  comida: { title: 'food & drink', tagline: 'the table lies too' },
  esporte: { title: 'sports & speed', tagline: 'for people who think they know the rules' },
  ciencia: { title: 'science & space', tagline: 'the universe is way too big' },
  anos90: { title: "90s & 2000s", tagline: 'nostalgia with a tamagotchi' },
  memes: { title: 'memes', tagline: 'chronically online, level 2' },
  picante: { title: 'spicy', tagline: 'only with the right crowd' },
  musica: { title: 'music', tagline: 'from anthems to bangers' },
  dinheiro: { title: 'money', tagline: 'how much? more than you think' },
  historia: { title: 'history', tagline: 'dates everyone swears they know' },
  mundo: { title: 'around the world', tagline: "the planet is bigger than your block" },
};

function english(): Pack[] {
  return PT.flatMap((p) => {
    const names = EN_PACKS[p.id];
    if (!names) return [];
    const questions = p.questions.flatMap((q) => {
      const en = EN_QUESTIONS[q.id];
      return en ? [{ id: q.id, source: q.source, ...en }] : [];
    });
    return questions.length ? [{ ...p, ...names, questions }] : [];
  });
}

const cache: Partial<Record<Lang, Pack[]>> = { pt: PT };

export function packsFor(lang: Lang): Pack[] {
  return (cache[lang] ??= english());
}
