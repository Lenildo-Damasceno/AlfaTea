import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Device from "expo-device";
import * as Application from "expo-application";
import TelaBase from "../components/Screen";

// Carrega e exibe os dados disponiveis do dispositivo.
export default function TelaInformacoesDispositivo() {
  const [tipo, definirTipo] = useState(null);

  // Consulta o tipo do aparelho e apresenta uma alternativa se a consulta falhar.
  useEffect(() => {
    let ativo = true;
    Device.getDeviceTypeAsync()
      .then((valor) => {
        if (ativo)
          definirTipo(
            {
              0: "Desconhecido",
              1: "Celular",
              2: "Tablet",
              3: "Computador",
              4: "TV",
            }[valor] || "Outro",
          );
      })
      .catch(() => {
        if (ativo) definirTipo("Não disponível");
      });
    return () => {
      ativo = false;
    };
  }, []);
  const informacoes = [
    ["Sistema operacional", Device.osName],
    ["Versão do sistema", Device.osVersion],
    ["Tipo", tipo],
    ["Marca", Device.brand],
    ["Fabricante", Device.manufacturer],
    ["Modelo", Device.modelName],
    ["Versão do aplicativo", Application.nativeApplicationVersion],
    ["Build", Application.nativeBuildVersion],
  ];
  return (
    <TelaBase title="Seu dispositivo">
      {tipo === null && <ActivityIndicator />}
      {informacoes.map(([rotulo, valor]) => (
        <View
          key={rotulo}
          style={{
            gap: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {rotulo}
          </Text>
          <Text selectable>{valor || "Não disponível"}</Text>
        </View>
      ))}
      <Text>
        No Expo Go, a versão e o build podem ser os do aplicativo hospedeiro.
        Nenhum identificador pessoal é coletado.
      </Text>
    </TelaBase>
  );
}
