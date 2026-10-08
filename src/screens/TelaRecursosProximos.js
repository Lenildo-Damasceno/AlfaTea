import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import * as Location from "expo-location";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";

// Apresenta a consulta opcional de recursos da regiao.
export default function TelaRecursosProximos() {
  const [ocupado, definirOcupado] = useState(false);
  const [mensagem, definirMensagem] = useState("");
  const ativo = useRef(true);
  const bloqueio = useRef(false);

  // Interrompe atualizações da interface quando o usuário sai desta tela.
  useEffect(() => {
    ativo.current = true;
    return () => {
      ativo.current = false;
    };
  }, []);

  // Solicita permissao e consulta a posicao sem salva-la.
  async function consultarLocalizacao() {
    if (bloqueio.current) return;
    bloqueio.current = true;
    definirOcupado(true);
    definirMensagem("");
    try {
      const permissao = await Location.requestForegroundPermissionsAsync();
      if (!permissao.granted)
        throw new Error(
          "Localização não autorizada. Você pode continuar usando todas as atividades.",
        );
      if (!(await Location.hasServicesEnabledAsync()))
        throw new Error("Ative a localização do celular e tente novamente.");
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (ativo.current)
        definirMensagem(
          `Localização aproximada: ${posicao.coords.latitude.toFixed(2)}, ${posicao.coords.longitude.toFixed(2)}. A busca de instituições próximas será adicionada em uma próxima etapa.`,
        );
    } catch (erroCapturado) {
      if (ativo.current)
        definirMensagem(
          erroCapturado.message ||
            "Não foi possível obter a localização. Tente novamente.",
        );
    } finally {
      bloqueio.current = false;
      if (ativo.current) definirOcupado(false);
    }
  }

  return (
    <TelaBase title="Recursos próximos">
      <Text>
        Este recurso opcional consulta sua posição uma única vez, para preparar
        a busca de recursos educacionais na sua região. Não salvamos nem
        enviamos sua localização.
      </Text>
      <Text>
        Toque abaixo para autorizar. As atividades funcionam mesmo sem essa
        permissão.
      </Text>
      {ocupado ? (
        <ActivityIndicator accessibilityLabel="Obtendo localização" />
      ) : (
        <BotaoPrincipal
          title="Consultar minha localização"
          onPress={consultarLocalizacao}
        />
      )}
      {mensagem ? (
        <Text accessibilityLiveRegion="polite">{mensagem}</Text>
      ) : null}
    </TelaBase>
  );
}
