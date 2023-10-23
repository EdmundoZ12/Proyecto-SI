import React, { useState,useEffect} from 'react'
import "./crearF.scss"
const CrearF = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      
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
      useEffect(() => {
        fetch("http",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response =>response.json())
        .then((data)=>setFormData(data))
        },[]);
      console.log(formData);
    };
  
    return (
      <div className='contenedor'>
        <h1>Nuevo Funcionalidad</h1>
        <form onSubmit={handleSubmit} className='formulario'>
          <div >
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="apellido">Descripcion:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Crear</button>
          <button type="submit">Cancelar</button>
        </form>
      </div>
    );
  }
  
export default CrearF