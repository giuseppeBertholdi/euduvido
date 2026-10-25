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
import { analytics } from '@/services/analytics';
import { dailyDone } from '@/game/daily';
import { askReminderPermission, rescheduleReminders } from '@/services/engagement/reminders';
import { shareApp } from '@/services/invite';
import { purchases } from '@/services/purchases';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

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
  /** Muda um ajuste e registra qual (o retrato da pessoa no PostHog se atualiza sozinho). */
  const change = (patch: Partial<Pick<typeof app, 'name' | 'lives' | 'timer' | 'avoidRepeats' | 'sounds' | 'haptics' | 'played'>>) => {
    for (const [k, v] of Object.entries(patch)) analytics.track('setting_changed', { setting: k, value: Array.isArray(v) ? v.length : (v as string | number | boolean | null) });
    app.set(patch);
  };
  const [name, setName] = useState(app.name);
  const [restoring, setRestoring] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const restore = async () => {
    setRestoring(true);
    const r = await purchases.restore().catch(() => ({ premium: false }));
    setRestoring(false);
    if (r.premium) app.set({ premium: true });
    Alert.alert(r.premium ? t('Pro restaurado!') : t('Nada pra restaurar'), r.premium ? t('Tudo liberado de novo.') : t('Não achamos uma assinatura nesta conta da App Store.'));
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <TopBar onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Title size={42} style={{ marginTop: 8 }}>
          {t('ajustes')}
        </Title>

        <Section title={t('você')}>
          <View style={styles.row}>
            <Icon name="users" size={22} accent={colors.yellow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowDetail}>{t('nome nas salas online')}</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text.slice(0, 12))}
                onEndEditing={() => name.trim() !== app.name && change({ name: name.trim() })}
                placeholder={t('teu nome')}
                placeholderTextColor={colors.inkMuted}
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="done"
                accessibilityLabel={t('nome nas salas online')}
              />
            </View>
          </View>
        </Section>

        <Section title={t('partida')}>
          <View style={[styles.block, styles.rowLine]}>
            <Text style={styles.rowLabel}>{t('Vidas de cada um')}</Text>
            <Segment
              options={LIVES_OPTIONS}
              value={app.lives as (typeof LIVES_OPTIONS)[number]}
              onChange={(v) => change({ lives: v })}
              label={(v) => t('{n} vidas', { n: v })}
              render={(v) => <Lives left={v} total={v} size={16} />}
            />
          </View>
          <View style={[styles.block, styles.rowLine]}>
            <Text style={styles.rowLabel}>{t('Tempo por vez')}</Text>
            <Text style={styles.rowDetail}>{t('estourou, perde um “!”')}</Text>
            <Segment
              options={TIMER_OPTIONS}
              value={app.timer as (typeof TIMER_OPTIONS)[number]}
              onChange={(v) => change({ timer: v })}
              label={(v) => (v ? t('{n} segundos', { n: v }) : t('sem timer'))}
              render={(v) => <Text style={styles.segText}>{v ? `${v}s` : t('sem')}</Text>}
            />
          </View>
          <Row
            icon="refresh"
            label={t('Pular perguntas que já saíram')}
            detail={t('{n} já saíram neste celular', { n: app.played.length })}
            right={
              <Switch
                value={app.avoidRepeats}
                onValueChange={(v) => change({ avoidRepeats: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.avoidRepeats ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel={t('pular perguntas que já saíram')}
              />
            }
          />
          <Row
            icon="close"
            label={t('Zerar perguntas jogadas')}
            detail={t('todas voltam a contar como novas')}
            last
            onPress={() =>
              Alert.alert(t('Zerar perguntas jogadas?'), t('As {n} que já saíram voltam a contar como novas neste celular.', { n: app.played.length }), [
                { text: t('Cancelar'), style: 'cancel' },
                { text: t('Zerar'), style: 'destructive', onPress: () => change({ played: [] }) },
              ])
            }
          />
        </Section>

        <Section title={t('lembretes')}>
          <Row
            icon="timer"
            label={t('Avisar do desafio do dia')}
            detail={t('o desafio do dia ao meio-dia; para sozinho se você parar de jogar')}
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
                  await rescheduleReminders(granted, dailyDone(app.daily, new Date()));
                  if (!granted)
                    Alert.alert(t('Notificações desligadas'), t('Libera as notificações do Eu Duvido! nos Ajustes do iPhone pra receber os lembretes.'), [
                      { text: t('Agora não'), style: 'cancel' },
                      { text: t('Abrir Ajustes'), onPress: () => void Linking.openSettings() },
                    ]);
                }}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.remindersOn ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel={t('lembretes')}
              />
            }
          />
        </Section>

        <Section title={t('sensações')}>
          <Row
            icon="megaphone"
            label={t('Sons')}
            detail={t('carimbo, na mosca e zoeira (respeita o silencioso)')}
            right={
              <Switch
                value={app.sounds}
                onValueChange={(v) => change({ sounds: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.sounds ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel={t('sons')}
              />
            }
          />
          <Row
            icon="sparkle"
            label={t('Vibração')}
            detail={t('nos toques, no carimbo e no timer')}
            last
            right={
              <Switch
                value={app.haptics}
                onValueChange={(v) => change({ haptics: v })}
                trackColor={{ true: colors.ink, false: colors.line }}
                thumbColor={app.haptics ? colors.yellow : colors.surface}
                ios_backgroundColor={colors.line}
                accessibilityLabel={t('vibração')}
              />
            }
          />
        </Section>

        <Section title={t('pro')}>
          <Row icon="crown" label={app.premium ? t('Você é pro') : t('Conhecer o pro')} detail={app.premium ? t('todos os pacotes liberados') : t('todos os pacotes, também na sala com PIN')} onPress={() => router.push({ pathname: '/paywall', params: { source: 'settings' } })} />
          <Row icon="refresh" label={t('Restaurar compras')} onPress={restore} right={restoring ? <ActivityIndicator color={colors.ink} /> : undefined} />
          <Row icon="timer" label={t('Gerenciar assinatura')} detail={t('cancelar ou trocar de plano')} onPress={() => void Linking.openURL(links.manageSubscriptions)} last />
        </Section>

        <Section title={t('espalha aí')}>
          <Row icon="share" label={t('Mandar o jogo pra galera')} detail={t('quanto mais gente, melhor a resenha')} onPress={() => void shareApp()} />
          <Row
            icon="heart"
            label={t('Avaliar na App Store')}
            detail={t('ajuda demais quem tá começando')}
            onPress={() => {
              analytics.track('review_tapped', { source: 'settings', action: 'rate' });
              void Linking.openURL(links.writeReview);
            }}
            last
          />
        </Section>

        <Section title={t('sobre')}>
          <Row icon="help" label={t('Como joga')} onPress={() => router.push('/how-to-play')} />
          <Row icon="lock" label={t('Termos de uso')} onPress={() => void Linking.openURL(links.terms)} />
          <Row icon="lock" label={t('Privacidade')} onPress={() => void Linking.openURL(links.privacy)} />
          <Row icon="megaphone" label={t('Fale com a gente')} detail={links.supportEmail} onPress={() => void Linking.openURL(`mailto:${links.supportEmail}?subject=${encodeURIComponent(t('Eu Duvido!'))}`)} last />
        </Section>

        <Text style={styles.version}>{t('eu duvido! · versão {version}', { version })}</Text>
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
