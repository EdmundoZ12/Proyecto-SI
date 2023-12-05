import axios from "./axios";

export const getProductosRequest = async () => axios.get("/productos");

export const createProductoRequest = async (producto) => axios.post("/productos", producto);

export const updateProductoRequest = async (id,producto) =>
  axios.put(`/productos/${id}`, producto);



export const deleteProductoRequest = async (id) => axios.delete(`/productos/${id}`);

export const getProductoRequest = async (id) => axios.get(`/productos/${id}`);