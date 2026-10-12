/**
 * Vitrine: as perguntas que mais rendem "como assim?!" na mesa.
 *  - HIGHLIGHTS: abrem a prévia de cada pacote pro (quem não assina vê só essas).
 *  - TEASERS: as do paywall, com a resposta escondida até a pessoa tocar.
 * Os ids precisam existir no pacote (o teste confere).
 */
import { PACKS, type Pack, type Question } from './questions';

export const HIGHLIGHTS: Record<string, string[]> = {
  'absurdos-br': ['n108', 'q172', 'q84'],
  bichos: ['q23', 'q34', 'n38'],
  corpo: ['q17', 'n65', 'q13'],
  internet: ['q126', 'q179', 'n158'],
  comida: ['n186', 'n191', 'n183'],
  esporte: ['n251', 'n229', 'n240'],
  ciencia: ['n275', 'n277', 'n271'],
  futebol: ['c5', 'c10', 'c14'],
  anos90: ['c20', 'c21', 'c23'],
  memes: ['c38', 'c32', 'c36'],
  picante: ['c46', 'c49', 'c54'],
  tv: ['d160', 'd149', 'd157'],
  musica: ['d180', 'd194', 'd183'],
  dinheiro: ['d198', 'd206', 'd203'],
  mundo: ['d235', 'd221', 'd238'],
  historia: ['d258', 'd262', 'd270'],
};

/**
 * Primeira partida perfeita: as melhores do clássico (o pacote grátis) saem antes das outras enquanto não foram jogadas.
 * É o que faz quem acabou de instalar gostar do jogo (e querer os pacotes pro).
 */
export const STARTER = ['d350', 'd249', 'd265', 'q150', 'd251', 'n3', 'd351', 'd259', 'd257', 'd264', 'd245', 'd356', 'd371', 'n8', 'd261'];

/** O baralho com as do STARTER ainda não jogadas na frente (na ordem sorteada); o resto não muda. */
export function starterFirst<T extends { id: string }>(deck: readonly T[], played: readonly string[]): T[] {
  const seen = new Set(played);
  const starter = new Set(STARTER.filter((id) => !seen.has(id)));
  return [...deck.filter((q) => starter.has(q.id)), ...deck.filter((q) => !starter.has(q.id))];
}

export const TEASERS = ['n108', 'q23', 'q17', 'c38', 'n38', 'c46'];

const byId = new Map(PACKS.flatMap((p) => p.questions.map((q) => [q.id, q] as const)));

export const questionById = (id: string): Question | undefined => byId.get(id);

/** Perguntas do pacote com as de destaque primeiro (a ordem do resto não muda). */
export function showcase(pack: Pack): Question[] {
  const top = (HIGHLIGHTS[pack.id] ?? []).map((id) => pack.questions.find((q) => q.id === id)).filter((q): q is Question => !!q);
  return [...top, ...pack.questions.filter((q) => !top.includes(q))];
}

export const teasers = (): Question[] => TEASERS.map(questionById).filter((q): q is Question => !!q);
