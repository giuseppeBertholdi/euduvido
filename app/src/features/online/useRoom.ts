import { useEffect, useState } from 'react';
import { myUserId, RoomError, watchRoom, type Room } from '@/services/rooms';

/** Sala ao vivo + quem sou eu. `room === null` depois de carregar: a sala fechou ou eu saí. */
export function useRoom(roomId: string | null) {
  const [room, setRoom] = useState<Room | null | undefined>(undefined);
  const [me, setMe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    myUserId()
      .then((id) => alive && setMe(id))
      .catch((e: unknown) => alive && setError(e instanceof RoomError ? e.message : 'Sem conexão.'));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;
    return watchRoom(
      roomId,
      (r) => {
        setRoom(r);
        setError(null);
      },
      (e) => setError(e.message),
    );
  }, [roomId]);

  return { room, me, error };
}
