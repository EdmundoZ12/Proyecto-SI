import { createContext, useContext, useState } from "react";
import {
  createFacturaRequest,
  getFacturasRequest,
} from "../api/factura";

const FacturaContext = createContext();

export const useFactura = () => {
  const context = useContext(FacturaContext);
  if (!context)
    throw new Error(
      "useFactura must be used within a FacturaProvider"
    );
  return context;
};

export function FacturaProvider({ children }) {
  const [facturas, setFactura] = useState([]);

  const getFacturas = async () => {
    try {
      const res = await getFacturasRequest();
      setFactura(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createFactura = async (Factura) => {
    try {
      const res = await createFacturaRequest(Factura);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FacturaContext.Provider
      value={{
        facturas,
        createFactura,
        getFacturas,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
}
