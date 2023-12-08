import { createContext, useContext, useState } from "react";
import {
  getClienteMembresias,
  getEntrenadorEstudiantes,
  getMembresias,
  
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
    const[entest,setentest]=useState([]);
    const[membresias,setMembresias]=useState([]);
    const[pago,setPago]=useState([]);
    
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

    const getMembresiass=async()=>{
      try{
        const res=await getMembresias();
        setMembresias(res.data);
      }catch(error){
        console.log(error);
      }
    }

    const getPagoo=async(id)=>{
      try{
        const res=await getPago(id);
        setPago(res.data);
      }catch(error){
        console.error(error);
      }
    }

    return (
        <ClimemContext.Provider
          value={{
            climem,
            entest,
            membresias,
            
            getClienMemb,
            getEntrenadorEstu,
            getMembresiass,
            
          }}
        >
          {children}
        </ClimemContext.Provider>
      );
    
}

