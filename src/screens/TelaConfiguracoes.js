import { router } from "expo-router";
import { notificacoesDisponiveis } from "../services/notifications";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Switch,
  Text,
  View,
} from "react-native";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { useConfiguracoes } from "../contexts/SettingsContext";
import { CORES } from "../constants/theme";

// Permite ajustar as preferencias do aplicativo.
export default function TelaConfiguracoes() {
  const {
    configuracoes,
    carregado,
    erro,
    ocupado,
    notificacoes,
    atualizarVibracao,
    atualizarSom,
    atualizarLembrete,
    consultarLembrete,
    emitirFeedback,
  } = useConfiguracoes();

  // Mostra uma mensagem quando uma acao falha.
  const mostrarErro = (erroCapturado) =>
    Alert.alert(
      "Não foi possível concluir",
      erroCapturado.message || "Tente novamente.",
    );

  // Reconsulta o lembrete ao abrir a tela e ao retornar das configurações do sistema.
  useEffect(() => {
    // Atualiza o lembrete e trata falhas na consulta.
    const atualizarEstadoLembrete = () => {
      consultarLembrete().catch(mostrarErro);
    };
    atualizarEstadoLembrete();
    const inscricao = AppState.addEventListener("change", (estado) => {
      if (estado === "active") atualizarEstadoLembrete();
    });
    return () => inscricao.remove();

    // Reconsulta apenas ao montar e retornar do sistema, sem solicitar permissão.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TelaBase title="Configurações">
      <Text
        style={{
          color: CORES.texto,
        }}
      >
        Preferências do responsável
      </Text>
      {!carregado || ocupado ? (
        <ActivityIndicator
          accessibilityLabel="Carregando preferências"
          color={CORES.primaria}
        />
      ) : null}
      {erro ? <Text accessibilityRole="alert">{erro}</Text> : null}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text>Som das letras e palavras</Text>
        <Switch
          accessibilityLabel="Som das letras e palavras"
          value={configuracoes.som}
          disabled={!carregado || ocupado}
          onValueChange={(valor) => atualizarSom(valor).catch(mostrarErro)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Vibração suave</Text>
        <Switch
          accessibilityLabel="Vibração suave"
          value={configuracoes.vibration}
          disabled={!carregado || ocupado}
          onValueChange={(valor) => atualizarVibracao(valor).catch(mostrarErro)}
        />
      </View>
      <BotaoPrincipal
        title="Experimentar vibração"
        onPress={() =>
          configuracoes.vibration
            ? emitirFeedback().catch(mostrarErro)
            : Alert.alert(
                "Vibração desligada",
                "Ative a opção acima para experimentar.",
              )
        }
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
          }}
        >
          Lembrete de aprendizagem
        </Text>
        <Switch
          accessibilityLabel="Lembrete de aprendizagem"
          value={notificacoes}
          disabled={!carregado || ocupado || !notificacoesDisponiveis}
          onValueChange={(valor) => atualizarLembrete(valor).catch(mostrarErro)}
        />
      </View>
      {!notificacoesDisponiveis && (
        <Text>
          No Expo Go Android, o lembrete fica desativado. Use um build próprio
          do Alfatea para testar notificações.
        </Text>
      )}
      <Text>
        Um lembrete por dia às 18h, no horário do celular, sem som ou vibração.
        Você pode desativá-lo quando quiser.
      </Text>
      <BotaoPrincipal
        title="Informações do dispositivo"
        onPress={() => router.push("/device")}
      />
      <BotaoPrincipal
        title="Recursos próximos"
        onPress={() => router.push("/nearby")}
      />
      <BotaoPrincipal
        title="Sobre o Alfatea"
        onPress={() => router.push("/about")}
      />
    </TelaBase>
  );
}
