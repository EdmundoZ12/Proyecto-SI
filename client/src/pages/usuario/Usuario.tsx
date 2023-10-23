import React, { useEffect,useState} from 'react';
import{user} from "../../usuario"
import Example from "./eliminar/Eliminar"
import { Link } from 'react-router-dom';
import "./usuario.scss"
import{BiEdit} from 'react-icons/bi'
import{AiTwotoneDelete} from 'react-icons/ai'

const Usuario = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState(null);
  useEffect(() => {
    // Realizar la solicitud GET cuando el componente se monta
    fetch('')
      .then((response) => response.json())
      .then((data) => setData(data)) // Actualiza el estado con los datos recibidos)
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        
      });
  }, []);

  return (
    <>
    <div className="usuario" style={{ marginTop:'-90px' }}>
      <div>
         <Link to="/home/crear">
      <button className="boton">Crear Usuario</button>
        </Link>  
       </div>
       <div>
      <h1 className="header">Lista de Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CI</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
            <th>Dirección</th>
            <th>Usuario</th>
           
            
          </tr>
        </thead>
        <tbody>
          {user.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.ci}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.fechaNacimineto}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.usuario}</td>
              
                <div className="botones">
              <Link to="/home/editar">
                <BiEdit size='40px' gap='20px' color='blue' />
                
              </Link>
                
              <AiTwotoneDelete size='40px' gap='20px' color='red' onClick={handleShow} />
                </div>
                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    <Example show={show} handleClose={handleClose}/>
    </>
    
  )
}

export default Usuario