import axios from "./axios";

export const getClienteMembresias = async () => axios.get("/getclimem");

export const getEntrenadorEstudiantes=async()=>axios.get("/getentest");

export const getMembresias=async()=>axios.get("http://localhost:3000/membresia/index");

export const getPago=async(id)=>axios.get(`http://localhost:3000/membresia/pago/${id}`)
