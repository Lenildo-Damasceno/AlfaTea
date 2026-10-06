import { ScrollView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
export default function Screen({ title, children }) {
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><Text accessibilityRole="header" style={styles.title}>{title}</Text>{children}</ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, gap: 20, width: '100%', maxWidth: 640, alignSelf: 'center', paddingBottom: 40 },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.primary },
});
