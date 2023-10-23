import React, { useState,} from 'react'
import "./editarR.scss"
import { Link } from 'react-router-dom';
import { funcionalidades } from '../../../usuario';
import {roles} from "../../../Datos";

const EditarR=(propp)=>{
    console.log(propp)
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

    return(
        <div className='contenedor'>
        <h1>Nuevo Usuario</h1>
        <form onSubmit={handleSubmit} className='formulario'>
          <div >
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={propp.nombre}
              onChange={handleChange}
              
            />
          </div>
          
          <div>
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChangeSelect}
          >
            {funcionalidades.map((fun)=>(
                <option key={fun.id}>{fun.nombre}</option>
            ))}
          </select>
          </div>
          <button type="submit">AñadirFun</button>
          <button type="submit">EliminarFun</button>
          <Link to="/home/rol">
          <button type="submit">Cancelar</button>
          </Link>
          
        </form>
      </div>
    )
}
export default EditarR