import axios from "./axios";

export const getProveedoresRequest = async () => axios.get("/proveedores");

export const createProveedorRequest = async (user) => axios.post("/proveedores", user);

export const updateProveedorRequest = async (id,user) =>
  axios.put(`/proveedores/${id}`, user);



export const deleteProveedorRequest = async (id) => axios.delete(`/proveedores/${id}`);

export const getProveedorRequest = async (id) => axios.get(`/proveedores/${id}`);