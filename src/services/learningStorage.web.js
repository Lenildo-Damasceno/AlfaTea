import AsyncStorage from "@react-native-async-storage/async-storage";

// SQLite web exige headers específicos; o navegador usa persistência local equivalente.
export const armazenamentoAprendizagem = {
  ler: (contaId) => AsyncStorage.getItem(`@alfatea/learning/v1/${contaId}`),
  salvar: (contaId, payload) => AsyncStorage.setItem(`@alfatea/learning/v1/${contaId}`, payload),
};
