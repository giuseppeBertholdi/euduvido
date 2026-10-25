/** Os pacotes no idioma deste celular (ver `packs.ts`). No app, importe daqui em vez de `questions.ts`. */
import { lang } from '@/i18n';
import { packsFor } from './packs';
import type { Pack } from './questions';

export type { Pack, Question } from './questions';

export const PACKS: Pack[] = packsFor(lang);

export function packById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

/** Nome do pacote de uma pergunta (vira o chip de categoria). */
export function packTitleOf(questionId: string): string {
  return PACKS.find((p) => p.questions.some((x) => x.id === questionId))?.title ?? (lang === 'en' ? 'random' : 'aleatório');
}
