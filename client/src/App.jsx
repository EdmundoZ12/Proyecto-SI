import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import "./App.css";
import ProductsDemo from "./pages/TableProductosPage";
import SideBarPage from "./pages/SideBarPage";
import Page from "./pages/Page";
import { FuncionalidadProvider } from "./context/funcionalidadContext";
import { AuthProvider } from "./context/authContext";
import LoginPage from "./pages/LoginPage";
import FuncionalidadesDemo from "./pages/FuncionalidadesPage";
import RolesDemo from "./pages/RolesPage";
import { RolProvider } from "./context/rolContext";
import { UserProvider } from "./context/userContext";
import UsersDemo from "./pages/UsuarioFormPage";
import ProductoComponent from "./pages/pruductoComponent";
import CategoriaComponent from "./pages/categoriaComponent";
import ProveedorComponent from "./pages/proveedorComponent";
import InventarioComponent from "./pages/inventarioComponent";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <UserProvider>
          <FuncionalidadProvider>
            <RolProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<Page />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/products" element={<ProductsDemo />} />
                    <Route
                      path="/funcionalidades"
                      element={<FuncionalidadesDemo />}
                    />
                    <Route path="/roles" element={<RolesDemo />} />
                    <Route path="/users" element={<UsersDemo />} />
                    <Route path="/home" element={<SideBarPage />} />
                    <Route path="/producto" element={<ProductoComponent />} />
                    <Route path="/categoria" element={<CategoriaComponent />} />
                    <Route path="/proveedor" element={<ProveedorComponent />} />
                    <Route path="/inventario" element={<InventarioComponent />} />
                  </Route>

                </Routes>
              </BrowserRouter>
            </RolProvider>
          </FuncionalidadProvider>
        </UserProvider>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
