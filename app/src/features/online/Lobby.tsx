import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BangMark, Lives } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Body, Btn, Chip, Label, LinkBtn, Raised, TopBar } from '@/components/ui';
import { MIN_PLAYERS } from '@/game/engine';
import { packById } from '@/game/questions';
import { ReferralCard, useReferral } from '@/features/referral/Referral';
import { shareInvite } from '@/services/invite';
import type { Room } from '@/services/rooms';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';

/** Sala de espera: PIN grande, quem já entrou (ao vivo) e a config. O host começa; o resto espera. */
export function Lobby({ room, me, busy, error, onStart, onLeave }: { room: Room; me: string; busy?: boolean; error?: string | null; onStart: () => void; onLeave: () => void }) {
  const insets = useSafeAreaInsets();
  const isHost = me === room.hostId;
  const count = room.players.length;
  const host = room.players.find((p) => p.userId === room.hostId);
  const share = () => void shareInvite(room.pin);
  const packs = room.config.packs.map((id) => packById(id)?.title ?? id).join(', ');
  const { premium } = useApp();
  const referral = useReferral();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <TopBar onBack={onLeave} backLabel={isHost ? 'fechar sala' : 'sair da sala'} />
      <Label style={{ marginTop: 12 }}>{isHost ? 'sala aberta · passa o PIN' : 'tá dentro!'}</Label>
      <Raised face={colors.yellow} style={{ marginTop: 10 }} onPress={share} accessibilityLabel={`PIN ${room.pin.split('').join(' ')}. Toque pra compartilhar`}>
        <View style={styles.pinRow}>
          {room.pin.split('').map((d, i) => (
            <View key={i} style={styles.pinBox}>
              <Text style={styles.pinDigit} maxFontSizeMultiplier={1}>
                {d}
              </Text>
            </View>
          ))}
        </View>
      </Raised>
      <LinkBtn label="mandar link de convite" icon="share" onPress={share} color={colors.ink} />

      <View style={styles.config}>
        <Lives left={room.config.lives} total={room.config.lives} size={16} />
        <Text style={styles.configText}>
          {room.config.lives} vidas · {room.config.turnSeconds ? `${room.config.turnSeconds}s por vez` : 'sem timer'} · {packs}
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Label color={colors.ink} style={{ marginTop: 16 }}>
          na sala · {count}/8
        </Label>
        <View style={styles.chips} accessibilityLiveRegion="polite">
          {room.players.map((p) => (
            <Enter key={p.userId} from={8}>
              <Chip label={`${p.name}${p.userId === me ? ' (você)' : ''}`} icon={p.userId === room.hostId ? 'crown' : undefined} bg={p.userId === room.hostId ? colors.yellow : colors.surface} border={colors.ink} />
            </Enter>
          ))}
        </View>

        {isHost && (
          <View style={{ marginTop: 14 }}>
            <ReferralCard status={referral.status} premium={premium} source="lobby" onPress={share} />
          </View>
        )}

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }}>
          <BangMark size={88} />
          <Body style={{ textAlign: 'center', marginTop: 14 }}>{count < MIN_PLAYERS ? 'Chama a galera: precisa de pelo menos 2.' : isHost ? 'Todo mundo dentro? Bora.' : `Esperando ${host?.name ?? 'quem criou'} começar.`}</Body>
        </View>
      </ScrollView>

      {error && <Text style={styles.error}>{error}</Text>}
      {isHost ? (
        <Btn label={count >= MIN_PLAYERS ? `Começar com ${count}` : 'Esperando a galera…'} right={count >= MIN_PLAYERS ? 'arrowRight' : null} disabled={count < MIN_PLAYERS || busy} onPress={onStart} />
      ) : (
        <View style={styles.waiting} accessibilityLiveRegion="polite">
          <ActivityIndicator color={colors.ink} />
          <Text style={styles.waitingText}>aguardando a partida…</Text>
        </View>
      )}
    </View>
  );
}

/** Tela de aviso (online desligado, sala fechou, erro). */
export function OnlineNotice({ title, text, onBack }: { title: string; text: string; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 14 }]}>
      <TopBar onBack={onBack} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <Icon name="pin" size={56} accent={colors.pink} />
        <Text style={styles.noticeTitle}>{title}</Text>
        <Body style={{ textAlign: 'center' }}>{text}</Body>
      </View>
      <Btn label="Voltar" variant="secondary" right={null} onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  pinRow: { flexDirection: 'row', gap: 8, padding: 10 },
  pinBox: { flex: 1, height: 84, borderRadius: radii.key, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  pinDigit: { color: colors.ink, fontFamily: fonts.display, fontSize: 52, letterSpacing: -2 },
  config: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.sunk, borderRadius: 14, padding: 10, marginTop: 4 },
  configText: { flex: 1, fontFamily: fonts.ui700, fontSize: 13, color: colors.inkSoft },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  error: { fontFamily: fonts.ui700, fontSize: 14, color: colors.pinkInk, marginBottom: 8, textAlign: 'center' },
  waiting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 60, borderRadius: radii.button, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.inkMuted },
  waitingText: { fontFamily: fonts.ui700, fontSize: 15, color: colors.inkSoft },
  noticeTitle: { fontFamily: fonts.display, fontSize: 26, color: colors.ink, textAlign: 'center' },
});
