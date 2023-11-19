import { createContext, useContext, useState } from "react";
import {

  getInventariosRequest,

} from "../api/inventario";

const InventarioContext = createContext();

export const useInventario = () => {
  const context = useContext(InventarioContext );
  if (!context) throw new Error("useInventario must be used within a InventarioProvider");
  return context;
};

export function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([]);

  const getProductosInventario = async () => {
    try {
      const res = await getInventariosRequest();
      console.log(res.data);
      setInventario(res.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <InventarioContext.Provider
      value={{
        inventario,
        getProductosInventario
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
