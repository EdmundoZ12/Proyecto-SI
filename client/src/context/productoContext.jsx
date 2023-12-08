import { createContext, useContext, useState } from "react";
import {
  createProductoRequest,
  getProductoRequest,
  getProductosRequest,
  updateProductoRequest,
  deleteProductoRequest
} from "../api/productos";

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) throw new Error("useProductos must be used within a CategoriaProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    try {
      const res = await getProductosRequest();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteProducto= async (id) => {
    try {
      const res = await deleteProductoRequest(id);
      if (res.status === 204) {
        setProductos((Productos) => Productos.filter((Producto) => Producto.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProducto= async (Producto) => {
    try {
      const res = await createProductoRequest(Producto);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto= async (id, Producto) => {
    try {
      await updateProductoRequest(id,Producto);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        deleteProducto,
        createProducto,
        getProducto,
        updateProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}
