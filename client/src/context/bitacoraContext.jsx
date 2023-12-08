import { createContext, useContext, useState } from "react";
import {
  getBitacorasRequest,
} from "../api/bitacora";

const BitacoraContext = createContext();

export const useBitacora = () => {
  const context = useContext(BitacoraContext);
  if (!context)
    throw new Error(
      "usebitacora must be used within a BitacoraProvider"
    );
  return context;
};

export function BitacoraProvider({ children }) {
  const [bitacora, setBitacora] = useState([]);

  const getBitacoras= async () => {
    try {
      const res = await getBitacorasRequest();
      setBitacora(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <BitacoraContext.Provider
      value={{
        bitacora,
        getBitacoras,
      }}
    >
      {children}
    </BitacoraContext.Provider>
  );
}
