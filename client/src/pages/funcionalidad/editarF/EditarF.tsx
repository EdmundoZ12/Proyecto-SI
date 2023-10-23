import React, { useState,} from 'react'
import "./editarF.scss"
import { Link } from 'react-router-dom';

const EditarF=()=>{
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
      
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu servidor o realizar otras acciones con ellos.
        
    };

    return(
        <div className='contenedor'>
        <h1>Editar Funcionalidad</h1>
        <form onSubmit={handleSubmit} className='formulario'>
            <div >
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={handleChange}
              
            />
            </div>
          <div >
            <label htmlFor="nombre">Descripcion:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
             
              onChange={handleChange}
              
            />
          </div>
          
          <button type="submit">Cambiar</button>
          <Link to="/home/funcion">
          <button type="submit">Cancelar</button>
          </Link>
          
        </form>
      </div>
    )
}
export default EditarF