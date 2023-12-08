import { createContext, useContext, useState } from "react";
import {
  createNota_EntradaRequest,
  getNotas_EntradaRequest,
} from "../api/nota-de-entrada";

const Reporte_EntradaContext = createContext();

export const useReporte_Entrada = () => {
  const context = useContext(Reporte_EntradaContext);
  if (!context)
    throw new Error(
      "useNota_Entrada must be used within a Nota_EntradaProvider"
    );
  return context;
};

export function Reporte_EntradaProvider({ children }) {
  const [reporte_Entrada, setNota_Entrada] = useState([]);

  const getNotas_Entrada = async () => {
    try {
      const res = await getNotas_EntradaRequest();
      setNota_Entrada(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNota_Entradaa = async (Nota_Entrada) => {
    try {
      const res = await createNota_EntradaRequest(Nota_Entrada);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Reporte_EntradaContext.Provider
      value={{
        reporte_Entrada,
        createNota_Entradaa,
        getNotas_Entrada,
      }}
      >
      {children}
      
    </Reporte_EntradaContext.Provider>
  );
}