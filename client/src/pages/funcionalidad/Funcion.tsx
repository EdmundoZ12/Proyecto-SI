import React, { useState} from 'react';
import{funcionalidades} from "../../usuario"
import{BiEdit} from 'react-icons/bi'
import{AiTwotoneDelete} from 'react-icons/ai'
import{BsFillEyeFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Example from "../usuario/eliminar/Eliminar"

import "./funcion.scss"
const Funcion = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <div>
        <h1 className='Header'>Gestionar Funcionalidades</h1>
        <Link to='/home/crearF'>
        <button className='CrearRol'>Crear Funcionalidad</button>
        </Link>
        
        <table className='tabla'>
           <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
            </tr>
           </thead>
           
           <tbody>
           {funcionalidades.map((rol)=>(
            <tr key={rol.id}>
                <td>{rol.nombre}</td>
                <td>{rol.descripcion}</td>
                <div className="botones">
               
              <Link to="/home/editar">
                <BiEdit size='40px' gap='20px' color='green' />
                
              </Link>
                
             
              
              <AiTwotoneDelete size='40px' gap='20px' color='red' onClick={handleShow} />
              <Link to="/home/eliminar">
                <BsFillEyeFill size='30px' gap='20px'/>
              </Link>
                </div>
            </tr>
           ))}
           </tbody>
        </table>
    </div>
    <Example show={show} handleClose={handleClose}/>
    </>
  )
}

export default Funcion