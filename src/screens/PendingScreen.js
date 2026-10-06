import { Text } from 'react-native';
import Screen from '../components/Screen';
import { COLORS } from '../constants/theme';
export default function PendingScreen({ route }) {
  return <Screen title={route.params?.module || route.params?.title || 'Em preparação'}><Text style={{ color: COLORS.text, fontSize: 18 }}>Esta funcionalidade será implementada nas próximas fases do Alfatea.</Text></Screen>;
}
