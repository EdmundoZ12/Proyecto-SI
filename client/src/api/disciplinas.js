import axios from "./axios";

export const getDisciplinasRequest = async () => axios.get("/disciplinas");

export const createDisciplinaRequest = async (disciplina) => axios.post("/disciplinas", disciplina);

export const updateDisciplinaRequest = async (cod,disciplina) =>
  axios.put(`/disciplinas/${cod}`, disciplina);


export const getDisciplinaRequest = async (cod) => axios.get(`/disciplinas/${cod}`);