import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
export default function NearbyResourcesScreen() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const active = useRef(true);
  const lock = useRef(false);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  async function locate() {
    if (lock.current) return;
    lock.current = true; setBusy(true); setMessage('');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) throw new Error('Localização não autorizada. Você pode continuar usando todas as atividades.');
      if (!await Location.hasServicesEnabledAsync()) throw new Error('Ative a localização do celular e tente novamente.');
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      if (active.current) setMessage(`Localização aproximada: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}. A busca de instituições próximas será adicionada em uma próxima etapa.`);
    } catch (err) { if (active.current) setMessage(err.message || 'Não foi possível obter a localização. Tente novamente.'); }
    finally { lock.current = false; if (active.current) setBusy(false); }
  }
  return <Screen title="Recursos próximos"><Text>Este recurso opcional consulta sua posição uma única vez, para preparar a busca de recursos educacionais na sua região. Não salvamos nem enviamos sua localização.</Text><Text>Toque abaixo para autorizar. As atividades funcionam mesmo sem essa permissão.</Text>{busy ? <ActivityIndicator accessibilityLabel="Obtendo localização" /> : <PrimaryButton title="Consultar minha localização" onPress={locate} />}{message ? <Text accessibilityLiveRegion="polite">{message}</Text> : null}</Screen>;
}
