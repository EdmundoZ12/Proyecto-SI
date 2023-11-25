import { createContext, useContext, useState } from "react";
import {
    createDisciplinaRequest,
    getDisciplinaRequest,
    getDisciplinasRequest,
    updateDisciplinaRequest
} from "../api/disciplinas";

const DisciplinaContext = createContext();

export const useDisciplinas = () => {
  const context = useContext(DisciplinaContext);
  if (!context) throw new Error("useDisciplinas must be used within a DisciplinaProvider");
  return context;
};

export function DisciplinaProvider({ children }) {
  const [disciplinas, setDisciplinas] = useState([]);

  const getDisciplinas = async () => {
    try {
      const res = await getDisciplinasRequest();
      setDisciplinas(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  const createDisciplina = async (Disciplina) => {
    try {
      const res = await createDisciplinaRequest(Disciplina);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDisciplina = async (cod) => {
    try {
      const res = await getDisciplinaRequest(cod);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateDisciplina = async (cod, Disciplina) => {
    try {
      await updateDisciplinaRequest(cod,Disciplina);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <DisciplinaContext.Provider
      value={{
        disciplinas,
        getDisciplinas,
        createDisciplina,
        getDisciplina,
        updateDisciplina,
      }}
    >
      {children}
    </DisciplinaContext.Provider>
  );
}
