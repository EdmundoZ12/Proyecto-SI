import "./header.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/Borcelle.png"
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";


const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
    const hideMenu = () => {
      setMenuVisible(false);
    }
  return (
    <div>
      <div className="contenedor-header">
        <header>
        <img src={logo} alt="" style={{width:"7rem", height:"auto"}} />
            <nav id="nav"className={menuVisible ? "responsive" : ""}>
            <a href="#inicio" onClick={hideMenu}>Inicio</a>
            <a href="#nosotros" onClick={hideMenu}>Nosotros</a>
            <a href="#servicios" onClick={hideMenu}>Servicios</a>
            <a href="#comodidades" onClick={hideMenu}>Comodidades</a>
            <a href="#galeria" onClick={hideMenu}>Galería</a>
            
            </nav>
            <div className="login">
          <Link to="/login" style={{color:'white', fontSize:'2rem'}}>
          <FaUserCircle />
          </Link>
        </div>
            <div className="redes">
            <a href="https://www.facebook.com/wilsonfitness?locale=es_LA"  ><i ><FaFacebook /></i></a> 
          <a href="https://wa.link/7g3fap" ><i><FaWhatsapp /></i></a>
          <a href="https://www.instagram.com/gimnasio.wilson.y.spa.sauna/" ><i><FaInstagramSquare /></i></a>
            </div>
            
            <div id="icono-nav" className="nav-responsive" onClick={toggleMenu}>
            <i className="fa-solid fa-bars"><FaBars /></i>
          </div>                
        </header>
    </div>
    </div>
  )
}

export default Header
