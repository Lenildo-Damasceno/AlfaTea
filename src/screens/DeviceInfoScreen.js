import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import Screen from '../components/Screen';
export default function DeviceInfoScreen() {
  const [type, setType] = useState(null);
  useEffect(() => { let active = true; Device.getDeviceTypeAsync().then(value => { if (active) setType(({ 0: 'Desconhecido', 1: 'Celular', 2: 'Tablet', 3: 'Computador', 4: 'TV' })[value] || 'Outro'); }).catch(() => { if (active) setType('Não disponível'); }); return () => { active = false; }; }, []);
  const rows = [['Sistema operacional', Device.osName], ['Versão do sistema', Device.osVersion], ['Tipo', type], ['Marca', Device.brand], ['Fabricante', Device.manufacturer], ['Modelo', Device.modelName], ['Versão do aplicativo', Application.nativeApplicationVersion], ['Build', Application.nativeBuildVersion]];
  return <Screen title="Seu dispositivo">{type === null && <ActivityIndicator />}{rows.map(([label, value]) => <View key={label} style={{ gap: 4 }}><Text style={{ fontWeight: '700' }}>{label}</Text><Text selectable>{value || 'Não disponível'}</Text></View>)}<Text>No Expo Go, a versão e o build podem ser os do aplicativo hospedeiro. Nenhum identificador pessoal é coletado.</Text></Screen>;
}
