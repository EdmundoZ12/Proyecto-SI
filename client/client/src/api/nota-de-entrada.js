import axios from "./axios";

export const getNotas_EntradaRequest = async () => axios.get("/nota-de-entrada");

export const createNota_EntradaRequest = async (nota_de_entrada) => axios.post("/nota-de-entrada", nota_de_entrada);

export const getNota=async ()=> axios.get("http://localhost:3500/nota_entrada")