/**
 * Idioma do app: português (padrão) ou inglês. Decide uma vez na abertura, pelo idioma do iPhone: quem usa o celular
 * em português (ou mora no Brasil) joga em português; o resto do mundo joga em inglês. Trocar o idioma do iPhone
 * reinicia o app, então não precisa reagir em tempo de execução.
 *
 * O texto de origem é a própria frase em português (estilo gettext): `t('Criar sala')`. O inglês fica em `en.ts`,
 * com a mesma frase como chave. Faltou a tradução, sai o português (e o `npm test` acusa).
 * Variáveis entre chaves: `t('Vez de {name}', { name })`.
 */
import { isYear, setThousandsSeparator } from '@/game/engine';
import { EN } from './en';

export type Lang = 'pt' | 'en';

function detect(): Lang {
  // forçar um idioma (testar o inglês no simulador, gerar o desafio do site): EXPO_PUBLIC_LANG=en
  const forced = process.env.EXPO_PUBLIC_LANG;
  if (forced === 'pt' || forced === 'en') return forced;
  try {
    // require pra os testes em Node (sem módulo nativo) caírem no padrão
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getLocales } = require('expo-localization') as typeof import('expo-localization');
    const l = getLocales()[0];
    if (!l) return 'pt';
    return l.languageCode === 'pt' || l.regionCode === 'BR' ? 'pt' : 'en';
  } catch {
    return 'pt';
  }
}

export const lang: Lang = detect();
export const isEn = lang === 'en';
if (isEn) setThousandsSeparator(',');

export function t(pt: string, vars?: Record<string, string | number>): string {
  const s = isEn ? (EN[pt] ?? pt) : pt;
  return vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s;
}

/** Unidade depois de um número. Em inglês, ano não leva unidade ("1977", não "1977 year"). */
export function unitAfter(unit: string): string {
  return isEn && isYear(unit) ? '' : unit;
}

/** Singular ou plural: `plural(n, '{n} pergunta', '{n} perguntas')`. */
export function plural(n: number, one: string, many: string): string {
  return t(n === 1 ? one : many, { n });
}
