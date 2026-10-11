import * as StoreReview from 'expo-store-review';
import { Platform } from 'react-native';
import { shouldAskReview, type ReviewState } from './policy';

/**
 * Pedido de avaliação nativo da Apple (nada de tela própria "tá gostando?", que a Apple proíbe).
 * Devolve true se pediu (pra registrar a data).
 */
export async function maybeAskReview(state: ReviewState, happy: boolean, now = Date.now()): Promise<boolean> {
  if (Platform.OS === 'web' || !shouldAskReview(state, now, happy)) return false;
  try {
    if (!(await StoreReview.isAvailableAsync()) || !(await StoreReview.hasAction())) return false;
    await StoreReview.requestReview();
    return true;
  } catch {
    return false;
  }
}
