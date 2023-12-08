import axios from "./axios";

export const getHorariosRequest = async () => axios.get("/horario");

export const createHorarioRequest = async (horario) => axios.post("/horario", horario);

export const updateHorarioRequest = async (id,horario) =>
  axios.put(`/horario/${id}`, horario);



export const deleteHorarioRequest = async (id) => axios.delete(`/horario/${id}`);

export const getHorarioRequest = async (id) => axios.get(`/horario/${id}`);
