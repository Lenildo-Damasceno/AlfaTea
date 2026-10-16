import { openDatabaseAsync } from "expo-sqlite";
import { criarArmazenamentoSQLite } from "./learningDatabase";

export const armazenamentoAprendizagem = criarArmazenamentoSQLite(openDatabaseAsync);
