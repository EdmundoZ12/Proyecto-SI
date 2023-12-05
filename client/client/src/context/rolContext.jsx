import { createContext, useContext, useState } from "react";
import {

  getRolRequest,
  deleteRolRequest,
  createRolRequest,
  updateRolRequest,
  getRolesRequest
} from "../api/roles";

const RolContext = createContext();

export const useRoles = () => {
  const context = useContext(RolContext);
  if (!context) throw new Error("useRoles must be used within a RolProvider");
  return context;
};

export function RolProvider({ children }) {

  
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const res = await getRolesRequest();
      setRoles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteRol = async (id) => {
    try {
      const res = await deleteRolRequest(id);
      if (res.status === 204) {
        setRoles((funcionalidades) => roles.filter((rol) => rol.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createRol = async (rol) => {
    try {
      const res = await createRolRequest(rol);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRol = async (id) => {
    try {
      const res = await getRolRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateRol= async (id, rol) => {
    try {
      await updateRolRequest(id,rol);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <RolContext.Provider
      value={{
        roles,
        getRoles,
        getRol,
        deleteRol,
        updateRol,
        createRol
      }}
    >
      {children}
    </RolContext.Provider>
  );
}