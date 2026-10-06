import { Platform } from 'react-native';
import { isRunningInExpoGo } from 'expo';
export const notificationsAvailable = Platform.OS !== 'web' && !(Platform.OS === 'android' && isRunningInExpoGo());
let notificationModule;
function getNotifications() {
  if (!notificationsAvailable) throw new Error('Para testar lembretes, use um build próprio do Alfatea. No Expo Go Android, este recurso fica desativado.');
  if (!notificationModule) {
    notificationModule = require('expo-notifications');
    notificationModule.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }) });
  }
  return notificationModule;
}
const ID = 'alfatea-learning';

export async function reminderEnabled() {
  if (!notificationsAvailable) return false;
  const Notifications = getNotifications();
  const permission = await Notifications.getPermissionsAsync();
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return permission.granted && scheduled.some(item => item.identifier === ID);
}
export async function setReminder(enabled) {
  const Notifications = getNotifications();
  if (!enabled) { await Notifications.cancelScheduledNotificationAsync(ID); return; }
  if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('learning', { name: 'Lembrete de aprendizagem', importance: Notifications.AndroidImportance.DEFAULT, sound: null, enableVibrate: false });
  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && permission.canAskAgain) permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) throw new Error('Notificações não autorizadas. Você pode permitir nas configurações do celular.');
  await Notifications.cancelScheduledNotificationAsync(ID);
  await Notifications.scheduleNotificationAsync({ identifier: ID, content: { title: 'Aprender no seu ritmo', body: 'Que tal aprender um pouco com o Alfi hoje?', sound: false }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 18, minute: 0, channelId: 'learning' } });
}
