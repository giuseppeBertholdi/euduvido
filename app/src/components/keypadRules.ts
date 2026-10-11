export const MAX_DIGITS = 13;

/** Regras do campo numérico: só dígitos, até 13; "0" é substituído pelo próximo dígito. */
export function pressKey(value: string, key: string): string {
  if (key === 'C') return '';
  if (key === '⌫') return value.slice(0, -1);
  if (value === '0') return key;
  if (value.length >= MAX_DIGITS) return value;
  return value + key;
}

/** "× mil" etc: acrescenta zeros; campo vazio começa do 1. */
export function applyMagnitude(value: string, zeros: number): string {
  const base = value === '' || value === '0' ? '1' : value;
  return (base + '0'.repeat(zeros)).slice(0, MAX_DIGITS);
}
