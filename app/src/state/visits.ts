/** Voltar pro app depois desse tempo em segundo plano conta como visita nova (e mostra o easy paywall de novo). */
export const NEW_VISIT_AFTER_MS = 30 * 60 * 1000;

/** Visitas: abrir o app do zero, ou voltar depois de NEW_VISIT_AFTER_MS. `take()` responde uma vez por visita. */
export function createVisitTracker() {
  let pending = true;
  let backgroundSince: number | null = null;
  return {
    onAppState(state: string, now: number): void {
      if (state === 'background') backgroundSince ??= now;
      else if (state === 'active' && backgroundSince !== null) {
        if (now - backgroundSince >= NEW_VISIT_AFTER_MS) pending = true;
        backgroundSince = null;
      }
    },
    take(): boolean {
      const was = pending;
      pending = false;
      return was;
    },
  };
}

export const visits = createVisitTracker();
