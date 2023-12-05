import { createContext, useContext, useState } from "react";
import {
  getClienteMembresias,
  getEntrenadorEstudiantes,
} from "../api/membresia";

const ClimemContext = createContext();

export const useClimem = () => {
  const context = useContext(ClimemContext);
  if (!context)
    throw new Error(
      "useNota_Entrada must be used within a Nota_EntradaProvider"
    );
  return context;
};

export function ClimemProvider({ children }) {
    const [climem, setclimem] = useState([]);
    const[entest,setentest]=useState([])
    const getClienMemb = async () => {
      try {
        const res = await getClienteMembresias();
        setclimem(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getEntrenadorEstu=async()=>{
      try{
        const res=await getEntrenadorEstudiantes();
        setentest(res.data);
        
      }catch(error){
        console.error(error);
      }
    }

    return (
        <ClimemContext.Provider
          value={{
            climem,
            entest,
            getClienMemb,
            getEntrenadorEstu,
          }}
        >
          {children}
        </ClimemContext.Provider>
      );
    
}

