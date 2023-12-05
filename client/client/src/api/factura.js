import axios from "./axios";

export const getFacturasRequest = async () => axios.get("/factura");

export const createFacturasRequest = async (Factura) => axios.post("/factura", Factura);

export const getFactura=async()=> axios.get("http://localhost:3500/factura")