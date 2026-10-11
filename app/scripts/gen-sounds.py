"""Sintetiza os sons do app (sem samples de terceiros). `python3 scripts/gen-sounds.py` grava em assets/sounds/*.wav."""
import wave
import numpy as np

SR = 22050
rng = np.random.default_rng(7)


def t(sec):
    return np.arange(int(SR * sec)) / SR


def env(n, attack=0.005, release=0.08):
    e = np.ones(n)
    a, r = int(SR * attack), int(SR * release)
    if a: e[:a] = np.linspace(0, 1, a)
    if r: e[-r:] = np.linspace(1, 0, r)
    return e


def saw(f, x):
    return 2 * ((f * x) % 1) - 1


def tone(freq, sec, kind='sine', vib=0.0, vib_rate=6):
    x = t(sec)
    f = freq * (1 + vib * np.sin(2 * np.pi * vib_rate * x))
    phase = 2 * np.pi * np.cumsum(f) / SR
    if kind == 'sine':
        y = np.sin(phase)
    elif kind == 'saw':
        y = 2 * ((phase / (2 * np.pi)) % 1) - 1
    else:  # square-ish
        y = np.tanh(3 * np.sin(phase))
    return y * env(len(x))


def seq(*parts):
    return np.concatenate(parts)


def save(name, y, gain=0.8):
    y = y / (np.max(np.abs(y)) + 1e-9) * gain
    data = (y * 32767).astype(np.int16)
    with wave.open(f'assets/sounds/{name}.wav', 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


# EU DUVIDO!: pancada grave + chiado curto + acorde de metal
x = t(0.5)
thump = np.sin(2 * np.pi * (90 * np.exp(-x * 6)) * x) * np.exp(-x * 9)
noise = rng.normal(0, 1, len(x)) * np.exp(-x * 30) * 0.5
brass = sum(tone(f, 0.5, 'saw') for f in (220, 277, 330)) * 0.25 * np.exp(-x * 4)
save('duvido', thump + noise + brass)

# NA MOSCA!: fanfarra subindo
save('mosca', seq(*[tone(f, d, 'square') * 0.6 for f, d in ((523, 0.09), (659, 0.09), (784, 0.09), (1047, 0.35))]))

# perdeu um "!": dois tons descendo
save('perdeu', seq(tone(392, 0.12, 'square'), tone(262, 0.28, 'square')), gain=0.6)

# buzina (air horn): acorde de dente de serra com vibrato
x = t(0.9)
horn = sum(tone(f, 0.9, 'saw', vib=0.01) for f in (466, 587, 698)) * env(len(x), 0.01, 0.15)
save('buzina', np.tanh(horn * 1.5))

# trombone triste: wah wah wah waaaah
notes = [(311, 0.32), (294, 0.32), (277, 0.32), (262, 0.9)]
save('trombone', seq(*[tone(f, d, 'saw', vib=0.02 if d > 0.5 else 0.008, vib_rate=5) * (0.9 - 0.1 * i) for i, (f, d) in enumerate(notes)]), gain=0.6)

# tambor: rufar acelerando + prato
parts = []
gap = 0.09
while gap > 0.025:
    hit = rng.normal(0, 1, int(SR * 0.03)) * np.exp(-t(0.03) * 60)
    parts.append(np.concatenate([hit, np.zeros(int(SR * gap))]))
    gap *= 0.88
crash_x = t(0.8)
crash = rng.normal(0, 1, len(crash_x)) * np.exp(-crash_x * 4) * 0.7
save('tambor', seq(*parts, crash), gain=0.6)

# boing: seno com a nota subindo e caindo
x = t(0.55)
f = 180 + 420 * np.sin(np.pi * np.clip(x / 0.25, 0, 1)) * np.exp(-x * 3)
save('boing', np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(x), 0.005, 0.2) * (1 + 0.3 * np.sin(2 * np.pi * 18 * x)))

# cri cri (grilo): silêncio constrangedor
chirp = lambda: np.sin(2 * np.pi * 4400 * t(0.045)) * (0.5 + 0.5 * np.sin(2 * np.pi * 90 * t(0.045))) * env(int(SR * 0.045), 0.003, 0.01)
pause = lambda s: np.zeros(int(SR * s))
save('grilo', seq(chirp(), pause(0.05), chirp(), pause(0.35), chirp(), pause(0.05), chirp(), pause(0.2)), gain=0.5)

print('sons gerados')
