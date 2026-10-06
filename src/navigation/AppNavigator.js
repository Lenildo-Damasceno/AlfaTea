import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import NearbyResourcesScreen from '../screens/NearbyResourcesScreen';
import SplashScreen from '../screens/SplashScreen';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import PendingScreen from '../screens/PendingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { COLORS } from '../constants/theme';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: COLORS.primary, background: COLORS.background, text: COLORS.text, card: COLORS.white } };
const icons = { Home: '⌂', Learn: 'ABC', Progress: '☆', Settings: '⚙' };
function MainTabs() {
  return <Tab.Navigator screenOptions={({ route }) => ({ headerTitle: 'Alfatea', headerTintColor: COLORS.primary, tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: COLORS.text, tabBarLabelStyle: { fontSize: 12 }, tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: route.name === 'Learn' ? 13 : 24 }}>{icons[route.name]}</Text> })}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
    <Tab.Screen name="Learn" component={LearnScreen} options={{ title: 'Aprender' }} />
    <Tab.Screen name="Progress" component={PendingScreen} initialParams={{ title: 'Meu progresso' }} options={{ title: 'Progresso' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
  </Tab.Navigator>;
}
export default function AppNavigator() {
  return <NavigationContainer theme={theme}><Stack.Navigator screenOptions={{ headerTintColor: COLORS.primary }}><Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} /><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="Module" component={PendingScreen} options={({ route }) => ({ title: route.params.module })} /><Stack.Screen name="DeviceInfo" component={DeviceInfoScreen} options={{ title: 'Dispositivo' }} /><Stack.Screen name="NearbyResources" component={NearbyResourcesScreen} options={{ title: 'Recursos próximos' }} /><Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} /></Stack.Navigator></NavigationContainer>;
}


