import { createContext, useContext, useState } from "react";
import {
  createFacturasRequest,
  getFacturasRequest,
  getFactura, //base falsa
} from "../api/factura";

const ReporteFacturaContext = createContext();

export const useReporteFactura = () => {
  const context = useContext(ReporteFacturaContext);
  if (!context)
    throw new Error(
      "useNota_Entrada must be used within a Nota_EntradaProvider"
    );
  return context;
};

export function ReporteFacturaProvider({ children }) {
  const [factura, setFactura] = useState([]);
  const getFacturas= async () => {
    try {
      const res = await getFacturasRequest();
      setFactura(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getFacturaa = async () => {
    try {
      const res = await getFactura();
      setFactura(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const creaFactura = async (factura) => {
    try {
      const res = await createFacturasRequest(factura);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  //con mi base falsa
  return (
    <ReporteFacturaContext.Provider
      value={{
        factura,
        creaFactura,
       // getNotas_Entrada,
        getFacturaa, //base falsa
      }}
      >
      {children}
      
    </ReporteFacturaContext.Provider>
  );
}