import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useAprendizagem } from "../contexts/LearningContext";

export function useRegistrarVisita(modulo, letra) {
  const { carregado, registrarVisita } = useAprendizagem();
  useFocusEffect(useCallback(() => {
    if (carregado && /^[A-Z]$/.test(letra)) registrarVisita(modulo, letra).catch(() => {});
  }, [carregado, registrarVisita, modulo, letra]));
}
