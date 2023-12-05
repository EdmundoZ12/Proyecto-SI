import axios from "./axios";

export const getClienteMembresias = async () => axios.get("/getclimem");

export const getEntrenadorEstudiantes=async()=>axios.get("/getentest")