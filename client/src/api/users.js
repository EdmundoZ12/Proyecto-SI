import axios from "./axios";

export const getUsersRequest = async () => axios.get("/user");

export const createUserRequest = async (user) => axios.post("/user", user);

export const updateUserRequest = async (id,user) =>
  axios.put(`/user/${id}`, user);



export const deleteUserRequest = async (id) => axios.delete(`/user/${id}`);

export const getUserRequest = async (id) => axios.get(`/user/${id}`);