import { useCallback, useEffect, useState } from 'react';
import { purchases, type Plan } from '@/services/purchases';

/**
 * Planos com preço da loja. No mock já vêm prontos; com RevenueCat, o app já começou a carregar na abertura
 * (`purchases.start`), então em geral chegam do cache na hora. Dá pra tentar de novo se falhar.
 */
export function usePlans() {
  const [plans, setPlans] = useState<Plan[] | null>(() => purchases.cachedPlans());
  const [error, setError] = useState(false);
  const reload = useCallback(() => {
    setError(false);
    purchases
      .plans()
      .then(setPlans)
      .catch(() => setError(true));
  }, []);
  useEffect(() => {
    if (plans) return;
    let alive = true;
    purchases
      .plans()
      .then((p) => alive && setPlans(p))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
    // só na montagem: depois, quem recarrega é o `reload`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { plans, error, reload };
}
