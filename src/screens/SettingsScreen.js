import { notificationsAvailable } from '../services/notifications';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, AppState, Switch, Text, View } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { useSettings } from '../contexts/SettingsContext';
import { COLORS } from '../constants/theme';
export default function SettingsScreen({ navigation }) {
  const { settings, ready, error, busy, notifications, updateVibration, updateReminder, refreshReminder, feedback } = useSettings();
  const report = err => Alert.alert('Não foi possível concluir', err.message || 'Tente novamente.');
  useEffect(() => {
    const refresh = () => { refreshReminder().catch(report); };
    refresh();
    const subscription = AppState.addEventListener('change', state => { if (state === 'active') refresh(); });
    return () => subscription.remove();
    // Reconsulta apenas ao montar e retornar do sistema, sem solicitar permissão.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Screen title="Configurações">
    <Text style={{ color: COLORS.text }}>Preferências do responsável</Text>
    {!ready || busy ? <ActivityIndicator accessibilityLabel="Carregando preferências" color={COLORS.primary} /> : null}
    {error ? <Text accessibilityRole="alert">{error}</Text> : null}
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><Text>Vibração suave</Text><Switch accessibilityLabel="Vibração suave" value={settings.vibration} disabled={!ready || busy} onValueChange={value => updateVibration(value).catch(report)} /></View>
    <PrimaryButton title="Experimentar vibração" onPress={() => settings.vibration ? feedback().catch(report) : Alert.alert('Vibração desligada', 'Ative a opção acima para experimentar.')} />
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><Text style={{ flex: 1 }}>Lembrete de aprendizagem</Text><Switch accessibilityLabel="Lembrete de aprendizagem" value={notifications} disabled={!ready || busy || !notificationsAvailable} onValueChange={value => updateReminder(value).catch(report)} /></View>
    {!notificationsAvailable && <Text>No Expo Go Android, o lembrete fica desativado. Use um build próprio do Alfatea para testar notificações.</Text>}
    <Text>Um lembrete por dia às 18h, no horário do celular, sem som ou vibração. Você pode desativá-lo quando quiser.</Text>
    <PrimaryButton title="Informações do dispositivo" onPress={() => navigation.navigate('DeviceInfo')} />
    <PrimaryButton title="Recursos próximos" onPress={() => navigation.navigate('NearbyResources')} />
    <PrimaryButton title="Sobre o Alfatea" onPress={() => navigation.navigate('About')} />
  </Screen>;
}
