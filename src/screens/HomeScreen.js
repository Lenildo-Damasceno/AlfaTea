import { Text } from 'react-native';
import Screen from '../components/Screen';
import AlfiMessage from '../components/AlfiMessage';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
export default function HomeScreen({ navigation }) {
  return <Screen title="Alfatea"><Text style={{ color: COLORS.text, fontSize: 18 }}>Aprender no seu ritmo.</Text><AlfiMessage>Olá! Vamos aprender?</AlfiMessage><PrimaryButton title="COMEÇAR" onPress={() => navigation.navigate('Learn')} /></Screen>;
}
