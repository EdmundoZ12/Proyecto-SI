import axios from "./axios";

export const getEntrenadoresRequest = async () => axios.get("/entrenador");
export const getSoloEntrenadoresRequest = async () => axios.get("/entrenadores");

export const createEntrenadorRequest = async (entrenador) => axios.post("/entrenador", entrenador);

export const updateEntrenadorRequest = async (id,entrenador) =>
  axios.put(`/entrenador/${id}`, entrenador);


export const getEntrenadorRequest = async (id) => axios.get(`/entrenador/${id}`);