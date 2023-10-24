import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Funcion from "./pages/funcionalidades/Funcion";
import RolEdit from "./pages/RolEdit/RolEdit"
import Funcionedit from "./pages/FuncionEdit/FuncionEdit";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/home/users",
          element: <Users />,
        },
        {
          path: "/home/products",
          element: <Products />,
        },
        {
          path:"/home/funcion",
          element:<Funcion/>
        },
        {
          path: "/home/users/:id",
          element: <User/>,
        },
        {
          path:"/home/products/:id",
          element:<RolEdit/>
        },
        {
          path:"/home/funcion/:id",
          element:<Funcionedit/>
        },
        //{
        //  path: "/products/:id",
        //  element: <Product />,
        //},
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
