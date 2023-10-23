import React, { useState,} from 'react'
import "./editarR.scss"
import { Link } from 'react-router-dom';
import { funcionalidades } from '../../../usuario';
import {roles} from "../../../Datos";

const EditarR=()=>{
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
        <div className='contenedor' style={{ marginTop:'-70px' }}>
        <h1 style={{ fontSize:'30px' }}>Editar Rol</h1>
        <form onSubmit={handleSubmit} className='formulario'>
          <div >
            <label htmlFor="nombre" style={{ fontSize:'25px' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
             
              onChange={handleChange}
              
            />
          </div>
          
          <div>
          <label htmlFor="rol" style={{ fontSize:'25px' }}>Funcionalidades:</label>
          <div>
             {funcionalidades.map((fun)=>(
                <label key={fun.id} style={{ display: 'flex', alignItems:'center' }}><input type="checkbox" style={{ width: '20px', marginRight: '8px' }}/>{fun.nombre}</label>
             ))}
          </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit">AñadirFun</button>
          <button type="submit">EliminarFun</button>
          <Link to="/home/rol">
          <button type="submit">Cancelar</button>
          </Link>
         </div>
        </form>
      </div>
    )
}
export default EditarR