import { Platform } from "react-native";
import { isRunningInExpoGo } from "expo";
export const notificacoesDisponiveis =
  Platform.OS !== "web" && !(Platform.OS === "android" && isRunningInExpoGo());
let moduloNotificacoes;

// Carrega as notificacoes somente em ambientes compativeis.
function obterModuloNotificacoes() {
  if (!notificacoesDisponiveis)
    throw new Error(
      "Para testar lembretes, use um build próprio do Alfatea. No Expo Go Android, este recurso fica desativado.",
    );
  if (!moduloNotificacoes) {
    moduloNotificacoes = require("expo-notifications");
    moduloNotificacoes.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
  return moduloNotificacoes;
}
const IDENTIFICADOR_LEMBRETE = "alfatea-learning";

// Verifica a permissao e a existencia do lembrete agendado.
export async function lembreteEstaAtivo() {
  if (!notificacoesDisponiveis) return false;
  const Notificacoes = obterModuloNotificacoes();
  const permissao = await Notificacoes.getPermissionsAsync();
  const agendamentos = await Notificacoes.getAllScheduledNotificationsAsync();
  return (
    permissao.granted &&
    agendamentos.some((item) => item.identifier === IDENTIFICADOR_LEMBRETE)
  );
}

// Agenda ou cancela o lembrete diario de aprendizagem.
export async function configurarLembrete(ativado) {
  const Notificacoes = obterModuloNotificacoes();
  if (!ativado) {
    await Notificacoes.cancelScheduledNotificationAsync(IDENTIFICADOR_LEMBRETE);
    return;
  }
  if (Platform.OS === "android")
    await Notificacoes.setNotificationChannelAsync("learning", {
      name: "Lembrete de aprendizagem",
      importance: Notificacoes.AndroidImportance.DEFAULT,
      sound: null,
      enableVibrate: false,
    });
  let permissao = await Notificacoes.getPermissionsAsync();
  if (!permissao.granted && permissao.canAskAgain)
    permissao = await Notificacoes.requestPermissionsAsync();
  if (!permissao.granted)
    throw new Error(
      "Notificações não autorizadas. Você pode permitir nas configurações do celular.",
    );
  await Notificacoes.cancelScheduledNotificationAsync(IDENTIFICADOR_LEMBRETE);
  await Notificacoes.scheduleNotificationAsync({
    identifier: IDENTIFICADOR_LEMBRETE,
    content: {
      title: "Aprender no seu ritmo",
      body: "Que tal aprender um pouco com o Alfi hoje?",
      sound: false,
    },
    trigger: {
      type: Notificacoes.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
      channelId: "learning",
    },
  });
}
