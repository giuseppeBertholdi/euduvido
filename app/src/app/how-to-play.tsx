import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BangMark, Lives } from '@/components/brand';
import { Icon, type IconName } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Body, Btn, Raised, Title, TopBar } from '@/components/ui';
import { colors, fonts } from '@/theme';
import { t } from '@/i18n';

const STEPS = (): { icon: IconName; n: string; title: string; text: string; tint: string }[] => [
  { icon: 'help', n: '01', title: t('Chega a pergunta'), text: t('Todo mundo lê. A resposta é sempre um número.'), tint: colors.yellowSoft },
  { icon: 'sparkle', n: '02', title: t('Quem abre dá um lance'), text: t('“É 30 ou mais.” Não precisa saber, só parecer que sabe.'), tint: colors.pinkSoft },
  { icon: 'arrowRight', n: '03', title: t('Passa o celular'), text: t('O próximo aumenta o lance (no mínimo +1) ou…'), tint: colors.greenSoft },
  { icon: 'megaphone', n: '04', title: t('Grita “eu duvido!”'), text: t('Revela a resposta. Lance passou? Quem lançou perde um “!”. Não passou? Perde quem duvidou.'), tint: colors.yellow },
];

export default function HowToPlay() {
  const insets = useSafeAreaInsets();
  const back = () => (router.canGoBack() ? router.back() : router.replace('/'));
  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <TopBar onBack={back} />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <View style={{ flex: 1 }}>
            <Title size={42}>{t('como joga')}</Title>
            <Body style={{ marginTop: 6 }}>{t('Um minuto de leitura. Zero calculadora.')}</Body>
          </View>
          <BangMark size={64} style={{ transform: [{ rotate: '-8deg' }] }} />
        </View>

        <View style={{ gap: 12, marginTop: 18 }}>
          {STEPS().map((s, i) => (
            <Enter key={s.n} delay={i * 80}>
              <Raised face={s.tint}>
                <View style={styles.step}>
                  <View style={styles.stepIcon}>
                    <Icon name={s.icon} size={28} accent={s.tint === colors.yellow ? colors.surface : colors.yellow} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.n}>{s.n}</Text>
                    <Text style={styles.stepTitle}>{s.title}</Text>
                    <Text style={styles.stepText}>{s.text}</Text>
                  </View>
                </View>
              </Raised>
            </Enter>
          ))}
        </View>

        <Title size={26} style={{ marginTop: 28 }}>
          {t('as vidas')}
        </Title>
        <Raised style={{ marginTop: 10 }}>
          <View style={{ padding: 16, gap: 12 }}>
            <View style={styles.lifeRow}>
              <Lives left={3} total={3} size={26} />
              <Text style={styles.lifeText}>{t('cada um começa com seus “!” (2, 3 ou 5)')}</Text>
            </View>
            <View style={styles.lifeRow}>
              <Lives left={2} total={3} size={26} />
              <Text style={styles.lifeText}>{t('perdeu a dúvida, apaga um')}</Text>
            </View>
            <View style={styles.lifeRow}>
              <Lives left={0} total={3} size={26} />
              <Text style={styles.lifeText}>{t('sem “!”, tá fora. o último que sobrar ganha')}</Text>
            </View>
          </View>
        </Raised>
        <Body size={15} style={{ marginTop: 12 }}>
          {t('Dica: lance igual à resposta conta como certo. Quem perde abre a próxima rodada.')}
        </Body>
      </ScrollView>
      <View style={[styles.cta, { paddingBottom: insets.bottom + 14 }]}>
        <Btn label={t('Saquei, bora')} variant="dark" onPress={back} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  head: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  stepIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  n: { fontFamily: fonts.display, fontSize: 13, color: colors.pinkInk },
  stepTitle: { fontFamily: fonts.ui800, fontSize: 17, color: colors.ink },
  stepText: { fontFamily: fonts.ui600, fontSize: 15, lineHeight: 20, color: colors.inkSoft, marginTop: 1 },
  lifeRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  lifeText: { flex: 1, fontFamily: fonts.ui700, fontSize: 15, color: colors.ink },
  cta: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.paper },
});
