import { createContext, useContext, useState } from "react";
import { getMembresiasRequest, createMembresiaRequest } from "../api/membresia";

const MembresiaContext = createContext();

export const useMemebresia = () => {
  const context = useContext(MembresiaContext);
  if (!context) throw new Error("useMembresia must be used within a RolProvider");
  return context;
};

export function MembresiaProvider({ children }) {

  
  const [membresias, setMembresia] = useState([]);

  const getMembresias = async () => {
    try {
      const res = await getMembresiasRequest();
      setMembresia(res.data);
      console.log("context "+ res.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const createMembresia = async (Membresia) => {
    try {
      const res = await createMembresiaRequest(Membresia);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };



  

  // const deleteRol = async (id) => {
  //   try {
  //     const res = await deleteRolRequest(id);
  //     if (res.status === 204) {
  //       setRoles((funcionalidades) => roles.filter((rol) => rol.id !== id));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const createRol = async (rol) => {
  //   try {
  //     const res = await createRolRequest(rol);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getRol = async (id) => {
  //   try {
  //     const res = await getRolRequest(id);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateRol= async (id, rol) => {
  //   try {
  //     await updateRolRequest(id,rol);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  return (
    <MembresiaContext.Provider
      value={{
        membresias,
        getMembresias,
        createMembresia
        // getRol,
        // deleteRol,
        // updateRol,
        // createRol
      }}
    >
      {children}
    </MembresiaContext.Provider>
  );
}