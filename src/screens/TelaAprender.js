import { router } from "expo-router";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";

// Lista os modulos de aprendizagem.
export default function TelaAprender() {
  return (
    <TelaBase title="Vamos aprender">
      {["Letras", "Sílabas", "Palavras", "Jogos"].map((modulo) => (
        <BotaoPrincipal
          key={modulo}
          title={modulo}
          onPress={() =>
            router.push(
              modulo === "Letras"
                ? "/letters"
                : modulo === "Sílabas"
                  ? "/syllables"
                : {
                    pathname: "/module",
                    params: {
                      module: modulo,
                    },
                  },
            )
          }
        />
      ))}
    </TelaBase>
  );
}
