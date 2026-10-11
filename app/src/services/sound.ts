import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

/**
 * Sons do app (gerados por scripts/gen-sounds.py, sem samples de terceiros).
 * Respeitam a chave de silencioso do iPhone e tocam junto com a música de quem estiver ouvindo algo.
 */
const SOURCES = {
  duvido: require('../../assets/sounds/duvido.wav'),
  mosca: require('../../assets/sounds/mosca.wav'),
  perdeu: require('../../assets/sounds/perdeu.wav'),
  buzina: require('../../assets/sounds/buzina.wav'),
  trombone: require('../../assets/sounds/trombone.wav'),
  tambor: require('../../assets/sounds/tambor.wav'),
  boing: require('../../assets/sounds/boing.wav'),
  grilo: require('../../assets/sounds/grilo.wav'),
} as const;

export type SoundName = keyof typeof SOURCES;

let enabled = true;
let configured = false;
const players: Partial<Record<SoundName, AudioPlayer>> = {};

export function setSoundEnabled(v: boolean) {
  enabled = v;
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  try {
    if (!configured) {
      configured = true;
      void setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => undefined);
    }
    const player = (players[name] ??= createAudioPlayer(SOURCES[name]));
    void player
      .seekTo(0)
      .then(() => player.play())
      .catch(() => player.play());
  } catch {
    // som nunca quebra o jogo
  }
}
