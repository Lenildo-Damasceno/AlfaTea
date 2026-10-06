import { Alert, Linking, Text } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
export default function AboutScreen() {
  return <Screen title="Sobre o Alfatea"><Text style={{ color: COLORS.text, fontSize: 18 }}>Aprender no seu ritmo. Uma ferramenta de apoio pedagógico à alfabetização, com atividades simples e acolhedoras.</Text><PrimaryButton title="Conhecer o Ministério da Educação" onPress={async () => { try { await Linking.openURL('https://www.gov.br/mec/pt-br'); } catch { Alert.alert('Não foi possível abrir o link', 'Tente novamente mais tarde.'); } }} /></Screen>;
}
