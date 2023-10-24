import { useParams } from "react-router-dom";
import "./user.scss"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { roles } from '../../data';
type Props = {
  nombre: string;
  //rows: object[];
  //slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const User = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    ci:'',
    numeroCarnet: '',
    telefono: '',
    fechaNacimiento: '',
    direccion:'',
    rol: '',
  });
  const params=useParams()
  const handleSubmit =(e)=>{
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
  }

  const handlechange=(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  }
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
};

  /*const [data, setData]= useState(null);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response =>response.json())
    .then((data)=>setData(data));
  },[])
  console.log(data)*/

  //Fetch data and send to Single Component
  console.log(params.id)
  return (
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
          onChange={handlechange}
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handlechange}
        />
      </div>
      <div>
        <label htmlFor="ci">Cédula de Identidad (CI):</label>
        <input
          type="text"
          id="ci"
          name="ci"
          value={formData.ci}
          onChange={handlechange}
        />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handlechange}
        />
      </div>
      <div>
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handlechange}
        />
      </div>
      
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handlechange}
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
        {roles.map((fun)=>(
          <option key={fun.id} value="administrador">{fun.nombre}</option>
          ))}
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

export default User