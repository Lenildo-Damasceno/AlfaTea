import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
export default function PrimaryButton({ title, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}><Text style={styles.text}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({
  button: { backgroundColor: COLORS.primary, borderRadius: 16, padding: 18, minHeight: 56, alignItems: 'center' },
  text: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
});
