import axios from "./axios";

export const getMembresiasRequest = async() => axios.get("/membresias");

export const createMembresiaRequest = async(membresia) => axios.post("/membresias", membresia);

export const getMembresiaRequest = async(id) => axios.get(`/membresias/${id}`);