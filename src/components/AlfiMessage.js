import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
export default function AlfiMessage({ children }) {
  return <View style={styles.card}><Image source={require('../../assets/images/alfi/alfi_ola.png')} style={styles.alfi} resizeMode="contain" accessibilityLabel="Alfi acenando" /><Text style={styles.message}>{children}</Text></View>;
}
const styles = StyleSheet.create({
  card: { padding: 24, borderRadius: 24, backgroundColor: COLORS.white, gap: 12, alignItems: 'center' },
  alfi: { width: 200, height: 220 },
  message: { fontSize: 24, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
});
