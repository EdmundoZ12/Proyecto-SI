import { createContext, useContext, useState } from "react";
import {
  createProveedorRequest,
  getProveedorRequest,
  getProveedoresRequest,
  updateProveedorRequest,
  deleteProveedorRequest
} from "../api/proveedores";

const ProveedorContext = createContext();

export const useProveedores = () => {
  const context = useContext(ProveedorContext);
  if (!context) throw new Error("useProveedores must be used within a CategoriaProvider");
  return context;
};

export function ProveedorProvider({ children }) {
  const [proveedores, setProveedores] = useState([]);

  const getProveedores = async () => {
    try {
      const res = await getProveedoresRequest();
      setProveedores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteProveedor= async (id) => {
    try {
      const res = await deleteProveedorRequest(id);
      if (res.status === 204) {
        setProveedores((Proveedores) => Proveedores.filter((proveedor) => proveedor.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProveedor= async (Proveedor) => {
    try {
      const res = await createProveedorRequest(Proveedor);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProveedor = async (id) => {
    try {
      const res = await getProveedorRequest(id);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProveedor= async (id, Proveedor) => {
    try {
      await updateProveedorRequest(id,Proveedor);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        getProveedores,
        deleteProveedor,
        createProveedor,
        getProveedor,
        updateProveedor,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
}
