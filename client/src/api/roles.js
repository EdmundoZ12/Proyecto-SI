import axios from "./axios";

export const getRolesRequest = async () => axios.get("/roles");

export const createRolRequest = async (rol) => axios.post("/roles", rol);

export const updateRolRequest = async (id,rol) =>
  axios.put(`/roles/${id}`, rol);



export const deleteRolRequest = async (id) => axios.delete(`/roles/${id}`);

export const getRolRequest = async (id) => axios.get(`/roles/${id}`);