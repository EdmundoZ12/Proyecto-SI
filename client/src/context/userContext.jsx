import { createContext, useContext, useState } from "react";
import {

  getUserRequest,
  deleteUserRequest,
  createUserRequest,
  updateUserRequest,
  getUsersRequest
} from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) {
        setUsers((users) => users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser= async (ci, rol) => {
    try {
      await updateUserRequest(ci,rol);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        createUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}