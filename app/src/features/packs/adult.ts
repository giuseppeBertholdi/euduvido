import { Alert } from 'react-native';

/**
 * Portão do conteúdo +18: pergunta uma vez, lembra a resposta (Ajustes > zerar não apaga isso de propósito).
 * O pacote é de humor adulto e sugestivo, não explícito (classificação da App Store: temas sugestivos).
 */
export function confirmAdult(adultOk: boolean, setAdultOk: () => void, onOk: () => void) {
  if (adultOk) return onOk();
  Alert.alert('Pacote +18', 'Perguntas picantes, com humor de adulto. Você confirma que tem 18 anos ou mais?', [
    { text: 'Não', style: 'cancel' },
    {
      text: 'Tenho 18+',
      onPress: () => {
        setAdultOk();
        onOk();
      },
    },
  ]);
}
