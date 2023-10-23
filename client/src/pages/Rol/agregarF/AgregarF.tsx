import React, { useState,} from 'react'
import "./agregarF.scss"
import { funcionalidades } from '../../../usuario';
const AgregarF = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      rol: '',
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
      console.log(formData);
    };
  
    return (
      <div className='contenedor' style={{ marginTop:'-70px' }}>
        <h1>Asignar Funcionalidad</h1>
        <form onSubmit={handleSubmit} className='formulario'>
          <div >
            <label htmlFor="nombre" style={{ fontSize:'25px' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="funcion" style={{ fontSize:'25px' }}>Funcionalidades:</label>
          <div>
             {funcionalidades.map((fun)=>(
                <label key={fun.id} style={{ display: 'flex', alignItems:'center' }}><input type="checkbox" style={{ width: '20px', marginRight: '8px' }} />{fun.nombre}</label>
                
             ))}
          </div>
          </div>
          <button type="submit">Asignar</button>
          <button type="submit">Cancelar</button>
        </form>
      </div>
    );
  }
  
export default AgregarF