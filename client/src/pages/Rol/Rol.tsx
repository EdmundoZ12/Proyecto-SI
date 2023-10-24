import React, { useState, useEffect } from "react";
import { roles } from "../../Datos";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Example from "../usuario/eliminar/Eliminar";

import axios from 'axios';


import "./rol.scss";
const Rol = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [roles, setRoles] = useState([]);

  // const fetchRoles = async () => {
  //   const response = await fetch("http://localhost:8080/rol/index");

  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchRoles(); // Llama a la función para realizar la solicitud cuando el componente se monta
  // }, []);


  useEffect(() => {
    // Función para realizar la solicitud GET a la API de roles
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:8080/rol/index');
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos de roles.');
        }
        const data = await response.json();
        setRoles(data); // Almacena los datos de roles en el estado
      } catch (error) {
        console.error('Error al obtener los datos de roles:', error);
      }
    };

    fetchRoles(); // Llama a la función para realizar la solicitud cuando el componente se monta
  }, []);

  return (
    <>
      <div>
        {/* <h2>hola</h2>

        <h2>Lista de Roles</h2>
        <ul>
          {roles.map((rol) => (
            <li key={rol.id}>{rol.nombre}</li>

            

          ))}
        </ul> */}
        <h1 className='Header'>Gestionar Roles</h1>
        <Link to='/home/crearRol'>
        <button className='CrearRol'>Crear Rol</button>
        </Link>
        
        <table className='tabla'>
           <thead>
            <tr>
                <th>Nombre</th>
            </tr>
           </thead>
           
           <tbody>
           {roles.map((rol)=>(
            <tr key={rol.id}>
                <td>{rol.nombre}</td>
                <div className="botones">
               
              <Link to={`/home/editarR?id=${rol.id}`}>
                <BiEdit size='40px' gap='20px' color='green'/>
                
              </Link>
                
             
              
              <AiTwotoneDelete size='40px' gap='20px' color='red' onClick={handleShow} />
              <Link to="">
                <BsFillEyeFill size='30px' gap='20px'/>
              </Link>
              <Link to="/home/agregarF">
              <AiOutlinePlus size='40px' gap='20px' color='black'  />
              </Link>
                </div>
            </tr>
           ))}
           </tbody>
        </table>
      </div>
      <Example show={show} handleClose={handleClose} />
    </>
  );
};

export default Rol;
