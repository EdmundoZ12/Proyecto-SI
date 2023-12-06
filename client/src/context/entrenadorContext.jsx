import { createContext, useContext, useState } from "react";
import {
    createEntrenadorRequest,
    getEntrenadorRequest,
    getEntrenadoresRequest,
    getSoloEntrenadoresRequest,
    updateEntrenadorRequest
} from "../api/entrenadores";

const EntrenadorContext = createContext();

export const useEntrenadores = () => {
  const context = useContext(EntrenadorContext);
  if (!context) throw new Error("useEntrenadors must be used within a EntrenadorProvider");
  return context;
};

export function EntrenadorProvider({ children }) {
  const [entrenadores, setEntrenadores] = useState([]);
  const [soloentrenadores, setSoloEntrenadores] = useState([]);

  const getEntrenadores = async () => {
    try {
      const res = await getEntrenadoresRequest();

      setEntrenadores(res.data);
      console.log("entrenadoresss"+res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSoloEntrenadores = async () => {
    try {
      const res = await getSoloEntrenadoresRequest();
      setSoloEntrenadores(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  const createEntrenador = async (Entrenador) => {
    try {
      const res = await createEntrenadorRequest(Entrenador);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getEntrenador = async (id) => {
    try {
      const res = await getEntrenadorRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEntrenador = async (id, Entrenador) => {
    try {
      await updateEntrenadorRequest(id,Entrenador);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <EntrenadorContext.Provider
      value={{
        entrenadores,
        getEntrenadores,
        createEntrenador,
        getEntrenador,
        updateEntrenador,
        getSoloEntrenadores,
        soloentrenadores
      }}
    >
      {children}
    </EntrenadorContext.Provider>
  );
}
