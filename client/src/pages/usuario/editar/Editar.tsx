import React, { useState,} from 'react'
import "./editar.scss"
import { Link } from 'react-router-dom';
const Editar=()=>{
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ci: '',
        telefono: '',
        fechaNacimiento: '',
        direccion: '',
        usuario: '',
        contraseña: '',
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
        console.log(formData);
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
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="ci">Cédula de Identidad (CI):</label>
            <input
              type="text"
              id="ci"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
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
            
            <option value="administrador">Administrador</option>
            <option value="entrenador">Entrenador</option>
            <option value="entrenador">Recepcionista</option>
          </select>
          </div>
          <button type="submit">Crear</button>
          <Link to="/a/usuario">
          <button type="submit">Cancelar</button>
          </Link>
        </form>
      </div>
    )
}
export default Editar