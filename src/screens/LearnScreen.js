import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
export default function LearnScreen({ navigation }) {
  return <Screen title="Vamos aprender">{['Letras', 'Sílabas', 'Palavras', 'Jogos'].map(module => <PrimaryButton key={module} title={module} onPress={() => navigation.navigate('Module', { module })} />)}</Screen>;
}
