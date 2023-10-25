import {Outlet, Link, NavLink, useLocation} from 'react-router-dom'
import { WalletIcon,ClipboardIcon, BoltIcon,UserIcon ,UserGroupIcon, UserPlusIcon, ClipboardDocumentCheckIcon, HomeIcon, ShoppingCartIcon, Squares2X2Icon,} from '@heroicons/react/24/solid'
import React, { useState } from 'react';

const layout = () => {
const location=useLocation()
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isMenu2Open, setIsMenu2Open] = useState(false);

  const toggleMenu = () => {
    
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenu2 = () => {
    
    setIsMenu2Open(!isMenu2Open);

  };


  return (
    <div className=' md:flex md:min-h-screen'>
      <aside className=' md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className=' text-4xl font-black text-center text-red-400 '>Usuarios</h2>
        <nav>
        <a
        href="#"
        className={`text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-7 ${isMenuOpen ? 'border-b-2 border-blue-300' : ''}`}
        onClick={toggleMenu}
      >
        <UserIcon className="w-6 h-6" /> Gestionar Usuarios
      </a>
      {isMenuOpen && (
        <div>
          <Link
            to="/"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <UserGroupIcon className="w-6 h-6" /> Usuarios
          </Link>
          <Link
            to="/usuario/nuevo"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <UserPlusIcon className="w-6 h-6" /> Nuevo Usuario
          </Link>
          <Link
            to="/usuario/rol"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <ClipboardDocumentCheckIcon className="w-6 h-6" /> Roles
          </Link>
          <Link
            to="/rol/nuevo"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <ClipboardDocumentCheckIcon className="w-6 h-6" /> Nuevo Rol
          </Link>
          <Link
            to="/funcionalidad"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <ClipboardIcon className="w-6 h-6" /> Funcionalidades
          </Link>
          <Link
            to="/funcionalidad/nuevo"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <ClipboardDocumentCheckIcon className="w-6 h-6" /> Nueva Funcionalidad
          </Link>
        </div>
      )}
       <h2 className=' text-4xl block font-black text-center text-red-400 mt-4' >Producto</h2>
          <a
        href="#"
        className={`text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-7 ${isMenu2Open ? 'border-b-2 border-blue-300' : ''}`}
        onClick={toggleMenu2}
      >
        <UserGroupIcon className="w-6 h-6" /> Gestionar Productos
      </a>
      {isMenu2Open && (
        <div>
          <Link
            to="/usuario/nuevo"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <Squares2X2Icon className="w-6 h-6" /> Categorias
          </Link>
          <Link
            to="/usuario/rol"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <ShoppingCartIcon className="w-6 h-6" /> Productos
          </Link>
          <Link
            to="/usuario/Funcion"
            className="text-3xl font-semibold block hover:text-blue-300 text-white flex items-center mt-4 ml-6"
          >
            <WalletIcon className="w-6 h-6" /> Inventario
          </Link>
        </div>
      )}
        </nav>

        
       
       
      </aside>
      

      <main className='md:w-3/4 md: h-screen p-10 overflow-scroll'>
        <Outlet/>
      </main>
    </div>
  )
}

export default layout
