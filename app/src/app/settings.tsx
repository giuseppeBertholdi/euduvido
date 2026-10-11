import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, type ReactNode } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lives } from '@/components/brand';
import { Icon, type IconName } from '@/components/Icon';
import { Label, Raised, Title, TopBar, tapLight } from '@/components/ui';
import { links } from '@/config/links';
import { LIVES_OPTIONS, TIMER_OPTIONS } from '@/game/engine';
import { askReminderPermission, rescheduleReminders } from '@/services/engagement/reminders';
import { purchases } from '@/services/purchases';
import { onlineEnabled } from '@/services/rooms';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ marginTop: 24 }}>
      <Label color={colors.ink}>{title}</Label>
      <Raised style={{ marginTop: 8 }}>
        <View>{children}</View>
      </Raised>
    </View>
  );
}

function Row({ icon, label, detail, onPress, right, last }: { icon: IconName; label: string; detail?: string; onPress?: () => void; right?: ReactNode; last?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.row, !last && styles.rowLine, pressed && { backgroundColor: colors.sunk }]}
    >
      <Icon name={icon} size={22} accent={colors.yellow} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {detail && <Text style={styles.rowDetail}>{detail}</Text>}
      </View>
      {right ?? (onPress ? <Icon name="arrowRight" size={18} accent="none" /> : null)}
    </Pressable>
  );
}

function Segment<T extends string | number | null>({ options, value, onChange, render, label }: { options: readonly T[]; value: T; onChange: (v: T) => void; render: (v: T) => ReactNode; label: (v: T) => string }) {
  return (
    <View style={styles.seg} accessibilityRole="radiogroup">
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable
            key={String(o)}
            onPress={() => {
              tapLight();
              onChange(o);
            }}
            style={[styles.segItem, on && styles.segOn]}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={label(o)}
          >
            {render(o)}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Settings() {
  const insets = useSafeAreaInsets();
  const app = useApp();
  const [name, setName] = useState(app.name);
  const [restoring, setRestoring] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const restore = async () => {
    setRestoring(true);
    const r = await purchases.restore().catch(() => ({ premium: false }));
    setRestoring(false);
    if (r.premium) app.set({ premium: true });
    Alert.alert(r.premium ? 'Pro restaurado!' : 'Nada pra restaurar', r.premium ? 'Tudo liberado de novo.' : 'Não achamos uma assinatura nesta conta da App Store.');
  };

  const replayIntro = () =>
    Alert.alert('Rever a introdução?', 'Você volta pro começo do app. Nada é apagado.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Rever',
        onPress: () => {
          app.set({ onboarded: false });
          router.replace('/onboarding');
        },
      },
    ]);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <TopBar onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Title size={42} style={{ marginTop: 8 }}>
          ajustes
        </Title>

        <Section title="você">
          <View style={[styles.row, styles.rowLine]}>
            <Icon name="users" size={22} accent={colors.yellow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowDetail}>nome nas salas online</Text>
              <TextInput
                value={name}
                onChangeText={(t) => setName(t.slice(0, 12))}
                onEndEditing={() => app.set({ name: name.trim() })}
                placeholder="teu nome"
                placeholderTextColor={colors.inkMuted}
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="done"
                accessibilityLabel="nome nas salas online"
              />
            </View>
          </View>
          <Row icon="pin" label="Online com PIN" detail={onlineEnabled ? 'ligado' : 'desligado neste app'} last />
        </Section>

        <Section title="partida">
          <View style={[styles.block, styles.rowLine]}>
            <Text style={styles.rowLabel}>Vidas de cada um</Text>
            <Segment
              options={LIVES_OPTIONS}
              value={app.lives as (typeof LIVES_OPTIONS)[number]}
              onChange={(v) => app.set({ lives: v })}
              label={(v) => `${v} vidas`}
              render={(v) => <Lives left={v} total={v} size={16} />}
            />
          </View>
          <View style={[styles.block, styles.rowLine]}>
            <Text style={styles.rowLabel}>Tempo por vez</Text>
            <Text style={styles.rowDetail}>estourou, perde um “!”</Text>
            <Segment
              options={TIMER_OPTIONS}
              value={app.timer as (typeof TIMER_OPTIONS)[number]}
              onChange={(v) => app.set({ timer: v })}
              label={(v) => (v ? `${v} segundos` : 'sem timer')}
              render={(v) => <Text style={styles.segText}>{v ? `${v}s` : 'sem'}</Text>}
            />
          </View>
          <Row
            icon="refresh"
            label="Pular perguntas que já saíram"
            detail={`${app.played.length} já saíram neste celular`}
            right={
              <Switch
                value={app.avoidRepeats}
                onValueChange={(v) => app.set({ avoidRepeats: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.avoidRepeats ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel="pular perguntas que já saíram"
              />
            }
          />
          <Row
            icon="close"
            label="Zerar perguntas jogadas"
            detail="todas voltam a contar como novas"
            last
            onPress={() =>
              Alert.alert('Zerar perguntas jogadas?', `As ${app.played.length} que já saíram voltam a contar como novas neste celular.`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Zerar', style: 'destructive', onPress: () => app.set({ played: [] }) },
              ])
            }
          />
        </Section>

        <Section title="lembretes">
          <Row
            icon="timer"
            label="Lembrar da próxima resenha"
            detail="no máximo 3 avisos à noite, só se você sumir"
            last
            right={
              <Switch
                value={app.remindersOn}
                onValueChange={async (v) => {
                  if (!v) {
                    app.set({ remindersOn: false, remindersAsked: true });
                    await rescheduleReminders(false);
                    return;
                  }
                  const granted = await askReminderPermission();
                  app.set({ remindersOn: granted, remindersAsked: true });
                  await rescheduleReminders(granted);
                  if (!granted)
                    Alert.alert('Notificações desligadas', 'Libera as notificações do Eu Duvido! nos Ajustes do iPhone pra receber os lembretes.', [
                      { text: 'Agora não', style: 'cancel' },
                      { text: 'Abrir Ajustes', onPress: () => void Linking.openSettings() },
                    ]);
                }}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.remindersOn ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel="lembretes"
              />
            }
          />
        </Section>

        <Section title="sensações">
          <Row
            icon="megaphone"
            label="Sons"
            detail="carimbo, na mosca e zoeira (respeita o silencioso)"
            right={
              <Switch
                value={app.sounds}
                onValueChange={(v) => app.set({ sounds: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.sounds ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel="sons"
              />
            }
          />
          <Row
            icon="sparkle"
            label="Vibração"
            detail="nos toques, no carimbo e no timer"
            last
            right={
              <Switch
                value={app.haptics}
                onValueChange={(v) => app.set({ haptics: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.haptics ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel="vibração"
              />
            }
          />
        </Section>

        <Section title="pro">
          <Row icon="crown" label={app.premium ? 'Você é pro' : 'Conhecer o pro'} detail={app.premium ? 'todos os pacotes liberados' : '3 dias grátis'} onPress={() => router.push({ pathname: '/paywall', params: { source: 'settings' } })} />
          <Row icon="refresh" label="Restaurar compras" onPress={restore} right={restoring ? <ActivityIndicator color={colors.ink} /> : undefined} />
          <Row icon="timer" label="Gerenciar assinatura" detail="cancelar ou trocar de plano" onPress={() => void Linking.openURL(links.manageSubscriptions)} last={!__DEV__} />
          {__DEV__ && (
            <Row
              icon="eye"
              label={app.premium ? 'Testar como free' : 'Testar como pro'}
              detail="só aparece em desenvolvimento (a compra ainda é simulada)"
              last
              onPress={() => app.set({ premium: !app.premium })}
            />
          )}
        </Section>

        <Section title="sobre">
          <Row icon="help" label="Como joga" onPress={() => router.push('/how-to-play')} />
          <Row icon="eye" label="Rever a introdução" onPress={replayIntro} last={!links.terms && !links.privacy && !links.supportEmail} />
          {links.terms && <Row icon="lock" label="Termos de uso" onPress={() => void Linking.openURL(links.terms as string)} last={!links.privacy && !links.supportEmail} />}
          {links.privacy && <Row icon="lock" label="Privacidade" onPress={() => void Linking.openURL(links.privacy as string)} last={!links.supportEmail} />}
          {links.supportEmail && <Row icon="megaphone" label="Fale com a gente" detail={links.supportEmail} onPress={() => void Linking.openURL(`mailto:${links.supportEmail}?subject=Eu%20Duvido!`)} last />}
        </Section>

        <Text style={styles.version}>eu duvido! · versão {version}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, minHeight: 60, paddingVertical: 10, borderRadius: radii.card - 3 },
  rowLine: { borderBottomWidth: 2, borderColor: colors.sunk },
  rowLabel: { fontFamily: fonts.ui800, fontSize: 16, color: colors.ink },
  rowDetail: { fontFamily: fonts.ui600, fontSize: 13, color: colors.inkSoft, marginTop: 1 },
  input: { fontFamily: fonts.ui800, fontSize: 18, color: colors.ink, minHeight: 36, paddingVertical: 2 },
  block: { padding: 14, gap: 4 },
  seg: { flexDirection: 'row', gap: 8, marginTop: 8 },
  segItem: { flex: 1, minHeight: 48, borderRadius: radii.key, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  segOn: { borderColor: colors.ink, backgroundColor: colors.yellow },
  segText: { fontFamily: fonts.display, fontSize: 16, color: colors.ink },
  version: { textAlign: 'center', fontFamily: fonts.ui600, fontSize: 13, color: colors.inkMuted, marginTop: 28 },
});
