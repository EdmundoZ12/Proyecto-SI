import axios from "./axios";

export const getNotas_EntradaRequest = async () => axios.get("/nota-de-entrada");

export const createNota_EntradaRequest = async (nota_de_entrada) => axios.post("/nota-de-entrada", nota_de_entrada);
