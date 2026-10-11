import { useCallback, useEffect, useState } from 'react';
import { PLANS, purchases, storeMode, type Plan } from '@/services/purchases';

/** Planos com preço da loja. No mock já vêm prontos; com RevenueCat, carregam (e dá pra tentar de novo). */
export function usePlans() {
  const [plans, setPlans] = useState<Plan[] | null>(storeMode === 'mock' ? PLANS : null);
  const [error, setError] = useState(false);
  const reload = useCallback(() => {
    setError(false);
    purchases
      .plans()
      .then(setPlans)
      .catch(() => setError(true));
  }, []);
  useEffect(() => {
    if (storeMode === 'mock') return;
    let alive = true;
    purchases
      .plans()
      .then((p) => alive && setPlans(p))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);
  return { plans, error, reload };
}
