import { createContext, useContext, useState } from "react";
import {
  createHorarioRequest,
  getHorariosRequest,
  getHorarioRequest,
  updateHorarioRequest,
  deleteHorarioRequest
} from "../api/horario";

const HorarioContext = createContext();

export const useHorarios = () => {
  const context = useContext(HorarioContext);
  if (!context) throw new Error("useHorarioes must be used within a HorarioProvider");
  return context;
};

export function HorarioProvider({ children }) {
  const [horarios, setHorarios] = useState([]);

  const getHorarios = async () => {
    try {
      const res = await getHorariosRequest();
      setHorarios(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteHorario = async (id) => {
    try {
      const res = await deleteHorarioRequest(id);
      if (res.status === 204) {
        setHorarios((Horarioes) => Horarioes.filter((Horario) => Horario.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createHorario = async (Horario) => {
    try {
      const res = await createHorarioRequest(Horario);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getHorario = async (id) => {
    try {
      const res = await getHorarioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateHorario = async (id, Horario) => {
    try {
      await updateHorarioRequest(id,Horario);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <HorarioContext.Provider
      value={{
        horarios,
        getHorarios,
        deleteHorario,
        createHorario,
        getHorario,
        updateHorario,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
}
