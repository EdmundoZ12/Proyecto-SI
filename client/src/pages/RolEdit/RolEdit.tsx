import { useParams } from "react-router-dom";
import "./roledit.scss"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { funcionalidades } from "../../data";
//type Props = {
  //nombre: string;
  //rows: object[];
  //slug: string;
  //setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//};

const roledit = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numeroCarnet: '',
    telefono: '',
    fechaNacimiento: '',
    rol: 'Usuario',
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
    <div className='contenedor' style={{ marginTop:'-70px' }}>
        <h1 style={{ fontSize:'30px' }}>Editar Rol</h1>
        <form onSubmit={handleSubmit} className='formulario'>
          <div >
            <label htmlFor="nombre" style={{ fontSize:'25px' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={handlechange}
              
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

export default roledit