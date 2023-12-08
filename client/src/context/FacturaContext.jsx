import { createContext, useContext, useState } from "react";
import {
  createFacturasRequest,
  getFacturasRequest,
  getFactura,
} from "../api/factura";

const FacturaContext = createContext();

export const useFactura = () => {
  const context = useContext(FacturaContext);
  if (!context)
    throw new Error(
      "useNota_Entrada must be used within a Nota_EntradaProvider"
    );
  return context;
};

export function FacturaProvider({ children }) {
  const [Factura, setFactura] = useState([]);

  const getFacturas = async () => {
    try {
      const res = await getFacturasRequest(); //
      setFactura(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createFactura = async (Factura) => {
    try {
      const res = await createFacturasRequest(Factura);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFacturass=async()=>{
    try{
      const res=await getFactura();
      setFactura(res.data);
    }catch(error){
      console.log(error)
    }
  }


  return (
    <FacturaContext.Provider
      value={{
        Factura,
        createFactura,
        getFacturas,
        getFacturass,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
}
