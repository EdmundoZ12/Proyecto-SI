import React, { useState, useEffect} from 'react'

import { useLocation } from 'react-router-dom';


import "./editarR.scss"
import { Link } from 'react-router-dom';
import { funcionalidades } from '../../../usuario';
import {roles} from "../../../Datos";

const EditarR=(propp)=>{
    // console.log(propp)
    const [formData, setFormData] = useState({
        nombre: '',
        rol:'',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };
      
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu servidor o realizar otras acciones con ellos.
        
    };

    // -----------

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    console.log(id);

    const [roles, setRoles] = useState([]);

    useEffect(() => {
      // Función para realizar la solicitud GET a la API de roles
      const fetchRoles = async () => {
        try {
          const response = await fetch(`http://localhost:8080/rol/get/${id}`);
          if (!response.ok) {
            throw new Error('No se pudieron obtener los datos de roles.');
          }
          const data = await response.json();
          console.log(data);
          setRoles(data); // Almacena los datos de roles en el estado
        } catch (error) {
          console.error('Error al obtener los datos de roles:', error);
        }
      };
  
      fetchRoles(); // Llama a la función para realizar la solicitud cuando el componente se monta
    }, []);







    return(

      <div>

      
{roles.map((rol) => (
  <div key={rol.id}>
    <h4>{rol.id_funcionalidad}</h4>
    <h3>{rol.nombre}</h3>
    <p>{rol.descripcion}</p>
  </div>
))}


      </div>
      //   <div className='contenedor'>
      //   <h1>Nuevo Usuario</h1>
      //   <form onSubmit={handleSubmit} className='formulario'>
      //     <div >
      //       <label htmlFor="nombre">Nombre:</label>
      //       <input
      //         type="text"
      //         id="nombre"
      //         name="nombre"
      //         value={propp.nombre}
      //         onChange={handleChange}
              
      //       />
      //     </div>
          
      //     <div>
      //     <label htmlFor="rol">Rol:</label>
      //     <select
      //       id="rol"
      //       name="rol"
      //       value={formData.rol}
      //       onChange={handleChangeSelect}
      //     >
      //       {funcionalidades.map((fun)=>(
      //           <option key={fun.id}>{fun.nombre}</option>
      //       ))}


      //     </select>
      //     </div>

      //     <button type="submit">AñadirFun</button>

      //     <button type="submit">EliminarFun</button>

      //     <Link to="/home/rol">
      //     <button type="submit">Cancelar</button>
      //     </Link>
          
      //   </form>
      // </div>
    )
}
export default EditarR