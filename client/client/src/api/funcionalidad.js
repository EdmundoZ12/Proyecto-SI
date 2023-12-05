import axios from "./axios";

export const getFuncionalidadesRequest = async () => axios.get("/funcionalidades");

export const createFuncionalidadRequest = async (funcionalidad) => axios.post("/funcionalidades", funcionalidad);

export const updateFuncionalidadRequest = async (id,funcionalidad) =>
  axios.put(`/funcionalidades/${id}`, funcionalidad);



export const deleteFuncionalidadRequest = async (id) => axios.delete(`/funcionalidades/${id}`);

export const getFuncionalidadRequest = async (id) => axios.get(`/funcionalidades/${id}`);
