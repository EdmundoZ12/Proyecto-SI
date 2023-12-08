import { createContext, useContext, useState } from "react";
import {
  createCategoriaRequest,
  getCategoriaRequest,
  getCategoriasRequest,
  updateCategoriaRequest,
  deleteCategoriaRequest
} from "../api/categorias";

const CategoriaContext = createContext();

export const useCategorias = () => {
  const context = useContext(CategoriaContext);
  if (!context) throw new Error("useCategorias must be used within a CategoriaProvider");
  return context;
};

export function CategoriaProvider({ children }) {
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    try {
      const res = await getCategoriasRequest();
      setCategorias(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteCategoria = async (id) => {
    try {
      const res = await deleteCategoriaRequest(id);
      if (res.status === 204) {
        setCategorias((Categorias) => Categorias.filter((Categoria) => Categoria.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createCategoria = async (Categoria) => {
    try {
      const res = await createCategoriaRequest(Categoria);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoria = async (id) => {
    try {
      const res = await getCategoriaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategoria = async (id, Categoria) => {
    try {
      await updateCategoriaRequest(id,Categoria);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        getCategorias,
        deleteCategoria,
        createCategoria,
        getCategoria,
        updateCategoria,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
}
