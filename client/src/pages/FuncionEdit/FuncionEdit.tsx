import { useParams } from "react-router-dom";
import "./funcionedit.scss"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
type Props = {
  nombre: string;
  //rows: object[];
  //slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Funcionedit = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    
  });
  const params=useParams()
  const handleSubmit =(e)=>{
    e.preventDefault();
    /*useEffect(() => {
    fetch("http",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response =>response.json())
    .then((data)=>setFormData(data))
    },[]);*/
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
    <div className='contenedor'>
        <h1>Editar Funcionalidad</h1>
        <form onSubmit={handleSubmit} className='formulario'>
            <div >
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={handlechange}
              
            />
            </div>
          <div >
            <label htmlFor="nombre">Descripcion:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
             
              onChange={handlechange}
              
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

export default Funcionedit