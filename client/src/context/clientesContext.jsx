import { createContext, useContext, useState } from "react";
import {
  createClienteRequest,
  getClienteRequest,
  getClientesRequest,
  updateClienteRequest,
  deleteClienteRequest
} from "../api/cliente";

const ClienteContext = createContext();

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useClientes must be used within a ClienteProvider");
  return context;
};

export function ClienteProvider({ children }) {
  const [clientes, setCliente] = useState([]);

  const getClientes = async () => {
    try {
      const res = await getClientesRequest();
      setCliente(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteCliente = async (id) => {
    try {
      const res = await deleteClienteRequest(id);
      if (res.status === 204) {
        setCliente((clientes) => clientes.filter((Cliente) => Cliente.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createCliente = async (Cliente) => {
    try {
      const res = await createClienteRequest(Cliente);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCliente = async (id) => {
    try {
      const res = await getClienteRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCliente = async (id, Cliente) => {
    try {
      await updateClienteRequest(id,Cliente);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        getClientes,
        deleteCliente,
        createCliente,
        getCliente,
        updateCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}
