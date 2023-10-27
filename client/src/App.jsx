import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { RolProvider } from "./context/rolContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import  LoginPage  from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { FuncionalidadFormPage } from "./pages/FuncionalidadFormPage";
import { FuncionalidadProvider } from "./context/funcionalidadContext";
import { FuncionalidadPage } from "./pages/FuncionalidadesPage";
import { RolFormPage } from "./pages/RolFormPage";
import { RolPage } from "./pages/RolesPage";


function App() {
  return (
    <AuthProvider>
      <RolProvider>
      <FuncionalidadProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/funcionalidades" element={<FuncionalidadPage />} />
                <Route path="/add-Funcionalidad" element={<FuncionalidadFormPage />} />
                <Route path="/add-Rol" element={<RolFormPage />} />
                <Route path="/roles/:id" element={<RolFormPage />} />
                <Route path="/roles" element={<RolPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/funcionalidades/:id" element={<FuncionalidadFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
      </FuncionalidadProvider>
      </RolProvider>
      
      
    </AuthProvider>
  );
}

export default App;
