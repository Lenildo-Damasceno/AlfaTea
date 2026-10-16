import { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Redirect } from "expo-router";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import EstadoAprendizagem from "../components/LearningStatus";
import { useAprendizagem } from "../contexts/LearningContext";
import { useAuth } from "../contexts/AuthContext";
import { AVATARES } from "../data/learningModel";
import { CORES } from "../constants/theme";

export default function TelaPerfil() {
  const { usuario, carregandoAuth } = useAuth();
  const { perfil, perfis, carregado, selecionarPerfil, salvarPerfil } = useAprendizagem();
  if (carregandoAuth) return null;
  if (!usuario) return <Redirect href="/login" />;
  return <TelaBase title="Quem vai aprender?">
    <EstadoAprendizagem />
    <Text>O cadastro é do responsável. Aqui você escolhe o apelido de quem aprende.</Text>
    {carregado ? <EditorPerfil key={perfil.id} {...{ perfil, perfis, selecionarPerfil, salvarPerfil }} /> : null}
  </TelaBase>;
}

function EditorPerfil({ perfil, perfis, selecionarPerfil, salvarPerfil }) {
  const [apelido, definirApelido] = useState(perfil.apelido);
  const [avatar, definirAvatar] = useState(perfil.avatar);
  const [novo, definirNovo] = useState(false);
  const [ocupado, definirOcupado] = useState(false);
  const bloqueio = useRef(false);
  async function executar(operacao) {
    if (bloqueio.current) return;
    bloqueio.current = true;
    definirOcupado(true);
    try { await operacao(); }
    catch (erro) { Alert.alert("Não foi possível salvar", erro.message || "Tente novamente."); }
    finally { bloqueio.current = false; definirOcupado(false); }
  }
  return <>
    {perfis.map((item) => <BotaoPrincipal key={item.id}
      title={`${AVATARES[item.avatar]} ${item.apelido || "Meu perfil"}${item.id === perfil.id ? " · Selecionado" : ""}`}
      disabled={ocupado || item.id === perfil.id}
      onPress={() => executar(() => selecionarPerfil(item.id))} />)}
    <Text accessibilityRole="header">{novo ? "Novo perfil" : "Editar perfil selecionado"}</Text>
    <TextInput accessibilityLabel="Apelido de quem aprende" placeholder="Apelido" value={apelido}
      editable={!ocupado} maxLength={30} onChangeText={definirApelido} style={estilos.input} />
    <Text>Escolha um avatar</Text>
    <View style={estilos.avatares}>
      {Object.entries(AVATARES).map(([id, imagem]) => <Pressable key={id} accessibilityRole="radio"
        accessibilityLabel={id} accessibilityState={{ checked: avatar === id, disabled: ocupado }} disabled={ocupado}
        onPress={() => definirAvatar(id)} style={[estilos.avatar, avatar === id && estilos.selecionado]}>
        <Text style={{ fontSize: 32 }} accessible={false}>{imagem}</Text>
      </Pressable>)}
    </View>
    <BotaoPrincipal title="Salvar perfil" loading={ocupado} disabled={!apelido.trim()} onPress={() => executar(async () => {
      await salvarPerfil({ perfilId: novo ? `perfil-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` : perfil.id, apelido, avatar });
      definirNovo(false);
      Alert.alert("Perfil salvo", "Seu progresso será registrado neste perfil.");
    })} />
    <BotaoPrincipal title={novo ? "Cancelar novo perfil" : "Adicionar outro perfil"} disabled={ocupado} onPress={() => {
      definirNovo(!novo); definirApelido(novo ? perfil.apelido : ""); definirAvatar(novo ? perfil.avatar : "estrela");
    }} />
    <Text>Perfis e progresso ficam neste aparelho, separados por conta.</Text>
  </>;
}
const estilos = StyleSheet.create({
  input: { borderWidth: 1, borderColor: CORES.texto, borderRadius: 12, padding: 16, fontSize: 20, color: CORES.texto },
  avatares: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  avatar: { padding: 12, minWidth: 64, minHeight: 64, borderWidth: 3, borderColor: "transparent", borderRadius: 16, alignItems: "center" },
  selecionado: { borderColor: CORES.primaria, backgroundColor: CORES.branco },
});
