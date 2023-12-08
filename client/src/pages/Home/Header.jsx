import React, { useState }  from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/Borcelle.png"
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";




const Header = () => {

  
  
    const contenedor={
        width:'100%',
        position:'fixed',
        borderBottom:'1px solid',
        backgroundColor:'rgba(0,0,0,0.7)',
        zIndex:'99',
        padding: '0 20px',
    }
    const header={
        maxWidth:'1100px',
        margin:'auto',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'20px 0',
        color:'#fff'
    }

    const a = {
        display: 'inline-block',
        textDecoration: 'none',
        color: '#fff',
        padding: '10px',
        textTransform: 'uppercase',
        transition: 'color 0.3s', 
      };

      const redes = {
        textDecoration: 'none',
        color: '#fff',
        display: 'inline-block',
        padding: '5px 8px',
        transition: 'color 0.3s', 
        fontSize:"2rem",
        width:"4rem"
        
      };
  return (
    <div style={contenedor} >
        <header style={header}>
          <img src={logo} alt="" style={{width:"10rem", height:"auto"}} />
       
        <nav id='nav' >
            <a href="#inicio"  style={a}>Inicio</a>
            <a href="#nosotros" style={a}>Nosotros</a>
            <a href="#servicios" style={a}>Servicios</a>
            <a href="#comodidades" style={a}>Comodidades</a>
            <a href="#galeria" style={a}>Galeria</a>
        </nav>
        <div>
          <Link to="/login" style={redes}>
          <FaUserCircle />
          </Link>
        </div>
        <div className=' hidden lg:flex'>
          <a href="https://www.facebook.com/wilsonfitness?locale=es_LA" style={redes} ><i ><FaFacebook /></i></a> 
          <a href="https://wa.link/7g3fap" style={redes}><i><FaWhatsapp /></i></a>
          <a href="https://www.instagram.com/gimnasio.wilson.y.spa.sauna/" style={redes}><i><FaInstagramSquare /></i></a>
        </div>
       
       
        </header>
        
    </div>
  )
}

export default Header
