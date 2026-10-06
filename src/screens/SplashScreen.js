import { Image, Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../../assets/images/branding/logo_alfatea.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Alfatea" />
        <Text style={styles.slogan}>Aprender no seu ritmo.</Text>
        <Image source={require('../../assets/images/alfi/alfi_ola.png')} style={styles.alfi} resizeMode="contain" accessibilityLabel="Alfi, um dinossauro azul sorridente, acena para você" />
        <Text style={styles.title}>Olá! Vamos aprender?</Text>
        <Text style={styles.subtitle}>Um passo de cada vez, junto com o Alfi.</Text>
        <View style={styles.button}><PrimaryButton title="COMEÇAR" onPress={() => navigation.replace('MainTabs')} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  logo: { width: '100%', maxWidth: 330, height: 124 },
  slogan: { fontSize: 18, color: COLORS.text, textAlign: 'center' },
  alfi: { width: '100%', maxWidth: 330, height: 300, marginVertical: 12 },
  title: { fontSize: 26, color: COLORS.primary, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 17, color: COLORS.text, textAlign: 'center', lineHeight: 25 },
  button: { width: '100%', maxWidth: 360, marginTop: 16 },
});
