import { createContext, useContext, useState } from "react";
import {
  createNota_EntradaRequest,
  getNotas_EntradaRequest,
} from "../api/nota-de-entrada";

const Nota_EntradaContext = createContext();

export const useNota_Entrada = () => {
  const context = useContext(Nota_EntradaContext);
  if (!context)
    throw new Error(
      "useNota_Entrada must be used within a Nota_EntradaProvider"
    );
  return context;
};

export function Nota_EntradaProvider({ children }) {
  const [nota_Entrada, setNota_Entrada] = useState([]);

  const getNotas_Entrada = async () => {
    try {
      const res = await getNotas_EntradaRequest();
      setNota_Entrada(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNota_Entrada = async (Nota_Entrada) => {
    try {
      const res = await createNota_EntradaRequest(Nota_Entrada);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Nota_EntradaContext.Provider
      value={{
        nota_Entrada,
        createNota_Entrada,
        getNotas_Entrada,
      }}
    >
      {children}
    </Nota_EntradaContext.Provider>
  );
}
