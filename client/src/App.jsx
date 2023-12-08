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
import FuncionalidadesDemo from "./pages/FuncionalidadesPage";
import RolesDemo from "./pages/RolesPage";
import { RolProvider } from "./context/rolContext";
import { UserProvider } from "./context/userContext";
import UsersDemo from "./pages/UsuarioFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { CategoriaProvider } from "./context/categoriaContext";
import CategoriassDemo from "./pages/CategoriasPage";
import { ProveedorProvider } from "./context/proveedorContext";
import ProveedoresDemo from "./pages/ProveedoresPage";
import { ProductoProvider } from "./context/productoContext";
import ProductosDemo from "./pages/ProductosPage";
import InventariosDemo from "./pages/InventarioPage";
import { InventarioProvider } from "./context/inventarioContext";
import { Nota_EntradaProvider } from "./context/nota-de-entradaContext";
import Nota_EntradasDemo from "./pages/Nota_VentaPage";
import { HorarioProvider } from "./context/horarioContext";
import HorariosDemo from "./pages/HorarioPage";
import { DisciplinaProvider } from "./context/disciplinaContext";
import DisciplinasDemo from "./pages/DisciplinasPage";
import { EntrenadorProvider } from "./context/entrenadorContext";
import EntrenadoresDemo from "./pages/EntrenadoresPage";
import Login from "./pages/Login/Login";
import ClienteComponent from "./pages/clienteComponent";
import MembresiaComponent from "./pages/membresiaComponent";
import Reporte_EntradaDemo from "./pages/Reporte_EntradaPage";
import ReporteCliMemDemo from "./pages/reporteclimemPage";
import { Reporte_EntradaProvider } from "./context/reporteentradaContext";
import { ClimemProvider } from "./context/reporteclimemContext";
import { FacturaProvider } from "./context/facturaContext";
import FacturasDemo from "./pages/FacturaPage";
import { ClienteProvider } from "./context/clientesContext";
import { ReporteFacturaProvider } from "./context/reportefacturaContext";
import ReporteFacturaDemo from "./pages/Reporte_FacturaPage";
import { MembresiaProvider } from "./context/membresiaContext";
import BitacoraDemo from "./pages/bitacoraPage";
import { BitacoraProvider } from "./context/bitacoraContext";

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <UserProvider>
          <FuncionalidadProvider>
            <RolProvider>
              <CategoriaProvider>
                <ProveedorProvider>
                  <ProductoProvider>
                    <InventarioProvider>
                      <Nota_EntradaProvider>
                        <HorarioProvider>
                          <DisciplinaProvider>
                            <EntrenadorProvider>
                              <Reporte_EntradaProvider>
                                <ClimemProvider>
                                  <FacturaProvider>
                                    <ClienteProvider>
                                      <ReporteFacturaProvider>
                                        <MembresiaProvider>
                                          <BitacoraProvider>
                                            {" "}
                                            <BrowserRouter>
                                              <Routes>
                                                <Route
                                                  path="/login"
                                                  element={<Login />}
                                                />
                                                <Route
                                                  path="/"
                                                  element={<Page />}
                                                />

                                                <Route>
                                                  <Route
                                                    path="/products"
                                                    element={<ProductsDemo />}
                                                  />
                                                  <Route
                                                    path="/funcionalidades"
                                                    element={
                                                      <FuncionalidadesDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/categorias"
                                                    element={
                                                      <CategoriassDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/proveedores"
                                                    element={
                                                      <ProveedoresDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/roles"
                                                    element={<RolesDemo />}
                                                  />
                                                  <Route
                                                    path="/users"
                                                    element={<UsersDemo />}
                                                  />
                                                  <Route
                                                    path="/home"
                                                    element={<SideBarPage />}
                                                  />

                                                  <Route
                                                    path="/productos"
                                                    element={<ProductosDemo />}
                                                  />
                                                  <Route
                                                    path="/horario"
                                                    element={<HorariosDemo />}
                                                  />
                                                  <Route
                                                    path="/disciplinas"
                                                    element={
                                                      <DisciplinasDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/entrenador"
                                                    element={
                                                      <EntrenadoresDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/inventarios"
                                                    element={
                                                      <InventariosDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/nota-de-entrada"
                                                    element={
                                                      <Nota_EntradasDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="/cliente"
                                                    element={
                                                      <ClienteComponent />
                                                    }
                                                  />
                                                  <Route
                                                    path="/membresia"
                                                    element={
                                                      <MembresiaComponent />
                                                    }
                                                  />
                                                  <Route
                                                    path="/reporteentrada"
                                                    element={
                                                      <Reporte_EntradaDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="reporteclimem"
                                                    element={
                                                      <ReporteCliMemDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="facturas"
                                                    element={<FacturasDemo />}
                                                  />
                                                  <Route
                                                    path="reportefactura"
                                                    element={
                                                      <ReporteFacturaDemo />
                                                    }
                                                  />
                                                  <Route
                                                    path="bitacora"
                                                    element={<BitacoraDemo />}
                                                  />
                                                </Route>
                                              </Routes>
                                            </BrowserRouter>
                                          </BitacoraProvider>
                                        </MembresiaProvider>
                                      </ReporteFacturaProvider>
                                    </ClienteProvider>
                                  </FacturaProvider>
                                </ClimemProvider>
                              </Reporte_EntradaProvider>
                            </EntrenadorProvider>
                          </DisciplinaProvider>
                        </HorarioProvider>
                      </Nota_EntradaProvider>
                    </InventarioProvider>
                  </ProductoProvider>
                </ProveedorProvider>
              </CategoriaProvider>
            </RolProvider>
          </FuncionalidadProvider>
        </UserProvider>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
