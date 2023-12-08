import axios from "./axios";

export const getFacturasRequest = async () => axios.get("/facturas");

export const createFacturaRequest = async (factura) => axios.post("/facturas", factura);