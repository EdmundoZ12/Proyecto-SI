import React, {useState} from 'react';
import{roles} from "../../Datos";
import{BiEdit} from 'react-icons/bi';
import{AiTwotoneDelete} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import{BsFillEyeFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Example from "../usuario/eliminar/Eliminar"
import "./rol.scss"
const Rol = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div>
        <h1 className='Header'>Gestionar Roles</h1>
        <Link to='/home/crearRol'>
        <button className='CrearRol'>Crear Rol</button>
        </Link>
        
        <table className='tabla'>
           <thead>
            <tr>
                <th>Nombre</th>
            </tr>
           </thead>
           
           <tbody>
           {roles.map((rol)=>(
            <tr key={rol.id}>
                <td>{rol.nombre}</td>
                <div className="botones">
               
              <Link to="/home/editarR">
                <BiEdit size='40px' gap='20px' color='green'/>
                
              </Link>
                
             
              
              <AiTwotoneDelete size='40px' gap='20px' color='red' onClick={handleShow} />
              <Link to="">
                <BsFillEyeFill size='30px' gap='20px'/>
              </Link>
              <Link to="/home/agregarF">
              <AiOutlinePlus size='40px' gap='20px' color='black'  />
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

export default Rol