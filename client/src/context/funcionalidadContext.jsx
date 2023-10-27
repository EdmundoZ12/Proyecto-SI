import { createContext, useContext, useState } from "react";
import {
  createFuncionalidadRequest,
  getFuncionalidadRequest,
  getFuncionalidadesRequest,
  updateFuncionalidadRequest,
  deleteFuncionalidadRequest
} from "../api/funcionalidad";

const FuncionalidadContext = createContext();

export const useFuncionalidades = () => {
  const context = useContext(FuncionalidadContext);
  if (!context) throw new Error("useFuncionalidades must be used within a FuncionalidadProvider");
  return context;
};

export function FuncionalidadProvider({ children }) {
  const [funcionalidades, setFuncionalidades] = useState([]);

  const getFuncionalidades = async () => {
    try {
      const res = await getFuncionalidadesRequest();
      setFuncionalidades(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteFuncionalidad = async (id) => {
    try {
      const res = await deleteFuncionalidadRequest(id);
      if (res.status === 204) {
        setFuncionalidades((funcionalidades) => funcionalidades.filter((funcionalidad) => funcionalidad.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createFuncionalidad = async (funcionalidad) => {
    try {
      const res = await createFuncionalidadRequest(funcionalidad);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFuncionalidad = async (id) => {
    try {
      const res = await getFuncionalidadRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateFuncionalidad = async (id, funcionalidad) => {
    try {
      await updateFuncionalidadRequest(id,funcionalidad);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <FuncionalidadContext.Provider
      value={{
        funcionalidades,
        getFuncionalidades,
        deleteFuncionalidad,
        createFuncionalidad,
        getFuncionalidad,
        updateFuncionalidad,
      }}
    >
      {children}
    </FuncionalidadContext.Provider>
  );
}
